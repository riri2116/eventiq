import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarDays,
  CheckSquare,
  Coins,
  FileText,
  Flame,
  Handshake,
  MapPin,
  Scale,
  Sparkles,
  Star,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const EVENT_TAGS = [
  {
    label: "Weddings 💍",
    color: "bg-pink-100 text-pink-700 border-pink-300",
  },
  {
    label: "Conferences 🎤",
    color: "bg-slate-200 text-slate-800 border-slate-400",
  },
  {
    label: "Birthday Parties 🎂",
    color: "bg-orange-100 text-orange-700 border-orange-300",
  },
  {
    label: "Corporate Events 🏢",
    color: "bg-slate-200 text-slate-800 border-slate-400",
  },
  {
    label: "Cultural Programs 🎭",
    color: "bg-purple-100 text-purple-700 border-purple-300",
  },
  {
    label: "Reunions 🤝",
    color: "bg-teal-100 text-teal-700 border-teal-300",
  },
  {
    label: "Baby Showers 👶",
    color: "bg-pink-100 text-pink-700 border-pink-300",
  },
  {
    label: "Anniversary Parties 🥂",
    color: "bg-rose-100 text-rose-700 border-rose-300",
  },
  {
    label: "Graduations 🎓",
    color: "bg-indigo-100 text-indigo-700 border-indigo-300",
  },
  {
    label: "Music Concerts 🎵",
    color: "bg-purple-100 text-purple-700 border-purple-300",
  },
];

const DIFFERENTIATORS = [
  "No algorithms, no waiting",
  "Instant local vendor matching",
  "Transparent pricing breakdowns",
  "Dehradun-focused vendor network",
];

const HOW_IT_WORKS_CARDS = [
  {
    emoji: "🗣️",
    step: "01",
    title: "Tell Us",
    desc: "Share your event type, date and location",
    color: "bg-primary/20",
  },
  {
    emoji: "💰",
    step: "02",
    title: "Set Budget",
    desc: "Define your min and max budget range",
    color: "bg-amber-100",
  },
  {
    emoji: "🤝",
    step: "03",
    title: "Choose Vendors",
    desc: "Select the services you need",
    color: "bg-green-100",
  },
  {
    emoji: "🎉",
    step: "04",
    title: "Get Plans",
    desc: "Receive 3 tailored plans instantly",
    color: "bg-purple-100",
  },
];

const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=600&fit=crop&auto=format",
    label: "Wedding Ceremony",
    tag: "Premium Venues",
  },
  {
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop&auto=format",
    label: "Music Festival",
    tag: "Music & Concerts",
  },
  {
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=600&fit=crop&auto=format",
    label: "Corporate Conference",
    tag: "Corporate Events",
  },
  {
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&h=600&fit=crop&auto=format",
    label: "Kids Birthday Party",
    tag: "Birthday Parties",
  },
  {
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&h=600&fit=crop&auto=format",
    label: "Anniversary Gala",
    tag: "Anniversary Events",
  },
  {
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&h=600&fit=crop&auto=format",
    label: "Indian Wedding Reception",
    tag: "Weddings & Sangeet",
  },
  {
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&h=600&fit=crop&auto=format",
    label: "Outdoor Sports Event",
    tag: "Sports & Marathons",
  },
  {
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&h=600&fit=crop&auto=format",
    label: "Luxury Cocktail Night",
    tag: "Night Events",
  },
];

const LOCAL_SPOTLIGHT = [
  {
    name: "The Grand Himalayan Hall",
    category: "Banquet Hall",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=500&fit=crop&auto=format",
  },
  {
    name: "Rajpur Road Convention",
    category: "Convention Centre",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop&auto=format",
  },
  {
    name: "Sahastradhara Garden",
    category: "Garden Venue",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=500&fit=crop&auto=format",
  },
  {
    name: "Paltan Bazaar Terrace",
    category: "Rooftop Party",
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop&auto=format",
  },
  {
    name: "Dehradun Cantt Club",
    category: "Club Venue",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop&auto=format",
  },
  {
    name: "Clement Town Lawns",
    category: "Outdoor Venue",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=500&fit=crop&auto=format",
  },
];

const CATEGORY_TAGS = [
  {
    label: "Weddings",
    emoji: "💍",
    color: "bg-pink-100 text-pink-700 border-pink-300 hover:bg-pink-200",
  },
  {
    label: "Birthdays",
    emoji: "🎂",
    color: "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200",
  },
  {
    label: "Corporate Events",
    emoji: "💼",
    color: "bg-slate-200 text-slate-800 border-slate-400 hover:bg-slate-300",
  },
  {
    label: "Music Concerts",
    emoji: "🎵",
    color: "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200",
  },
  {
    label: "Cultural Programs",
    emoji: "🎭",
    color: "bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200",
  },
  {
    label: "Exhibitions",
    emoji: "🖼",
    color: "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200",
  },
  {
    label: "Parties",
    emoji: "🎉",
    color: "bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200",
  },
];

