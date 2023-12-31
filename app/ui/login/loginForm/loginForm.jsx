"use client";
import styles from "./loginForm.module.css";
import { authenticate } from "../../../lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const [err, setErr] = useState();
  const router = useRouter();

  const handleLogin = async (formData) => {
    const data = await authenticate(formData);
    console.log(data)
    if (data){
      data.error && setErr(data.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <form action={handleLogin} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {err && err}
    </form>
  );
};

export default LoginForm;
