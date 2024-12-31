export const otpEmailTemplate = (otp) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 40px 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <div style="background-color: #4CAF50; color: #ffffff; text-align: center; padding: 30px 20px;">
        <h1 style="margin: 0; font-size: 32px;">🔐 Verification Code</h1>
      </div>
      <div style="padding: 40px 20px; text-align: center;">
        <p style="font-size: 18px; color: #555; margin: 0 0 20px;">
          Please use the following One-Time Password (OTP) to verify your identity. This code will expire in <strong>5 minutes</strong>.
        </p>
        <div style="font-size: 40px; font-weight: bold; margin: 30px 0; color: #333;">
          ${otp}
        </div>
        <p style="color: #777; margin: 0 0 10px;">
          If you did not request this, you can safely ignore this email.
        </p>
        <p style="color: #888; margin-top: 40px;">
          Thank you,<br>
          <span style="font-weight: bold; color: #4CAF50;">Stranger Chat Team</span>
        </p>
      </div>
    </div>
    <p style="text-align: center; margin-top: 20px; color: #999; font-size: 14px;">
      Need help? <a href="mailto:support@strangerchat.com" style="color: #4CAF50; text-decoration: none;">Contact Support</a>
    </p>
  </div>
  `;
};
  