function CurtainOverlay({ onDismiss }: { onDismiss: () => void }) {
  const [hiding, setHiding] = useState(false);

  function handleStart() {
    setHiding(true);
    setTimeout(onDismiss, 700);
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        transition: "opacity 0.7s ease",
        opacity: hiding ? 0 : 1,
        pointerEvents: hiding ? "none" : "auto",
        background:
          "radial-gradient(ellipse at 30% 60%, #e8d5b7 0%, #d4c5a0 30%, #b8cede 65%, #8faec5 100%)",
      }}
      data-ocid="curtain.overlay"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          width: 340, height: 340,
          top: -80, right: -80,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #a8c8e0, #6a9bbf 55%, #4a7fa8)",
          opacity: 0.82,
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 380, height: 380,
          bottom: -120, left: -100,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 30%, #f5e8d0, #e0cba8 55%, #c9b48a)",
          opacity: 0.9,
          filter: "blur(3px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 110, height: 110,
          top: "38%", left: "8%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #c4daea, #7aaac8)",
          opacity: 0.7,
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 70, height: 70,
          bottom: "18%", right: "14%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #f0ddb8, #d4b882)",
          opacity: 0.75,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-2.5 mb-8"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, #5b8db8, #3d6e96)",
              boxShadow: "0 4px 14px rgba(61,110,150,0.4)",
            }}
          >
            <CalendarDays size={20} color="#fff" />
          </div>
          <span
            className="font-display font-bold text-xl"
            style={{ color: "#2c4a62" }}
          >
            EventIQ
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black leading-tight mb-5"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#1e3448" }}
        >
          Plan.{" "}
          <span style={{ color: "#4a7fa8" }}>Perfect.</span>
          {" "}Celebrate.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-base leading-relaxed max-w-xs mb-10"
          style={{ color: "#4a6070" }}
        >
          Your all-in-one platform for smart event planning
          and unforgettable experiences.
        </motion.p>

        <motion.button
          type="button"
          data-ocid="curtain.start_button"
          onClick={handleStart}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-9 py-3.5 rounded-full font-semibold text-base"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.75)",
            color: "#1e3448",
            boxShadow: "0 6px 24px rgba(90,140,180,0.18)",
            cursor: "pointer",
          }}
        >
          Get Started <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}

const CF_W = 80;
const CF_L = (100 - CF_W) / 2;

