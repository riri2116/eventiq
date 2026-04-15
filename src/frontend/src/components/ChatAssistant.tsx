import type { ChatMessage } from "@/types";
import { MessageCircle, Send, X } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

const CHAT_RESPONSES: Array<{ patterns: string[]; reply: string }> = [
  {
    patterns: ["save", "plan", "store"],
    reply:
      "Click the 'Save Plan' button on the Best Fit plan card! If you're not logged in, a login modal will appear first.",
  },
  {
    patterns: ["cheap", "cheapest", "affordable", "budget", "venue"],
    reply:
      "Based on our data, the Community Center is the most affordable venue at ₹3,000. Local Bites for catering starts at just ₹2,500!",
  },
  {
    patterns: ["password", "forgot", "reset", "login problem"],
    reply:
      "You can create a new account on the Signup page. We store your session securely in your browser.",
  },
  {
    patterns: ["vendor", "register", "business", "list"],
    reply:
      "During Signup, check 'Register as Vendor' to access the Vendor Setup page where you can list your services and pricing.",
  },
  {
    patterns: ["plan", "how", "generate", "work"],
    reply:
      "Fill in your event details on the Planning page and submit. We'll instantly generate 3 plan options — Best Fit, Standard, and Least Fit — based on your budget!",
  },
  {
    patterns: ["dashboard"],
    reply:
      "Your saved plans are on the Dashboard. Log in first, then navigate to Dashboard from the top menu.",
  },
  {
    patterns: ["hello", "hi", "hey", "greet"],
    reply:
      "Hello! 👋 I'm your EventIQ planning assistant. Ask me anything about planning your event, saving plans, or navigating the app!",
  },
  {
    patterns: ["dehradun", "location", "local", "venue near"],
    reply:
      "EventIQ specializes in Dehradun events with vendors across Rajpur Road, GMS Road, Sahastradhara, and 20+ more localities!",
  },
];

const FALLBACK_REPLY =
  "I'm not sure about that yet! Try asking about saving plans, finding vendors, registering your business, or how plan generation works.";

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const { patterns, reply } of CHAT_RESPONSES) {
    if (patterns.some((p) => lower.includes(p))) return reply;
  }
  return FALLBACK_REPLY;
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "Hi! 👋 I'm your EventIQ assistant. Ask me about saving plans, finding vendors, or navigating the app!",
      timestamp: new Date(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen]);

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    const botMsg: ChatMessage = {
      id: makeId(),
      role: "assistant",
      content: getBotReply(trimmed),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className="w-80 bg-card border border-border rounded-2xl shadow-elevated flex flex-col overflow-hidden"
          style={{ height: "420px" }}
          data-ocid="chat.dialog"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-display font-semibold text-sm text-foreground">
                EventIQ Assistant
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close chat"
              data-ocid="chat.close_button"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 text-sm bg-muted border border-input rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
              data-ocid="chat.input"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-smooth"
              aria-label="Send message"
              data-ocid="chat.send_button"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-105 active:scale-95 transition-smooth"
        aria-label="Open chat assistant"
        data-ocid="chat.open_modal_button"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
