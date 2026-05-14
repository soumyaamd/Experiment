/**
 * FeaturedCards — Section 1
 * Horizontal snap-scroll of 3 feature cards with gradient overlay and centered text.
 */

import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Assets,
  Colors,
  Radius,
  SECTION_HEIGHT,
  Spacing,
  Typography,
} from '../../tokens';
import SectionHeader from '../shared/SectionHeader';
import CTABar from '../shared/CTABar';
import {
  useSectionProgress,
  useContainerStyle,
  useContentStyle,
  useCTAStyle,
} from '../../hooks/useSectionAnimation';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CardData {
  id: string;
  image: string;
  title: string;
  description: string;
}

const CARDS: CardData[] = [
  {
    id: '1',
    image: Assets.FEATURE_CARD_1,
    title: 'Discover products your way',
    description: 'Suggest a chair for back pain with cushioned seat',
  },
  {
    id: '2',
    image: Assets.FEATURE_CARD_2,
    title: 'Groceries at your voice command',
    description: 'Buy me the ingredients for pav bhaji recipe',
  },
  {
    id: '3',
    image: Assets.FEATURE_CARD_1,
    title: 'Outfits for your next vacation',
    description: 'Daily style inspiration on you',
  },
];

const CARD_CENTER_W = 240;
const CARD_CENTER_H = 340;
const CARD_SIDE_W = 200;
const CARD_SIDE_H = 300;

interface Props {
  scrollY: SharedValue<number>;
  sectionIndex: number;
}

// ---------------------------------------------------------------------------
// Sub-component: FeatureCard
// ---------------------------------------------------------------------------

function FeatureCard({ card, isCenter }: { card: CardData; isCenter: boolean }) {
  const w = isCenter ? CARD_CENTER_W : CARD_SIDE_W;
  const h = isCenter ? CARD_CENTER_H : CARD_SIDE_H;

  return (
    <View
      style={[
        styles.card,
        { width: w, height: h },
        isCenter ? styles.cardCenter : styles.cardSide,
      ]}
    >
      <Image source={{ uri: card.image }} style={styles.cardImage} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(199,2,85,0.85)']}
        style={StyleSheet.absoluteFill}
        locations={[0.35, 1]}
      />
      {/* Bottom content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {card.title}
        </Text>
        <View style={styles.cardDivider} />
        {/* Mic icon row */}
        <View style={styles.cardIconRow}>
          <View style={styles.micIconWrapper}>
            <Text style={styles.micIcon}>🎙</Text>
          </View>
        </View>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {card.description}
        </Text>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function FeaturedCards({ scrollY, sectionIndex }: Props) {
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Header */}
      <SectionHeader
        title="Curated for you"
        subtitle="Personalises on every scroll"
        totalDots={9}
        activeDot={0}
        progress={progress}
      />

      {/* Card scroll */}
      <Animated.View style={[styles.cardsWrapper, contentStyle]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScroll}
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={CARD_CENTER_W + Spacing.S4}
        >
          {CARDS.map((card, i) => (
            <FeatureCard key={card.id} card={card} isCenter={i === 1} />
          ))}
        </ScrollView>
      </Animated.View>

      {/* CTA */}
      <CTABar label="Suggest a product for me" progress={progress} />
    </Animated.View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.appBackground,
    overflow: 'hidden',
  },
  cardsWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  cardsScroll: {
    paddingHorizontal: Spacing.S6,
    alignItems: 'center',
    gap: Spacing.S4,
  },
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.emphasisDark,
  },
  cardCenter: {
    // subtle elevation to pop
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  cardSide: {
    opacity: 0.85,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.S5,
    paddingBottom: Spacing.S6,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.S3,
  },
  cardDivider: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: Spacing.S3,
  },
  cardIconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.S3,
  },
  micIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    fontSize: 14,
  },
  cardDescription: {
    ...Typography.labelLight,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
});
