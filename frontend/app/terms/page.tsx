export default function Terms() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-sm text-muted-foreground mb-6">Effective Date: March 28th, 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          These Terms and Conditions govern the use of the USCIS Case Status Tracking Application ("the Application"),
          which is developed and used solely by me, Rafael Leite, for personal purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Purpose</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The Application is intended for my personal use to track USCIS case status updates for myself and my
            immediate family.
          </li>
          <li>It is not intended for commercial use, resale, or third-party tracking services.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Use of Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The Application interacts with the USCIS Case Status API to retrieve case status updates.</li>
          <li>
            No personally identifiable information is collected, stored, or used beyond the retrieval of case statuses.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. Limitation of Liability</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The Application relies on the USCIS API for case status updates. I am not responsible for any inaccuracies,
            delays, or errors in the data provided by USCIS.
          </li>
          <li>
            I do not provide legal advice, and the use of this Application does not constitute an official immigration
            tracking system.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. Changes to These Terms</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            As this is a personal-use application, updates may be made to improve functionality, but no substantial
            changes to data handling will occur.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. Contact Information</h2>
        <p>For any inquiries regarding this Application, please contact me at: rafaelvleite@icloud.com</p>
      </section>
    </div>
  )
}
