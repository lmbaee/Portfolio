export default function WorkExperience() {
  const jobs = [
    {
      role: "Frontend Developer",
      company: "TechCorp",
      period: "2022 – Present",
      desc: "Building responsive UI with React, Tailwind, and accessibility in mind.",
    },
    {
      role: "IT Analyst",
      company: "CyberSec Inc",
      period: "2020 – 2022",
      desc: "Worked on cybersecurity dashboards and internal tools.",
    },
  ];

  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl px-6 py-16"
    >
      <h2 className="text-3xl font-display text-white mb-8">Work Experience</h2>
      <ul className="space-y-6">
        {jobs.map((job, i) => (
          <li
            key={i}
            className="border-l-2 border-blood pl-4 hover:bg-neutral-900/50 rounded transition"
          >
            <h3 className="text-xl text-white">{job.role}</h3>
            <p className="text-neutral-400">
              {job.company} — {job.period}
            </p>
            <p className="mt-2 text-neutral-300">{job.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
