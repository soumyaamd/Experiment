/**
 * SnapScrollHome — Vertical snap-scroll demo for SLAP Home page.
 *
 * Behaviour:
 *  - Each section snaps to the centre of the screen.
 *  - The previous section peeks from the top (~10 % of screen height).
 *  - The next section peeks from the bottom (~10 % of screen height).
 *  - Scrolling feels like a slot machine / Instagram-story swipe (vertical).
 *
 * Usage:
 *   import SnapScrollHome from './SnapScrollHome';
 *   // Drop <SnapScrollHome /> anywhere in your navigator.
 *
 * Requirements: React Native ≥ 0.70, no extra dependencies.
 */

import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * How much of the adjacent sections peeks on each side.
 * Tweak this to get 1x / 1.5x / 2x feel.
 *
 *  8 % → very subtle hint (feels like 1x)
 * 12 % → comfortable peek (feels like 1.5x)  ← default
 * 18 % → large peek (feels like 2x)
 */
const PEEK_RATIO = 0.12;
const PEEK_HEIGHT = SCREEN_HEIGHT * PEEK_RATIO;

/**
 * The visible height of the centred (active) section.
 * = screen - top peek - bottom peek
 */
const SECTION_HEIGHT = SCREEN_HEIGHT - PEEK_HEIGHT * 2;

/** Gap between sections (visible as the thin stripe between peeking edges). */
const GAP = 8;

/** Total scroll distance per step = section height + gap. */
const SNAP_INTERVAL = SECTION_HEIGHT + GAP;

// ---------------------------------------------------------------------------
// Demo section data  (replace with your real SLAP sections)
// ---------------------------------------------------------------------------

interface Section {
  id: string;
  label: string;
  subtitle: string;
  bg: string;
}

const SECTIONS: Section[] = [
  {
    id: '1',
    label: 'Curated for you',
    subtitle: 'Personalises on every scroll',
    bg: '#1A1A2E',
  },
  {
    id: '2',
    label: 'Review Synthesizer',
    subtitle: 'Thousands of reviews, one clear answer',
    bg: '#16213E',
  },
  {
    id: '3',
    label: 'Decoded Looks',
    subtitle: 'Shop the look, head to toe',
    bg: '#0F3460',
  },
  {
    id: '4',
    label: 'Product Compare',
    subtitle: 'Side by side, the smart way',
    bg: '#533483',
  },
  {
    id: '5',
    label: 'Deal Alerts',
    subtitle: 'Compared for you — ACs under ₹35k',
    bg: '#E94560',
  },
  {
    id: '6',
    label: 'Complete Your Look',
    subtitle: 'Accessories that go perfectly',
    bg: '#2B2D42',
  },
  {
    id: '7',
    label: 'Occasion',
    subtitle: 'Dress for the moment',
    bg: '#3D405B',
  },
  {
    id: '8',
    label: 'Style Drop',
    subtitle: 'Discover by visual attributes',
    bg: '#5C6B73',
  },
  {
    id: '9',
    label: 'Know Your Best',
    subtitle: 'Try-on powered by AI',
    bg: '#9C89B8',
  },
  {
    id: '10',
    label: 'Ask SLAP',
    subtitle: 'Shop Like A Pro — start here',
    bg: '#F0A500',
  },
];

// ---------------------------------------------------------------------------
// SectionCard — the content rendered inside each snap slot
// ---------------------------------------------------------------------------

interface SectionCardProps {
  item: Section;
  isActive: boolean;
}

const SectionCard = React.memo(({ item, isActive }: SectionCardProps) => (
  <View
    style={[
      styles.card,
      { backgroundColor: item.bg },
      isActive && styles.cardActive,
    ]}
  >
    <Text style={styles.cardLabel}>{item.label}</Text>
    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

    {/* Replace the block below with your real section component */}
    <View style={styles.cardPlaceholder}>
      <Text style={styles.cardPlaceholderText}>
        ↕ swipe to advance
      </Text>
    </View>
  </View>
));

// ---------------------------------------------------------------------------
// Pagination dots
// ---------------------------------------------------------------------------

interface DotsProps {
  total: number;
  activeIndex: number;
}

const Dots = ({ total, activeIndex }: DotsProps) => (
  <View style={styles.dots} pointerEvents="none">
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i === activeIndex && styles.dotActive,
        ]}
      />
    ))}
  </View>
);

// ---------------------------------------------------------------------------
// SnapScrollHome
// ---------------------------------------------------------------------------

export default function SnapScrollHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<Section>>(null);

  // Track which item is centred on screen.
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60, // item is "active" when >60 % visible
  });

  const renderItem = useCallback(
    ({ item, index }: { item: Section; index: number }) => (
      <View style={styles.slot}>
        <SectionCard item={item} isActive={index === activeIndex} />
      </View>
    ),
    [activeIndex],
  );

  const keyExtractor = useCallback((item: Section) => item.id, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <FlatList
        ref={listRef}
        data={SECTIONS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        // ── Snap behaviour ────────────────────────────────────────────────
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"   // we offset with contentInset so "start" = centre
        decelerationRate="fast"   // snappy feel; use 0.99 for a heavier, slower feel
        // ── Peek padding ─────────────────────────────────────────────────
        // iOS: contentInset pushes the first item down by PEEK_HEIGHT so it
        //      lands centred, and mirrors at the bottom.
        contentInset={
          Platform.OS === 'ios'
            ? { top: PEEK_HEIGHT, bottom: PEEK_HEIGHT }
            : undefined
        }
        // Android doesn't support contentInset; use contentContainerStyle padding.
        contentContainerStyle={
          Platform.OS === 'android'
            ? { paddingTop: PEEK_HEIGHT, paddingBottom: PEEK_HEIGHT }
            : undefined
        }
        // Keeps scroll indicator inside the padded area on iOS.
        scrollIndicatorInsets={
          Platform.OS === 'ios'
            ? { top: PEEK_HEIGHT, bottom: PEEK_HEIGHT }
            : undefined
        }
        // ── Misc ─────────────────────────────────────────────────────────
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
        // Snap offset must account for contentInset on iOS; Android uses padding so offset = 0.
        snapToOffsets={
          Platform.OS === 'android'
            ? SECTIONS.map((_, i) => i * SNAP_INTERVAL)
            : undefined
        }
      />

      <Dots total={SECTIONS.length} activeIndex={activeIndex} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Each FlatList row — exactly SNAP_INTERVAL tall (section + gap).
  slot: {
    height: SNAP_INTERVAL,
    paddingBottom: GAP,
  },

  // The visible card inside the slot — SECTION_HEIGHT tall.
  card: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 16,
    padding: 24,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    // Subtle shadow so cards feel elevated over the peeking neighbours.
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },

  cardActive: {
    // Scale up the active card very slightly so it pops forward.
    // Wrap in Animated.View and drive with a shared value for a smooth
    // interpolated version — this static style is the simplified form.
  },

  cardLabel: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 24,
  },

  cardSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },

  cardPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardPlaceholderText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 13,
  },

  // Right-side pagination dots.
  dots: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    gap: 6,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  dotActive: {
    height: 20,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
});
