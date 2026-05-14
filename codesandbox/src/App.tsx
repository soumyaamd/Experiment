/**
 * SLAP – Snap Scroll Demo  (Framer Motion edition)
 *
 * Animations:
 *  - Scroll-linked scale + opacity on each card via useScroll + useTransform
 *    (GPU-accelerated: only transform & opacity, no layout thrashing)
 *  - Glow pulse on the active section via Framer Motion keyframes
 *  - Staggered content entrance (tag → icon → title → subtitle → CTA)
 *    triggered by useInView so it fires every time a section snaps in
 *  - Pill indicator slides + morphs between sections
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PHONE_H     = 780;
const PEEK_RATIO  = 0.12;          // change to 0.08 (subtle) or 0.18 (large)
const PEEK        = Math.round(PHONE_H * PEEK_RATIO);
const SECTION_H   = PHONE_H - PEEK * 2;
const GAP         = 8;
const SNAP_STEP   = SECTION_H + GAP;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Section {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  accent: string;
  bg: string;
  icon: string;
}

const SECTIONS: Section[] = [
  {
    id: '1',
    tag: 'Personalised feed',
    title: 'Curated for you',
    subtitle: 'Personalises on every scroll — the more you explore, the smarter it gets.',
    accent: '#6C63FF',
    bg: 'linear-gradient(160deg,#1a1a3e 0%,#0f0f2d 100%)',
    icon: '✦',
  },
  {
    id: '2',
    tag: 'AI Summary',
    title: 'Review Synthesizer',
    subtitle: 'Thousands of reviews distilled into one clear, honest verdict.',
    accent: '#00C9A7',
    bg: 'linear-gradient(160deg,#0d2b25 0%,#061a16 100%)',
    icon: '◎',
  },
  {
    id: '3',
    tag: 'Style',
    title: 'Decoded Looks',
    subtitle: 'Shop the exact look — head to toe — in one tap.',
    accent: '#FF6584',
    bg: 'linear-gradient(160deg,#2b1020 0%,#1a0a14 100%)',
    icon: '◈',
  },
  {
    id: '4',
    tag: 'Smart compare',
    title: 'Product Compare',
    subtitle: 'Side-by-side specs, price and verdict — no tab-hopping required.',
    accent: '#F9A825',
    bg: 'linear-gradient(160deg,#261c04 0%,#180f00 100%)',
    icon: '⊞',
  },
  {
    id: '5',
    tag: 'Deals',
    title: 'Deal Wall Alerts',
    subtitle: 'ACs under ₹35k, compared for you — updated live.',
    accent: '#E94560',
    bg: 'linear-gradient(160deg,#2b0a12 0%,#1a040c 100%)',
    icon: '↓',
  },
  {
    id: '6',
    tag: 'Outfit builder',
    title: 'Complete Your Look',
    subtitle: 'Accessories and layers that pair perfectly with what you picked.',
    accent: '#7C4DFF',
    bg: 'linear-gradient(160deg,#17102b 0%,#0e091a 100%)',
    icon: '◇',
  },
  {
    id: '7',
    tag: 'Context',
    title: 'Occasion',
    subtitle: 'Dress for the moment — beach, boardroom, or back-to-college.',
    accent: '#26C6DA',
    bg: 'linear-gradient(160deg,#062228 0%,#031418 100%)',
    icon: '◉',
  },
  {
    id: '8',
    tag: 'Visual discovery',
    title: 'Style Drop',
    subtitle: 'Find apparel by visual attributes — auto tried on your body type.',
    accent: '#FF8F00',
    bg: 'linear-gradient(160deg,#261500 0%,#180d00 100%)',
    icon: '⬡',
  },
  {
    id: '9',
    tag: 'Personalisation',
    title: 'Help us know you',
    subtitle: 'Your preferences are never shared — only used to sharpen SLAP for you.',
    accent: '#9C89B8',
    bg: 'linear-gradient(160deg,#1a1220 0%,#100b16 100%)',
    icon: '◐',
  },
  {
    id: '10',
    tag: 'Ask anything',
    title: 'Ask SLAP',
    subtitle: 'Suggest me a chair for back pain under ₹8,000…',
    accent: '#F0A500',
    bg: 'linear-gradient(160deg,#261c00 0%,#181100 100%)',
    icon: '◑',
  },
];

// ---------------------------------------------------------------------------
// SectionCard — scroll-linked scale/opacity + staggered content entrance
// ---------------------------------------------------------------------------

function SectionCard({
  section,
  index,
  scrollRef,
  totalCount,
}: {
  section: Section;
  index: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  totalCount: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll progress of the whole list.
  const { scrollY } = useScroll({ container: scrollRef });

  // Each card's "ideal" scroll position is when it's perfectly centred.
  const centreY = index * SNAP_STEP;

  // Map scroll distance from centre → scale + opacity.
  // The further a card is from centre, the smaller and dimmer it gets.
  const scale = useTransform(
    scrollY,
    [centreY - SNAP_STEP, centreY, centreY + SNAP_STEP],
    [0.93, 1, 0.93],
  );
  const opacity = useTransform(
    scrollY,
    [centreY - SNAP_STEP, centreY, centreY + SNAP_STEP],
    [0.45, 1, 0.45],
  );

  // Staggered entrance — fires every time this card comes into view.
  const inView = useInView(cardRef, {
    root: scrollRef,
    amount: 0.6,
    once: false, // re-trigger on each visit
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        width: '100%',
        height: SECTION_H,
        background: section.bg,
        borderRadius: 24,
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        position: 'relative',
        border: '1.5px solid rgba(255,255,255,0.07)',
        // Framer Motion scroll-driven values
        scale,
        opacity,
        // GPU-only — no layout properties animated
        willChange: 'transform, opacity',
      }}
    >
      {/* Ambient glow blob — pulses when active */}
      <motion.div
        animate={
          inView
            ? {
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.22, 0.15],
              }
            : { scale: 1, opacity: 0.04 }
        }
        transition={
          inView
            ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.4 }
        }
        style={{
          position: 'absolute',
          top: -70,
          right: -70,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: section.accent,
          filter: 'blur(64px)',
          pointerEvents: 'none',
        }}
      />

      {/* Staggered content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}
      >
        {/* Tag */}
        <motion.span
          variants={itemVariants}
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: section.accent,
          }}
        >
          {section.tag}
        </motion.span>

        {/* Icon */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: 44,
            color: section.accent,
            lineHeight: 1,
            marginTop: 4,
          }}
        >
          {section.icon}
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            marginTop: 4,
          }}
        >
          {section.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.52)',
            lineHeight: 1.65,
            maxWidth: 256,
          }}
        >
          {section.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} style={{ marginTop: 'auto' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: `${section.accent}22`,
              border: `1px solid ${section.accent}55`,
              borderRadius: 100,
              padding: '10px 20px',
              color: section.accent,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            Explore →
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Section counter chip — bottom right */}
      <motion.div
        variants={itemVariants}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          borderRadius: 100,
          padding: '3px 10px',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 10,
          fontWeight: 600,
        }}
      >
        {index + 1}/{totalCount}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar dots with animated active pill
