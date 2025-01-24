import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="text-white">
      <CountUp decimals={2} prefix="$" decimal="." end={amount} />
    </div>
  );
};

export default AnimatedCounter;
