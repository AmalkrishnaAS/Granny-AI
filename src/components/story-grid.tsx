"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { Story } from "../types/story";
import { StoryCard } from "@/components/story-card";
import {} from "@/components/ui/scroll-area"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Dispatch } from "react";
export const StoryGrid = ({ stories,setSelectedStory }: { stories: Story[] | undefined ,setSelectedStory:any}) => {
    return (
        <>
            <AuthLoading>Loading...</AuthLoading>
            <Authenticated>
                <ScrollArea className="grid grid-cols-1 lg:grid-cols-2 gap-6  py-10 xl:grid-cols-3 place-items-center 2xl:grid-cols-4">
                    {stories?.map((story: Story) => (
                       <StoryCard key={story._id} story={story}
                       setSelectedStory={setSelectedStory}
                       />
                    ))}
                </ScrollArea>
            </Authenticated>
        </>
    );
};