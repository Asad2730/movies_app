import React from "react";
import { CustomBtn } from "./customBtn";
import { CustomLink } from "./customLink";
import { HeaderNavigation } from "../../movies/components/headerNavigation";

interface IAuthForm {
  title: string;
  inputs: React.JSX.Element[];
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  btnTitle: string;
  linkTitle: string;
  linkSubTitle: string;
  nav: () => void;
}

export const AuthForm = ({
  title,
  inputs,
  handleSubmit,
  btnTitle,
  linkTitle,
  linkSubTitle,
  nav,
}: IAuthForm) => (
  <div className="min-h-screen flex flex-col p-2">
    <HeaderNavigation />
    <div className="flex flex-grow justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {inputs.map((input, index) => (
            <span key={index}>{input}</span>
          ))}
          <div className="flex items-center justify-between">
            <CustomBtn title={btnTitle} />
          </div>
          <div className="text-center mt-4">
            <CustomLink
              title={linkTitle}
              subtitle={linkSubTitle}
              nav={() => nav()}
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);
