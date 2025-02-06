import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Story } from "@/types/story"
import Image from "next/image"
import { splitPages } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

export function Book({story}: {story: Story}) {
    const [pages,setPages] = React.useState<string[]>(splitPages(story));
    
  return (
    <Carousel className=" mx-auto font-mono ">
      <CarouselContent>
      
         <CarouselItem
         className="flex items-center justify-center "
         >
            <Card
            className="py-10  text-center bg-amber-50"
            >
                <CardContent>
                <div
                className="flex flex-col items-center justify-center space-y-6"
                >
                    <h2
                    className="font-bold text-2xl font-mono tracking-tight"
                    >
                    {story.title}

                    </h2>

                    <Image
                    src={story.imageUrl}
                    alt={story.title}
                    width={400}
                    height={400}
                    className="rounded-full"
                    />
                    <p
                    className="text-lg text-muted-foreground tracking-tight line-clamp-3 text-center"
                    >
                    {story.prompt}
                    </p>



                </div>
                </CardContent>
            </Card>
        </CarouselItem>
        )

        {pages.map((page, index) => (
            
            <CarouselItem
            key={index}
            className="flex items-center justify-center px-8 py-12"
            >
                <Card
                className="py-10 w-[600px]  relative h-full text-center bg-amber-50"
                >
                    <CardContent>
                    <div
                    className="flex flex-col items-center justify-center space-y-3 "
                    >
                        <h2
                        className="font-bold text-2xl font-mono"
                        >
                        Page {index + 1}
                        </h2>
                        <p
                        className=" text-muted-foreground tracking-tight text-center text-lg"
                        >
                        <ReactMarkdown>{page}</ReactMarkdown>
                        
                        </p>
                    </div>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
