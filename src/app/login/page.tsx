"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "../components/InputField";

const LoginPage: React.FC = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!values.email && !values.password) return;
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (!res || res?.error) {
        throw new Error("Not Authorized");
      }
      if (res?.status) {
        router.push("/campaigns");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center flex-col gap-2 mb-8">
        <h1 className="text-xl font-semibold text-blue-600">
          Log In to Continue
        </h1>
      </div>

      <form onSubmit={onSubmit} className="text-start">
        <InputField
          label="Email"
          onChange={(value) => setValues((prev) => ({ ...prev, email: value }))}
        />

        <InputField
          type="password"
          label="Password"
          onChange={(value) =>
            setValues((prev) => ({ ...prev, password: value }))
          }
        />

        <button className=" bg-blue-500 text-white w-full py-2 rounded-lg mb-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
