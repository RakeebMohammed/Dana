"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const easing = [0.22, 1, 0.36, 1] as const;
type ContentProps = { children: ReactNode; className?: string; id?: string };

export function MotionSection({ children, className, id }: ContentProps) {
  const reduced = useReducedMotion();
  return <motion.section id={id} className={className} initial={{ opacity: 0, y: reduced ? 0 : 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduced ? 0.01 : 0.72, ease: easing }}>{children}</motion.section>;
}

export function MotionDiv({ children, className }: Omit<ContentProps, "id">) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0.01 : 0.62, ease: easing }}>{children}</motion.div>;
}

export function MotionCard({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.article initial={{ opacity: 0, y: reduced ? 0 : 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} whileHover={reduced ? undefined : { y: -8 }} transition={{ duration: reduced ? 0.01 : 0.48, ease: easing }}>{children}</motion.article>;
}

export function MotionFigure({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.figure initial={{ opacity: 0, y: reduced ? 0 : 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} whileHover={reduced ? undefined : { y: -6, scale: 1.015 }} transition={{ duration: reduced ? 0.01 : 0.45, ease: easing }}>{children}</motion.figure>;
}

export function MotionStat({ children, index }: { children: ReactNode; index: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={{ opacity: 0, y: reduced ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0.01 : 0.48, delay: reduced ? 0 : index * 0.1, ease: easing }}>{children}</motion.div>;
}
