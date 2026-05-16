import { Request, Response } from "express";
import { BaseController, HttpStatus } from "../utils/responseHandler";
import { asyncHandler, AppError } from "../utils/errors";
import { createTransporter } from "../utils/mailer";
import nodemailer from "nodemailer";

export class DemoController extends BaseController {
  public requestDemo = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, company, message } = req.body;

    if (!name || !email || !company) {
      throw new AppError("Name, email, and company are required", HttpStatus.BAD_REQUEST);
    }

    try {
      const transporter = await createTransporter();

      // Email to the user (Confirmation)
      const userMailOptions = {
        from: '"Blacksof Team" <noreply@blacksof.com>',
        to: email,
        subject: "Demo Request Received",
        text: `Hi ${name},\n\nThank you for requesting a demo. Our team will get in touch with you shortly regarding ${company}.\n\nBest,\nBlacksof Team`,
        html: `<p>Hi ${name},</p><p>Thank you for requesting a demo. Our team will get in touch with you shortly regarding <strong>${company}</strong>.</p><p>Best,<br>Blacksof Team</p>`,
      };

      // Email to the admin (Notification)
      const adminMailOptions = {
        from: '"System" <noreply@blacksof.com>',
        to: process.env.ADMIN_EMAIL || "admin@blacksof.com", // Send to admin email or dummy for now
        subject: `New Demo Request from ${company}`,
        text: `New demo request received:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message || "N/A"}\n`,
        html: `<h3>New Demo Request</h3><ul><li><strong>Name:</strong> ${name}</li><li><strong>Email:</strong> ${email}</li><li><strong>Company:</strong> ${company}</li><li><strong>Message:</strong> ${message || "N/A"}</li></ul>`,
      };

      const [userInfo, adminInfo] = await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
      ]);

      // If using Ethereal, log the preview URLs
      if (userInfo.messageId && !process.env.SMTP_HOST) {
        console.log("Preview URL (User): %s", nodemailer.getTestMessageUrl(userInfo));
      }
      if (adminInfo.messageId && !process.env.SMTP_HOST) {
        console.log("Preview URL (Admin): %s", nodemailer.getTestMessageUrl(adminInfo));
      }

      return this.sendSuccess(res, null, "Demo request sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw new AppError("Failed to send demo request email", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
}
