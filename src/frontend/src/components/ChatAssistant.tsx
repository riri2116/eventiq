import type { ChatMessage } from "@/types";
import { MessageCircle, Send, X, HelpCircle } from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BotEntry {
  patterns: string[];
  reply: string;
  suggestions?: string[];
}

const KB: BotEntry[] = [
  {
    patterns: ["hello", "hi", "hey", "hlo", "hii", "good morning", "good evening", "namaste", "start"],
    reply: "Hello! Welcome to EventIQ — Dehradun's event planning platform. I can help you plan events, find vendors, understand pricing, or navigate the app. What would you like to know?",
    suggestions: ["How do I plan an event?", "What vendors are available?", "How does pricing work?"],
  },
  {
    patterns: ["what is eventiq", "about eventiq", "tell me about", "what do you do", "what is this"],
    reply: "EventIQ is Dehradun's event planning platform. You fill in your event details, we match you with verified local vendors across 16 service categories, and generate 3 budget-fit plans — Best Fit, Recommended, and Budget. Everything from weddings to corporate conferences.",
    suggestions: ["What categories do you cover?", "How do I get started?", "Is it free?"],
  },
  {
    patterns: ["how", "plan", "generate", "work", "use", "get started", "start planning"],
    reply: "Here's how it works in 3 steps:\n1. Go to the Planning page and fill in event name, type, date, locality, and guest count.\n2. Hit Generate Plan — we create 3 options tailored to your budget.\n3. Save the plan you like to your Dashboard.",
    suggestions: ["How do I save a plan?", "What event types are supported?", "Can I edit a plan?"],
  },
  {
    patterns: ["category", "categories", "service", "services", "types of service", "what services"],
    reply: "We cover 16 service categories across Dehradun:\nVenue, Catering, Photography, Music & DJ, Decoration, Cake, Makeup, Transportation, Entertainment, Printing, AV & Lighting, Coordination, Cleaning, Floral, Anchoring, and Gifting.",
    suggestions: ["How are vendors selected?", "Can I choose specific vendors?", "What's the cheapest venue?"],
  },
  {
    patterns: ["vendor", "vendors", "who are", "supplier", "suppliers", "business"],
    reply: "We have 100+ verified vendors across Dehradun covering all 16 service categories. Each vendor has a rating, price range, and locality tag so you can compare easily. The platform matches vendors to your budget and event type automatically.",
    suggestions: ["How do I register as a vendor?", "Are vendors verified?", "How are vendors rated?"],
  },
  {
    patterns: ["register", "sign up", "signup", "create account", "join", "become vendor", "list business", "vendor registration"],
    reply: "To register:\n- As a user: Click Sign Up in the top menu and fill in your details.\n- As a vendor: During signup, check the 'Register as Vendor' option — you'll get access to a Vendor Setup page to list your services, prices, and availability.",
    suggestions: ["What info do vendors need to provide?", "Is registration free?", "How do I log in?"],
  },
  {
    patterns: ["login", "log in", "sign in", "signin", "password", "forgot password", "reset", "account"],
    reply: "Click **Login** in the top navigation. Your session is securely stored in your browser. If you forget your password, you can create a fresh account — data is stored locally per device.",
    suggestions: ["How do I sign up?", "Where are my saved plans?", "Can I use on multiple devices?"],
  },
  {
    patterns: ["save", "saved", "saving", "store", "keep plan", "my plan"],
    reply: "To save a plan:\n1. Generate a plan on the Planning page.\n2. Click **Save Plan** on any of the 3 plan cards.\n3. If not logged in, a login prompt will appear first.\n4. View all saved plans in your **Dashboard**!",
    suggestions: ["Where is my dashboard?", "How many plans can I save?", "Can I delete a plan?"],
  },
  {
    patterns: ["dashboard", "my dashboard", "saved plans", "history", "my events"],
    reply: "Your **Dashboard** shows all your saved event plans with vendor details, total costs, and the date they were saved. Log in first, then click **Dashboard** in the top navigation menu.",
    suggestions: ["How do I save a plan?", "Can I edit saved plans?", "How do I delete a plan?"],
  },
  {
    patterns: ["budget", "cost", "price", "pricing", "how much", "expensive", "cheap", "affordable", "rate", "charges", "fee"],
    reply: "EventIQ generates 3 plans for every event:\n- Best Fit — optimized quality and value within your budget\n- Recommended — balanced mid-range option\n- Budget — most affordable vendors\n\nYou set your budget during planning and we fit vendors within it.",
    suggestions: ["What's the cheapest venue?", "What's the cheapest catering?", "Is EventIQ free to use?"],
  },
  {
    patterns: ["free", "charge", "subscription", "pay", "payment", "cost of eventiq", "platform fee"],
    reply: "EventIQ is completely free to use for event planners. You can browse vendors, generate unlimited plans, and save them — all at no cost. Vendors pay a small listing fee to appear on the platform.",
    suggestions: ["How do I get started?", "How do I register as a vendor?", "What vendors are available?"],
  },
  {
    patterns: ["venue", "hall", "banquet", "location", "place", "space"],
    reply: "We have venues across Dehradun including banquet halls, garden venues, rooftop spaces, and community centers. The most affordable starts at ₹3,000 (Community Center) while premium venues go up to ₹50,000+. Filter by locality and guest count on the Planning page!",
    suggestions: ["What localities are covered?", "How do I pick a venue?", "What other services do you offer?"],
  },
  {
    patterns: ["catering", "food", "menu", "caterer", "snacks", "meal", "buffet"],
    reply: "Our catering vendors cover everything from snacks to full multi-course meals. Prices start at ₹2,500 for simple setups (Local Bites) and go up for premium menus. You can specify dietary preferences during planning.",
    suggestions: ["What's the cheapest catering?", "How are menus selected?", "What other services are available?"],
  },
  {
    patterns: ["photography", "photo", "photographer", "videography", "video", "camera"],
    reply: "We have photography and videography vendors covering pre-event shoots, main event coverage, and post-event albums. Packages start from ₹5,000 for basic coverage. Cinematography and drone shots are also available with select vendors!",
    suggestions: ["How much does photography cost?", "What other services do you offer?"],
  },
  {
    patterns: ["decoration", "decor", "flowers", "floral", "theme", "setup", "stage"],
    reply: "Our decoration vendors cover stage setup, floral arrangements, lighting decor, theme setups, and table arrangements. Whether it's a grand wedding mandap or a simple birthday setup, we've got vendors for every scale and budget.",
    suggestions: ["How do I specify a theme?", "What's included in decoration packages?"],
  },
  {
    patterns: ["music", "dj", "band", "sound", "audio", "entertainment", "performer"],
    reply: "We have DJs, live bands, folk performers, and audio/visual setup vendors. DJ packages start from ₹4,000 for 4 hours. Live bands and anchoring services are also available for corporate and wedding events.",
    suggestions: ["What entertainment types are available?", "How do I book a DJ?"],
  },
  {
    patterns: ["wedding", "shaadi", "marriage", "bride", "groom", "baraat"],
    reply: "EventIQ covers all wedding needs — venue, catering, decoration, photography, makeup, mehendi, baraat, and more. Our wedding plans include full vendor matching across all the categories you need.",
    suggestions: ["What vendors do I need for a wedding?", "How much does a wedding cost?", "How do I plan my wedding?"],
  },
  {
    patterns: ["birthday", "bday", "party", "celebration", "anniversary"],
    reply: "Planning a birthday or anniversary? EventIQ matches you with cake vendors, decoration teams, caterers, photographers, and entertainers — all within your budget. You can plan for intimate gatherings of 20 or large parties of 500+.",
    suggestions: ["What's the budget for a birthday party?", "What vendors do I need for a party?"],
  },
  {
    patterns: ["corporate", "office", "company", "business event", "seminar", "conference", "meeting", "summit"],
    reply: "For corporate events, we cover conference venues, AV & lighting, catering, coordination, printing, and transportation. Whether it's a 10-person board meeting or a 500-person conference, we generate the right vendor plan.",
    suggestions: ["What venues are good for corporate events?", "Do you provide AV equipment?"],
  },
  {
    patterns: ["locality", "area", "location", "place in dehradun", "where", "rajpur", "gms", "sahastradhara", "clement", "dalanwala"],
    reply: "We cover 20+ localities in Dehradun including Rajpur Road, GMS Road, Sahastradhara, Clement Town, Dalanwala, Patel Nagar, Race Course, Ballupur, Jakhan, Raipur, and more. Select your preferred area when generating a plan.",
    suggestions: ["What venues are near Rajpur Road?", "How do I filter by locality?"],
  },
  {
    patterns: ["rating", "review", "rated", "best vendor", "top vendor", "recommend"],
    reply: "Every vendor on EventIQ has a **star rating** (1–5) based on past event performance. The Best Fit plan automatically prioritises highly-rated vendors within your budget. You can see vendor ratings on each plan card.",
    suggestions: ["How are vendors rated?", "How do I see vendor details?"],
  },
  {
    patterns: ["guest", "guests", "people", "head count", "how many", "capacity", "attendees"],
    reply: "You specify the expected guest count when filling in event details. We then match venues and catering based on capacity. Options are available for small gatherings (20–50), medium events (50–200), and large events (200–1000+).",
    suggestions: ["What venues hold 500 guests?", "How does guest count affect pricing?"],
  },
  {
    patterns: ["date", "time", "when", "availability", "book", "schedule"],
    reply: "You pick your event date during plan generation. While EventIQ doesn't do real-time availability booking yet, saved plan details (including your chosen date) are stored so you can contact vendors directly to confirm availability.",
    suggestions: ["How do I contact a vendor?", "Can I change the date later?"],
  },
  {
    patterns: ["contact", "reach", "call", "phone", "email", "support", "help"],
    reply: "For vendor contact details, generate and save a plan — vendor info is included in your saved plan on the Dashboard. For platform support, you can reach the EventIQ team through the contact details on the About page.",
    suggestions: ["Where is my dashboard?", "How do I save a plan?"],
  },
  {
    patterns: ["edit", "change", "modify", "update plan", "redo"],
    reply: "Currently, generated plans can't be edited directly — but you can go back to the Planning page, tweak your inputs (budget, guest count, locality), and regenerate a fresh set of 3 plans instantly. It only takes seconds!",
    suggestions: ["How do I regenerate a plan?", "Can I delete a saved plan?"],
  },
  {
    patterns: ["delete", "remove", "clear", "cancel"],
    reply: "To delete a saved plan, go to your **Dashboard**, find the plan you want to remove, and click the delete/remove option on the plan card. This removes it from your local browser storage.",
    suggestions: ["Where is my dashboard?", "How do I save a new plan?"],
  },
  {
    patterns: ["dark mode", "light mode", "theme", "night mode", "appearance"],
    reply: "EventIQ supports both light and dark mode. Click the theme toggle button in the top navigation bar to switch between them. Your preference is remembered for future visits.",
    suggestions: ["How do I navigate the app?", "What other features are there?"],
  },
  {
    patterns: ["navigate", "menu", "pages", "sections", "where to find", "navigation"],
    reply: "The main navigation has:\n- Home — explore features\n- Planning — generate event plans\n- Vendors — browse all vendors\n- Dashboard — your saved plans\n- Profile — account settings\n\nAll accessible from the top menu bar.",
    suggestions: ["How do I plan an event?", "How do I see vendors?"],
  },
  {
    patterns: ["how many vendor", "number of vendor", "total vendor", "vendor count"],
    reply: "EventIQ currently has **100+ verified vendors** across Dehradun, spread across all 16 service categories. New vendors are regularly added as more businesses join the platform!",
    suggestions: ["What categories do you cover?", "How are vendors selected?"],
  },
  {
    patterns: ["thank", "thanks", "great", "good", "awesome", "helpful", "nice", "perfect", "wonderful"],
    reply: "Happy to help! Is there anything else you'd like to know about planning your event?",
    suggestions: ["How do I plan an event?", "What vendors are available?", "Is EventIQ free?"],
  },
  {
    patterns: ["bye", "goodbye", "ok", "okay", "done", "that's all", "thats all"],
    reply: "Best of luck with your event planning. Feel free to ask anything anytime — I'm always here.",
    suggestions: ["Plan a new event", "Browse vendors"],
  },
];

