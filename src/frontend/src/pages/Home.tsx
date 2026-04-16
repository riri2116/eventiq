import { FloatingBlobs } from "@/components/FloatingBlobs";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─── Data ─────────────────────────────────────────────────── */

const EVENT_TAGS = [
  {
    label: "Weddings 💍",
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },
  {
    label: "Conferences 🎤",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    label: "Birthday Parties 🎂",
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    label: "Corporate Events 🏢",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    label: "Cultural Programs 🎭",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    label: "Reunions 🤝",
    color: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  },
  {
    label: "Baby Showers 👶",
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },
  {
    label: "Anniversary Parties 🥂",
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    label: "Graduations 🎓",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    label: "Music Concerts 🎵",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
];

const HOW_WE_WORK_STEPS = [
  "Tell us about your event",
  "Set your budget & guest count",
  "Choose vendor categories",
  "Get 3 tailored plans instantly",
];

const DIFFERENTIATORS = [
  "No algorithms, no waiting",
  "Instant local vendor matching",
  "Transparent pricing breakdowns",
  "Dehradun-focused vendor network",
  "Zero loading wait — fully offline",
];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Plans",
    desc: "Generate three tailored event plans — Best Fit, Standard, and Budget — in under a second. No waiting, no API calls.",
    color: "bg-yellow-500/10 text-yellow-400",
  },
  {
    icon: MapPin,
    title: "Local Vendors",
    desc: "Curated vendor network across Dehradun covering venues, caterers, photographers, decorators, DJs, and florists.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Zero Fees",
    desc: "EventIQ is completely free to use. No hidden charges, no premium upsells — just smart planning for everyone.",
    color: "bg-green-500/10 text-green-400",
  },
];

/* ─── Scroll-fade hook ──────────────────────────────────────── */

