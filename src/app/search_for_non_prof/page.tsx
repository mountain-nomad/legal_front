import SearchNon from "../components/search_non"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background">
      <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Zanymda Ask</h1>          <div className="relative w-full">
            <SearchNon />
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
