/**
 * useSectionAnimation
 * Core animation hook for the snap-scroll sections.
 *
 * Each section receives `scrollY` (SharedValue<number>) and `sectionIndex`.
 * Returns a `progress` derived value (0 = centred, ±1 = one full section away)
 * plus pre-built useAnimatedStyle factories for the standard stagger pattern.
 */

import {
  SharedValue,
  useDerivedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { SNAP_STEP, SECTION_HEIGHT } from '../tokens';

// ---------------------------------------------------------------------------
// Core progress hook
// ---------------------------------------------------------------------------

/**
 * Returns a derived value in the range roughly [-1, 1] where:
 *   0  = this section is perfectly centred on screen
 *  +1  = user has scrolled one full step past this section (going down)
 *  -1  = this section is one full step above the viewport (going up)
 */
export function useSectionProgress(
  scrollY: SharedValue<number>,
  sectionIndex: number,
): SharedValue<number> {
  const centerY = sectionIndex * SNAP_STEP;
  return useDerivedValue(() => {
    'worklet';
    return (scrollY.value - centerY) / SECTION_HEIGHT;
  });
}

// ---------------------------------------------------------------------------
// Per-element animated style factories
// ---------------------------------------------------------------------------

type AnimatedStyleFactory = (progress: SharedValue<number>) => ReturnType<typeof useAnimatedStyle>;

/**
 * Outer container — slight scale + opacity fade as section moves away.
 */
export function useContainerStyle(progress: SharedValue<number>) {
  return useAnimatedStyle(() => {
    'worklet';
    const abs = Math.abs(progress.value);
    return {
      opacity: interpolate(abs, [0, 0.8], [1, 0.4], Extrapolate.CLAMP),
      transform: [
        {
          scale: interpolate(abs, [0, 0.8], [1, 0.97], Extrapolate.CLAMP),
        },
      ],
    };
  });
}

/**
 * Element 0 — Section heading (first to appear / last to leave).
 */
export function useHeadingStyle(progress: SharedValue<number>) {
  return useAnimatedStyle(() => {
    'worklet';
    const abs = Math.abs(progress.value);
    return {
      opacity: interpolate(abs, [0, 0.35, 0.7], [1, 0.6, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(progress.value, [-0.8, 0, 0.8], [-14, 0, 14], Extrapolate.CLAMP),
        },
      ],
    };
  });
}

/**
 * Element 1 — Section subtitle (slightly behind the heading).
 */
export function useSubtitleStyle(progress: SharedValue<number>) {
  return useAnimatedStyle(() => {
    'worklet';
    const abs = Math.abs(progress.value);
    return {
      opacity: interpolate(abs, [0, 0.30, 0.65], [1, 0.5, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(progress.value, [-0.8, 0, 0.8], [-10, 0, 10], Extrapolate.CLAMP),
        },
      ],
    };
  });
}

/**
 * Element 2 — Main content block.
 */
export function useContentStyle(progress: SharedValue<number>) {
  return useAnimatedStyle(() => {
    'worklet';
    const abs = Math.abs(progress.value);
    return {
      opacity: interpolate(abs, [0, 0.25, 0.55], [1, 0.4, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(progress.value, [-0.8, 0, 0.8], [-8, 0, 8], Extrapolate.CLAMP),
        },
      ],
    };
  });
}

/**
 * Element 3 — CTA / action bar (last to appear).
 */
export function useCTAStyle(progress: SharedValue<number>) {
  return useAnimatedStyle(() => {
    'worklet';
    const abs = Math.abs(progress.value);
    return {
      opacity: interpolate(abs, [0, 0.20, 0.45], [1, 0.3, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(progress.value, [-0.8, 0, 0.8], [-6, 0, 6], Extrapolate.CLAMP),
        },
      ],
    };
  });
}
