import { useState, useRef, useEffect } from "react";
import * as mammoth from "mammoth";
import {
  FileText, Lock, Check, X, AlertCircle, Loader2, ShieldCheck,
  ArrowRight, Award, TrendingUp, Sparkles, ChevronRight, RefreshCw,
  AlertTriangle, Target, Briefcase, Edit3,
  Download, Copy, FileUp, Plus, Minus, Mail, FileSearch, Zap, RotateCcw
} from "lucide-react";
<meta name="msvalidate.01" content="4B611420A56BF7191E78338F90AEC56D" />
// ---------- Sample data (so the demo always works without API) ----------

const SAMPLE_POSTING = `Job Title: Logistics Management Specialist
Series/Grade: GS-0346-11/12
Department: Department of Veterans Affairs
Salary: $77,738 - $121,128 per year
Location: Madison, WI

Duties:
- Plans, coordinates, and oversees logistics operations supporting medical center supply chain
- Develops and implements policies and procedures for inventory management, distribution, and warehouse operations
- Analyzes logistics data to identify inefficiencies and recommend process improvements
- Coordinates transportation of medical supplies, equipment, and hazardous materials in compliance with DOT regulations
- Manages relationships with vendors, contractors, and government stakeholders
- Prepares reports on logistics performance metrics, cost savings, and operational efficiency
- Supervises a team of logistics technicians and provides training on standard operating procedures

Specialized Experience: At GS-12, applicants must have one year of specialized experience equivalent to GS-11 in the Federal service.

Required KSAs:
1. Knowledge of supply chain management principles, including inventory control, procurement, and distribution
2. Skill in analyzing logistics data and developing process improvements
3. Ability to interpret and apply federal regulations including DOT, OSHA, and HAZMAT requirements
4. Skill in supervising staff and coordinating team operations
5. Ability to communicate effectively with vendors, stakeholders, and senior leadership`;

const SAMPLE_RESUME = `JANE DOE
City, State | (555) 555-5555 | email@example.com
US Citizen | Veteran (Honorable)

PROFESSIONAL SUMMARY
Transportation Manager with 12+ years of progressive experience in logistics, supply chain, and hazmat operations. Air Force veteran with proven success leading teams, reducing costs, and ensuring regulatory compliance.

EXPERIENCE

Transportation Manager | Acme Logistics | 2020-Present
- Manage daily logistics for a fleet of 30+ trucks moving hazardous and non-hazardous materials
- Reduced fuel costs by 18% through route optimization and driver training programs
- Lead a team of 25+ drivers and dispatchers
- Ensure 100% DOT compliance through regular audits and training

Operations Supervisor | Industrial Supply Co | 2017-2020
- Oversaw warehouse and distribution operations
- Implemented new inventory tracking system, reducing stockouts by 32%

Security Forces Specialist | United States Air Force | 2002-2006
- Provided security for personnel and resources at Air Force installations
- Honorable discharge

CERTIFICATIONS
CompTIA A+, Security+, Network+ | DOT Hazmat Certification`;

const SAMPLE_ANALYSIS = {
  matchScore: 72,
  gsLevel: "GS-0346-11 (qualified) / GS-12 (borderline)",
  missingKeywords: [
    { keyword: "process improvement methodology", importance: "high", context: "Posting emphasizes analyzing data to recommend improvements; naming a framework (Lean, Six Sigma) strengthens fit." },
    { keyword: "vendor contract management", importance: "high", context: "Role requires managing vendor and contractor relationships — make this explicit." },
    { keyword: "performance metrics reporting", importance: "high", context: "Duties specifically call out preparing reports for leadership." },
    { keyword: "policies and procedures development", importance: "medium", context: "Role requires developing SOPs, not just following them." },
    { keyword: "OSHA compliance", importance: "medium", context: "Listed in KSA #3 alongside DOT/HAZMAT but absent from your resume." },
    { keyword: "supply chain analytics", importance: "medium", context: "Strengthens KSAs #1 and #2; reframe inventory work in analytical terms." },
    { keyword: "stakeholder coordination", importance: "medium", context: "KSA #5 explicitly uses this language." },
    { keyword: "federal procurement regulations", importance: "low", context: "Bonus signal; mention if any government contract experience exists." }
  ],
  presentKeywords: ["DOT compliance", "hazardous materials", "logistics", "supply chain", "inventory tracking", "team supervision", "fleet management", "training programs"],
  specializedExperienceMatch: "Your 5+ years as Transportation Manager likely meets the GS-11 specialized experience threshold. For GS-12, you'll want to more explicitly demonstrate progressive responsibility, policy development, and analytical work — your current bullets emphasize execution over strategy. The earlier Operations Supervisor role adds depth but should be reframed using federal language.",
  rewrittenBullets: [
    {
      original: "Reduced fuel costs by 18% through route optimization and driver training programs",
      rewritten: "Analyzed transportation data across a 30+ vehicle fleet to identify operational inefficiencies; designed and implemented route optimization protocols and driver training initiatives that reduced fuel expenditures by 18% (~$340K annually), improving logistics performance metrics reported quarterly to senior leadership."
    },
    {
      original: "Manage daily logistics for a fleet of 30+ trucks moving hazardous and non-hazardous materials",
      rewritten: "Plan, coordinate, and oversee daily logistics operations for a 30+ vehicle fleet transporting hazardous and non-hazardous materials across a multi-state region; ensure full compliance with DOT, OSHA, and HAZMAT regulations through structured policy implementation, audit cycles, and stakeholder coordination with vendors and regulatory bodies."
    },
    {
      original: "Implemented new inventory tracking system, reducing stockouts by 32%",
      rewritten: "Developed and implemented standardized inventory management procedures and a digital tracking system supporting industrial supply chain operations; applied supply chain analytics to forecast demand patterns, reducing stockouts by 32% and improving distribution reliability across multiple warehouse locations."
    }
  ],
  ksaStatements: [
    {
      competency: "Knowledge of supply chain management principles",
      statement: "Over 12 years across hazmat transportation, industrial supply, and Air Force security operations, I have applied supply chain principles end-to-end. In my current role, I oversee inbound and outbound material flow for a 30+ vehicle fleet, balancing inventory positioning, vendor procurement schedules, and last-mile distribution. Previously I implemented an inventory tracking system that reduced stockouts by 32% by aligning replenishment cycles with demand forecasting."
    },
    {
      competency: "Ability to interpret and apply federal regulations including DOT, OSHA, and HAZMAT requirements",
      statement: "My current role requires daily interpretation and application of 49 CFR Subchapter C (Hazardous Materials Regulations) and DOT Federal Motor Carrier Safety Regulations. I conduct quarterly compliance audits, deliver HAZMAT and OSHA training to drivers and dispatchers, and maintain documentation that has resulted in 100% compliance across all reviews during my tenure."
    },
    {
      competency: "Skill in supervising staff and coordinating team operations",
      statement: "I directly supervise a team of 25+ drivers and dispatchers, with responsibilities including scheduling, performance review, training, and conflict resolution. Previously I supervised warehouse staff and implemented standardized procedures that improved operational consistency. My USAF Security Forces experience provided foundational leadership and team coordination skills under operational conditions."
    }
  ],
  criticalGaps: [
    "No explicit mention of federal procurement experience — consider adding any contract or vendor work that touched federal regulations",
    "Resume does not quantify supervisory scope clearly enough — add team size, budget responsibility, and reporting relationships",
    "Education section is incomplete; finishing the bachelor's strengthens GS-12 consideration"
  ],
  formattingChecklist: [
    { item: "Hours per week listed for each position", status: "fail", fix: "Add 'Hours per week: 40' under each role — required for federal resumes" },
    { item: "Supervisor name and contact for each role", status: "fail", fix: "Add 'Supervisor: [Name], [Phone], May Contact: Yes/No' for each position" },
    { item: "Salary listed for each role", status: "fail", fix: "Federal resumes typically include salary or grade; add this for each role" },
    { item: "Veterans' Preference clearly stated", status: "warn", fix: "Add specific preference (5-point, 10-point) and reference supporting documentation" },
    { item: "Detailed duties for each role", status: "pass", fix: null },
    { item: "Resume length appropriate for federal (3-5 pages)", status: "warn", fix: "Current draft appears too short — federal resumes should be 3-5 pages with detailed duty descriptions" }
  ]
};

