//form to edit title and prompt

import { 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage, 
    
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "./ui/switch";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Story } from "@/types/story";
import { Form,FormDescription } from "@/components/ui/form";

import { editStorySchema } from "@/lib/schemas/edit-story";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MDEditor from "@uiw/react-md-editor";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation, useAction } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";


export const EditForm = ({story,setSelectedStory}:{story?:Story | null,setSelectedStory:any}) => {
  const [isLoading, setIsLoading] = useState(false);


  const updateStory = useMutation(api.stories.updateStory);
    //form with title and content
    const form = useForm<z.infer<typeof editStorySchema>>({
      
        resolver: zodResolver(editStorySchema),
        defaultValues: {
            title: story?.title,
            prompt: story?.prompt,
            content: story?.content,
            is_public: story?.is_public,
        },
    });
    if(!story){
      return null
    }
    
    return (
      
        <Form
    {...form}
        

        
        >
            <form
            onSubmit={form.handleSubmit(async (values) => {
              setIsLoading(true);
              try {
               await updateStory({
                
                 title: values.title,
                 prompt: values.prompt,
                 content: values.content,
                 is_public: values.is_public,
                 id: story._id,

               })
                toast.success("Story saved successfully");

                

            } catch (error:any) {
              console.error(error);
              toast.error("Failed to save story");
            }
            setIsLoading(false);
            setSelectedStory(null);
            
            }
            )}
            className="space-y-4"
            >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:text-lg">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title"
                      {...field}
                      disabled = {isLoading}
                      className="md:text-lg p-6 max-w-[900px]"
                    
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:text-lg">Prompt</FormLabel>
                  <FormControl>
                    <Input
                    disabled = {true}
                      placeholder="Describe your story"
                      
                      {...field}
                      className="md:text-lg p-6 max-w-[900px]"
                    
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:text-lg">Content</FormLabel>
                  <FormControl>
                   <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="md:text-lg p-6 "
                    preview={!isLoading ? "edit" : "preview"}
                    data-color-mode="light"
                    
                    
                    
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
            className="flex justify-between border border-gray-300 pt-4 p-6 items-center mt-3 rounded-md max-w-[900px]"

            >
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="md:text-lg mx-2">Public</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p
            className="text-sm
            text-gray-500
            "
            >
              Check this box if you want your story to be public. Other users will be able to read and fork your story.
            </p>

            </div>
            <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
         
            </form>
        </Form>

    ) }