import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", message: "", honey: "" });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Write at least 10 characters.";
    if (form.honey) e.honey = "Spam detected.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) {
      setTimeout(() => setSent(true), 200);
    }
  };

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-20">
      <h2 className="mb-6 font-display text-4xl text-white">Contact</h2>
      <form
        onSubmit={submit}
        className="rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-[inset_0_0_60px_rgba(255,0,0,0.02)]"
        noValidate
      >
        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-300" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 focus:border-blood focus:outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          {errors.name && <p className="mt-1 text-sm text-blood">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 focus:border-blood focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-blood">{errors.email}</p>}
        </div>

        {/* Honeypot */}
        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            autoComplete="off"
            tabIndex="-1"
            value={form.honey}
            onChange={(e) => setForm({ ...form, honey: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm text-neutral-300" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            className="w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 focus:border-blood focus:outline-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          {errors.message && <p className="mt-1 text-sm text-blood">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-blood px-6 py-3 font-semibold text-white"
        >
          <span className="relative z-10">Send</span>
          {/* blood smear */}
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.15),transparent)] transition-transform duration-500 group-hover:translate-x-0"
          />
        </button>
      </form>

      {/* Success overlay */}
      <AnimatePresence>
        {sent && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSent(false)}
          >
            <motion.div
              className="rounded-3xl bg-neutral-950 p-8 text-center shadow-2xl ring-1 ring-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
            >
              <h3 className="font-display text-3xl text-white">Message Sent</h3>
              <p className="mt-2 text-neutral-300">
                Thanks for reaching out. I’ll get back to you soon.
              </p>
              <button
                className="mt-6 rounded bg-blood px-4 py-2 text-white"
                onClick={() => setSent(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
