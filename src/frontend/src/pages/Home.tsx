import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
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

const DIFFERENTIATORS = [
  "No algorithms, no waiting",
  "Instant local vendor matching",
  "Transparent pricing breakdowns",
  "Dehradun-focused vendor network",
];

const HOW_IT_WORKS_CARDS = [
  {
    icon: FileText,
    step: "01",
    title: "Tell Us",
    desc: "Share your event type, date and location",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Coins,
    step: "02",
    title: "Set Budget",
    desc: "Define your min and max budget range",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: CheckSquare,
    step: "03",
    title: "Choose Vendors",
    desc: "Select the services you need",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Get Plans",
    desc: "Receive 3 tailored plans instantly",
    color: "bg-purple-500/10 text-purple-400",
  },
];

/* 8-slide carousel — diverse event images from Unsplash */
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
    color:
      "bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20",
  },
  {
    label: "Birthdays",
    emoji: "🎂",
    color:
      "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20",
  },
  {
    label: "Corporate Events",
    emoji: "💼",
    color: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
  },
  {
    label: "Music Concerts",
    emoji: "🎵",
    color:
      "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
  },
  {
    label: "Cultural Programs",
    emoji: "🎭",
    color:
      "bg-teal-500/10 text-teal-500 border-teal-500/20 hover:bg-teal-500/20",
  },
  {
    label: "Exhibitions",
    emoji: "🖼",
    color:
      "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20",
  },
  {
    label: "Parties",
    emoji: "🎉",
    color:
      "bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20",
  },
];

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
        background: "rgba(4, 4, 4, 0.95)",
        backdropFilter: "blur(8px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: hiding ? 0 : 1,
        transform: hiding ? "scale(0.97)" : "scale(1)",
        pointerEvents: hiding ? "none" : "auto",
      }}
      data-ocid="curtain.overlay"
    >
      <div
        className="relative flex flex-col items-center text-center px-12 py-12 rounded-3xl max-w-md mx-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 32px 64px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.35)",
          }}
        >
          <Zap size={26} style={{ color: "#3B82F6" }} />
        </div>
        <h1
          className="font-display font-bold text-3xl mb-2"
          style={{ color: "#F9F9F9" }}
        >
          EventIQ
        </h1>
        <p className="text-sm mb-1" style={{ color: "rgba(249,249,249,0.6)" }}>
          Plan Smart. Execute Perfect.
        </p>
        <p
          className="text-xs mb-8 leading-relaxed"
          style={{ color: "rgba(249,249,249,0.38)" }}
        >
          Dehradun's intelligent event planning companion
        </p>
        <button
          type="button"
          data-ocid="curtain.start_button"
          onClick={handleStart}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-display font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #2563EB, #3B82F6)",
            color: "#fff",
            boxShadow: "0 8px 24px -4px rgba(59,130,246,0.5)",
            border: "none",
          }}
        >
          Start Planning <ArrowRight size={18} />
        </button>
        <p className="text-xs mt-5" style={{ color: "rgba(249,249,249,0.28)" }}>
          We Welcome You
        </p>
      </div>
    </div>
  );
}

/* ─── 3D Coverflow Carousel ─────────────────────────────────── */

/** Returns the visual position offset from the active index */
function getSlideStyle(
  index: number,
  current: number,
  total: number,
): React.CSSProperties {
  // Calculate offset, wrapping correctly for circular navigation
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const absOffset = Math.abs(offset);

  if (offset === 0) {
    // Active — front center, full size, no blur
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)",
      opacity: 1,
      zIndex: 10,
      filter: undefined,
      transition:
        "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.65s ease, filter 0.65s ease",
      cursor: "default",
      willChange: "transform, opacity, filter",
    };
  }

  if (absOffset === 1) {
    // Adjacent prev/next — visible behind, slightly to the side, blurred
    const translateX = offset < 0 ? "-18%" : "18%";
    const rotateY = offset < 0 ? "18deg" : "-18deg";
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: `translateX(${translateX}) translateZ(-120px) rotateY(${rotateY}) scale(0.82)`,
      opacity: 0.48,
      zIndex: 5,
      filter: "blur(3.5px)",
      transition:
        "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.65s ease, filter 0.65s ease",
      cursor: "pointer",
      willChange: "transform, opacity, filter",
    };
  }

  // All further slides — fully hidden behind
  return {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: `translateX(${offset < 0 ? "-18%" : "18%"}) translateZ(-200px) rotateY(${offset < 0 ? "18deg" : "-18deg"}) scale(0.65)`,
    opacity: 0,
    zIndex: 1,
    filter: "blur(6px)",
    transition:
      "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.65s ease, filter 0.65s ease",
    cursor: "default",
    willChange: "transform, opacity, filter",
  };
}

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, 4500);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const prev = () => {
    setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    resetTimer();
  };

  const next = () => {
    setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    resetTimer();
  };

  const goTo = (i: number) => {
    setCurrent(i);
    resetTimer();
  };

  return (
    <div
      className="relative w-full select-none overflow-hidden"
      style={{ aspectRatio: "9/6", perspective: "1200px" }}
    >
      {/* 3D stage — preserve-3d enables translateZ depth on child slides */}
      <div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {HERO_SLIDES.map((slide, i) => {
          const style = getSlideStyle(i, current, HERO_SLIDES.length);
          const isActive = i === current;

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
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={slide.img}
                  alt={slide.label}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                    className="absolute bottom-4 left-4"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/85 text-white backdrop-blur-sm">
                      <Tag size={10} />
                      {slide.tag}
                    </span>
                    <p className="text-white font-display font-semibold text-lg mt-1 drop-shadow-lg">
                      {slide.label}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
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

      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5 z-30">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={`dot-${slide.label}`}
            type="button"
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${i + 1}`}
            data-ocid={`hero.carousel_dot.${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Plan Mini Card ────────────────────────────────────────── */

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

/* ─── Spotlight Card ────────────────────────────────────────── */

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

/* ─── Main page ─────────────────────────────────────────────── */

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
      /* noop */
    }
  }

  function handleTagClick() {
    navigate({ to: "/planning" });
  }

  return (
    <>
      {curtainVisible && <CurtainOverlay onDismiss={dismissCurtain} />}

      <Layout>
        {/* ── HERO ──────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-background pt-8 pb-16"
          data-ocid="hero.section"
        >
          <div className="container mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
              {/* LEFT: Carousel + headline */}
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

              {/* RIGHT: How It Works steps */}
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
                      <card.icon size={18} />
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

        {/* ── QUICK PLAN FORM SECTION ────────────────────────── */}
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
              {/* Quick info pills */}
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

              {/* CTA */}
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

              {/* Plan type preview cards */}
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

        {/* ── LOCAL SPOTLIGHT ───────────────────────────────── */}
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

        {/* ── OUR EDGE ──────────────────────────────────────── */}
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

            {/* Differentiators strip */}
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

        {/* ── FIND BY CATEGORY ──────────────────────────────── */}
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

            {/* Marquee below tags */}
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

        {/* ── FINAL CTA ─────────────────────────────────────── */}
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
