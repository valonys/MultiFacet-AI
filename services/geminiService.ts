
import { GoogleGenAI } from "@google/genai";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

// Check if API_KEY is set, otherwise use a placeholder
if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

export const generateTextFromImages = async (prompt: string, images: File[]) => {
  if (!process.env.API_KEY) {
      return "Error: API key is not configured. Please set the API_KEY environment variable.";
  }
  try {
    const imageParts = await Promise.all(images.map(fileToGenerativePart));
    const contents = { parts: [...imageParts, { text: prompt }] };
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return `An error occurred: ${error.message}`;
  }
};

// Mocked functions for features not supported by the client-side Gemini API
export const mockApiCall = <T,>(data: T, delay: number = 1500): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const transcribeAudio = async (audioFile: File): Promise<string> => {
    console.log("Simulating transcription for:", audioFile.name);
    return mockApiCall("This is a simulated transcription. The Gemini API used in this demo does not support direct audio file transcription from the client-side.");
};

export const generateSpeech = async (text: string): Promise<string> => {
    console.log("Simulating speech generation for:", text);
    // In a real app, this would return an audio file URL or blob
    await mockApiCall(null, 2000);
    return "tts_output_placeholder.wav"; 
};

export const cloneVoice = async (text: string, referenceAudio: File): Promise<string> => {
    console.log("Simulating voice cloning for:", text, "using", referenceAudio.name);
    await mockApiCall(null, 3000);
    return "cloned_output_placeholder.wav";
};
