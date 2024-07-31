"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Container from "@/components/ui/container";
import { toast } from "sonner";

export default function VerifyEmail({ email }: { email: string }) {
  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showOtp, timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsButtonDisabled(false);
    }
  }, [timer]);

  const sendEmailHandler = async () => {
    setShowOtp(true);
    setTimer(120);
    setIsButtonDisabled(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Verification code sent successfully");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to send verification code");
      }
    } catch (error) {
      toast.error("An error occurred while sending the code");
    }
  };

  const handleOtpComplete = async (value: string) => {
    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        body: JSON.stringify({ code: value }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Email verified successfully");
        setIsVerified(true);
        setIsButtonDisabled(true);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to verify email");
      }
    } catch (error) {
      toast.error("An error occurred while verifying the code");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container className="flex flex-col items-center space-y-10">
      <h1 className="font-bold">Verify your email here</h1>

      <Button
        onClick={sendEmailHandler}
        disabled={isButtonDisabled || isVerified}
      >
        {isVerified
          ? "Email Verified"
          : showOtp
            ? "Send code again"
            : "Send verification code"}
        {isButtonDisabled && !isVerified && ` (${formatTime(timer)})`}
      </Button>

      {showOtp && !isVerified && (
        <div className="mb-2 flex flex-col items-center">
          <InputOTP maxLength={6} onComplete={handleOtpComplete}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <small className="my-4">
            Enter the verification code sent to <b>{email}</b>
          </small>
        </div>
      )}
    </Container>
  );
}
