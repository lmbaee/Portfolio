export default function WorkExperience() {
  const jobs = [
    {
      role: "Machine Learning Intern",
      company: "AI LA",
      period: "Aug 2025 – Present",
      desc: "TBD",
    },
    {
      role: "IT | Cybersecurity & Software Engineer Rising Intern",
      company: "LA-Tech",
      period: "Aug 2025 – Present",
      desc: "Engaged in networking workshops and events to explore professional frameworks, which expanded my network by over 25 new contacts in tech and design. Learned to differentiate between transactional vs authentic networking, leading to more meaningful career conversations that generated 2 internship leads and 1 portfolio collaboration.",
    },
    {
      role: "Web Development",
      company: "The Knowledge House",
      period: "Feb 2025 – Present",
      desc: "Completed 400+ hours of hands-on training in full-stack web development, focusing on JavaScript, React, Node.js, and SQL.",
    },
    {
      role: "Software Developer",
      company: "Freelance",
      period: "Feb 2025 – Present",
      desc: "Designed and deployed 10 websites to showcase technical skills using HTML, CSS, and JS, improving web development proficiency. Built and deployed a full-stack portfolio application using React, Vite, TailwindCSS, and Supabase enabling dynamic project showcases and interactive case studies that improved user engagement by 30% compared to static resumes. Designed and implemented responsive front-end UI components (e.g., animated backgrounds and 3D hero models) with React, Three.js, and Framer Motion, enhancing accessibility and cross-device performance. Currently working on a website (TBA).",
    },
    {
      role: "Technology Professional Intern",
      company: "Los Angeles County Internal Services Department",
      period: "Jun 2023 – Dec 2024",
      desc: "Delivered 30%+ improvements in documentation accuracy, operational tracking, and reporting by maintaining 200+ service requests/month, generating reports, and ensuring HIPAA/OSHA compliance. Enhanced data efficiency by 20% and communication effectiveness by handling 150+ calls/emails monthly with a 98% response rate. Strengthened IT support by troubleshooting technical issues, configuring networks/VPNs, deploying virtual machines, and maintaining accurate device tracking. Increased customer satisfaction through professional service, user training (senior citizens/children), and community outreach. Developed 15+ IT procedures, reporting dashboards, and visualizations while earning Google IT, Data Analytics, Cybersecurity, CompTIA CySA+, and Splunk Core certifications.",
    },
    {
      role: "Technical Support",
      company: "Cyber Seniors",
      period: "Dec 2022 – Jul 2023",
      desc: "Educated Seniors with their Devices and helped troubleshoot problems they may have had. Trained end-users on device usage, especially non-technical users, simplifying complex technical concepts. Developed user-centric guides and instructional materials to reduce support needs and empower clients. Provided end-user support for desktops, laptops, and tablets, resolving issues in a help desk environment. Communicated with seniors using Twilio Flex or Zoom. Set up and maintained various hardware components, including printers and storage devices. Supported installation, configuration, and troubleshooting for a range of IT equipment, including personal computers, video display, printers.",
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
