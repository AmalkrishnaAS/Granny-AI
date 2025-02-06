'use client';

import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";

export const Protected = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useConvexAuth();
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Authenticated>{children}</Authenticated>
            <Unauthenticated>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                        <p>You need to be signed in to access this page.</p>
                    </div>
                </div>
            </Unauthenticated>
        </>
    );
};