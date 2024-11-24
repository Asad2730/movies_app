import React, { useState, useCallback, useMemo } from "react";
import { CustomInput } from "./components/customInput";
import { CustomBtn } from "./components/customBtn";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "./components/customLink";
import axios from "axios";
import { ip } from "../../util/helper";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../store/authSlice";

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
        const res = await axios.post(`${ip}/auth/login`, form);
        if (res?.status === 200 ) {
          console.log("Login successful:", res.data);
          const token = res?.data?.token;
          if (token) {
            dispatch(setAuthToken(token));
            navigate('/home')
          }
        } else {
          console.log("Login failed:", res?.data);
          window.alert(`Login Failed ${res.data}`);
        }
      } catch (ex) {
        console.error("Error during login:", ex);
        window.alert(`Error during login ${ex}`);
      }
    }

  const formMemo = useMemo(() => form, [form]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Email"
            type="email"
            placeHolder="Enter your email"
            onChange={(e) => handleForm("email", e)}
            value={formMemo.email}
          />
          <CustomInput
            label="Password"
            type="password"
            placeHolder="Enter your password"
            onChange={(e) => handleForm("password", e)}
            value={formMemo.password}
          />
          <CustomBtn title="Log In" />
          <div className="text-center mt-4">
            <CustomLink
              title="Don't have an account?"
              subtitle="Sign Up"
              nav={() => navigate("/signup")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
