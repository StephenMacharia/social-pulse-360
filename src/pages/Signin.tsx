import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MdLogin } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";

const Container = styled(motion.div)`
  max-width: 450px;
  margin: 3rem auto;
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
  border-radius: 2rem;
  padding: 2rem 2.5rem;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #3b82f6;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #64748b;
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: ${({ disabled }) =>
    disabled ? "#94a3b8" : "linear-gradient(to right, #3b82f6, #6366f1)"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s ease;
`;

const Message = styled.p<{ error: boolean }>`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ error }) => (error ? "#ef4444" : "#10b981")};
  margin-bottom: 1rem;
`;

const LinkText = styled.p`
  font-size: 0.85rem;
  color: #3b82f6;
  text-align: right;
  cursor: pointer;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

interface SigninProps {
  switchToForgot: () => void;
}

interface FormState {
  email_or_username: string;
  password: string;
}

const Signin: React.FC<SigninProps> = ({ switchToForgot }) => {
  const [form, setForm] = useState<FormState>({
    email_or_username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const formData = new FormData();
    formData.append("email_or_username", form.email_or_username);
    formData.append("password", form.password);

    try {
      const { data } = await axios.post(
        "https://lefty123.eu.pythonanywhere.com/signin",
        formData
      );
      localStorage.setItem("token", data.access_token);
      setMessage("Login successful!");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "Signin failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isError =
    message.toLowerCase().includes("invalid") ||
    message.toLowerCase().includes("fail") ||
    message.toLowerCase().includes("verify");

  return (
    <Container
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>
        <MdLogin size={24} /> Sign In to SocialPulse360
      </Title>

      {message && <Message error={isError}>{message}</Message>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <Input
          type="text"
          name="email_or_username"
          placeholder="Email or Username"
          value={form.email_or_username}
          onChange={handleChange}
          required
          autoComplete="username"
        />

        <PasswordContainer>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <ToggleIcon onClick={() => setShowPassword((v) => !v)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </ToggleIcon>
        </PasswordContainer>

        <LinkText onClick={switchToForgot}>Forgot Password?</LinkText>

        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Container>
  );
};

export default Signin;
