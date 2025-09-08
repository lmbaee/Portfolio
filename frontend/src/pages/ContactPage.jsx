import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", message: "", honey: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const redirectTimerRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Write at least 10 characters.";
    if (form.honey) e.honey = "Spam detected.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setErrors({});
    if (!validate()) return;

    setLoading(true);

    try {
      // Supabase Edge Function
      const endpoint = import.meta.env.VITE_CONTACT_FN_URL || "/api/contact";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
         },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          honey: form.honey,
        }),
      });

      if (!res.ok) {
        // try to parse JSON error if present
        let err = { message: res.statusText || "Failed to send" };
        try { err = await res.json(); } catch (e) {}
        setErrors({ submit: err.error || err.message || "Failed to send message." });
      } else {
        setSent(true);
        // clear the form (minor UX improvement)
        setForm({ name: "", email: "", message: "", honey: "" });
      }
    } catch (err) {
      setErrors({ submit: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  // When sent becomes true, set a 3s redirect timer. Clean up timers on unmount or when closed.
  useEffect(() => {
    if (sent) {
      // clear any existing
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
      redirectTimerRef.current = setTimeout(() => {
        navigate("/portfolio");
      }, 3000);
    }
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, [sent, navigate]);

  const handleClose = () => {
    // Immediately redirect to /portfolio
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
    setSent(false);
    navigate("/portfolio");
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

        {errors.submit && <p className="mb-4 text-sm text-blood">{errors.submit}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-blood px-6 py-3 font-semibold text-white ${loading ? "opacity-70 cursor-wait" : ""}`}
        >
          <span className="relative z-10">{loading ? "Sending…" : "Send"}</span>
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
            onClick={() => {
              // clicking overlay should not cancel the modal redirect; keep modal open
            }}
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
                onClick={handleClose}
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
