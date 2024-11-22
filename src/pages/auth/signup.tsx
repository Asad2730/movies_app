import React, { useState, useCallback } from "react";
import { CustomInput } from "./components/customInput";
import { CustomBtn } from "./components/customBtn";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "./components/customLink";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  
  const handleForm = useCallback(
    (key: string, e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prevForm) => ({ ...prevForm, [key]: e.target.value })),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Name"
            type={"text"}
            placeHolder="Enter your name"
            onChange={(e) => handleForm("name", e)}
            value={form.name}
          />
          <CustomInput
            label="Email"
            type={"email"}
            placeHolder="Enter your email"
            onChange={(e) => handleForm("email", e)}
            value={form.email}
          />
          <CustomInput
            label="Password"
            type={"password"}
            placeHolder="Enter your password"
            onChange={(e) => handleForm("password", e)}
            value={form.password}
          />
          <CustomInput
            label="Confirm Password"
            type={"password"}
            placeHolder="Confirm your password"
            onChange={(e) => handleForm("password_confirmation", e)}
            value={form.password_confirmation}
          />
          <div className="flex items-center justify-between">
            <CustomBtn title="Sign Up" />
          </div>
          <div className="text-center mt-4">
            <CustomLink title="Already have an account?" subtitle="Log In" nav={() => navigate("/")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