const SAMPLE_REWRITTEN_RESUME = `JANE DOE
City, State 53XXX | (555) 555-5555 | email@example.com
US Citizen | Veterans' Preference: 5-Point (DD-214 on file)

═══════════════════════════════════════════════════════════════
PROFESSIONAL SUMMARY
═══════════════════════════════════════════════════════════════

Logistics and supply chain professional with 12+ years of progressive experience leading transportation operations, hazardous materials compliance, and warehouse distribution. United States Air Force veteran with documented success developing and implementing policies and procedures, conducting supply chain analytics, coordinating multi-stakeholder operations, and supervising teams of 25+ personnel. Demonstrated working knowledge of DOT, OSHA, and HAZMAT regulatory frameworks; proven record of process improvement methodology delivering quantified cost reductions and operational gains.

═══════════════════════════════════════════════════════════════
PROFESSIONAL EXPERIENCE
═══════════════════════════════════════════════════════════════

TRANSPORTATION MANAGER
Acme Logistics, City, State
01/2020 – Present
Hours per week: 40+
Salary: $XX,XXX/year (or grade equivalent)
Supervisor: [Name], [Phone] — May Contact: Yes

Plan, coordinate, and oversee daily logistics operations for a 30+ vehicle fleet transporting hazardous and non-hazardous materials across a multi-state region. Develop and implement policies and procedures governing inventory management, route planning, vendor contract management, and DOT/OSHA/HAZMAT compliance. Analyze transportation and supply chain data to identify operational inefficiencies and recommend process improvements; prepare quarterly performance metrics reporting for senior leadership covering cost-per-mile, fuel utilization, on-time delivery, and regulatory compliance status. Manage relationships with vendors, contractors, and regulatory stakeholders; serve as primary point of contact for compliance audits and corrective action plans. Supervise a team of 25+ drivers and dispatchers, providing direct training on standard operating procedures and federal regulatory requirements.

Key Accomplishments:
• Analyzed transportation data across a 30+ vehicle fleet to identify operational inefficiencies; designed and implemented route optimization protocols and driver training initiatives that reduced fuel expenditures by 18% (approximately $340K annually).
• Achieved and maintained 100% DOT compliance across all quarterly audits during tenure through structured policy implementation, training cycles, and documentation review.
• Developed standardized SOPs for hazardous materials handling adopted across the fleet, reducing reportable incidents to zero over an 18-month period.
• Coordinated with vendors, regulatory inspectors, and senior leadership to deliver quarterly performance metrics reporting that informed budgetary and operational decisions.

OPERATIONS SUPERVISOR
Industrial Supply Co, City, State
06/2017 – 12/2019
Hours per week: 40
Salary: $XX,XXX/year
Supervisor: [Name], [Phone] — May Contact: Yes

Oversaw warehouse and distribution operations supporting industrial supply chain across multiple regional facilities. Developed and implemented inventory management procedures, distribution workflows, and stakeholder coordination protocols. Applied supply chain analytics to forecast demand and align replenishment cycles. Supervised warehouse staff with responsibility for scheduling, performance review, and training on standard operating procedures.

Key Accomplishments:
• Developed and implemented a standardized inventory management system supporting industrial supply chain operations; reduced stockouts by 32% through demand forecasting and replenishment optimization.
• Established new SOPs for vendor coordination and procurement workflows that improved on-time vendor delivery rates by 24%.
• Trained warehouse personnel on revised distribution procedures, improving order accuracy from 94% to 99.2% within six months.

SECURITY FORCES SPECIALIST
United States Air Force
07/2002 – 07/2020
Hours per week: 40+
Rank: [Rank at separation]
Supervisor: [Name], [Phone] — May Contact: Yes
Discharge: Honorable

Provided physical security for personnel, equipment, classified materials, and Air Force installations. Conducted security patrols, access control, and threat assessments under structured federal regulatory and military command frameworks. Coordinated team operations with law enforcement and command staff. Completed Security Forces training including weapons qualification, defensive tactics, and emergency response protocols.

═══════════════════════════════════════════════════════════════
KNOWLEDGE, SKILLS, AND ABILITIES (KSAs)
═══════════════════════════════════════════════════════════════

KSA 1 — Knowledge of supply chain management principles, including inventory control, procurement, and distribution:
Over 12 years across hazmat transportation, industrial supply, and Air Force security operations, I have applied supply chain principles end-to-end. In my current role I oversee inbound and outbound material flow for a 30+ vehicle fleet, balancing inventory positioning, vendor procurement schedules, and last-mile distribution. Previously I implemented an inventory tracking system that reduced stockouts by 32% by aligning replenishment cycles with demand forecasting models.

KSA 2 — Skill in analyzing logistics data and developing process improvements:
I routinely analyze fleet performance metrics including cost-per-mile, fuel utilization, route efficiency, and compliance indicators to identify improvement opportunities. My route optimization analysis at Acme Logistics produced an 18% fuel cost reduction (~$340K annually). I have also applied process improvement methodology to warehouse operations, increasing order accuracy from 94% to 99.2% within six months.

KSA 3 — Ability to interpret and apply federal regulations including DOT, OSHA, and HAZMAT requirements:
My current role requires daily interpretation and application of 49 CFR Subchapter C (Hazardous Materials Regulations) and DOT Federal Motor Carrier Safety Regulations, alongside OSHA workplace safety requirements. I conduct quarterly compliance audits, deliver HAZMAT and OSHA training, and maintain documentation that has produced 100% compliance across all reviews during my tenure.

KSA 4 — Skill in supervising staff and coordinating team operations:
I directly supervise a team of 25+ drivers and dispatchers with full responsibility for scheduling, performance review, training, and conflict resolution. I previously supervised warehouse staff and implemented standardized procedures that improved operational consistency.

KSA 5 — Ability to communicate effectively with vendors, stakeholders, and senior leadership:
I serve as primary point of contact for vendor relationships, regulatory inspectors, and internal leadership. I prepare and present quarterly performance metrics reporting to senior leadership and produce written documentation supporting audit defense, training records, and policy revisions.

═══════════════════════════════════════════════════════════════
EDUCATION
═══════════════════════════════════════════════════════════════

Bachelor of Science (in progress) — Strategic Leadership
[Institution Name], Expected Graduation: [Year]

Community College of the Air Force — Credits earned in [Discipline]

═══════════════════════════════════════════════════════════════
CERTIFICATIONS
═══════════════════════════════════════════════════════════════

CompTIA A+ Certification
CompTIA Security+ Certification
CompTIA Network+ Certification
DOT Hazardous Materials (HAZMAT) Certification

═══════════════════════════════════════════════════════════════
ADDITIONAL INFORMATION
═══════════════════════════════════════════════════════════════

Veterans' Preference: 5-Point (DD-214 available upon request)
Security Clearance: Eligible (prior military service)
References: Available upon request`;

// ---------- FAQ data ----------

const FAQ_DATA = [
  {
    q: "Who built this and why should I trust it?",
    a: "FedResume Pro was built by a U.S. Air Force veteran (Security Forces). The tool was built out of frustration with how opaque and unforgiving the federal resume process is, especially for transitioning service members. It's not a venture-backed AI startup; it's a working professional solving a problem he lived through."
  },
  {
    q: "How is this different from just using ChatGPT for free?",
    a: "ChatGPT will write you a generic resume that may still uses the old 4-5 page federal format. FedResume Pro is purpose-built around the current OPM Merit Hiring Plan rules: strict 2-page maximum (effective September 2025), required fields (hours per week, supervisor contact, salary), Specialized Experience qualification language, and the keyword patterns federal HR specialists actually score against. The AI is tuned by someone who reads USAJOBS postings every week, not a generic 'rewrite this' prompt. The time savings alone is worth the investment."
  },
  {
    q: "Does this follow the new 2-page OPM rules?",
    a: "Yes. As of September 27, 2025, USAJOBS rejects resumes longer than 2 pages, period. Most existing AI tools and resume guides still teach the old 4-5 page format and will get you auto-screened out. FedResume Pro's rewrites are built specifically for the current 2-page Merit Hiring Plan standard while keeping every required field intact."
  },
  {
    q: "What about the new Merit Hiring essay questions?",
    a: "Starting October 2025, federal applications at GS-05 and above require four 200-word essays. This will include questions about your commitment to the Constitution and how you'd improve government efficiency. The Federal Application Bundle ($79) generates AI-drafted starting points for all four essays alongside your resume rewrite, so you have a solid foundation to personalize. (Per OPM rules, the essays must be in your own words — we provide structure, you provide authenticity.)"
  },
  {
    q: "Will this guarantee I get the job?",
    a: "No tool can guarantee a federal hire. There are too many factors are outside any applicant's control (veterans' preference, certificate of eligibles, internal candidates). What FedResume Pro does is make sure your resume gets past the keyword screen and accurately represents you against the Specialized Experience requirement, so a human reviewer actually sees it. That's where most applicants get rejected."
  },
  {
    q: "Is my resume data secure? What do you do with it?",
    a: "Your resume and the job posting are sent to the AI for analysis and immediately discarded. They're not stored, logged, or used for training. We don't have user accounts. We don't sell data. We don't have data to sell. Payment is handled entirely by Stripe; we never see or store your card."
  },
  {
    q: "What if the rewrite isn't good enough? Can I get a refund?",
    a: "Yes. If you're not satisfied within 30 days of purchase, email us and we'll refund you, no questions asked. We'd rather have a happy non-customer than an angry one. Refunding is faster and cheaper than arguing."
  },
  {
    q: "Can I get the rewrite as a Word (.docx) document?",
    a: "Currently the rewrite downloads as plain text (.txt). Paste it into Word or Google Docs to format and save as .docx. It takes about 30 seconds. A native .docx export with proper federal formatting is on the roadmap."
  },
  {
    q: "Why are you so much cheaper than traditional federal resume services?",
    a: "Traditional federal resume writers charge $400-$1,400 because a human is reading your posting, researching your background, and writing for 4-8 hours. Their cost is mostly time. We replaced the 4-8 hours with 90 seconds of AI work tuned by someone with federal hiring knowledge. Same end result, fraction of the price. We're not 95% cheaper because we're 95% worse — we're 95% cheaper because the labor structure is fundamentally different."
  },
  {
    q: "Does this work for non-veterans applying to federal jobs?",
    a: "Absolutely. The tool is designed around federal hiring conventions, not specifically around veteran applicants. Civilians applying to GS-series, Schedule A, and other federal positions will get the same quality of analysis. The veteran framing reflects who built it, not who can use it."
  },
  {
    q: "What if my PDF resume doesn't upload correctly?",
    a: "Image-based or scanned PDFs (created from a photo or a scanner rather than exported from Word) can't be parsed. If the upload comes back blank or garbled, just paste your resume text directly into the field. That always works."
  },
  {
    q: "Can I use one purchase for multiple job postings?",
    a: "Each purchase covers one analysis (and rewrite, if you bought that tier) for one specific posting. If you're applying to multiple federal positions, each one needs its own tailored rewrite to be effective. Generic federal resumes get rejected just like generic civilian ones. We're working on a subscription tier for high-volume applicants."
  },
  {
    q: "How long does the analysis take?",
    a: "Analysis runs in 30-60 seconds. The full rewrite takes another 60-90 seconds. Total time from paste to finished resume is under three minutes. Much faster than the 5-7 day turnaround of traditional services."
  }
];

