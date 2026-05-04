export const metadata = {

  title: "Contact — FedResume Pro",

  description: "Get in touch with FedResume Pro support."

};

export default function ContactPage() {

  return (

    <main className="max-w-2xl mx-auto px-6 py-16" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>

      <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#a87b3a" }}>

        Contact

      </div>

      <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 40, fontWeight: 700, lineHeight: 1.2, color: "#141414", letterSpacing: "-0.01em" }}>

        Real people, real responses.

      </h1>

      <p className="mt-6" style={{ fontSize: 17, lineHeight: 1.8, color: "#3a3530" }}>

        FedResume Pro is built and run by one veteran in Wisconsin. Every email comes directly to me. There's no support team, no ticket system, no chatbot. I read every message and respond personally, usually within 24-48 hours.
 </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">

        <div className="p-6 border rounded-sm" style={{ borderColor: "#e5e0d6", background: "#ffffff" }}>

          <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#0f2444", letterSpacing: "0.12em" }}>

            General Questions

          </div>

          <a href="mailto:hello@fed-resume-pro.com" style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#141414" }}>

            hello@fed-resume-pro.com

          </a>

          <p className="mt-2 text-sm" style={{ color: "#5a5550", lineHeight: 1.7 }}>
Product feedback, partnership inquiries, press, or anything else.

          </p>

        </div>

        <div className="p-6 border rounded-sm" style={{ borderColor: "#e5e0d6", background: "#ffffff" }}>

          <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#0f2444", letterSpacing: "0.12em" }}>

            Refunds & Billing

          </div>

          <a href="mailto:support@fed-resume-pro.com" style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#141414" }}>

            support@fed-resume-pro.com
</a>

          <p className="mt-2 text-sm" style={{ color: "#5a5550", lineHeight: 1.7 }}>

            Refund requests are processed same-day. No questions asked within 30 days.

          </p>

        </div>

      </div>

      <div className="mt-10 p-6 border-l-2" style={{ borderColor: "#a87b3a", background: "#ffffff" }}>

        <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#141414", marginBottom: 8 }}>

          A note for fellow veterans

        </div>

        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3a3530" }}>

          If you're transitioning out and stuck on a federal application, email me. Even if you can't afford the paid tiers, I'll try to help. I've been there.

        </p>

      </div>

      <div className="mt-10 text-sm" style={{ color: "#5a5550", lineHeight: 1.7 }}>

        FedResume Pro<br />

        Operated by Justin Yost<br />

        Madison, WI<br />

        United States

      </div>
<div className="mt-12 pt-8 border-t" style={{ borderColor: "#e5e0d6" }}>

        <a href="/" style={{ color: "#0f2444", fontWeight: 600 }}>← Back to home</a>

      </div>

    </main>

  );

}
