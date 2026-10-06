export function SectionHeading({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      <p>{kicker}</p>
      <h2>{children}</h2>
    </div>
  );
}