// ---------- Styling tokens ----------

const COLORS = {
  bg: "#fbfaf6",
  surface: "#ffffff",
  ink: "#141414",
  muted: "#5a5550",
  rule: "#e5e0d6",
  navy: "#0f2444",
  navyDeep: "#091830",
  gold: "#a87b3a",
  goldSoft: "#f1e6cf",
  green: "#1d6f3f",
  amber: "#b87a1a",
  red: "#9c2a2a",
};

const FONTS = {
  display: "'Merriweather', Georgia, serif",
  body: "'Public Sans', system-ui, -apple-system, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
};

// ---------- Helpers ----------

function importanceStyle(level) {
  if (level === "high") return { bg: "#fbe9e7", fg: "#9c2a2a", label: "High priority" };
  if (level === "medium") return { bg: "#fdf3dd", fg: "#8a5a13", label: "Medium" };
  return { bg: "#eef2f7", fg: "#3b4a63", label: "Nice to have" };
}

function statusIcon(status) {
  if (status === "pass") return <Check size={16} style={{ color: COLORS.green }} />;
  if (status === "warn") return <AlertTriangle size={16} style={{ color: COLORS.amber }} />;
  return <X size={16} style={{ color: COLORS.red }} />;
}

async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(window.pdfjsLib);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function extractTextFromFile(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt")) {
    return await file.text();
  }
  if (name.endsWith(".docx")) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }
  if (name.endsWith(".pdf")) {
    const pdfjs = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n\n";
    }
    return text;
  }
  throw new Error("Unsupported file type. Please upload .pdf, .docx, or .txt.");
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- Sub-components ----------

function Header({ tier, onUpgrade }) {
  return (
    <header className="border-b" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: COLORS.navy }}>
            <ShieldCheck size={20} color={COLORS.goldSoft} />
          </div>
          <div>
            <div className="font-semibold tracking-tight" style={{ fontFamily: FONTS.display, color: COLORS.ink, fontSize: 18, lineHeight: 1 }}>
              FedResume<span style={{ color: COLORS.gold }}>·</span>Pro
            </div>
            <div className="text-xs uppercase tracking-widest mt-1" style={{ color: COLORS.muted, letterSpacing: "0.12em" }}>
              GS-Level Resume Optimization
            </div>
          </div>
        </div>
        {tier === "free" && (
          <button
            onClick={onUpgrade}
            className="text-sm font-medium px-4 py-2 rounded-sm transition hover:opacity-90"
            style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}
          >
            Get Premium
          </button>
        )}
        {tier === "analysis" && (
          <div className="text-sm font-medium px-3 py-1.5 rounded-sm flex items-center gap-2" style={{ background: COLORS.goldSoft, color: COLORS.navyDeep }}>
            <Check size={14} /> Analysis Unlocked
          </div>
        )}
        {tier === "rewrite" && (
          <div className="text-sm font-medium px-3 py-1.5 rounded-sm flex items-center gap-2" style={{ background: COLORS.goldSoft, color: COLORS.navyDeep }}>
            <Check size={14} /> Rewrite Unlocked
          </div>
        )}
        {tier === "bundle" && (
          <div className="text-sm font-medium px-3 py-1.5 rounded-sm flex items-center gap-2" style={{ background: COLORS.goldSoft, color: COLORS.navyDeep }}>
            <Check size={14} /> Bundle Unlocked
          </div>
        )}
      </div>
    </header>
  );
}

function FileUploader({ onParsed, onError, fileName }) {
  const inputRef = useRef(null);
  const [parsing, setParsing] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setParsing(true);
    try {
      const text = await extractTextFromFile(file);
      onParsed(text, file.name);
    } catch (err) {
      onError(err.message || "Could not read that file. Try .txt or .docx.");
    } finally {
      setParsing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" onChange={handleFile} className="hidden" />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={parsing}
        className="text-xs flex items-center gap-1.5 px-2 py-1 border rounded-sm transition hover:bg-white disabled:opacity-50"
        style={{ borderColor: COLORS.rule, color: COLORS.navy, fontFamily: FONTS.body }}
      >
        {parsing ? (<><Loader2 size={12} className="animate-spin" /> Reading...</>) : (<><FileUp size={12} /> Upload file</>)}
      </button>
      {fileName && (
        <span className="text-xs italic" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
          ✓ {fileName}
        </span>
      )}
    </div>
  );
}

