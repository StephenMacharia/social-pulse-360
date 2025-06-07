import React, { useState } from "react";
import Signin from "./Signin";
import ForgotPasswordForm from "./ForgotPasswordForm";

type View = "signin" | "forgot";

const AuthPage: React.FC = () => {
  const [view, setView] = useState<View>("signin");

  return (
    <>
      {view === "signin" && <Signin  switchToForgot={() => setView("forgot")} />}
      {view === "forgot" && (
        <ForgotPasswordForm switchToSignin={() => setView("signin")} />
      )}
    </>
  );
};

export default AuthPage;