const SUGGESTIONS_DEFAULT = [
  "How do I plan an event?",
  "What vendors are available?",
  "Is EventIQ free?",
  "What areas do you cover?",
];

const FALLBACK_REPLY =
  "I'm not sure about that — but here are some things I can help with! Feel free to ask about planning events, finding vendors, pricing, localities, saving plans, or navigating the app. 😊";

function getBotEntry(input: string): BotEntry {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.patterns.some((p) => lower.includes(p))) return entry;
  }
  return { patterns: [], reply: FALLBACK_REPLY, suggestions: SUGGESTIONS_DEFAULT };
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(SUGGESTIONS_DEFAULT);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hi! 👋 I'm your EventIQ assistant. I can help you plan events, find vendors, answer pricing questions, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function sendMessage(text?: string) {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setCurrentSuggestions([]);

    setTimeout(() => {
      const entry = getBotEntry(trimmed);
      const botMsg: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: entry.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      setCurrentSuggestions(entry.suggestions ?? SUGGESTIONS_DEFAULT);
    }, 800 + Math.random() * 400);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="w-80 bg-card border border-border rounded-2xl shadow-elevated flex flex-col overflow-hidden"
            style={{ height: 460 }}
            data-ocid="chat.dialog"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border" style={{ background: "var(--primary)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
                  <HelpCircle size={14} color="#fff" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white leading-none">EventIQ Assistant</div>
                  <div className="text-xs text-white/70 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
                data-ocid="chat.close_button"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-1">
                      <HelpCircle size={11} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <HelpCircle size={11} className="text-primary" />
                  </div>
                  <div className="bg-muted px-3 py-2.5 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 block"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isTyping && currentSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="text-xs px-2.5 py-1 rounded-full border border-primary/25 text-primary bg-primary/5 hover:bg-primary/12 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="px-3 py-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 text-xs bg-muted border border-input rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
                data-ocid="chat.input"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                className="bg-primary text-primary-foreground p-2 rounded-xl hover:bg-primary/90 transition-smooth"
                aria-label="Send message"
                data-ocid="chat.send_button"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-elevated flex items-center justify-center"
        aria-label="Open chat assistant"
        data-ocid="chat.open_modal_button"
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} /></motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><MessageCircle size={22} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
