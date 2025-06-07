import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 500px;
  margin: 5rem auto;
  padding: 2rem;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 1.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const VerifyEmailPrompt: React.FC = () => {
  return (
    <Container>
      <h2>Please Verify Your Email</h2>
      <p>
        We've sent a verification link to your email. Please check your inbox and click the link
        to activate your account.
      </p>
      <p>
        Already verified? <Link to="/signin">Sign in here</Link>
      </p>
    </Container>
  );
};

export default VerifyEmailPrompt;
