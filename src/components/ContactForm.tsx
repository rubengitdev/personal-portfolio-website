import React, { useState, useEffect } from "react";
import { Send, CheckCircle, MessagesSquare, Coffee, X } from "lucide-react";
import { ContactMessage } from "../types";

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<"hire" | "collab" | "coffee" | "hello">("hire");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // High-fidelity guestbook storage to simulate a live, collaborative interactive portfolio
  const [submissions, setSubmissions] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_messages");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        // default mock comments to give the guestbook a populated, realistic feel
        seedSubmissions();
      }
    } else {
      seedSubmissions();
    }
  }, []);

  const seedSubmissions = () => {
    const baseline: ContactMessage[] = [
      {
        id: "seed-1",
        name: "Jessica Ramirez",
        email: "jessica@figma.com",
        category: "coffee",
        message: "Your 'The Bear Game' card design illustrations are hilarious. Let's grab coffee next time you're in SF!",
        timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString() // 3 days ago
      },
      {
        id: "seed-2",
        name: "Devon Ko",
        email: "devon@glean.com",
        category: "collab",
        message: "Austin was an absolute superstar during his internship on the core search composer. Meticulous and fast!",
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString() // 12 hours ago
      }
    ];
    setSubmissions(baseline);
    localStorage.setItem("portfolio_messages", JSON.stringify(baseline));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        category,
        message,
        timestamp: new Date().toISOString()
      };

      const updated = [newMsg, ...submissions];
      setSubmissions(updated);
      localStorage.setItem("portfolio_messages", JSON.stringify(updated));

      setIsSubmitting(false);
      setIsSuccess(true);

      // Clean inputs
      setName("");
      setEmail("");
      setMessage("");

      // reset success message after some seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div 
      id="contact-overlay" 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="contact-card"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-stone-900 border-4 border-black dark:border-white w-full max-w-lg rounded-2xl shadow-[6px_6px_0px_0px_#ff2a2a] p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col text-stone-950 dark:text-stone-100 transition-colors"
      >
        {/* Colorful top decoration bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#ff2a2a]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white border-2 border-black dark:border-white p-1 bg-white dark:bg-stone-800 hover:bg-[#ff2a2a] hover:text-white rounded-full transition-all cursor-pointer"
          id="contact-close-btn"
        >
          <X size={16} />
        </button>

        {/* Header Title */}
        <div className="mb-4" id="contact-head">
          <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
            <MessagesSquare className="text-[#ff2a2a]" size={22} />
            <span>Say Hello!</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Let's chat about a job opportunity, portfolio review, design tokens, or Stardew Valley.
          </p>
        </div>

        {/* Content Box with Scrollbar separation */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 scrollbar-thin">
          
          {/* Submit Success Toast */}
          {isSuccess && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 rounded-xl p-3 flex items-start gap-2.5 animate-bounce">
              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">Message logged inside the guestbook!</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Your mock submission is recorded and immediately populated below.</p>
              </div>
            </div>
          )}

          {/* Core Form */}
          <form onSubmit={handleSubmit} className="space-y-3" id="contact-form-element">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-stone-500 dark:text-stone-400">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full border-2 border-black dark:border-white px-3 py-1.5 rounded-lg text-xs bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-850 focus:ring-1 focus:ring-[#ff2a2a] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase text-stone-500 dark:text-stone-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@computing.org"
                  className="w-full border-2 border-black dark:border-white px-3 py-1.5 rounded-lg text-xs bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-850 focus:ring-1 focus:ring-[#ff2a2a] outline-none"
                />
              </div>
            </div>

            {/* Selector Categories */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase text-stone-500 dark:text-stone-400">Subject / Intent</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: "hire", label: "Hire me", icon: CheckCircle },
                  { id: "collab", label: "Collaborate", icon: MessagesSquare },
                  { id: "coffee", label: "Coffee run", icon: Coffee },
                  { id: "hello", label: "Say hi!", icon: Send }
                ].map((item) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setCategory(item.id as any)}
                      className={`flex items-center justify-center gap-1.5 border-2 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        category === item.id
                          ? "bg-[#ff2a2a] text-white border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] -translate-x-0.5 -translate-y-0.5"
                          : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-black dark:hover:border-white"
                      }`}
                    >
                      <IconComp size={10} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase text-stone-500 dark:text-stone-400">Your Message</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your note here... Let me know what you think of my portfolio redesign!"
                className="w-full border-2 border-black dark:border-white p-2.5 rounded-lg text-xs bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:bg-white dark:focus:bg-stone-850 focus:ring-1 focus:ring-[#ff2a2a] outline-none resize-none"
              />
            </div>

            {/* Submit Banner Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border-2 border-black dark:border-white bg-black dark:bg-[#ff2a2a] text-white hover:bg-[#ff2a2a] dark:hover:bg-white hover:text-black dark:hover:text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] rounded-xl py-2 text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1.5 select-none transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>transmitting...</span>
              ) : (
                <>
                  <Send size={12} />
                  <span>Send Message & Sign Guestbook</span>
                </>
              )}
            </button>
          </form>

          {/* Persistent guestbook review board */}
          <div className="space-y-2 border-t-2 border-dotted border-stone-200 dark:border-stone-700 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-mono font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Live Portfolio Guestbook ({submissions.length})
              </h3>
              <div className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {submissions.map((sub) => (
                <div 
                  key={sub.id} 
                  className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2 rounded-lg text-[10px] space-y-1"
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-stone-400">
                    <span className="font-extrabold text-stone-800 dark:text-stone-200">{sub.name}</span>
                    <span className="text-[#ff2a2a] font-bold">
                      {sub.category === "coffee" ? "☕ Cafe Chat" : sub.category === "hire" ? "💼 Opportunity" : "✉ Hello"}
                    </span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 leading-normal">{sub.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
