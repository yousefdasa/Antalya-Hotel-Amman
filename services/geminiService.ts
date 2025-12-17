import { GoogleGenAI } from "@google/genai";
import { HOTEL_INFO, INITIAL_ROOMS } from '../constants';

// Initialize Gemini
// Note: In a real production app, ensure API keys are secure. 
// For this demo, we assume process.env.API_KEY is available as per instructions.

const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGeminiResponse = async (userMessage: string, language: string): Promise<string> => {
  if (!ai) {
    return language === 'ar' 
      ? "عذراً، خدمة المساعد الذكي غير متوفرة حالياً (مفتاح API مفقود)."
      : "Sorry, the AI Concierge service is currently unavailable (Missing API Key).";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct system context about the hotel
    const context = `
      You are the polite and helpful AI Concierge for ${HOTEL_INFO.name} in ${HOTEL_INFO.location}.
      
      Hotel Details:
      - Email: ${HOTEL_INFO.email}
      - Phone: ${HOTEL_INFO.phone}
      
      Rooms Available:
      ${INITIAL_ROOMS.map(r => `- ${r.type} ($${r.price}): ${r.descriptionEn}`).join('\n')}
      
      Services: Spa, Gym, Swimming Pool, Restaurant (Breakfast included for Suites), Free Wi-Fi, Parking.
      
      Your goal is to assist guests with booking inquiries, facility information, and general questions about Amman.
      Keep answers concise and elegant.
      
      Current User Language: ${language === 'ar' ? 'Arabic' : 'English'}.
      ALWAYS reply in the Current User Language.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: {
        systemInstruction: context,
      },
    });

    return response.text || (language === 'ar' ? "لم أستطع فهم ذلك." : "I couldn't understand that.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar' 
      ? "حدث خطأ أثناء الاتصال بالخادم."
      : "An error occurred while contacting the server.";
  }
};