import type { Express } from "express";
import { createServer } from "http";
import { sendFormEmail } from "./lib/email";
import { z } from "zod";
import { storage } from "./storage";
import { formOneSchema, formTwoSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.post("/api/form-one", async (req, res) => {
    try {
      console.log('Received form one data:', req.body);
      const data = formOneSchema.parse(req.body);

      // Save to storage first
      const savedData = await storage.createContactForm(data);

      // Try to send email, but don't fail if email fails
      try {
        await sendFormEmail({
          formType: 'form-one',
          subject: "New Form One Submission",
          data: data,
        });
      } catch (emailError) {
        console.error('Email sending failed but form was saved:', emailError);
      }

      res.json({ success: true, data: savedData });
    } catch (error) {
      console.error('Error processing form one:', error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to process form one" 
      });
    }
  });

  app.post("/api/form-two", async (req, res) => {
    try {
      console.log('Received form two data:', req.body);
      const data = formTwoSchema.parse(req.body);

      // Save to storage first
      const savedData = await storage.createContactForm(data);

      // Try to send email, but don't fail if email fails
      try {
        await sendFormEmail({
          formType: 'form-two',
          subject: "New Form Two Submission",
          data: data,
        });
      } catch (emailError) {
        console.error('Email sending failed but form was saved:', emailError);
      }

      res.json({ success: true, data: savedData });
    } catch (error) {
      console.error('Error processing form two:', error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to process form two" 
      });
    }
  });

  return createServer(app);
}