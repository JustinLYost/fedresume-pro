export const metadata = {

  title: "About — FedResume Pro",

  description: "Built by a U.S. Air Force veteran navigating the federal application process himself."

};

export default function AboutPage() {

  return (

    <main className="max-w-3xl mx-auto px-6 py-16" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>

      <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#a87b3a" }}>

        About

      </div>

      <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: 40, fontWeight: 700, lineHeight: 1.2, color: "#141414", letterSpacing: "-0.01em" }}>

        Built by a veteran who lived the federal application process.

      </h1>

      <div className="mt-10 space-y-6" style={{ fontSize: 17, lineHeight: 1.8, color: "#3a3530" }}>

        <p>

          FedResume Pro was built by Justin Yost, a U.S. Air Force veteran (Security Forces, honorable discharge) 
   </p>

        <p>

          Like a lot of veterans, the move from a civilian career back into government work turned out to be harder than expected. Not because the qualifications weren't there but because federal resumes are scored differently than every other resume in the world. They're 3-5 pages long. They require Knowledge, Skills, and Ability narratives that read like sworn statements. They get keyword-screened by software before a human ever sees them. And they reject great applicants for missing details that have nothing to do with whether they can do the job.

        </p>

        <p>

          The first time I submitted a federal resume, I was rejected. The second time, also rejected. By the third rejection, I'd spent dozens of hours reading OPM guides, watching YouTube tutorials, and rewriting the same experience six different ways trying to figure out what HR specialists were actually looking for.

        </p>

        <p>

          FedResume Pro is the tool I wish I'd had at the start. It encodes what I've learned the hard way. The formatting conventions, the keyword patterns, the specialized experience qualification language, the KSA narrative structure — and applies it to your resume against a specific posting in 30 seconds.

        </p>

        <p>

          The traditional federal resume services charge $400 to $1,400+ per resume. They do good work, but they price out exactly the people who need them most: transitioning service members, military spouses, and federal job seekers without spare hundreds of dollars to spend on every application. FedResume Pro starts at $14.99 — a price point where someone applying to one $80,000 federal job can't logically refuse, but that still funds a tool good enough to actually help.

        </p>
<p>

          The tool is also built specifically for the new federal resume rules. As of September 27, 2025, USAJOBS rejects any resume longer than two pages. That is half the length of the old federal format but every required field (hours per week, supervisor contact, salary, KSA narratives) still has to fit. Most existing AI tools and federal resume guides still teach the old 4-5 page format, which now gets you auto-rejected. FedResume Pro generates rewrites that fit the current OPM Merit Hiring Plan rules. For Federal Application Bundle customers, it also drafts starting points for the four required Merit Hiring essays that became mandatory for GS-05+ applications in October 2025. Another change that nobody else has tooled for cleanly.

        </p>

        <p>

          This isn't a venture-backed startup. There's no team. It's one veteran solving a problem he lived through, in his off-hours, with the goal that other veterans can move from rejected to interviewed a little faster than he did.

        </p>

        <p style={{ borderLeft: "3px solid #a87b3a", paddingLeft: 20, fontStyle: "italic", color: "#5a5550" }}>

          If you're working on a federal application and FedResume Pro helped, I'd love to hear about it. If something didn't work, I want to hear that even more — that's how the tool gets better.

        </p>
   <p>— Justin Yost<br />Founder, FedResume Pro<br />USAF Veteran</p>

      </div>

      <div className="mt-12 pt-8 border-t" style={{ borderColor: "#e5e0d6" }}>

        <a href="/" style={{ color: "#0f2444", fontWeight: 600 }}>← Back to home</a>

      </div>

    </main>

  );

}
