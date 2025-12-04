
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generate a property description based on features
export const generatePropertyDescription = async (
  title: string,
  type: string,
  bhk: number,
  features: string[],
  area: number
): Promise<string> => {
  try {
    const prompt = `Write a compelling, professional real estate description for a ${bhk} BHK ${type} named "${title}". 
    It is ${area} sqft. Key features: ${features.join(', ')}. 
    Keep it under 150 words, engaging, and sales-focused. Use HTML line breaks <br/> if needed for formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "Error generating description. Please try again.";
  }
};

// Use Search Grounding to get neighborhood insights
export const getNeighborhoodInsights = async (address: string, city: string): Promise<{ text: string; sources: { uri: string; title: string }[] }> => {
  try {
    const prompt = `What are the key livability factors for the neighborhood around ${address}, ${city}? 
    Include nearby schools, hospitals, connectivity, and recent market trends. Keep it concise and helpful for a home buyer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No insights available.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web)
      .filter((web: any) => web) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { text: "Unable to fetch neighborhood insights at this moment.", sources: [] };
  }
};

// Generate smart replies for chat
export const generateSmartReply = async (history: string[]): Promise<string[]> => {
  try {
    const prompt = `You are a smart real estate assistant acting on behalf of a potential buyer.
    Here is the recent chat history with a property owner/agent:
    ${history.join('\n')}
    
    Suggest 3 short, polite, and relevant quick replies (max 8 words each) that the buyer could send next.
    Return ONLY the 3 phrases separated by a pipe symbol (|).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || "";
    return text.split('|').map(s => s.trim()).filter(s => s.length > 0).slice(0, 3);
  } catch (error) {
    console.error("Gemini Smart Reply Error:", error);
    return [];
  }
};
