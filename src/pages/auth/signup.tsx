import React, { useState, useCallback } from "react";
import { CustomInput } from "./components/customInput";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api/request";
import { AuthForm } from "./components/authForm";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleForm = useCallback(
    (key: string, e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prevForm) => ({ ...prevForm, [key]: e.target.value })),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form);
      window.alert("Register successful");
      navigate("/login");
    } catch (error) {
      window.alert(`Error during signup: ${error}`);
    }
  };

  

  const inputs = [
    <CustomInput
      key={1}
      label="Name"
      type={"text"}
      placeHolder="Enter your name"
      onChange={(e) => handleForm("name", e)}
      value={form.name}
    />,
    <CustomInput
      key={2}
      label="Email"
      type={"email"}
      placeHolder="Enter your email"
      onChange={(e) => handleForm("email", e)}
      value={form.email}
    />,
    <CustomInput
      key={3}
      label="Password"
      type={"password"}
      placeHolder="Enter your password"
      onChange={(e) => handleForm("password", e)}
      value={form.password}
    />,
  ];

  return (
    <AuthForm
      title="Create Your Account"
      inputs={inputs}
      btnTitle="Sign up"
      handleSubmit={handleSubmit}
      linkTitle="Already have an account?"
      linkSubTitle="Log in"
      nav={() => navigate("/login")}
    />
  );
};

export default SignUp;
