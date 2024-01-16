import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { prisma } from "@/app/db";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

export async function handler(req: Request) {
  const payload = await req.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let event: Event | null = null;
  try {
    event = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error("hello");
    console.error((err as Error).message);
    return new Response(JSON.stringify({})), { status: 400 };
  }

  const eventType: EventType = event.type;

  try {
      if (eventType === "user.created") {
       
        const { id,username } = event.data;
     const user =  await prisma.user.create({
         data: {
            username:username as string,
          externalId: id as string
        },
     });
        return new Response(JSON.stringify({ newUser: id}))
    }
      
    
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ err: err }), {
      status: 500,
    });
  }

  try {
    if (eventType === "user.deleted") {
        const { id } = event.data
        console.log("hi", )
      await prisma.user.delete({
        where: { externalId: id as string },
      });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ err: err }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({}), { status: 200 });
}
type EventType = "user.created" | "user.deleted" | "*";
type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};
