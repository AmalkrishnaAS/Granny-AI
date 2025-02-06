import { Title } from "@/components/title";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {CreateForm} from "@/components/create-form"
export default function Generate() {
    return (
        <div
        className="px-8 py-6"
        >
         
            <div
            className="mt-8 grid grid-cols-1 gap-12  md:grid-cols-3"
            >
            <AspectRatio ratio={4/5}
            className=""
            >
                <Image
                src="/granny.jpg"
                alt="example"
                fill
                className="object-cover"
                />
            </AspectRatio>
            <div className="col-span-2">
            <div
            className="flex flex-col space-y-5"
            >
            <Title
            text="Ask Granny"
            />
            <p
            className="text-xl text-muted-foreground"
            >Describe whats on your mind ! Let Granny help you</p>
                        <CreateForm />

            </div>
            </div>
          
            
            
          

            </div>
        </div>
    );
}