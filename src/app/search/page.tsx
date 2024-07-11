import Search from "../components/serch"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background">
      <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Search</h1>          <div className="relative w-full">
            <Search />
          </div>
        </div>
      </div>
    </div>
  )
}

