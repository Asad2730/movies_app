import React, { useState, useCallback } from "react";
import { CustomInput } from "./components/customInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "../../store/authSlice";
import { loginUser } from "./api/request";
import { AuthForm } from "./components/authForm";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForm = useCallback(
    (key: string, e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prevForm) => ({ ...prevForm, [key]: e.target.value })),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      console.log('user data',res)
      dispatch(setUser(res.user))
      dispatch(setAuthToken(res.token));
      navigate("/");
    } catch (error) {
      window.alert(`Error during login: ${error}`);
    }
  };



  const inputs = [
    <CustomInput
      key={1}
      label="Email"
      type="email"
      placeHolder="Enter your email"
      onChange={(e) => handleForm("email", e)}
      value={form.email}
    />,
    <CustomInput
      key={2}
      label="Password"
      type="password"
      placeHolder="Enter your password"
      onChange={(e) => handleForm("password", e)}
      value={form.password}
    />,
  ];

  return (
    <AuthForm
      title="Welcome back"
      inputs={inputs}
      btnTitle="Log in"
      handleSubmit={handleSubmit}
      linkTitle="Don't have an account?"
      linkSubTitle="sign up"
      nav={() => navigate("/signup")}
    />
  );
};

export default Login;
