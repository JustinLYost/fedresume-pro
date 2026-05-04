export const metadata = {

  title: "Privacy Policy — FedResume Pro",

  description: "How FedResume Pro handles your data."

};

export default function PrivacyPage() {

  return (
<main className="max-w-3xl mx-auto px-6 py-16" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>

      <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 36, fontWeight: 700, color: "#141414", letterSpacing: "-0.01em" }}>

        Privacy Policy

      </h1>

      <div className="text-sm mt-2" style={{ color: "#5a5550" }}>

        Last updated: 5/4/2026

      </div>

      <div className="mt-8 p-5 border-l-2" style={{ borderColor: "#a87b3a", background: "#ffffff" }}>

        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3a3530", fontStyle: "italic" }}>

          The short version: We don't store your resume. We don't have user accounts. We don't sell data. We don't have data to sell. We use the bare minimum needed to make the Service work and to process payments.

        </p>

      </div>

      <div className="mt-10 space-y-6" style={{ fontSize: 16, lineHeight: 1.8, color: "#3a3530" }}>
<section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            1. Information We Process

          </h2>

          <p>
<strong>Resume and posting content:</strong> When you click "Analyze," your resume text and the job posting are sent to our server and forwarded to Anthropic's API for AI analysis. The content is processed in memory to generate your results and is then discarded. We do not save copies, log full content, or use it for training any model.

          </p>

          <p className="mt-3">

            <strong>Payment information:</strong> When you make a purchase, payment is processed by Stripe. We never see or store your card number, CVC, or full payment details. Stripe sends us a transaction confirmation containing a payment ID, amount, and email address.

          </p>

          <p className="mt-3">

            <strong>Email address:</strong> Collected at checkout by Stripe and used only to send your receipt and respond to support requests.

          </p>

          <p className="mt-3">

            <strong>Usage data:</strong> Standard server logs (IP address, user-agent, timestamp, page visited) are kept for up to 30 days for security and abuse prevention. We use a privacy-focused analytics tool that does not use cookies or track users across sites.

          </p>

        </section>

        <section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            2. Service Providers

          </h2>

          <p>

            We use the following third-party services, each with their own privacy practices:

          </p>

          <ul className="mt-3 space-y-2 list-disc pl-6">

            <li><strong>Anthropic</strong> — AI processing of resume and posting content. Anthropic processes inputs to generate outputs and does not train models on data sent through their API.</li>

            <li><strong>Stripe</strong> — Payment processing. Receives card and billing data directly from you; we never see it.</li>

            <li><strong>Vercel</strong> — Web hosting and edge delivery.</li>

          </ul>

        </section>

        <section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            3. What We Don't Do

          </h2>

          <ul className="space-y-2 list-disc pl-6">

            <li>We don't sell your data.</li>
<li>We don't share your resume with employers, recruiters, or any third party other than the AI processing service that generates your output.</li>

            <li>We don't use tracking cookies or build advertising profiles.</li>

            <li>We don't email-market to you unless you explicitly opt in.</li>

          </ul>

        </section>
 <section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            4. Cookies and Browser Storage

          </h2>

          <p>

            We use a single secure, httpOnly cookie (named <code>fed_token</code>) to remember that you've completed a paid purchase, so the corresponding tier is unlocked when you return to the page after Stripe checkout. The cookie expires after 7 days. We don't use any third-party advertising or tracking cookies.

          </p>

          <p className="mt-3">

            We also briefly use your browser's session storage to preserve your inputs (job posting and resume text) across the redirect to Stripe and back, so you don't have to re-paste them after paying. Session storage is local to your browser, never sent to our servers, and is cleared automatically when you close the tab.

          </p>

        </section>

        <section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            5. Your Rights

          </h2>

          <p>

            Depending on where you live (including under GDPR in the EU/UK and CCPA in California), you may have the right to access, correct, delete, or port any personal information we hold about you. Because we don't keep resume content and store only minimal payment-related information, in most cases the only data we have on file is the payment receipt from Stripe. To exercise any rights, email <a href="mailto:hello@fedresumepro.com" style={{ color: "#0f2444", textDecoration: "underline" }}>hello@fedresumepro.com</a>.

          </p>

        </section>

        <section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            6. Children's Privacy

          </h2>

          <p>

            FedResume Pro is not directed at children under 16. We do not knowingly collect information from children.

          </p>

        </section>
  <section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            7. Changes

          </h2>

          <p>

            If we change this policy, we'll update the "Last updated" date above. Substantial changes will be communicated to existing customers by email when possible.

          </p>
 </section>

        <section>

          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#141414", marginBottom: 10 }}>

            8. Contact

          </h2>

          <p>

            Questions about your privacy? Email <a href="mailto:hello@fedresumepro.com" style={{ color: "#0f2444", textDecoration: "underline" }}>hello@fedresumepro.com</a>.

          </p>

        </section>

      </div>

      <div className="mt-12 pt-8 border-t" style={{ borderColor: "#e5e0d6" }}>

        <a href="/" style={{ color: "#0f2444", fontWeight: 600 }}>← Back to home</a>
</div>

    </main>

  );

}

