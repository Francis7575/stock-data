import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number | string }) => {
  const parsedAmount = typeof amount === "number" ? amount : parseFloat(amount) || 0;

  return (
    <div className="text-white">
      <CountUp decimals={2} prefix="$" decimal="." end={parsedAmount} />
    </div>
  );
};

export default AnimatedCounter;
