import Chat from "../components/chat";

export default function Component() {
  return (
    <div className="flex min-h-screen bg-background pt-16"> {/* Add top padding */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8 flex flex-col flex-grow">
          <div className="flex flex-col items-center flex-grow space-y-0"> {/* Убраны отступы */}
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">Ask</h1> {/* Уменьшен отступ снизу */}
            <div className="relative w-full flex flex-col flex-grow mt-2"> {/* Уменьшен отступ сверху */}
              <Chat />
              {/* <SearchNon /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}