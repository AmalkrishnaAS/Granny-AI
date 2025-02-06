"use client";
import {ClerkProvider} from "@clerk/nextjs";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
const AuthProvider = ({children}: {children: React.ReactNode }) => {
    return (
        <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
        >
            <ConvexProviderWithClerk
            useAuth={useAuth}
            client={convex}
            >{children}</ConvexProviderWithClerk>
        </ClerkProvider>


    );
};

export default AuthProvider;