// ---------------------------------------------------------------------------

function SidebarDots({
  total,
  active,
  accent,
}: {
  total: number;
  active: number;
  accent: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
        padding: '8px 0',
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: i === active ? 22 : 4,
            background: i === active ? accent : 'rgba(255,255,255,0.2)',
            opacity: i === active ? 1 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ width: 3, borderRadius: 4 }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Framer Motion's useScroll to track scroll position in the phone container.
  // We use this to derive activeIndex via onUpdate.
  const { scrollY } = useScroll({ container: scrollRef });

  scrollY.on('change', (y) => {
    const idx = Math.round(y / SNAP_STEP);
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, idx));
    setActiveIndex(clamped);
  });

  const activeAccent = SECTIONS[activeIndex]?.accent ?? '#fff';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: '#0a0a0a',
        gap: 24,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
          SLAP Home
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>
          Snap-scroll · swipe or scroll inside the phone
        </p>
      </div>

      {/* Phone + sidebar row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Phone shell */}
        <div
          style={{
            position: 'relative',
            width: 360,
            height: PHONE_H,
            background: '#111',
            borderRadius: 48,
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 0 8px #1a1a1a, 0 40px 80px rgba(0,0,0,0.7)',
            flexShrink: 0,
          }}
        >
          {/* Status bar */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 44,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
            }}
          >
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>9:41</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {['▋▋▋', '〇', '⌁'].map((s, i) => (
                <span key={i} style={{ color: '#fff', fontSize: 10, opacity: 0.8 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* ── SNAP SCROLL ── */}
          <div
            ref={scrollRef}
            style={{
              position: 'absolute',
              inset: 0,
              overflowY: 'scroll',
              overflowX: 'hidden',
              scrollSnapType: 'y mandatory',
              paddingTop: PEEK,
              paddingBottom: PEEK,
              scrollbarWidth: 'none',
            }}
          >
            <style>{`div::-webkit-scrollbar{display:none}`}</style>

            {SECTIONS.map((section, i) => (
              <div
                key={section.id}
                style={{
                  height: SNAP_STEP,
                  paddingBottom: GAP,
                  paddingLeft: 12,
                  paddingRight: 12,
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always',
                }}
              >
                <SectionCard
                  section={section}
                  index={i}
                  scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
                  totalCount={SECTIONS.length}
                />
              </div>
            ))}
          </div>

          {/* Top fade */}
          <div
            style={{
              position: 'absolute',
              top: 44, left: 0, right: 0,
              height: PEEK,
              background: 'linear-gradient(to bottom,rgba(0,0,0,0.8) 0%,transparent 100%)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />

          {/* Bottom fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: PEEK,
              background: 'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 100%)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />
        </div>

        {/* Sidebar dots */}
        <SidebarDots
          total={SECTIONS.length}
          active={activeIndex}
          accent={activeAccent}
        />
      </div>

      {/* Active section label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{
            color: activeAccent,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          {SECTIONS[activeIndex]?.title}
        </motion.div>
      </AnimatePresence>

      {/* Peek config hint */}
      <div
        style={{
          padding: '10px 18px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12,
          maxWidth: 360,
          width: '100%',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, lineHeight: 1.7 }}>
          <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Tune peek →</strong>{' '}
          <code style={{ color: '#6C63FF' }}>PEEK_RATIO</code> in App.tsx
          {' '}· 0.08 subtle · <strong style={{ color: '#fff' }}>0.12 default</strong> · 0.18 large
        </p>
      </div>
    </div>
  );
}
