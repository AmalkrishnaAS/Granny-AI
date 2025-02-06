import { Id } from "../../convex/_generated/dataModel";
import {User} from "./user";
export type Story = {
  _id: Id<"stories">;
  prompt: string;
  title: string;
  slug?: string;
  coverImageId?: Id<"_storage">;
  content: string;
  no_of_words: number;
  clerkUserId: string;
  is_published: boolean;
  is_public: boolean;
  imageUrl: string;
  author?: User;
};
