import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { z } from "zod";
import { simplifyRequestSchema, type SimplifyResponse } from "@shared/schema";
import { simplifyLegalDocument, extractTextFromImage } from "./services/gemini";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG and PNG image files are allowed.'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS for frontend requests
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Kanoon Saral API" });
  });

  // Text-based document simplification
  app.post("/api/simplify", async (req, res) => {
    try {
      const startTime = Date.now();
      
      // Validate request body
      const validatedData = simplifyRequestSchema.parse(req.body);
      
      if (!validatedData.text || validatedData.text.trim().length === 0) {
        return res.status(400).json({ 
          error: "Text content is required",
          message: "Please provide legal document text to simplify" 
        });
      }

      // Call Gemini API to simplify the document
      const simplified = await simplifyLegalDocument(validatedData.text);
      
      const processingTime = Date.now() - startTime;
      
      const response: SimplifyResponse = {
        simplified,
        originalText: validatedData.text,
        processingTime,
      };

      res.json(response);
    } catch (error) {
      console.error("Error in /api/simplify:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: error.errors,
          message: "Please check your input and try again"
        });
      }
      
      res.status(500).json({ 
        error: "Failed to simplify document",
        message: "Our AI service is temporarily unavailable. Please try again later."
      });
    }
  });

  // Image-based document simplification
  app.post("/api/simplify-image", upload.single('document'), async (req: MulterRequest, res) => {
    try {
      const startTime = Date.now();
      
      if (!req.file) {
        return res.status(400).json({ 
          error: "No file uploaded",
          message: "Please upload a document image (JPG or PNG)"
        });
      }

      // Extract text from image using Gemini Vision API
      const extractedText = await extractTextFromImage(req.file.buffer, req.file.mimetype);
      
      if (!extractedText || extractedText.trim().length === 0) {
        return res.status(400).json({ 
          error: "No text found in image",
          message: "Unable to extract readable text from the uploaded image. Please ensure the document is clear and legible."
        });
      }

      // Simplify the extracted text
      const simplified = await simplifyLegalDocument(extractedText);
      
      const processingTime = Date.now() - startTime;
      
      const response: SimplifyResponse = {
        simplified,
        originalText: extractedText,
        processingTime,
      };

      res.json(response);
    } catch (error) {
      console.error("Error in /api/simplify-image:", error);
      
      res.status(500).json({ 
        error: "Failed to process image",
        message: "Unable to process the uploaded image. Please try with a different image or use text input instead."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
