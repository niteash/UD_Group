import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const TypingIndicator = () => (
  <div className="flex space-x-1.5 p-1 items-center h-5">
    <motion.div
      className="w-1.5 h-1.5 bg-[#B89851] rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0,
      }}
    />
    <motion.div
      className="w-1.5 h-1.5 bg-[#B89851] rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    />
    <motion.div
      className="w-1.5 h-1.5 bg-[#B89851] rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
    />
  </div>
);

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Welcome to Amara Garden City. I am your Virtual Concierge. How may I assist you today with information about Amarapura, our sustainability commitments, or the project itself?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, history }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-[#1a1a1a] text-[#B89851] shadow-xl backdrop-blur-sm transition-transform hover:bg-neutral-50 dark:hover:bg-[#2a2a2a] hover:scale-110 active:scale-95 border border-[#B89851]/20 dark:border-[#B89851]/40"
            aria-label="Open Virtual Concierge"
          >
            <MessageSquare className="h-6 w-6" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 flex flex-col w-full sm:w-[420px] h-[100dvh] bg-[#fafafa] dark:bg-[#0a0a0a] shadow-2xl border-l border-[#B89851]/30 transition-colors duration-500"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-[#B89851]/20 shrink-0 transition-colors duration-500">
              <div>
                <h3 className="font-sans font-medium text-base tracking-[0.15em] text-[#B89851]">
                  VIRTUAL CONCIERGE
                </h3>
                <p className="text-[10px] text-neutral-500 dark:text-white/60 uppercase tracking-[0.2em] mt-1 transition-colors duration-500">
                  Amara Garden City AI
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full transition-colors text-neutral-500 dark:text-white/80 hover:text-neutral-900 dark:hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-4 text-[15px] font-light leading-relaxed transition-colors duration-500 ${
                      msg.role === "user"
                        ? "bg-neutral-900 dark:bg-[#B89851] text-white dark:text-[#121212] rounded-2xl rounded-br-sm shadow-md"
                        : "bg-white dark:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-[#B89851]/20 rounded-2xl rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`text-[9px] mt-2 uppercase tracking-widest px-1 font-medium transition-colors duration-500 ${msg.role === "user" ? "text-neutral-400 dark:text-neutral-500" : "text-[#B89851]"}`}
                  >
                    {msg.role === "user" ? "You" : "Concierge"}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#B89851]/20 rounded-2xl rounded-bl-sm shadow-sm px-6 py-4 transition-colors duration-500">
                    <TypingIndicator />
                  </div>
                  <span className="text-[9px] text-[#B89851] mt-2 uppercase tracking-widest px-1 font-medium transition-colors duration-500">
                    Concierge typing...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white dark:bg-[#121212] border-t border-neutral-200 dark:border-[#B89851]/20 shrink-0 transition-colors duration-500">
              <form onSubmit={handleSubmit} className="flex gap-3 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Amara Garden City..."
                  className="flex-1 bg-[#fafafa] dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#B89851]/30 rounded-full pl-5 pr-12 py-3.5 text-[15px] text-neutral-900 dark:text-white focus:outline-none focus:border-[#B89851] focus:ring-1 focus:ring-[#B89851]/20 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1.5 bg-neutral-900 dark:bg-[#B89851] text-white dark:text-[#1a1a1a] h-10 w-10 rounded-full hover:bg-[#B89851] dark:hover:bg-white hover:text-white dark:hover:text-neutral-900 transition-colors disabled:opacity-50 flex items-center justify-center shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
