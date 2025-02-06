'use client';

import { Title } from "@/components/title";
import { StoryGrid } from "@/components/story-grid";
import { Protected } from "@/components/protected";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { EditDrawer } from "./edit-drawer";
import { useState } from "react";
import { usePathname } from "next/navigation"
import { Story } from "@/types/story";

export function StoriesContainer({selectedStory, setSelectedStory}: {selectedStory:any, setSelectedStory:any}) {
  const pathname = usePathname();


let stories:Story[] | undefined = [];
  
  if(pathname ==='/discover'){
  stories = useQuery(api.stories.getPublicStories);
  }
  else {
    stories = useQuery(api.stories.getUserStories);
  }
  
  if(stories && stories?.length === 0) {
    return (
      <Protected>
       
        <div
        className="px-10 py-8"
        >
         
          <Title text="Granny-AI" />
          <div
          className="flex items-center justify-center text-2xl text-muted-foreground min-h-[500px] "
          >
            <p
            className="p-12 border border-dashed bor border-muted-foreground rounded-md"
            >No stories found. Get started by generating a story @ <Link 
            className="underline text-blue-600"
            href="/generate">Generate</Link>.</p>
          </div>
        </div>
      </Protected>
    )
  }
  return (
    <Protected>
      <div className="px-10 py-8">
        <Title text="Granny-AI" />
        <StoryGrid stories={stories}
        setSelectedStory={setSelectedStory}
        />
      </div>
    </Protected>
  );
}