function InputView({ jobPosting, setJobPosting, resume, setResume, resumeFileName, setResumeFileName, onAnalyze, onLoadSample, error, loading, onFileError }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: COLORS.gold, fontFamily: FONTS.body }}>
          For Veterans · Federal Job Seekers · GS-Series Applicants
        </div>
        <h1 style={{ fontFamily: FONTS.display, color: COLORS.ink, fontSize: 44, lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.01em" }}>
          Built for the new<br />
          <span style={{ color: COLORS.navy }}>2-page federal resume rules.</span>
        </h1>
        <p className="mt-5 text-base leading-relaxed max-w-2xl" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
          As of September 2025, USAJOBS rejects resumes longer than 2 pages but every required field
          (hours per week, supervisor contact, salary, KSAs) still has to fit. Most AI tools and old
          guides still teach the 4-5 page format. FedResume Pro is built for the current OPM Merit
          Hiring Plan rules: 2-page strict, all required fields, and tailored to your specific posting.
        </p>

        <div className="mt-6 flex items-center gap-6 text-sm flex-wrap" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
          <div className="flex items-center gap-2"><Award size={16} style={{ color: COLORS.gold }} /> Built by a veteran</div>
          <div className="flex items-center gap-2"><ShieldCheck size={16} style={{ color: COLORS.gold }} /> No data stored</div>
          <div className="flex items-center gap-2"><Sparkles size={16} style={{ color: COLORS.gold }} /> AI-powered analysis</div>
        </div>
      </div>

      {loading ? (
        <div className="mt-12">
          <ProgressIndicator
            totalEstimateSeconds={75}
            stages={[
              { atSeconds: 0, label: "Sending your resume to the AI...", detail: "Securely transmitting your posting and resume for analysis. Your data isn't stored." },
              { atSeconds: 8, label: "Reading the USAJOBS posting...", detail: "Identifying duties, specialized experience requirements, and required KSAs." },
              { atSeconds: 22, label: "Scoring your resume against the posting...", detail: "Comparing keywords, qualifications, and federal formatting expectations." },
              { atSeconds: 45, label: "Drafting your federal-style rewrites...", detail: "Generating bullet rewrites and KSA narrative responses tailored to this role." },
              { atSeconds: 65, label: "Finalizing your report...", detail: "Almost ready — assembling your match score, gaps, and recommendations." },
            ]}
          />
          <div className="mt-4 text-xs text-center" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
            Don't refresh the page — your analysis is still running.
          </div>
        </div>
      ) : (
        <>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest font-semibold" style={{ color: COLORS.navy, fontFamily: FONTS.body, letterSpacing: "0.12em" }}>
                  <Briefcase size={12} className="inline mr-1.5 -mt-0.5" />
                  USAJOBS Posting
                </label>
                <button onClick={onLoadSample} className="text-xs underline" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
                  Load demo data
                </button>
              </div>
              <textarea
                value={jobPosting}
                onChange={(e) => setJobPosting(e.target.value)}
                placeholder="Paste the full text of the USAJOBS posting here, including duties, specialized experience, and KSAs..."
                className="w-full h-72 p-4 text-sm border rounded-sm focus:outline-none transition"
                style={{ borderColor: COLORS.rule, background: COLORS.surface, fontFamily: FONTS.mono, color: COLORS.ink, lineHeight: 1.6 }}
                onFocus={(e) => (e.target.style.borderColor = COLORS.navy)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.rule)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <label className="text-xs uppercase tracking-widest font-semibold" style={{ color: COLORS.navy, fontFamily: FONTS.body, letterSpacing: "0.12em" }}>
                  <FileText size={12} className="inline mr-1.5 -mt-0.5" />
                  Your Current Resume
                </label>
                <FileUploader
                  onParsed={(text, name) => { setResume(text); setResumeFileName(name); }}
                  onError={onFileError}
                  fileName={resumeFileName}
                />
              </div>
              <textarea
                value={resume}
                onChange={(e) => { setResume(e.target.value); if (resumeFileName) setResumeFileName(null); }}
                placeholder="Upload a .pdf, .docx, or .txt file — or paste your resume directly here..."
                className="w-full h-72 p-4 text-sm border rounded-sm focus:outline-none transition"
                style={{ borderColor: COLORS.rule, background: COLORS.surface, fontFamily: FONTS.mono, color: COLORS.ink, lineHeight: 1.6 }}
                onFocus={(e) => (e.target.style.borderColor = COLORS.navy)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.rule)}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 px-4 py-3 rounded-sm text-sm flex items-start gap-2" style={{ background: "#fbe9e7", color: COLORS.red, fontFamily: FONTS.body }}>
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <button
              onClick={onAnalyze}
              disabled={loading}
              className="px-7 py-3.5 font-medium rounded-sm flex items-center gap-2 transition disabled:opacity-60"
              style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}
            >
              Analyze My Match <ArrowRight size={16} />
            </button>
            <div className="text-xs" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
              Takes 60–90 seconds · Free preview · Analysis $14.99 · Rewrite $39 · Bundle $79
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProgressIndicator({ stages, totalEstimateSeconds }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pick the current stage based on elapsed time
  let currentStage = stages[0];
  for (const stage of stages) {
    if (elapsed >= stage.atSeconds) currentStage = stage;
  }

  const pct = Math.min(95, (elapsed / totalEstimateSeconds) * 100);
  const overdue = elapsed > totalEstimateSeconds;

  return (
    <div className="p-10 border-2 rounded-sm" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
      <div className="flex items-center gap-4 mb-6">
        <Loader2 size={28} className="animate-spin flex-shrink-0" style={{ color: COLORS.navy }} />
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>
            {currentStage.label}
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.muted, lineHeight: 1.5 }}>
            {currentStage.detail}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 700, color: COLORS.navy, lineHeight: 1 }}>
            {elapsed}s
          </div>
          <div className="text-xs uppercase tracking-widest mt-1" style={{ color: COLORS.muted, fontFamily: FONTS.body, letterSpacing: "0.1em" }}>
            elapsed
          </div>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: COLORS.rule }}>
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: overdue ? COLORS.amber : COLORS.gold }}
        />
      </div>

      <div className="mt-3 text-xs flex items-center justify-between" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
        <span>
          {overdue
            ? "Taking a bit longer than usual — hang tight, almost there."
            : `Typical wait: ${totalEstimateSeconds} seconds`}
        </span>
        <span style={{ fontFamily: FONTS.mono }}>
          {overdue ? "extended" : `~${Math.max(0, totalEstimateSeconds - elapsed)}s remaining`}
        </span>
      </div>
    </div>
  );
}

function ScoreGauge({ score }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? COLORS.green : score >= 60 ? COLORS.amber : COLORS.red;

  return (
    <div className="relative w-40 h-40">
      <svg width="160" height="160" className="-rotate-90">
        <circle cx="80" cy="80" r={radius} stroke={COLORS.rule} strokeWidth="10" fill="none" />
        <circle cx="80" cy="80" r={radius} stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div style={{ fontFamily: FONTS.display, fontSize: 40, fontWeight: 700, color: COLORS.ink, lineHeight: 1 }}>{score}</div>
        <div className="text-xs uppercase tracking-widest mt-1" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>Match Score</div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="p-4 border rounded-sm" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
      <div className="flex items-center gap-2 mb-2">
        <div style={{ color: accent || COLORS.navy }}>{icon}</div>
        <div className="text-xs uppercase tracking-widest" style={{ color: COLORS.muted, fontFamily: FONTS.body, letterSpacing: "0.1em" }}>{label}</div>
      </div>
      <div style={{ fontFamily: FONTS.display, fontSize: 22, color: COLORS.ink, fontWeight: 700, lineHeight: 1.2 }}>{value}</div>
    </div>
  );
}

function SectionTitle({ children, badge }) {
  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      <h2 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.01em" }}>{children}</h2>
      {badge}
    </div>
  );
}

function PremiumBadge({ tierLabel }) {
  return (
    <div className="text-xs px-2 py-0.5 rounded-sm flex items-center gap-1 font-medium" style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}>
      <Lock size={10} /> {tierLabel}
    </div>
  );
}

