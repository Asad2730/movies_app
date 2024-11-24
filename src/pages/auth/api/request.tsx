import axios from "axios";
import { ip } from "../../../util/helper";

export interface LoginForm {
  email: string;
  password: string;
}

export const loginUser = async (form: LoginForm): Promise<any> => {
  const response = await axios.post(`${ip}/auth/login`, form);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Login failed: ${response.data}`);
  }
};

export interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (form: SignupForm): Promise<any> => {
  const response = await axios.post(`${ip}/auth/signup`, form);
  console.log('response',response)
  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error(`Register failed: ${response.data}`);
  }
};
