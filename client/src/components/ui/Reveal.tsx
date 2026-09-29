import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp } from '../../animations/variants';
import { cn } from '../../utils/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