function useScrollFade(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Scroll-fade text item ─────────────────────────────────── */

function FadeItem({
  text,
  delay,
  bullet,
}: { text: string; delay: number; bullet?: React.ReactNode }) {
  const { ref, visible } = useScrollFade(0.1);
  return (
    <div
      ref={ref}
      className="flex items-start gap-3 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {bullet ?? <Star size={14} className="text-secondary mt-1 shrink-0" />}
      <span className="text-sm text-muted-foreground leading-relaxed">
        {text}
      </span>
    </div>
  );
}

/* ─── Marquee component ─────────────────────────────────────── */

function EventMarquee() {
  const doubled = [...EVENT_TAGS, ...EVENT_TAGS];
  return (
    <div className="overflow-hidden relative" aria-hidden="true">
      <div
        className="flex gap-2 w-max"
        style={{ animation: "marquee-scroll 18s linear infinite" }}
      >
        {doubled.map((tag, i) => (
          <span
            key={`fwd-${tag.label}-${i}`}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap ${tag.color}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <div
        className="flex gap-2 w-max mt-2"
        style={{ animation: "marquee-scroll 22s linear infinite reverse" }}
      >
        {[...doubled].reverse().map((tag, i) => (
          <span
            key={`rev-${tag.label}-${i}`}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap ${tag.color}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Curtain overlay ───────────────────────────────────────── */

function CurtainOverlay({ onDismiss }: { onDismiss: () => void }) {
  const [hiding, setHiding] = useState(false);

  function handleStart() {
    setHiding(true);
    setTimeout(onDismiss, 600);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(4, 9, 20, 0.92)",
        backdropFilter: "blur(6px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: hiding ? 0 : 1,
        transform: hiding ? "scale(0.97)" : "scale(1)",
        pointerEvents: hiding ? "none" : "auto",
      }}
      data-ocid="curtain.overlay"
    >
      {/* Decorative blobs inside curtain */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 30%, #4FC3F7, #3B82F6)",
          top: "10%",
          left: "5%",
          filter: "blur(60px)",
          animation: "blob-float 18s infinite alternate ease-in-out",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 70%, #FF8A65, #F97316)",
          bottom: "12%",
          right: "8%",
          filter: "blur(50px)",
          animation: "blob-float 22s infinite alternate-reverse ease-in-out",
        }}
      />

      {/* Glass card */}
      <div
        className="relative flex flex-col items-center text-center px-12 py-12 rounded-3xl max-w-md mx-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 32px 64px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
          }}
        >
          <Zap size={26} style={{ color: "#4FC3F7" }} />
        </div>

        <h1
          className="font-display font-bold text-3xl mb-2"
          style={{ color: "#F8FAFC" }}
        >
          EventIQ
        </h1>
        <p className="text-sm mb-1" style={{ color: "rgba(248,250,252,0.6)" }}>
          Plan Smart. Execute Perfect.
        </p>
        <p
          className="text-xs mb-8 leading-relaxed"
          style={{ color: "rgba(248,250,252,0.4)" }}
        >
          Dehradun's intelligent event planning companion
        </p>

        <button
          type="button"
          data-ocid="curtain.start_button"
          onClick={handleStart}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-display font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #4FC3F7)",
            color: "#fff",
            boxShadow: "0 8px 24px -4px rgba(59,130,246,0.5)",
            border: "none",
          }}
        >
          Start Planning <ArrowRight size={18} />
        </button>

        <p className="text-xs mt-5" style={{ color: "rgba(248,250,252,0.3)" }}>
          We Welcome You
        </p>
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────── */

export function HomePage() {
  const [curtainVisible, setCurtainVisible] = useState(() => {
    try {
      return sessionStorage.getItem("eventiq-curtain-seen") !== "true";
    } catch {
      return true;
    }
  });

  function dismissCurtain() {
    setCurtainVisible(false);
    try {
      sessionStorage.setItem("eventiq-curtain-seen", "true");
    } catch {
      /* noop */
    }
  }

  return (
    <>
      {/* Curtain overlay */}
      {curtainVisible && <CurtainOverlay onDismiss={dismissCurtain} />}

      <Layout>
        {/* ── HERO ──────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden bg-background"
          data-ocid="hero.section"
        >
          <FloatingBlobs />

          <div className="container mx-auto px-8 py-28 relative z-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <Badge
                  variant="outline"
                  className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 text-primary bg-primary/5"
                >
                  <Zap size={12} className="mr-1.5" />
                  Dehradun's Smart Event Planner
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="font-display font-bold text-5xl md:text-7xl text-foreground leading-[1.06] tracking-tight mb-6"
              >
                Plan Smart.
                <br />
                <span className="text-primary">Execute Perfect.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg"
              >
                Your intelligent event planning companion. From intimate
                gatherings to grand celebrations — powered by local vendor
                intelligence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/signup" data-ocid="hero.create_account_button">
                  <Button
                    size="lg"
                    className="gap-2 px-8 shadow-elevated font-semibold"
                  >
                    Create Account <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/planning" data-ocid="hero.start_planning_button">
                  <Button size="lg" variant="outline" className="gap-2 px-8">
                    Start Planning <ChevronRight size={18} />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── DYNAMIC 3-COLUMN SECTION ──────────────────────── */}
        <section className="bg-muted/30 py-24" data-ocid="motion.section">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-16"
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Everything you need, right here
              </h2>
              <p className="text-muted-foreground text-lg">
                Smart planning for every occasion
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10 items-start">
              {/* Col 1 — How We Work */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Workflow size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-6">
                  How We Work
                </h3>
                <div className="space-y-4">
                  {HOW_WE_WORK_STEPS.map((step, i) => (
                    <FadeItem
                      key={step}
                      text={step}
                      delay={i * 120}
                      bullet={
                        <span className="font-display font-bold text-lg text-primary/30 leading-none mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Col 2 — What Makes Us Different */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                  <Sparkles size={20} className="text-secondary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-6">
                  What Makes Us Different
                </h3>
                <div className="space-y-4">
                  {DIFFERENTIATORS.map((item, i) => (
                    <FadeItem key={item} text={item} delay={i * 100} />
                  ))}
                </div>
              </div>

              {/* Col 3 — Event Types Marquee */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5">
                  <Star size={20} className="text-purple-400" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-6">
                  Event Types
                </h3>
                <EventMarquee />
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────── */}
        <section className="bg-background py-24" data-ocid="features.section">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-14"
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Built for real events
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                From intimate gatherings to grand galas — EventIQ handles the
                complexity so you don't have to.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-elevated hover:scale-[1.02] transition-smooth"
                  data-ocid={`features.card.${i + 1}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feat.color}`}
                  >
                    <feat.icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────────────────── */}
        <section className="bg-muted/30 py-20" data-ocid="cta.section">
          <div className="container mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Ready to start planning?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto">
                We Welcome You — start planning your perfect event today.
              </p>
              <Link to="/signup" data-ocid="cta.get_started_button">
                <Button
                  size="lg"
                  className="gap-2 px-10 shadow-elevated font-semibold"
                >
                  Get Started Free <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