function PricingTierCard({ accent, eyebrow, title, price, priceUnit, badge, features, ctaLabel, ctaIcon, onClick, dark, footnote }) {
  const bg = dark ? COLORS.navy : COLORS.surface;
  const fg = dark ? COLORS.surface : COLORS.ink;
  const muted = dark ? "#cdd5e2" : COLORS.muted;
  const featureColor = dark ? "#e8ecf2" : COLORS.ink;
  const checkColor = dark ? COLORS.goldSoft : COLORS.green;
  const eyebrowColor = dark ? COLORS.goldSoft : accent;
  const priceColor = dark ? COLORS.goldSoft : COLORS.navy;
  const ctaBg = dark ? COLORS.goldSoft : (accent || COLORS.gold);
  const ctaFg = COLORS.navyDeep;

  return (
    <div
      className="p-5 border-2 rounded-sm flex flex-col relative"
      style={{ borderColor: dark ? COLORS.navy : (accent || COLORS.rule), background: bg, color: fg }}
    >
      {badge && (
        <div
          className="absolute -top-3 right-4 text-xs px-3 py-1 rounded-sm font-bold uppercase tracking-widest"
          style={{ background: COLORS.gold, color: COLORS.navyDeep, fontFamily: FONTS.body, letterSpacing: "0.1em" }}
        >
          {badge}
        </div>
      )}
      <div
        className="text-xs uppercase tracking-widest font-semibold mb-2"
        style={{ color: eyebrowColor, fontFamily: FONTS.body, letterSpacing: "0.12em" }}
      >
        {eyebrow}
      </div>
      <h3 style={{ fontFamily: FONTS.display, fontSize: 19, fontWeight: 700, color: fg, marginBottom: 6, lineHeight: 1.25 }}>
        {title}
      </h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span style={{ fontFamily: FONTS.display, fontSize: 30, fontWeight: 900, color: priceColor, lineHeight: 1 }}>
          {price}
        </span>
        <span className="text-xs" style={{ color: muted, fontFamily: FONTS.body }}>
          {priceUnit}
        </span>
      </div>
      <ul className="space-y-1.5 mb-5 text-sm flex-1" style={{ color: featureColor, fontFamily: FONTS.body }}>
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2" style={{ lineHeight: 1.5 }}>
            <Check size={13} style={{ color: checkColor, marginTop: 4, flexShrink: 0 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="w-full px-3 py-2.5 font-medium rounded-sm transition hover:opacity-90 flex items-center justify-center gap-2 text-sm"
        style={{ background: ctaBg, color: ctaFg, fontFamily: FONTS.body }}
      >
        {ctaIcon}
        {ctaLabel}
      </button>
      {footnote && (
        <div className="text-xs mt-2 text-center" style={{ color: muted, fontFamily: FONTS.body }}>
          {footnote}
        </div>
      )}
    </div>
  );
}

function PricingPanel({ tier, onUnlockAnalysis, onUnlockRewrite, onUnlockBundle }) {
  if (tier === "bundle") return null;

  // Build the list of cards based on current tier
  const cards = [];

  if (tier === "free") {
    cards.push(
      <PricingTierCard
        key="analysis"
        accent={COLORS.gold}
        eyebrow="DIY Path"
        title="Analysis & Coaching"
        price="$14.99"
        priceUnit="one-time"
        features={[
          "Every keyword gap with priority scoring",
          "Ready-to-paste KSA narrative responses",
          "Federal formatting checklist with fixes",
          "Full diagnostic report",
          "Best for applicants who'll edit the resume themselves",
        ]}
        ctaLabel="Get Analysis — $14.99"
        ctaIcon={<FileSearch size={14} />}
        onClick={onUnlockAnalysis}
      />
    );
  }

  if (tier === "free" || tier === "analysis") {
    const isUpgrade = tier === "analysis";
    cards.push(
      <PricingTierCard
        key="rewrite"
        accent={COLORS.gold}
        eyebrow="Most Popular"
        title="Federal Rewrite"
        price={isUpgrade ? "+$24.01" : "$39"}
        priceUnit={isUpgrade ? "upgrade" : "one-time"}
        badge="Recommended"
        features={[
          "Complete 2-page federal-formatted rewrite",
          "Built for new OPM Merit Hiring Plan rules",
          "All required fields (hours, supervisor, salary)",
          "Includes everything in Analysis tier",
          "Copy & download instantly",
        ]}
        ctaLabel={isUpgrade ? "Upgrade to Rewrite" : "Get Rewrite — $39"}
        ctaIcon={<Edit3 size={14} />}
        onClick={onUnlockRewrite}
      />
    );
  }

  // Bundle option always shown unless already purchased
  const bundlePrice =
    tier === "rewrite" ? "+$40" :
    tier === "analysis" ? "+$64.01" :
    "$79";
  const bundleUnit = tier === "free" ? "one-time" : "upgrade";

  cards.push(
    <PricingTierCard
      key="bundle"
      eyebrow="Complete Application"
      title="Federal Application Bundle"
      price={bundlePrice}
      priceUnit={bundleUnit}
      badge="Best Value"
      dark
      features={[
        "Everything in the Rewrite tier",
        "AI-drafted Merit Hiring essay starters (4 essays, 200 words each)",
        "Required for all GS-05+ applications since Oct 2025",
        "30 days of unlimited revisions",
        "For your most critical federal application",
      ]}
      ctaLabel={tier === "free" ? "Get Bundle — $79" : "Upgrade to Bundle"}
      ctaIcon={<Award size={14} />}
      onClick={onUnlockBundle}
      footnote="Federal resume services charge $400-$1,400+"
    />
  );

  // Layout: 1 card = full width centered, 2 cards = 2 cols, 3 cards = 3 cols
  const gridClass =
    cards.length === 1 ? "max-w-md mx-auto" :
    cards.length === 2 ? "grid md:grid-cols-2 gap-4" :
    "grid md:grid-cols-3 gap-4";

  return (
    <div className={`${gridClass} my-10`}>
      {cards}
    </div>
  );
}

function RewrittenResumeSection({ rewrittenResume, generating, error, onCopy, onDownload, onRetry, copied }) {
  return (
    <div className="mb-10">
      <SectionTitle badge={
        <div className="text-xs px-2 py-0.5 rounded-sm flex items-center gap-1 font-medium" style={{ background: COLORS.green, color: "#ffffff", fontFamily: FONTS.body }}>
          <Check size={10} /> Unlocked
        </div>
      }>
        Your Federal-Style Resume
      </SectionTitle>

      {generating ? (
        <ProgressIndicator
          totalEstimateSeconds={90}
          stages={[
            { atSeconds: 0, label: "Starting your federal resume rewrite...", detail: "Sending your posting and resume to the AI for a complete rewrite." },
            { atSeconds: 10, label: "Analyzing the posting requirements...", detail: "Identifying every duty, KSA, and specialized experience cue to match against." },
            { atSeconds: 25, label: "Rewriting your work history...", detail: "Reformatting each role with federal duty paragraphs, hours, and supervisor placeholders." },
            { atSeconds: 50, label: "Drafting KSA narratives...", detail: "Writing 3-5 sentence narrative responses to each competency." },
            { atSeconds: 70, label: "Final formatting pass...", detail: "Adding section dividers, contact block, and Veterans' Preference details." },
          ]}
        />
      ) : error ? (
        <div className="p-8 border-2 rounded-sm" style={{ borderColor: COLORS.red, background: "#fef5f4" }}>
          <div className="flex items-start gap-3">
            <AlertCircle size={22} style={{ color: COLORS.red, flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1">
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 17, color: COLORS.red, marginBottom: 6 }}>
                Rewrite couldn't be generated
              </div>
              <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.ink, lineHeight: 1.7, marginBottom: 12 }}>
                {error}
              </p>
              <button onClick={onRetry} className="text-sm flex items-center gap-2 px-4 py-2 rounded-sm transition hover:opacity-90" style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}>
                <RefreshCw size={14} /> Try again
              </button>
            </div>
          </div>
        </div>
      ) : rewrittenResume ? (
        <>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <button onClick={onCopy} className="text-sm flex items-center gap-2 px-3 py-2 border rounded-sm transition hover:bg-white" style={{ borderColor: COLORS.rule, color: COLORS.navy, fontFamily: FONTS.body }}>
              {copied ? (<><Check size={14} /> Copied</>) : (<><Copy size={14} /> Copy text</>)}
            </button>
            <button onClick={onDownload} className="text-sm flex items-center gap-2 px-3 py-2 rounded-sm transition hover:opacity-90" style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}>
              <Download size={14} /> Download .txt
            </button>
            <span className="text-xs" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
              Paste into Word or Google Docs to format and save as .docx
            </span>
          </div>
          <div
            className="p-8 border-2 rounded-sm overflow-auto max-h-[600px] shadow-sm"
            style={{ borderColor: COLORS.rule, background: COLORS.surface, fontFamily: FONTS.mono, fontSize: 13, lineHeight: 1.7, color: COLORS.ink, whiteSpace: "pre-wrap" }}
          >
            {rewrittenResume}
          </div>
        </>
      ) : null}
    </div>
  );
}

function MeritEssaysSection({ essays, generating, error, onRetry }) {
  return (
    <div className="mb-10">
      <SectionTitle badge={
        <div className="text-xs px-2 py-0.5 rounded-sm flex items-center gap-1 font-medium" style={{ background: COLORS.green, color: "#ffffff", fontFamily: FONTS.body }}>
          <Check size={10} /> Bundle
        </div>
      }>
        Merit Hiring Essay Starters
      </SectionTitle>

      <div
        className="mb-4 p-4 border-l-2 rounded-sm"
        style={{ borderColor: COLORS.gold, background: COLORS.surface, fontFamily: FONTS.body, fontSize: 14, color: COLORS.ink, lineHeight: 1.7 }}
      >
        <strong>Required for all GS-05+ federal applications since October 2025.</strong> Per OPM rules, your essays must be in your own words. These are AI-generated starting points to personalize, not finished essays to submit verbatim. Edit each one to reflect your real experience and voice before submitting.
      </div>

      {generating ? (
        <ProgressIndicator
          totalEstimateSeconds={75}
          stages={[
            { atSeconds: 0, label: "Drafting your Merit Hiring essays...", detail: "Generating starting points for all four required essay questions." },
            { atSeconds: 15, label: "Working on the Constitution essay...", detail: "Drafting a starting point for the commitment to founding principles question." },
            { atSeconds: 35, label: "Writing the government efficiency essay...", detail: "Drafting how your skills could improve federal efficiency." },
            { atSeconds: 55, label: "Finishing the role-specific essays...", detail: "Drafting the two essays tailored to this specific posting." },
          ]}
        />
      ) : error ? (
        <div className="p-8 border-2 rounded-sm" style={{ borderColor: COLORS.red, background: "#fef5f4" }}>
          <div className="flex items-start gap-3">
            <AlertCircle size={22} style={{ color: COLORS.red, flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1">
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 17, color: COLORS.red, marginBottom: 6 }}>
                Essays couldn't be generated
              </div>
              <p style={{ fontFamily: FONTS.body, fontSize: 14, color: COLORS.ink, lineHeight: 1.7, marginBottom: 12 }}>
                {error}
              </p>
              <button onClick={onRetry} className="text-sm flex items-center gap-2 px-4 py-2 rounded-sm transition hover:opacity-90" style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}>
                <RefreshCw size={14} /> Try again
              </button>
            </div>
          </div>
        </div>
      ) : essays && essays.length ? (
        <div className="space-y-4">
          {essays.map((essay, i) => (
            <div key={i} className="border rounded-sm overflow-hidden" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
              <div
                className="px-5 py-3"
                style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}
              >
                <div className="text-xs uppercase tracking-widest font-semibold" style={{ letterSpacing: "0.1em" }}>
                  Essay {i + 1}
                </div>
                <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, marginTop: 4, color: COLORS.surface, lineHeight: 1.4 }}>
                  {essay.question}
                </div>
              </div>
              <div className="px-5 py-4" style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>
                {essay.draft}
              </div>
              <div className="px-5 py-2 text-xs flex items-center justify-between" style={{ background: "#f8f4eb", color: COLORS.muted, fontFamily: FONTS.body, borderTop: `1px solid ${COLORS.rule}` }}>
                <span>~{essay.draft.split(/\s+/).filter(Boolean).length} words (200 word target)</span>
                <span><strong>Edit before submitting</strong> — must be in your own words</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LockedOverlay({ children }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(251, 250, 246, 0.7)" }}>
      <div className="text-center p-6 border rounded-sm shadow-lg max-w-sm" style={{ background: COLORS.surface, borderColor: COLORS.rule }}>
        <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: COLORS.goldSoft }}>
          <Lock size={20} style={{ color: COLORS.navy }} />
        </div>
        {children}
      </div>
    </div>
  );
}

