export type User = {
    _id: Id<"users">;
    email: string;
    clerkUserId: string;
    firstName?: string;
    lastName?: string;
    image?: string;
    
    };