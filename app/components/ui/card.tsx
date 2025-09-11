// app/components/ui/card.tsx
const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="border p-4 rounded shadow">{children}</div>;
};

export default Card;
