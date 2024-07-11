import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#f1f1f1]">
      <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Zanymda.ai. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

export default Footer;
