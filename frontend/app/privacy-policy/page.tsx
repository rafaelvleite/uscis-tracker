export default function PrivacyPolicy() {
  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-6">Effective Date: March 28th, 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          This Privacy Policy outlines how the personal USCIS Case Status Tracking Application ("the Application")
          handles data. This application is used exclusively by me, Rafael Leite, to track the status of my own and my
          immediate family's immigration applications with USCIS. The Application does not collect, store, or share any
          personal data beyond what is necessary to retrieve case status updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Data Collected</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The Application only retrieves case status updates from the USCIS Case Status API using valid receipt
            numbers entered manually by the user (myself).
          </li>
          <li>
            No personal information (such as names, addresses, Social Security numbers, or financial data) is collected,
            stored, or processed.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Data Usage</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The retrieved case status information is used solely for personal tracking purposes.</li>
          <li>If a status change is detected, an automated email notification is sent to my personal email address.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. Data Sharing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>The Application does not share any data with third parties.</li>
          <li>No case status information is stored beyond what is necessary for checking for changes.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">5. Security</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>API credentials are securely stored using environment variables and are not shared with anyone.</li>
          <li>Email notifications are sent securely through Mailjet.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">6. Contact Information</h2>
        <p>For any privacy-related inquiries, please contact me at: rafaelvleite@icloud.com</p>
      </section>
    </div>
  )
}
