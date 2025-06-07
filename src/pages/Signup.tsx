import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MdPersonAddAlt } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Styled Components
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

const RequirementList = styled.ul`
  list-style: none;
  padding-left: 1rem;
  font-size: 0.85rem;
  color: #1e293b;
  margin-top: -0.5rem;
`;

const Requirement = styled.li<{ $met: boolean }>`
  color: ${({ $met }) => ($met ? "#10b981" : "#ef4444")};
`;

const Button = styled.button<{ disabled?: boolean }>`
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

const Message = styled.p<{ $error: boolean }>`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $error }) => ($error ? "#ef4444" : "#10b981")};
  margin-bottom: 1rem;
`;

// Types
interface SignupFormData {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  profile_picture: File | null;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    profile_picture: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "profile_picture" ? files?.[0] || null : value,
    }));
  };

  const passwordChecks = (password: string) => ({
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
  });

  const isStrongPassword = (password: string) => {
    const checks = passwordChecks(password);
    return Object.values(checks).every(Boolean);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!isStrongPassword(form.password)) {
      setMessage("Password must meet all strength requirements.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    try {
      const { data } = await axios.post(
        "https://lefty123.eu.pythonanywhere.com/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.requires_verification) {
        navigate("/verify-email-prompt");
      } else {
        setMessage(data.message || "Signup successful!");
      }

      setForm({
        username: "",
        email: "",
        password: "",
        phone_number: "",
        profile_picture: null,
      });
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message ||
          "Signup failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const validations = passwordChecks(form.password);
  const isError =
    message.toLowerCase().includes("fail") ||
    message.toLowerCase().includes("password") ||
    message.toLowerCase().includes("error");

  return (
    <Container
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>
        <MdPersonAddAlt size={24} /> Create Account in SocialPulse360
      </Title>

      {message && <Message $error={isError}>{message}</Message>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <PasswordContainer>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </ToggleIcon>
        </PasswordContainer>

        <RequirementList>
          <Requirement $met={validations.length}>✓ At least 8 characters</Requirement>
          <Requirement $met={validations.upper}>✓ Uppercase letter</Requirement>
          <Requirement $met={validations.lower}>✓ Lowercase letter</Requirement>
          <Requirement $met={validations.number}>✓ Number</Requirement>
          <Requirement $met={validations.special}>✓ Special character</Requirement>
        </RequirementList>

        <Input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
          required
        />
        <Input
          type="file"
          name="profile_picture"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <p style={{ textAlign: "center" }}>
          Already have an account? <Link to="/auth">Sign in</Link>
        </p>
      </form>
    </Container>
  );
};

export default Signup;
