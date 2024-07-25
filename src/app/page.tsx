"use client"; // Ensure this is at the top

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"


export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await fetch('https://legalapi-production.up.railway.app/become_beta_tester', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setMessage('Спасибо за ваш вклад');
        setEmail('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Analytics />
      <main className="flex-1">
      <section className="w-full py-12 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-[#ffffff] to-[#f1f1f1]">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 text-center">
              <div className="flex flex-col items-center space-y-7">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mt-8 md:mt-0">
                  Ask
                </h1>
                <h3 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-5xl text-center">
                  Ответы на любые юридические вопросы
                </h3>
              </div>
                <p className="max-w-[600px] mx-auto text-muted-foreground text-center md:text-xl">
                  Zanymda Ask - это помощник на базе искусственного интеллекта, который помогает гражданам разобраться в законах РК.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-4">
                  <Link
                    href="/search_for_non_prof"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-36 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Zanymda ask
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f1f1f1]">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl grid items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center lg:text-left">
                <div className="flex items-center gap-2 pb-2 justify-center lg:justify-start">
                  <h3 className="text-3xl font-bold">Правовой консультант</h3>
                </div>
                <p className="text-muted-foreground">
                  Выступает в роли вашего личного правового консультанта, доступного круглосуточно. Cистема способна анализировать и интерпретировать законы, предоставляя пользователям простые и понятные объяснения сложных правовых терминов и процедур.
                </p>
              </div>
              <div className="grid gap-1 text-center lg:text-left">
                <div className="flex items-center gap-2 pb-2 justify-center lg:justify-start">
                  <h3 className="text-3xl font-bold">Юридические исследования</h3>
                </div>
                <p className="text-muted-foreground">
                  Упростите свои юридические исследования с помощью расширенных возможностей поиска Zanymda.ai и обширной базы данных прецедентного права, уставов и нормативных актов.
                </p>
              </div>
              <div className="grid gap-1 text-center lg:text-left">
                <div className="flex items-center gap-2 pb-2 justify-center lg:justify-start">
                  <h3 className="text-3xl font-bold">Бета-тестирование</h3>
                </div>
                <p className="text-muted-foreground">
                  Для тех, кто хочет быть в числе первых пользователей и внести свой вклад в развитие платформы, предоставляется возможность стать бета-тестером. Это не только уникальный шанс получить ранний доступ к новейшим технологиям, но и возможность напрямую влиять на улучшение и доработку сервиса.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-br bg-gradient-to-r from-[#ffffff] to-[#f1f1f1]">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 text-center">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#BFDBFE] bg-clip-text text-transparent">
                      Search
                    </h1>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Ищем прецеденты
                    </h1>
                  </div>
                  <p className="max-w-[600px] mx-auto text-muted-foreground text-center md:text-xl">
                    Zanymda Search - это поисковик на базе искусственного интеллекта, который помогает юристам экономить время на поиске похожих по смыслу дел в бюллетенях верховного суда, повышать точность и концентрироваться на важных задачах.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-4">
                  <Button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    disabled
                  >
                    Zanymda search <span className="ml-2 text-xs text-gray-500">beta</span>
                  </Button>
                  <Link
                    href="/beta-test"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Стать бета-тестером
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f1f1f1]">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Анализ Документов</h3>
                </div>
                <p className="text-muted-foreground">
                Zanymda.ai может быстро анализировать юридические документы, выявлять ключевую информацию и делать выводы, чтобы помочь принимать обоснованные решения.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Юридические исследования</h3>
                </div>
                <p className="text-muted-foreground">
                Упростите свои юридические исследования с помощью расширенных возможностей поиска Zanymda.ai и обширной базы данных прецедентного права, уставов и нормативных актов.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">Автоматизация Задач</h3>
                </div>
                <p className="text-muted-foreground">
                Автоматизируйте повторяющиеся юридические задачи, такие как анализ договоров, составление документов и общение с клиентами, чтобы освободить ваше время для более важной работы.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Раскройте весь свой потенциал с помощью Zanymda.ai
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Zanymda.ai призвана помочь юристам работать умнее, а не тяжелее. Автоматизируя рутинные задачи и предоставляя интеллектуальные знания, наш помощник с искусственным интеллектом позволяет вам сосредоточиться на работе, которая действительно имеет большое значение.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Сэкономьте время</h3>
                    <p className="text-muted-foreground">
                    Оптимизируйте рабочий процесс и устраните трудоемкие задачи, что позволит вам быть более эффективными и продуктивными.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Повышение точности</h3>
                    <p className="text-muted-foreground">
                    Передовая аналитика и возможности машинного обучения Zanymda.ai помогут вам выявить потенциальные риски и обеспечить высочайший уровень точности в работе.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold">Сосредоточьтесь на главном</h3>
                    <p className="text-muted-foreground">
                    Автоматизируя рутинные задачи, Zanymda.ai высвобождает ваше время и умственную энергию, позволяя вам сосредоточиться на самых сложных и важных юридических вопросах.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-[#ffffff] to-[#f1f1f1]">
          <div className="container px-4 md:px-6">
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Исследуйте возможности Zanymda.ai
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Запишитесь на бесплатную консультацию и станьте чатью бэта теста Zanymda.ai
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
                  <Input
                    type="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={!email}>Попробовать бесплатно</Button>
                </form>
              </div>
              {message && (
                <div className="mt-4 p-4 bg-blue-100 text-blue-600 rounded">
                {message}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function FocusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  )
}


function LightbulbIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}


function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function TimerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  )
}