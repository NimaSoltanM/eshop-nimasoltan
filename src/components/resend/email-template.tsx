import React from "react";

interface EmailTemplateProps {
  firstName: string;
  code: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  code,
}) => (
  <div>
    <h1>Hello dear {firstName}!</h1>
    <p>
      Your verification code is: <strong>{code}</strong>
    </p>
    <p>Please use this code to verify your email address.</p>
    <p>If you did not request this, please ignore this email.</p>
    <h2 className="text-destructive">Do not share this code with anyone</h2>
  </div>
);
