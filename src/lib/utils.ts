import { Story } from "@/types/story"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const splitPages = (story: Story) => {
  // Split content into pages
  const pages = story.content.split("\n\n").map((page) => page.trim());
  return pages;
}

  
