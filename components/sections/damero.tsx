export function Damero() {
  return (
    <div className="damero" aria-hidden="true">
      {Array.from({ length: 80 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
