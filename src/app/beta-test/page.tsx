import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-r from-[#ffffff] to-[#f1f1f1]">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 bg-clip-text text-transparent sm:text-5xl md:text-6xl">Стать частью Beta теста</h1>
            <p className="text-lg text-gray-700 md:text-xl">
              Присоединяйтесь к нашей эксклюзивной бета-программе и первыми получите доступ к pro-версии
            </p>
            <div className="flex justify-center">
              <form className="w-full max-w-md flex gap-2">
                <Input
                  type="email"
                  placeholder="Введите ваш email"
                  className="flex-1 bg-white text-gray-900 placeholder:text-gray-500"
                />
                <Button type="submit" className="bg-[#ffffff] text-gray-900 hover:bg-[#f1f1f1]">
                  Получить доступ бесплатно
                </Button>
              </form>
            </div>
            <p className="text-lg text-gray-600 md:text-xl">
              Осталось меньше 20 мест
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-gray-900">Ранний доступ</div>
              <h3 className="text-2xl font-bold text-gray-900">Станьте первым</h3>
              <p className="text-gray-700">
              Будучи бета-пользователем, вы получите ранний бесплатный доступ к pro-версии нашего продукта.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-gray-900">Эксклюзивный контент</div>
              <h3 className="text-2xl font-bold text-gray-900">Разблокируйте эксклюзивные функции</h3>
              <p className="text-gray-700">
              Пользователи бета-версии получат доступ к ряду эксклюзивных функций и инструментов, недоступных широкой публике.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-gray-900">Влияние</div>
              <h3 className="text-2xl font-bold text-gray-900">Формируйте продукт</h3>
              <p className="text-gray-700">
              Ваши отзывы и идеи напрямую повлияют на развитие нашего продукта. Будьте частью путешествия.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}