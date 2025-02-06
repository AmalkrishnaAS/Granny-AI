
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div
           className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-screen"
        >
            <SignUp
                path="/sign-up"
                routing="path"
            />
        </div>
    );
}