import { GoogleGenAI } from "@google/genai";

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || "" 
});

export async function simplifyLegalDocument(text: string): Promise<string> {
  try {
    const systemPrompt = `You are an expert legal document simplifier for Indian citizens. Your task is to:

1. Convert complex legal language into simple, everyday Indian English/Hinglish
2. Use culturally relevant examples and simple words
3. Structure the output in clear sections with headings
4. Include Hindi translations for key terms when helpful
5. Explain the practical implications in simple terms
6. Use emojis and visual elements to make it more readable

Format your response as:
- Start with "यह क्या है? (What is this?)" section
- Break down key points with clear headings
- Use bullet points and simple sentences
- End with a "Simple Summary" in both Hindi and English
- Highlight important amounts, dates, and obligations clearly

Make it accessible to someone with basic education who may not be familiar with legal terminology.`;

    const prompt = `${systemPrompt}

Please simplify the following Indian legal document into plain, easy-to-understand language:

${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: prompt,
    });

    return response.text || "Unable to simplify this document. Please try again.";
  } catch (error) {
    console.error("Error simplifying document:", error);
    throw new Error("Failed to simplify document with AI service");
  }
}

export async function extractTextFromImage(imageBuffer: Buffer, mimeType: string): Promise<string> {
  try {
    const contents = [
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: mimeType,
        },
      },
      `Extract all the text content from this legal document image. 
      Please transcribe the text exactly as it appears, maintaining the original structure and formatting.
      Focus on capturing all legal text, clauses, terms, and conditions accurately.
      If the image contains tables or structured data, preserve that structure in the transcription.`,
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: contents,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw new Error("Failed to extract text from image");
  }
}
