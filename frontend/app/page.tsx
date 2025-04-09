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
          {/*<div className="w-full max-w-4xl mx-auto">
            <CaseTracker />
          </div>
          */}
          <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Application Description</h2>
            <p className="mb-2">
              <strong>USCIS Tracker</strong> is a personal-use automation script developed in Python. It is designed to monitor the status of USCIS immigration cases using the official Case Status API.
            </p>
            <p className="mb-2">
              The application reads a list of USCIS receipt numbers from a private file. On each run, it authenticates via OAuth 2.0 and checks each receipt's current status. Results are compared to previously saved statuses to detect any changes. If a change is found, the application automatically sends an email notification to my personal email address using Mailjet.
            </p>
            <p className="mb-4">
              The application is used exclusively by me to track my own and my immediate family’s cases. It does not collect, store, or share any personal data beyond what is necessary to check case statuses. Configuration is securely managed using environment variables.
            </p>
            <div className="pt-4 border-t mt-4">
              <p className="text-sm text-gray-600">Contact: Rafael Leite — <a href="mailto:rafaelvleite@icloud.com" className="text-blue-600 hover:underline">rafaelvleite@icloud.com</a></p>
            </div>
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