function getCoverflowStyle(offset: number): React.CSSProperties {
  const t =
    "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.65s ease, filter 0.65s ease";
  const abs = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;

  const base: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: `${CF_L}%`,
    width: `${CF_W}%`,
    height: "100%",
    transition: t,
    willChange: "transform, opacity",
  };

  if (offset === 0) return {
    ...base,
    transform: "perspective(900px) rotateY(0deg) scale(1)",
    opacity: 1, zIndex: 10, cursor: "default", filter: "none",
  };
  if (abs === 1) return {
    ...base,
    transform: `perspective(900px) translateX(${sign * 63}%) rotateY(${-sign * 44}deg) scale(0.87)`,
    opacity: 0.78, zIndex: 7, filter: "brightness(0.72)",
    cursor: "pointer",
  };
  if (abs === 2) return {
    ...base,
    transform: `perspective(900px) translateX(${sign * 110}%) rotateY(${-sign * 60}deg) scale(0.68)`,
    opacity: 0.35, zIndex: 4, filter: "brightness(0.5)",
    cursor: "pointer",
  };
  return {
    ...base,
    transform: `translateX(${sign * 160}%) scale(0.5)`,
    opacity: 0, zIndex: 1, pointerEvents: "none",
  };
}

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = HERO_SLIDES.length;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % n);
    }, 4200);
  }, [n]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const prev = () => { setCurrent((c) => (c - 1 + n) % n); resetTimer(); };
  const next = () => { setCurrent((c) => (c + 1) % n); resetTimer(); };
  const goTo = (i: number) => { setCurrent(i); resetTimer(); };

  return (
    <div className="w-full select-none">
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "290px" }}
      >
      {HERO_SLIDES.map((slide, i) => {
        let offset = i - current;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;
        const isActive = offset === 0;
        const style = getCoverflowStyle(offset);

        return (
          <div
            key={slide.label}
            style={style}
            onClick={() => !isActive && goTo(i)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && !isActive && goTo(i)
            }
            role={isActive ? undefined : "button"}
            tabIndex={isActive ? undefined : 0}
            data-ocid={isActive ? "hero.carousel_active_slide" : undefined}
          >
            <div
              className="w-full h-full rounded-2xl overflow-hidden"
              style={{
                boxShadow: isActive
                  ? "0 25px 50px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
                  : "0 6px 20px -4px rgba(0,0,0,0.35)",
              }}
            >
              <img
                src={slide.img}
                alt={slide.label}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-primary/80 text-white flex items-center justify-center backdrop-blur-sm transition-smooth z-30"
        aria-label="Previous slide"
        data-ocid="hero.carousel_prev"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-primary/80 text-white flex items-center justify-center backdrop-blur-sm transition-smooth z-30"
        aria-label="Next slide"
        data-ocid="hero.carousel_next"
      >
        <ArrowRight size={16} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={`dot-${slide.label}`}
            type="button"
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Go to slide ${i + 1}`}
            data-ocid={`hero.carousel_dot.${i + 1}`}
          />
        ))}
      </div>
      </div>

      <motion.div
        key={current}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-3 flex items-center gap-2.5"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/25 shrink-0">
          <Tag size={10} className="shrink-0" />
          {HERO_SLIDES[current].tag}
        </span>
        <p className="text-foreground font-display font-semibold text-base truncate">
          {HERO_SLIDES[current].label}
        </p>
      </motion.div>
    </div>
  );
}

function PlanMiniCard({
  icon: Icon,
  label,
  badge,
  badgeColor,
}: {
  icon: React.ElementType;
  label: string;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div className="flex-1 bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-2 shadow-soft hover:shadow-elevated transition-smooth hover:scale-[1.03]">
      <Icon size={20} className="text-muted-foreground" />
      <span className="text-xs font-semibold text-foreground text-center leading-tight">
        {label}
      </span>
      {badge && (
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function SpotlightCard({
  venue,
  index,
}: { venue: (typeof LOCAL_SPOTLIGHT)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth hover:scale-[1.02] cursor-pointer"
      style={{ aspectRatio: "4/3" }}
      data-ocid={`spotlight.card.${index + 1}`}
    >
      <img
        src={venue.img}
        alt={venue.name}
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.dataset.fallback !== "1") {
            target.dataset.fallback = "1";
            target.src =
              "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=500&fit=crop&auto=format";
          }
        }}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-display font-semibold text-sm leading-tight">
          {venue.name}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-white/70 text-xs">{venue.category}</span>
          <span className="flex items-center gap-1 bg-amber-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            <Star size={9} fill="white" />
            {venue.rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

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
    }
  }

  function handleTagClick() {
    navigate({ to: "/planning" });
  }

  return (
    <>
      {curtainVisible && <CurtainOverlay onDismiss={dismissCurtain} />}

      <Layout>
        <section
          className="relative overflow-hidden bg-background pt-8 pb-16"
          data-ocid="hero.section"
        >
          <div className="container mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-3 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge
                    variant="outline"
                    className="mb-3 px-3 py-1 text-xs font-medium border-primary/30 text-primary bg-primary/5"
                  >
                    <Zap size={10} className="mr-1.5" />
                    Dehradun's Smart Event Planner
                  </Badge>

                  <h1 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl text-foreground leading-[1.08] tracking-tight mb-3">
                    Plan Smart.
                    <br />
                    <span className="text-primary">Execute Perfect.</span>
                  </h1>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-lg mb-5">
                    Your dream event, perfectly planned with local Dehradun
                    vendors. Instant matching, transparent pricing.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Link to="/planning" data-ocid="hero.start_planning_button">
                      <Button
                        size="lg"
                        className="gap-2 px-7 shadow-elevated font-semibold"
                      >
                        Start Planning <ArrowRight size={17} />
                      </Button>
                    </Link>
                    {!isLoggedIn && (
                      <Link to="/signup" data-ocid="hero.create_account_button">
                        <Button
                          size="lg"
                          variant="outline"
                          className="gap-2 px-7"
                        >
                          See How It Works
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <HeroCarousel />
                </motion.div>
              </div>

              <motion.div
                className="lg:col-span-2 flex flex-col gap-4"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-1">
                  <p className="text-sm font-bold text-muted-foreground mt-0.5">
                    Four simple steps to your perfect event
                  </p>
                </div>

                {HOW_IT_WORKS_CARDS.map((card, i) => (
                  <motion.div
                    key={card.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 shadow-soft hover:shadow-elevated hover:border-primary/20 transition-smooth"
                    data-ocid={`how_it_works.card.${i + 1}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${card.color}`}
                    >
                      <span className="text-xl leading-none select-none">{card.emoji}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase">
                          Step {card.step}
                        </span>
                      </div>
                      <p className="font-display font-semibold text-sm text-foreground">
                        {card.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section
          className="bg-muted/30 py-16 border-y border-border"
          data-ocid="quick_plan.section"
        >
          <div className="container mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                Get your 3 Tailored Plans — Instantly!
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Tell us about your event and we'll match you with the best
                Dehradun vendors in seconds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-elevated max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  {
                    icon: Calendar,
                    label: "Event Type",
                    value: "Birthday, Wedding…",
                  },
                  {
                    icon: Coins,
                    label: "Budget Range",
                    value: "₹3K – Unlimited",
                  },
                  { icon: Users, label: "Guest Count", value: "10 to 1000+" },
                  {
                    icon: MapPin,
                    label: "Venue Location",
                    value: "Dehradun Areas",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 bg-muted/50 rounded-xl p-3 border border-border"
                  >
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <item.icon size={13} />
                      <span className="text-[11px] font-medium uppercase tracking-wide">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-foreground truncate">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/planning"
                data-ocid="quick_plan.get_plans_button"
                className="block"
              >
                <Button
                  size="lg"
                  className="w-full gap-2 shadow-elevated font-semibold text-base py-6"
                >
                  <Sparkles size={18} />
                  Get 3 Tailored Plans Instantly
                  <ArrowRight size={18} />
                </Button>
              </Link>

              <div className="flex gap-3 mt-5">
                <PlanMiniCard
                  icon={Star}
                  label="Premium"
                  badge="★ Recommended"
                  badgeColor="bg-green-500/20 text-green-600 dark:text-green-400"
                />
                <PlanMiniCard
                  icon={Scale}
                  label="Balanced"
                  badge="⚖ Best Value"
                  badgeColor="bg-primary/10 text-primary"
                />
                <PlanMiniCard
                  icon={Flame}
                  label="Budget"
                  badge="🔥 Most Savings"
                  badgeColor="bg-orange-500/10 text-orange-500"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-background py-16" data-ocid="spotlight.section">
          <div className="container mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={18} className="text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Local Spotlight
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                Top-Rated Dehradun Events &amp; Venues
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Handpicked venues trusted by hundreds of event planners across
                Dehradun
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
              {LOCAL_SPOTLIGHT.map((venue, i) => (
                <SpotlightCard key={venue.name} venue={venue} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-muted/30 py-16 border-y border-border"
          data-ocid="our_edge.section"
        >
          <div className="container mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                Our Edge
              </h2>
              <p className="text-muted-foreground text-sm">
                Why thousands choose EventIQ for their events
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                {
                  icon: Handshake,
                  color: "bg-primary/10 text-primary",
                  title: "Local Vendors",
                  desc: "Carefully curated vendors from Dehradun — real businesses, real reviews, real results.",
                  ocid: "our_edge.local_vendors_card",
                },
                {
                  icon: Zap,
                  color: "bg-green-500/10 text-green-500",
                  title: "Zero Fees",
                  desc: "No booking fees or commissions ever. EventIQ is completely free to use for everyone.",
                  ocid: "our_edge.zero_fees_card",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="bg-card border border-border rounded-2xl p-7 shadow-soft hover:shadow-elevated hover:border-primary/20 transition-smooth"
                  data-ocid={card.ocid}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
                  >
                    <card.icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mt-10"
            >
              {DIFFERENTIATORS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground"
                >
                  <Star size={11} className="text-primary" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-background py-16" data-ocid="categories.section">
          <div className="container mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                Find by Category
              </h2>
              <p className="text-muted-foreground text-sm">
                Browse events that match your occasion
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORY_TAGS.map((tag, i) => (
                <motion.button
                  key={tag.label}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  onClick={handleTagClick}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold cursor-pointer transition-smooth ${tag.color}`}
                  data-ocid={`categories.tag.${i + 1}`}
                >
                  <span>{tag.emoji}</span>
                  {tag.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-10 overflow-hidden relative" aria-hidden="true">
              <div
                className="flex gap-2 w-max"
                style={{ animation: "marquee-scroll 20s linear infinite" }}
              >
                {[...EVENT_TAGS, ...EVENT_TAGS].map((tag, i) => (
                  <span
                    key={`fwd-${tag.label}-${i}`}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-muted/30 py-16 border-t border-border"
          data-ocid="cta.section"
        >
          <div className="container mx-auto px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Ready to start planning?
              </h2>
              <p className="text-muted-foreground text-base mb-7 max-w-sm mx-auto">
                We Welcome You — start planning your perfect event today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/signup" data-ocid="cta.get_started_button">
                  <Button
                    size="lg"
                    className="gap-2 px-10 shadow-elevated font-semibold"
                  >
                    Get Started Free <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/planning" data-ocid="cta.start_planning_button">
                  <Button size="lg" variant="outline" className="gap-2 px-8">
                    Start Planning
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
