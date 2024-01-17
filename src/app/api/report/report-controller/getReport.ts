import OpenAI from "openai";

export default async function getReport(req: Request) {
  const { income, budgets } = await req.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const formattedBudgetItems = budgets
      .map(
        (budget: any) =>
          `- Name: ${budget.name}\n  Category: ${budget.category}\n  Amount: $${budget.amount}\n  Frequency: ${budget.frequency}`
      )
        .join("\n\n");
      
      const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `I need a financial report based on the following data: income:${income}\n ${formattedBudgetItems} ` }
          ]
      })

      return new Response(JSON.stringify({ report: completion.choices[0].message.content }), {
          status:200
      })
  } catch (err) {
    console.error(err);
      return new Response(JSON.stringify({ error: err }), {
        status:500
    });
  }
}