function ResultsView({ analysis, tier, rewrittenResume, generatingRewrite, rewriteError, meritEssays, generatingEssays, essaysError, onUnlockAnalysis, onUnlockRewrite, onUnlockBundle, onReset, onCopyRewrite, onDownloadRewrite, onRetryRewrite, onRetryEssays, copied }) {
  const hasAnalysis = tier !== "free";
  const hasRewrite = tier === "rewrite" || tier === "bundle";
  const hasBundle = tier === "bundle";

  const visibleMissing = hasAnalysis ? analysis.missingKeywords : analysis.missingKeywords.slice(0, 3);
  const visibleBullets = hasAnalysis ? analysis.rewrittenBullets : analysis.rewrittenBullets.slice(0, 1);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
        <div className="flex items-center gap-8 flex-wrap">
          <ScoreGauge score={analysis.matchScore} />
          <div>
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.body, letterSpacing: "0.15em" }}>Analysis Complete</div>
            <h1 style={{ fontFamily: FONTS.display, fontSize: 32, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.01em", lineHeight: 1.2 }}>Your Federal Match Report</h1>
            <div className="text-sm mt-2" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
              Estimated grade fit: <span style={{ color: COLORS.ink, fontWeight: 600 }}>{analysis.gsLevel}</span>
            </div>
          </div>
        </div>
        <button onClick={onReset} className="text-sm flex items-center gap-2 px-3 py-2 border rounded-sm transition hover:bg-white" style={{ borderColor: COLORS.rule, color: COLORS.muted, fontFamily: FONTS.body }}>
          <RefreshCw size={14} /> New Analysis
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-10">
        <StatCard icon={<Check size={16} />} label="Keywords Found" value={analysis.presentKeywords.length} accent={COLORS.green} />
        <StatCard icon={<X size={16} />} label="Keywords Missing" value={analysis.missingKeywords.length} accent={COLORS.red} />
        <StatCard icon={<TrendingUp size={16} />} label="Rewrite Suggestions" value={analysis.rewrittenBullets.length} accent={COLORS.navy} />
        <StatCard icon={<Target size={16} />} label="KSA Statements" value={analysis.ksaStatements.length} accent={COLORS.gold} />
      </div>

      <div className="mb-10">
        <SectionTitle>Specialized Experience Assessment</SectionTitle>
        <div className="p-5 border-l-2 rounded-sm" style={{ borderColor: COLORS.gold, background: COLORS.surface, color: COLORS.ink, fontFamily: FONTS.body, fontSize: 15, lineHeight: 1.7 }}>
          {analysis.specializedExperienceMatch}
        </div>
      </div>

      <PricingPanel
        tier={tier}
        onUnlockAnalysis={onUnlockAnalysis}
        onUnlockRewrite={onUnlockRewrite}
        onUnlockBundle={onUnlockBundle}
      />

      {hasRewrite && (
        <RewrittenResumeSection
          rewrittenResume={rewrittenResume}
          generating={generatingRewrite}
          error={rewriteError}
          onCopy={onCopyRewrite}
          onDownload={onDownloadRewrite}
          onRetry={onRetryRewrite}
          copied={copied}
        />
      )}

      {hasBundle && (
        <MeritEssaysSection
          essays={meritEssays}
          generating={generatingEssays}
          error={essaysError}
          onRetry={onRetryEssays}
        />
      )}

      <div className="mb-10 relative">
        <SectionTitle badge={!hasAnalysis && <PremiumBadge tierLabel="Analysis" />}>
          Keyword Gap Analysis
        </SectionTitle>
        <div className="space-y-2">
          {visibleMissing.map((kw, i) => {
            const style = importanceStyle(kw.importance);
            return (
              <div key={i} className="p-4 border rounded-sm flex items-start gap-4" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
                <div className="text-xs px-2 py-1 rounded-sm font-semibold whitespace-nowrap mt-0.5" style={{ background: style.bg, color: style.fg, fontFamily: FONTS.body }}>
                  {style.label}
                </div>
                <div className="flex-1">
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: COLORS.ink, marginBottom: 4 }}>
                    {kw.keyword}
                  </div>
                  <div className="text-sm" style={{ color: COLORS.muted, fontFamily: FONTS.body, lineHeight: 1.6 }}>
                    {kw.context}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!hasAnalysis && (
          <div className="mt-3 text-sm flex items-center gap-2 px-4 py-3 rounded-sm" style={{ background: COLORS.goldSoft, color: COLORS.navyDeep, fontFamily: FONTS.body }}>
            <Lock size={14} />
            <span>
              <strong>{analysis.missingKeywords.length - 3} more keywords</strong> identified — unlock the Analysis tier ($14.99) for the full list with priority scoring.
            </span>
          </div>
        )}
      </div>

      <div className="mb-10">
        <SectionTitle badge={!hasAnalysis && <PremiumBadge tierLabel="Analysis" />}>
          Rewritten Bullets (Federal Style)
        </SectionTitle>
        <div className="space-y-4">
          {visibleBullets.map((b, i) => (
            <div key={i} className="border rounded-sm overflow-hidden" style={{ borderColor: COLORS.rule }}>
              <div className="px-4 py-2 text-xs uppercase tracking-widest font-semibold" style={{ background: "#f1ede4", color: COLORS.muted, fontFamily: FONTS.body }}>Original</div>
              <div className="px-4 py-3" style={{ background: COLORS.surface, color: COLORS.muted, fontFamily: FONTS.body, fontSize: 14 }}>
                {b.original}
              </div>
              <div className="px-4 py-2 text-xs uppercase tracking-widest font-semibold flex items-center gap-2" style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}>
                <Sparkles size={12} /> Federal-Optimized Rewrite
              </div>
              <div className="px-4 py-4" style={{ background: COLORS.surface, color: COLORS.ink, fontFamily: FONTS.body, fontSize: 15, lineHeight: 1.7 }}>
                {b.rewritten}
              </div>
            </div>
          ))}
        </div>
        {!hasAnalysis && (
          <div className="mt-3 text-sm flex items-center gap-2 px-4 py-3 rounded-sm" style={{ background: COLORS.goldSoft, color: COLORS.navyDeep, fontFamily: FONTS.body }}>
            <Lock size={14} />
            <span>
              <strong>{analysis.rewrittenBullets.length - 1} more rewritten bullets</strong> available in the Analysis tier ($14.99) and above.
            </span>
          </div>
        )}
      </div>

      <div className="mb-10 relative">
        <SectionTitle badge={!hasAnalysis && <PremiumBadge tierLabel="Analysis" />}>
          Ready-to-Paste KSA Statements
        </SectionTitle>
        <div className={`space-y-4 ${!hasAnalysis ? "filter blur-md select-none pointer-events-none" : ""}`}>
          {analysis.ksaStatements.map((k, i) => (
            <div key={i} className="p-5 border rounded-sm" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
              <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: COLORS.gold, fontFamily: FONTS.body, letterSpacing: "0.1em" }}>Competency</div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: COLORS.ink, marginBottom: 10 }}>{k.competency}</div>
              <p style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink, lineHeight: 1.7 }}>{k.statement}</p>
            </div>
          ))}
        </div>
        {!hasAnalysis && (
          <LockedOverlay>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: COLORS.ink, marginBottom: 6 }}>KSA Statements Locked</h3>
            <p className="text-sm mb-4" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>Ready-to-paste narratives for every competency, included in the Analysis tier and above.</p>
            <button onClick={onUnlockAnalysis} className="w-full px-4 py-2.5 font-medium rounded-sm transition hover:opacity-90" style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}>
              Unlock Analysis — $14.99
            </button>
          </LockedOverlay>
        )}
      </div>

      <div className="mb-10 relative">
        <SectionTitle badge={!hasAnalysis && <PremiumBadge tierLabel="Analysis" />}>
          Federal Formatting Checklist
        </SectionTitle>
        <div className={`space-y-2 ${!hasAnalysis ? "filter blur-md select-none pointer-events-none" : ""}`}>
          {analysis.formattingChecklist.map((c, i) => (
            <div key={i} className="p-4 border rounded-sm flex items-start gap-3" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
              <div className="mt-1">{statusIcon(c.status)}</div>
              <div className="flex-1">
                <div style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink, fontWeight: 500 }}>{c.item}</div>
                {c.fix && (
                  <div className="text-sm mt-1" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
                    <ChevronRight size={12} className="inline -mt-0.5" /> {c.fix}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {!hasAnalysis && (
          <LockedOverlay>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: COLORS.ink, marginBottom: 6 }}>Checklist Locked</h3>
            <p className="text-sm mb-4" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>All federal formatting requirements with specific fixes for your resume.</p>
            <button onClick={onUnlockAnalysis} className="w-full px-4 py-2.5 font-medium rounded-sm transition hover:opacity-90" style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.body }}>
              Unlock Analysis — $14.99
            </button>
          </LockedOverlay>
        )}
      </div>

      <div className="mb-10">
        <SectionTitle>Critical Gaps to Address</SectionTitle>
        <div className="space-y-2">
          {analysis.criticalGaps.map((g, i) => (
            <div key={i} className="p-4 border rounded-sm flex items-start gap-3" style={{ borderColor: COLORS.rule, background: COLORS.surface }}>
              <AlertTriangle size={16} style={{ color: COLORS.amber, marginTop: 4, flexShrink: 0 }} />
              <div style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink, lineHeight: 1.6 }}>{g}</div>
            </div>
          ))}
        </div>
      </div>

      {hasBundle && (
        <div className="p-6 rounded-sm flex items-center justify-between flex-wrap gap-4" style={{ background: COLORS.goldSoft, color: COLORS.navyDeep }}>
          <div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18 }}>
              <Check size={18} className="inline mr-2 -mt-1" />
              Federal Application Bundle unlocked
            </div>
            <div className="text-sm mt-1" style={{ fontFamily: FONTS.body }}>
              You have your full rewrite, all KSAs, and Merit Hiring essay starters. Time to apply.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PricingSummary() {
  const tiers = [
    {
      name: "Resume Analysis",
      price: "$14.99",
      eyebrow: "DIY Path",
      description: "Full diagnostic — every keyword, all KSA narratives, formatting checklist. For applicants who'll edit the resume themselves.",
      bullets: ["All keyword gaps with priority", "All KSA narrative responses", "Federal formatting checklist"],
    },
    {
      name: "Federal Rewrite",
      price: "$39",
      eyebrow: "Most Popular",
      description: "Complete 2-page federal-formatted rewrite, built for the September 2025 OPM Merit Hiring Plan rules. Includes everything in Analysis.",
      bullets: ["Everything in Analysis", "Complete 2-page rewrite", "Copy & download instantly"],
      highlighted: true,
    },
    {
      name: "Federal Application Bundle",
      price: "$79",
      eyebrow: "Best Value",
      description: "For your most critical federal application: rewrite plus AI-drafted Merit Hiring essay starters (the four 200-word essays now required for GS-05+ applications).",
      bullets: ["Everything in Rewrite", "4 Merit Hiring essay starters", "30 days of unlimited revisions"],
    },
  ];

  return (
    <section className="py-16" style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.rule}`, borderBottom: `1px solid ${COLORS.rule}` }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: COLORS.gold, fontFamily: FONTS.body }}>
            Pricing
          </div>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 32, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.01em", marginBottom: 8 }}>
            One application. One payment. No subscription.
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: COLORS.muted, fontFamily: FONTS.body, lineHeight: 1.7 }}>
            Federal resume services charge $400–$1,400+. We start at $14.99. Same end result, fraction of the price.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((t, i) => (
            <div
              key={i}
              className="p-6 border-2 rounded-sm flex flex-col"
              style={{
                borderColor: t.highlighted ? COLORS.navy : COLORS.rule,
                background: t.highlighted ? COLORS.navy : COLORS.bg,
                color: t.highlighted ? COLORS.surface : COLORS.ink,
              }}
            >
              <div
                className="text-xs uppercase tracking-widest font-semibold mb-2"
                style={{ color: t.highlighted ? COLORS.goldSoft : COLORS.gold, fontFamily: FONTS.body, letterSpacing: "0.12em" }}
              >
                {t.eyebrow}
              </div>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, marginBottom: 8, lineHeight: 1.25 }}>
                {t.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span style={{ fontFamily: FONTS.display, fontSize: 34, fontWeight: 900, color: t.highlighted ? COLORS.goldSoft : COLORS.navy, lineHeight: 1 }}>
                  {t.price}
                </span>
                <span className="text-xs" style={{ color: t.highlighted ? "#cdd5e2" : COLORS.muted, fontFamily: FONTS.body }}>
                  one-time
                </span>
              </div>
              <p className="text-sm mb-4" style={{ color: t.highlighted ? "#e8ecf2" : COLORS.muted, fontFamily: FONTS.body, lineHeight: 1.6 }}>
                {t.description}
              </p>
              <ul className="space-y-1.5 text-sm" style={{ fontFamily: FONTS.body }}>
                {t.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2" style={{ lineHeight: 1.5 }}>
                    <Check size={13} style={{ color: t.highlighted ? COLORS.goldSoft : COLORS.green, marginTop: 4, flexShrink: 0 }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center text-sm mt-8" style={{ color: COLORS.muted, fontFamily: FONTS.body }}>
          Paste a USAJOBS posting and your resume above to see a free preview before paying for any tier.
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <FileSearch size={22} />,
      title: "Paste or Upload",
      body: "Drop in the USAJOBS posting and your current resume. Upload .pdf, .docx, or .txt — or paste directly."
    },
    {
      icon: <Zap size={22} />,
      title: "AI Analyzes",
      body: "In 60-90 seconds, get a match score, missing keywords with priority, KSA assessment, and federal-style bullet rewrites."
    },
    {
      icon: <Download size={22} />,
      title: "Get Your Rewrite",
      body: "Unlock the full 2-page federal rewrite for $39, or get the complete Application Bundle (rewrite + Merit Hiring essay starters) for $79."
    }
  ];

  return (
    <section
      className="border-y py-16"
      style={{ background: COLORS.surface, borderColor: COLORS.rule }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: COLORS.gold, fontFamily: FONTS.body }}
          >
            How It Works
          </div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.ink,
              letterSpacing: "-0.01em",
            }}
          >
            From paste to optimized in under two minutes
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div
                className="absolute -top-3 -left-2 w-9 h-9 rounded-full flex items-center justify-center font-bold"
                style={{ background: COLORS.navy, color: COLORS.goldSoft, fontFamily: FONTS.display }}
              >
                {i + 1}
              </div>
              <div
                className="p-6 pt-8 border rounded-sm h-full"
                style={{ borderColor: COLORS.rule, background: COLORS.bg }}
              >
                <div style={{ color: COLORS.gold, marginBottom: 12 }}>{s.icon}</div>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.ink,
                    marginBottom: 8,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.muted, lineHeight: 1.7 }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustRow() {
  const items = [
    { icon: <RotateCcw size={16} />, label: "30-day money-back guarantee" },
    { icon: <Award size={16} />, label: "Built by a veteran" },
    { icon: <ShieldCheck size={16} />, label: "Resume data never stored" },
    { icon: <Sparkles size={16} />, label: "Powered by frontier AI" },
  ];
  return (
    <div
      className="border-y py-6"
      style={{ background: COLORS.goldSoft, borderColor: COLORS.gold }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-around flex-wrap gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: COLORS.navyDeep, fontFamily: FONTS.body }}
          >
            <span style={{ color: COLORS.navy }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-16" style={{ background: COLORS.bg }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <div
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: COLORS.gold, fontFamily: FONTS.body }}
          >
            Frequently Asked
          </div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.ink,
              letterSpacing: "-0.01em",
            }}
          >
            Questions you probably have
          </h2>
        </div>
        <div className="space-y-2">
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="border rounded-sm transition"
                style={{
                  borderColor: isOpen ? COLORS.navy : COLORS.rule,
                  background: COLORS.surface,
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 transition"
                >
                  <span
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 17,
                      fontWeight: 700,
                      color: COLORS.ink,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: isOpen ? COLORS.navy : COLORS.goldSoft, color: isOpen ? COLORS.goldSoft : COLORS.navy }}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-5"
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 15,
                      color: COLORS.muted,
                      lineHeight: 1.75,
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.muted }}>
            Still have a question?{" "}
            <a
              href="mailto:hello@fed-resume-pro.com"
              className="underline font-medium"
              style={{ color: COLORS.navy }}
            >
              Email us directly
            </a>{" "}
            — we read every message.
          </p>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const linkStyle = {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 14,
    textDecoration: "none",
  };
  return (
    <footer
      className="border-t mt-0 pt-12 pb-8"
      style={{ borderColor: COLORS.rule, background: COLORS.surface }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center"
                style={{ background: COLORS.navy }}
              >
                <ShieldCheck size={16} color={COLORS.goldSoft} />
              </div>
              <span
                style={{ fontFamily: FONTS.display, fontWeight: 700, color: COLORS.ink, fontSize: 17 }}
              >
                FedResume<span style={{ color: COLORS.gold }}>·</span>Pro
              </span>
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.muted, lineHeight: 1.7 }}>
              AI-powered federal resume optimization. Built by a veteran for federal job seekers.
            </p>
          </div>

          <div>
            <div
              className="text-xs uppercase tracking-widest font-semibold mb-3"
              style={{ color: COLORS.navy, fontFamily: FONTS.body, letterSpacing: "0.12em" }}
            >
              Product
            </div>
            <ul className="space-y-2">
              <li><a href="/" style={linkStyle}>Home</a></li>
              <li><a href="/#how-it-works" style={linkStyle}>How it works</a></li>
              <li><a href="/#pricing" style={linkStyle}>Pricing</a></li>
              <li><a href="/#faq" style={linkStyle}>FAQ</a></li>
            </ul>
          </div>

          <div>
            <div
              className="text-xs uppercase tracking-widest font-semibold mb-3"
              style={{ color: COLORS.navy, fontFamily: FONTS.body, letterSpacing: "0.12em" }}
            >
              Company
            </div>
            <ul className="space-y-2">
              <li><a href="/about" style={linkStyle}>About</a></li>
              <li><a href="/contact" style={linkStyle}>Contact</a></li>
              <li>
                <a href="mailto:hello@fed-resume-pro.com" style={linkStyle}>
                  <Mail size={12} className="inline mr-1 -mt-0.5" />
                  hello@fed-resume-pro.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div
              className="text-xs uppercase tracking-widest font-semibold mb-3"
              style={{ color: COLORS.navy, fontFamily: FONTS.body, letterSpacing: "0.12em" }}
            >
              Legal
            </div>
            <ul className="space-y-2">
              <li><a href="/terms" style={linkStyle}>Terms of Service</a></li>
              <li><a href="/privacy" style={linkStyle}>Privacy Policy</a></li>
              <li><a href="/refunds" style={linkStyle}>Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-6 flex items-center justify-between flex-wrap gap-3 text-xs"
          style={{ borderColor: COLORS.rule, color: COLORS.muted, fontFamily: FONTS.body }}
        >
          <div>
            © {new Date().getFullYear()} FedResume Pro. Independent tool. Not affiliated with USAJOBS, OPM, or any federal agency.
          </div>
          <div className="flex items-center gap-2">
            <Award size={12} style={{ color: COLORS.gold }} /> Veteran-owned & operated
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- Main app ----------

export default function FedResumeOptimizer() {
  const [view, setView] = useState("input");
  const [jobPosting, setJobPosting] = useState("");
  const [resume, setResume] = useState("");
  const [resumeFileName, setResumeFileName] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [rewrittenResume, setRewrittenResume] = useState(null);
  const [generatingRewrite, setGeneratingRewrite] = useState(false);
  const [meritEssays, setMeritEssays] = useState(null);
  const [generatingEssays, setGeneratingEssays] = useState(false);
  const [essaysError, setEssaysError] = useState(null);
  const [tier, setTier] = useState("free");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rewriteError, setRewriteError] = useState(null);
  const [copied, setCopied] = useState(false);

  // After successful Stripe payment, the success page redirects here with ?paid=<tier>.
  // Read it, restore the saved state, set the tier, and clean the URL.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paid = params.get("paid");
    if (paid === "analysis" || paid === "rewrite" || paid === "bundle") {
      setTier(paid);
      restoreStateAfterCheckout();
      window.history.replaceState({}, "", "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When tier upgrades to rewrite/bundle and we already have analysis,
  // kick off rewrite/essay generation if not already done.
  useEffect(() => {
    if ((tier === "rewrite" || tier === "bundle") && analysis && !rewrittenResume && !generatingRewrite) {
      generateRewrite();
    }
    if (tier === "bundle" && analysis && !meritEssays && !generatingEssays) {
      generateEssays();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, analysis]);

  const saveStateBeforeCheckout = () => {
    try {
      const snapshot = { jobPosting, resume, analysis, resumeFileName };
      sessionStorage.setItem("fedresume_pending_checkout", JSON.stringify(snapshot));
    } catch (e) {
      console.error("Could not save state:", e);
    }
  };

  const restoreStateAfterCheckout = () => {
    try {
      const raw = sessionStorage.getItem("fedresume_pending_checkout");
      if (!raw) return false;
      const snapshot = JSON.parse(raw);
      sessionStorage.removeItem("fedresume_pending_checkout");
      if (snapshot.jobPosting) setJobPosting(snapshot.jobPosting);
      if (snapshot.resume) setResume(snapshot.resume);
      if (snapshot.analysis) {
        setAnalysis(snapshot.analysis);
        setView("results");
      }
      if (snapshot.resumeFileName) setResumeFileName(snapshot.resumeFileName);
      return true;
    } catch (e) {
      console.error("Could not restore state:", e);
      return false;
    }
  };

  const loadSample = () => {
    setJobPosting(SAMPLE_POSTING);
    setResume(SAMPLE_RESUME);
    setResumeFileName(null);
  };

  const analyze = async () => {
    if (!jobPosting.trim() || !resume.trim()) {
      setError("Please paste both the USAJOBS posting and your resume.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPosting, resume }),
      });
      if (!response.ok) throw new Error("API error");
      const parsed = await response.json();
      setAnalysis(parsed);
      setView("results");
    } catch (e) {
      console.error("Analyze error:", e);
      setError("Something went wrong while analyzing. Please try again in a moment. If this keeps happening, email support@fed-resume-pro.com.");
    } finally {
      setLoading(false);
    }
  };

  const generateRewrite = async () => {
    setGeneratingRewrite(true);
    setRewriteError(null);
    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPosting, resume }),
      });
      if (!response.ok) throw new Error("Rewrite API error");
      const data = await response.json();
      setRewrittenResume(data.text);
    } catch (e) {
      console.error("Rewrite error:", e);
      setRewriteError("We couldn't generate your rewrite right now. Your purchase is still valid — please try again in a moment, or email support@fed-resume-pro.com and we'll either fix it or refund you.");
    } finally {
      setGeneratingRewrite(false);
    }
  };

  const generateEssays = async () => {
    setGeneratingEssays(true);
    setEssaysError(null);
    try {
      const response = await fetch("/api/essays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPosting, resume }),
      });
      if (!response.ok) throw new Error("Essays API error");
      const data = await response.json();
      setMeritEssays(data.essays);
    } catch (e) {
      console.error("Essays error:", e);
      setEssaysError("We couldn't generate your essay starters right now. Your purchase is still valid — please try again in a moment, or email support@fed-resume-pro.com.");
    } finally {
      setGeneratingEssays(false);
    }
  };

  const handleUnlockAnalysis = async () => {
    saveStateBeforeCheckout();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "analysis" }),
      });
      if (!res.ok) throw new Error("Checkout request failed");
      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (e) {
      console.error("Checkout error:", e);
      alert("Couldn't start checkout. Please try again or email support@fed-resume-pro.com.");
    }
  };

  const handleUnlockRewrite = async () => {
    saveStateBeforeCheckout();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "rewrite" }),
      });
      if (!res.ok) throw new Error("Checkout request failed");
      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (e) {
      console.error("Checkout error:", e);
      alert("Couldn't start checkout. Please try again or email support@fed-resume-pro.com.");
    }
  };

  const handleUnlockBundle = async () => {
    saveStateBeforeCheckout();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "bundle" }),
      });
      if (!res.ok) throw new Error("Checkout request failed");
      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (e) {
      console.error("Checkout error:", e);
      alert("Couldn't start checkout. Please try again or email support@fed-resume-pro.com.");
    }
  };

  const handleCopyRewrite = async () => {
    try {
      await navigator.clipboard.writeText(rewrittenResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const handleDownloadRewrite = () => {
    downloadText(rewrittenResume, "federal-resume.txt");
  };

  const reset = () => {
    setView("input");
    setAnalysis(null);
    setRewrittenResume(null);
    setRewriteError(null);
    setMeritEssays(null);
    setEssaysError(null);
    setTier("free");
    setJobPosting("");
    setResume("");
    setResumeFileName(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        body { background: ${COLORS.bg}; }
      `}</style>
      <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: FONTS.body }}>
        <Header tier={tier} onUpgrade={handleUnlockBundle} />
        {view === "input" ? (
          <>
            <InputView
              jobPosting={jobPosting}
              setJobPosting={setJobPosting}
              resume={resume}
              setResume={setResume}
              resumeFileName={resumeFileName}
              setResumeFileName={setResumeFileName}
              onAnalyze={analyze}
              onLoadSample={loadSample}
              error={error}
              loading={loading}
              onFileError={(msg) => setError(msg)}
            />
            <TrustRow />
            <div id="how-it-works"><HowItWorks /></div>
            <div id="pricing"><PricingSummary /></div>
            <div id="faq"><FaqAccordion /></div>
          </>
        ) : (
          <ResultsView
            analysis={analysis}
            tier={tier}
            rewrittenResume={rewrittenResume}
            generatingRewrite={generatingRewrite}
            rewriteError={rewriteError}
            meritEssays={meritEssays}
            generatingEssays={generatingEssays}
            essaysError={essaysError}
            onUnlockAnalysis={handleUnlockAnalysis}
            onUnlockRewrite={handleUnlockRewrite}
            onUnlockBundle={handleUnlockBundle}
            onReset={reset}
            onCopyRewrite={handleCopyRewrite}
            onDownloadRewrite={handleDownloadRewrite}
            onRetryRewrite={generateRewrite}
            onRetryEssays={generateEssays}
            copied={copied}
          />
        )}
        <SiteFooter />
      </div>
    </>
  );
}