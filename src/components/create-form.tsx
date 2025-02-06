"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "./ui/switch";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation, useAction } from "convex/react";


import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Slider } from "./ui/slider";
import {toast} from "sonner";
import { Separator } from "./ui/separator";
import { createStorySchema } from "@/lib/schemas/create-story";
import { Textarea } from "./ui/textarea";
import { generateStory, generateCoverImage } from "@/lib/services/story-gen";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUser } from "../../convex/users";
import { prompts } from "@/data/prompts";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { SuccessModal } from "./success-modal";
export function CreateForm() {
  const sendCoverImage = useAction(api.stories.sendCoverImage);
  const createStory = useMutation(api.stories.createStory);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const form = useForm<z.infer<typeof createStorySchema>>({
    resolver: zodResolver(createStorySchema),
    defaultValues: {
      title: "",
      prompt: "",
      no_of_words: 100,
      is_public: false,
    },
  });

  const handleRandomPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    form.setValue("prompt", randomPrompt.prompt);
    form.setValue("title", randomPrompt.title);
  };

  async function onSubmit(values: z.infer<typeof createStorySchema>) {
    try {
      setIsLoading(true);

      console.log(values);

      const content = await generateStory(
        values.prompt,
        values.no_of_words,
        values.title
      );

      console.log(content);
      const coverImageId = await sendCoverImage({ prompt: values.prompt });
      console.log(coverImageId);

      const story = await createStory({
        title: values.title,
        prompt: values.prompt,
        no_of_words: values.no_of_words,
        is_public: values.is_public,
        slug: values.title,
        content,
        coverImageId,
      });
      toast.success("Story generated successfully");
      setIsOpened(true);
      form.reset();

      //upload image to convex and get the id
    } catch (error:any) {
      console.error(error);
      toast.error(error.message as string);
    } finally {
      setIsLoading(false);
      
    }
  }

  return (
    <>
    <SuccessModal isOpen={isOpened} onClose={() => setIsOpened(false)} />
    <Card className="max-w-[900px] relative">
      <CardHeader>
        
        <CardTitle className="text-xl md:text-2xl font-bold">
          Generate a story
        </CardTitle>
        <CardDescription className="text-lg md:text-xl">
          Generate a short children's bedtime story.
        </CardDescription>
      </CardHeader>
      <Button
      variant={"ghost"}
      size={"lg"}
        className="absolute top-4 right-4 md:text-xl"
        onClick={handleRandomPrompt}
      >
        <FaWandMagicSparkles className="mr-2" size={50} />
        Granny's Pick
     
      </Button>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
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
                      className="md:text-lg p-6 max-w-[900px]"
                      disabled={isLoading}
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
                    <Textarea
                      placeholder="Describe your story"
                      {...field}
                      className="md:text-lg p-6 max-w-[900px]"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center max-w-[700px] justify-between">
              <FormField
                control={form.control}
                name="no_of_words"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. of Words</FormLabel>
                    <FormDescription>{`${field.value} words`}</FormDescription>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        min={100}
                        max={1000}
                        step={50}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="md:text-lg p-6 flex-1 min-w-[200px] lg:min-w-[400px]"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_public"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-lg">Publish</FormLabel>
                      <FormDescription>
                        Publish your story to the public
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" size={"lg"} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </>
  );
}
