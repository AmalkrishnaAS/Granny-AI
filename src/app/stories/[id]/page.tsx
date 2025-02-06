"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Id } from "../../../../convex/_generated/dataModel";
import { Title } from "@/components/title";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Book } from "@/components/book";


export default function StoryPage() {
  const params = useParams();
  const id = params.id as Id<"stories">;
  const story = useQuery(api.stories.getStory, { id });

  
  

  if (!story) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 px-10 mx-auto">
      
    <div className="flex flex-col space-y-5">
    <Title text={story.title?? ""} />
    <div className="user flex items-center space-x-2">
    <Avatar
    className="w-5 h-5 md:h-6 md:w-6"
    >
      <AvatarImage src={story.author.image} alt={story.author.firstName}
      
      />
      <AvatarFallback>{`${story.author.firstName?.charAt(0)} ${story.author.lastName?.charAt(0)}` || story.author.email.charAt(0)}</AvatarFallback>
    </Avatar>
    <p className="text-xs md:text-sm text-neutral-700">{story.author.firstName} {story.author.lastName}</p>
    </div>
    <Separator className="my-3" />
    <div
    className=""
    >
      <Book story={story} />
    </div>
    </div>
    </div>


   
  );
}
