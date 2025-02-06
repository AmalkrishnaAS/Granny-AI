"use client";
import { Story } from "@/types/story";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { FaCodeFork } from "react-icons/fa6";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FaTrash, FaPen, FaBook } from "react-icons/fa6";
import Link from "next/link";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import {toast} from "sonner";
import { usePathname } from "next/navigation";

export const StoryCard = ({ story,setSelectedStory }: { story: Story,setSelectedStory:any }) => {
const pathname = usePathname();
const forkStory = useMutation(api.stories.createStory);

  const deleteStory = useMutation(api.stories.deleteStory);
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex flex-col space-y-3">
        <Image
          src={story.imageUrl}
          alt={story.title}
          width={400}
          height={400}
        />
        <CardTitle className="text-2xl font-bold uppercase line-clamp-1">
          {story.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-24 overflow-hidden">
        <p className="text-lg text-muted-foreground tracking-tight line-clamp-3">
          {story.prompt}
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between py-4">
        <div className="flex gap-2">
          {pathname=='/'&&<Button variant="outline" size="icon"
          onClick={() => setSelectedStory(story)}
          >
            <FaPen className="h-4 w-4" />
          </Button>}
          {
            pathname=='/' &&
            <Button variant="outline" size="icon"
          onClick={() => {
            deleteStory({ id: story._id });
            toast.success("Story deleted successfully");
       
          }
          }>
          
            <FaTrash className="h-4 w-4" />
          </Button>}
          {
              pathname=='/discover' && 
              <Button variant="outline" size="icon"
              onClick={()=>{}}
              >
                <FaCodeFork className="h-4 w-4" />
              </Button>
              
            }
        </div>
        <Link href={`/stories/${story._id}`}>
          <Button>
            <FaBook className="mr-2 h-4 w-4" />
            Read Story
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
