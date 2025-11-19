"use client";

import { motion } from "framer-motion";

interface LoadingDotsProps {
  size?: number;
  colors?: string[];
  fullScreen?: boolean;
}

export function LoadingDots({
  size = 16,
  colors = ["#CA8A04", "#D97706", "#F59E0B"],
  fullScreen = true,
}: LoadingDotsProps) {
  const Dot = ({ delay = 0, color = "#CA8A04" }) => (
    <motion.div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      animate={{ y: [0, -10, 0], opacity: [1, 0.4, 1] }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );

  return (
    <div
      className={`
        flex items-center justify-center gap-3 bg-white
        ${fullScreen ? "min-h-screen w-full" : ""}
      `}
    >
      <Dot color={colors[0]} delay={0} />
      <Dot color={colors[1]} delay={0.15} />
      <Dot color={colors[2]} delay={0.3} />
    </div>
  );
}
