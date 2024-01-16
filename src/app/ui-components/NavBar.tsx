import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
export function NavBar() {
    const {user} = useUser();
    const username = user?.username;

    return (
        <div className=" flex gap-3 items-center font-semibold justify-end text-cl  text-gray-700">
            <div>
                <p>{username}</p>
            </div>
            <UserButton></UserButton>
        </div>
    )
}