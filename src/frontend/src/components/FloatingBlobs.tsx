import type { ReactNode } from "react";

export function FloatingBlobs() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <div
        className="blob-float absolute"
        style={{
          top: "10%",
          left: "-8%",
          width: "420px",
          height: "420px",
          borderRadius: "71% 29% 70% 30% / 30% 54% 46% 70%",
          background: "radial-gradient(circle at 30% 30%, #4FC3F7, #FF8A65)",
          opacity: 0.08,
          animationDuration: "22s",
        }}
      />
      <div
        className="blob-float absolute"
        style={{
          bottom: "5%",
          right: "-5%",
          width: "360px",
          height: "360px",
          borderRadius: "30% 70% 50% 50% / 60% 40% 60% 40%",
          background: "radial-gradient(circle at 60% 40%, #3B82F6, #F97316)",
          opacity: 0.07,
          animationDuration: "26s",
          animationDelay: "-8s",
        }}
      />
      <div
        className="blob-float absolute"
        style={{
          top: "40%",
          right: "20%",
          width: "260px",
          height: "260px",
          borderRadius: "50% 50% 30% 70% / 40% 60% 40% 60%",
          background: "radial-gradient(circle at 50% 50%, #22C55E, #4FC3F7)",
          opacity: 0.06,
          animationDuration: "18s",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}

export function BlobsWrapper({ children }: { children: ReactNode }) {
  return <div className="relative z-10">{children}</div>;
}
