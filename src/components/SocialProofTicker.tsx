const proofs = [
  "⭐ Priya from Mumbai just purchased Ashwagandha Root Powder",
  "⭐ 4.9/5 from 12,000+ Reviews",
  "⭐ Rahul from Delhi ordered the Immunity Booster Bundle",
  "⭐ Trusted by 50,000+ customers across India",
  "⭐ Sneha from Bangalore just purchased Chamomile Sleep Tea",
];

const SocialProofTicker = () => {
  return (
    <div className="bg-sage/25 py-3 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...proofs, ...proofs, ...proofs].map((proof, i) => (
          <span key={i} className="text-sm font-medium text-secondary-foreground mx-10">
            {proof}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SocialProofTicker;
