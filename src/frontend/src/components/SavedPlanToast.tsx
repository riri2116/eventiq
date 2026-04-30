import { subscribeSavedPlanToast } from "@/lib/savedPlansStore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ToastItem {
  id: number;
  message: string;
}

export function SavedPlanToast() {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const unsubscribe = subscribeSavedPlanToast((message) => {
      counter.current += 1;
      const id = counter.current;
      setItems((prev) => [...prev, { id, message }]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    });
    return unsubscribe;
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
      aria-live="polite"
      data-ocid="savedplan.toast_container"
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.output
            key={item.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: "#1e1e1e",
              color: "#ffffff",
              padding: "12px 16px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              pointerEvents: "auto",
              maxWidth: "calc(100vw - 32px)",
              display: "block",
            }}
            data-ocid="savedplan.toast_item"
          >
            {item.message}
          </motion.output>
        ))}
      </AnimatePresence>
    </div>
  );
}
