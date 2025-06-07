import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  max-width: 450px;
  margin: 3rem auto;
  background: linear-gradient(135deg, #fdfdff, #e0e7ff);
  border-radius: 2rem;
  padding: 2rem 2.5rem;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e3a8a;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  border: 1px solid #cbd5e1;
  font-size: 0.95rem;
  outline: none;
  margin: 1rem 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(to right, #6366f1, #3b82f6);
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Back = styled.p`
  font-size: 0.85rem;
  color: #3b82f6;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.p<{ error?: boolean }>`
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
  color: ${(props) => (props.error ? "#dc2626" : "#16a34a")};
`;

interface ForgotPasswordFormProps {
  switchToSignin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ switchToSignin }) => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://lefty123.eu.pythonanywhere.com/password-reset-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsError(false);
        setMessage("✅ Reset instructions sent to your email.");
      } else {
        setIsError(true);
        setMessage(data.message || "❌ Failed to send reset link.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setIsError(true);
      setMessage("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>Forgot Password</Title>
      <form onSubmit={handleReset}>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      {message && <Message error={isError}>{message}</Message>}
      <Back onClick={switchToSignin}>Back to Sign In</Back>
    </Container>
  );
};

export default ForgotPasswordForm;
