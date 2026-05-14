/**
 * StyleDrop — Section 8
 * Dark full-bleed fashion image with product badge and action buttons.
 */

import React from 'react';
import {
  Image,
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
  SCREEN_HEIGHT,
  SECTION_HEIGHT,
  Spacing,
  Typography,
} from '../../tokens';
import PaginationDots from '../shared/PaginationDots';
import CTABar from '../shared/CTABar';
import {
  useSectionProgress,
  useContainerStyle,
  useHeadingStyle,
  useSubtitleStyle,
  useContentStyle,
  useCTAStyle,
} from '../../hooks/useSectionAnimation';

interface Props {
  scrollY: SharedValue<number>;
  sectionIndex: number;
}

const ACTION_BUTTONS = ['♡', '⬇', '↗'];

export default function StyleDrop({ scrollY, sectionIndex }: Props) {
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const headingStyle = useHeadingStyle(progress);
  const subtitleStyle = useSubtitleStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View
      style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}
    >
      {/* Full-bleed background image */}
      <Image
        source={{ uri: Assets.STYLE_DROP_IMG }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={[StyleSheet.absoluteFill, { top: '40%' }]}
        locations={[0, 1]}
      />

      {/* Top content overlay */}
      <View style={styles.topContent}>
        <Animated.Text style={[styles.heading, headingStyle]}>
          New looks styled on you
        </Animated.Text>
        <Animated.Text style={[styles.subheading, subtitleStyle]}>
          Fresh picks for your next wardrobe refresh
        </Animated.Text>
      </View>

      {/* Action buttons — vertical stack on right */}
      <Animated.View style={[styles.actionButtons, contentStyle]}>
        {ACTION_BUTTONS.map((icon, i) => (
          <TouchableOpacity key={i} style={styles.actionBtn} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>{icon}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Product badge — bottom right */}
      <Animated.View style={[styles.productBadge, contentStyle]}>
        <Image
          source={{ uri: Assets.DECODED_ZARA }}
          style={styles.badgeImg}
          resizeMode="cover"
        />
        <View style={styles.badgeInfo}>
          <Text style={styles.badgeBrand}>Zara</Text>
          <Text style={styles.badgePrice}>₹1,420</Text>
          <View style={styles.badgePriceRow}>
            <Text style={styles.badgeOriginal}>₹2000</Text>
            <Text style={styles.badgeDiscount}>-18%</Text>
          </View>
        </View>
      </Animated.View>

      {/* Pagination dots */}
      <View style={styles.paginationRow}>
        <PaginationDots
          total={9}
          active={7}
          activeColor={Colors.white}
          inactiveColor="rgba(255,255,255,0.4)"
        />
      </View>

      {/* CTA */}
      <CTABar label="Shop this look" progress={progress} />
    </Animated.View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  topContent: {
    position: 'absolute',
    top: 24,
    left: Spacing.S6,
    right: Spacing.S6,
    gap: Spacing.S3,
  },
  heading: {
    ...Typography.sectionHeading,
    color: Colors.white,
    textAlign: 'left',
  },
  subheading: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'left',
  },
  actionButtons: {
    position: 'absolute',
    left: Spacing.S6,
    bottom: 130,
    gap: Spacing.S4,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 18,
    color: Colors.white,
  },
  productBadge: {
    position: 'absolute',
    right: Spacing.S6,
    bottom: 80,
    width: 100,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: Spacing.S4,
    flexDirection: 'row',
    gap: Spacing.S3,
    alignItems: 'center',
  },
  badgeImg: {
    width: 40,
    height: 50,
    borderRadius: Radius.sm,
    backgroundColor: Colors.emphasisDark,
  },
  badgeInfo: {
    flex: 1,
    gap: 2,
  },
  badgeBrand: {
    ...Typography.label,
    color: Colors.textPrimary,
  },
  badgePrice: {
    ...Typography.bodySmallSB,
    color: Colors.textPrimary,
  },
  badgePriceRow: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  badgeOriginal: {
    fontSize: 9,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  badgeDiscount: {
    fontSize: 9,
    color: Colors.successHighlight,
    fontWeight: '600',
  },
  paginationRow: {
    position: 'absolute',
    bottom: 56,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
