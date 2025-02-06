import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from "@huggingface/inference";

const client = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
);

const model = client.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
const hf = new HfInference("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");


export const generateStory = async (
  prompt: string,
  no_of_words: number,
  title: string
) => {
  const storyPrompt = `Write a short children's bedtime story based on this idea: ${prompt} and title ${title}.
    The story should:
    - Be appropriate for children aged 4-8
    - Include a clear moral lesson
    - Have engaging characters
    - use a maximum of ${no_of_words} words  
    - write as if a grandma is reading it
    - use markdown syntax to make it more expressive and fun
    - Have a happy ending
    - Use simple, child-friendly language`;

  const result = await model.generateContent(storyPrompt);
  const response = result.response;
  return response.text();
};

export const generateCoverImage = async (storyPrompt: string) => {
  const prompt = `A cover image with no text for ${storyPrompt}. Make it child friendly, colorful, and engaging. Suitable for children's book cover.`;

  try {
    const response = await hf.textToImage({
      model: 'CompVis/stable-diffusion-v1-4',
      inputs: prompt,
      parameters: {
          negative_prompt: 'blurry, low quality, distorted, scary, dark, violent,full of text',
          num_inference_steps: 20,  // reduced steps for faster generation
          guidance_scale: 7.0
      }
  }); 
  if(!response) {
    console.log('No response from Huggingface');
  }
    return response;
  } catch (error) {
    console.log(error);
  }
};