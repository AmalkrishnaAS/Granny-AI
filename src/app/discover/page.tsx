"use client";
import { StoriesContainer } from "@/components/stories-container";
import { EditDrawer } from "@/components/edit-drawer";
import { useState } from "react";
import { EditForm } from "@/components/edit-form";

export default function Home() {
  const [selectedStory, setSelectedStory] = useState(null);
  return  <>
     <EditDrawer isOpen={selectedStory!==null} onClose={() => setSelectedStory(null)}>
    <EditForm story={selectedStory}
    setSelectedStory={setSelectedStory}
    />
      </EditDrawer>
   
  <StoriesContainer 
  selectedStory={selectedStory}
  setSelectedStory={setSelectedStory}
  />;
  </>
}
