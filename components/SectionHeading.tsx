export function SectionHeading({ index, kicker, children }: { index: string; kicker: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      <span>{index}</span>
      <p>{kicker}</p>
      <h2>{children}</h2>
    </div>
  );
}
