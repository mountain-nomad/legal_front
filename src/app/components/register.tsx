"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Пороли не совпадают");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post("https://legalapi-production.up.railway.app/register", {
        email,
        username,
        password,
      });
      if (response.status === 200) {
        setMessage("Успешно зарегистрированы");
        setMessageType("success");
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Redirect to login after 2 seconds
      }
    } catch (err: any) {
      const errorDetail = err.response?.data?.detail;
      if (errorDetail === "Email already registered") {
        setMessage("Пользователь с таким email уже зарегистрирован");
      } else if (errorDetail === "Username already taken") {
        setMessage("Никнейм уже занят");
      } else {
        setMessage("Произошла ошибка");
      }
      setMessageType("error");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000); // The message will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>Введите свои данные ниже, чтобы начать работу</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <h3>Email</h3>
            <Input
              id="email"
              type="email"
              placeholder="my_email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <h3>Имя пользователя</h3>
            <Input
              id="username"
              placeholder="Санжар"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <h3>Пароль</h3>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <h3>Подтвердить пароль</h3>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Уже зарегистрированы?{" "}
            <Link href="/login" className="underline" prefetch={false}>
              Логин
            </Link>
          </div>
        </CardFooter>
      </form>
      {message && (
        <Card
          className={`mt-4 p-4 rounded ${
            messageType === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {message}
        </Card>
      )}
    </Card>
  );
};

export default Register;
