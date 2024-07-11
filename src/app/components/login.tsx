"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://legalapi-production.up.railway.app/login", {
        username,
        password,
      });
      if (response.status === 200) {
        setMessage("Успешный вход");
        setMessageType("success");
        // Here you can handle the successful login, e.g., redirect the user or save the token
      }
    } catch (err) {
      setMessage("Неверное имя пользователя или пароль");
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
        <CardTitle>Вход</CardTitle>
        <CardDescription>Введите ваши данные ниже, чтобы начать</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <h3>Никнейм</h3>
            <Input
              id="username"
              placeholder="jdoe"
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
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Войти
          </Button>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link href="/register" className="underline" prefetch={false}>
              Зарегистрироваться
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

export default Login;
