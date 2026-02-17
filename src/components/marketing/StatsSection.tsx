"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Globe, Clock, ThumbsUp } from "lucide-react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

const CountUpNumber = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const StatCard = ({ value, suffix, label, icon }: StatProps) => {
  return (
    <motion.div
      className="relative bg-white/[0.03] backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-accent-green/20 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
        <CountUpNumber value={value} suffix={suffix} />
      </p>
      <p className="text-muted-cream">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats: StatProps[] = [
    {
      value: 50,
      suffix: "+",
      label: "Projects Delivered",
      icon: <TrendingUp className="w-6 h-6 text-accent-green" />,
    },
    {
      value: 12,
      suffix: "+",
      label: "Countries Served",
      icon: <Globe className="w-6 h-6 text-accent-green" />,
    },
    {
      value: 7,
      suffix: " Days",
      label: "Average Delivery",
      icon: <Clock className="w-6 h-6 text-accent-green" />,
    },
    {
      value: 100,
      suffix: "%",
      label: "Client Satisfaction",
      icon: <ThumbsUp className="w-6 h-6 text-accent-green" />,
    },
  ];

  return (
    <section className="py-20 bg-dark-navy border-y border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-accent-green uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3">
            Achieving Superior Results
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
