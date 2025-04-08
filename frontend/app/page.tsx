import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CaseTracker } from "@/components/case-tracker"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">USCIS Case Tracker</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/privacy-policy">
                <Button variant="ghost" className="text-sm">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/terms">
                <Button variant="ghost" className="text-sm">
                  Terms & Conditions
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-center gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              USCIS Case Status Tracker
            </h1>
            <p className="max-w-[700px] text-center text-muted-foreground">
              Track the status of your USCIS cases in one place. Get notified when there are updates.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <CaseTracker />
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Personal USCIS Case Tracker. For personal use only.
          </p>
        </div>
      </footer>
    </div>
  )
}
