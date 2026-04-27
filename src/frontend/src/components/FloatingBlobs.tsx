export function FloatingBlobs() {
  return null;
}

export function BlobsWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative z-10">{children}</div>;
}
