import { GenerateContentConfig, GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";
import path from "node:path";
import fs from "fs"
import { CloudinaryUpload } from "./uploadCloudinary";
interface IThumb {
      title: string;
      description?: string;
      style: "Bold & Graphic" | "Tech/Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
      aspect_ratio?: "16:9" | "1:1" | "9:16";
      color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
      text_overlay?: boolean;
      prompt_used?: string;
      user_prompt?: string;
      isGenerating?: boolean;
  }

const stylePrompts = {
    'Bold & Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',
    'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',
    'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',
    'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',
    'Illustrated': 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
}

const colorSchemeDescriptions = {
    vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    sunset: 'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',
    forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
    neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
    purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
    monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
    pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',
}

const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

export const aiGenerate = async (thumbnail: IThumb) => {
    const {title, description, style, aspect_ratio, color_scheme} = thumbnail
    const generationConfig : GenerateContentConfig = {
      maxOutputTokens: 32768,
      temperature: 1,
      topP: 0.95,
      responseModalities:["IMAGE"],
      imageConfig:{
        aspectRatio: aspect_ratio || '16:9',
        imageSize: '1K'
      },
      safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF },
    ]
    }

    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for : "${title}" `;
    if(color_scheme) prompt+= `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`
    if(description) prompt += `Additional details: ${description}.`

    prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional and impossible to ignore.`

    // console.log(prompt)
    try {
      const response:any = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: [prompt],
        config: generationConfig
      })

      if(!response?.candidates?.[0]?.content?.parts) throw new Error("Failed to generate the thumbnail")
      
      const parts = response.candidates[0].content.parts

      console.log(parts)

      let finalBuffer : Buffer | null = null;

      for(const part of parts) {
        if(part.inlineData) {
          finalBuffer = Buffer.from(part.inlineData.data, "base64")
        }
      }
      
      const fileName = `your-thumbnail-${Date.now()}.png`
      const filePath = path.join('images', fileName)

      // create a folder in local if does not exist --> write this image file there --> then upload on cloudinary --> unlink that again

      fs.mkdirSync('images', {recursive:true})
      fs.writeFileSync(filePath, finalBuffer!)

      // upload on cloudinary
      const cloudinaryUrl = await CloudinaryUpload(filePath)
      // remove from local machine
      fs.unlinkSync(filePath)

      console.log(cloudinaryUrl)
      if(!cloudinaryUrl || !cloudinaryUrl.url) throw new Error("Cloudinary upload failed")
      
      return cloudinaryUrl
    } catch (error) {
      console.log(error)
      throw new Error("Failed to generate thumbnail")
    }
}