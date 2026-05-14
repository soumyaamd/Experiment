/**
 * DealWall — Section 5
 * Best deal display with bank offer stacking and product details.
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedValue } from 'react-native-reanimated';

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
import RatingChip from '../shared/RatingChip';
import PaginationDots from '../shared/PaginationDots';
import {
  useSectionProgress,
  useContainerStyle,
  useContentStyle,
  useCTAStyle,
} from '../../hooks/useSectionAnimation';

interface Props {
  scrollY: SharedValue<number>;
  sectionIndex: number;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function DealWall({ scrollY, sectionIndex }: Props) {
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Custom header with badge image */}
      <View style={styles.header}>
        <PaginationDots total={9} active={4} />
        <Image source={{ uri: Assets.DEAL_BADGE }} style={styles.badgeImg} resizeMode="contain" />
        <Text style={styles.headerTitle}>Save extra INR 500</Text>
        <Text style={styles.headerSubtitle}>
          Buy your recently viewed products with the best offers
        </Text>
      </View>

      {/* Content */}
      <Animated.View style={[styles.content, contentStyle]}>
        {/* Product card */}
        <View style={styles.productCard}>
          {/* Watermark text left */}
          <View style={styles.watermarkLeft} pointerEvents="none">
            <Text style={styles.watermarkText}>SLAP</Text>
          </View>
          {/* Watermark text right */}
          <View style={styles.watermarkRight} pointerEvents="none">
            <Text style={styles.watermarkText}>OFFER</Text>
          </View>

          {/* Product image area */}
          <View style={styles.productImgWrapper}>
            <Image
              source={{ uri: Assets.DEAL_PRODUCT }}
              style={styles.productImg}
              resizeMode="cover"
            />
            <View style={styles.ratingOverlay}>
              <RatingChip rating="4.5" count="3.2k" size="sm" />
            </View>
          </View>

          {/* Product info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              Logitech MX Master 4 Mouse
            </Text>
            <Text style={styles.productOriginal}>₹12,999</Text>
            <Text style={styles.productFinal}>₹8,299</Text>
          </View>
        </View>

        {/* Offers section */}
        <View style={styles.offersSection}>
          {/* Bank logos row */}
          <View style={styles.bankRow}>
            {[0, 1, 2].map((i) => (
              <Image
                key={i}
                source={{ uri: Assets.DEAL_BANK_LOGO }}
                style={[
                  styles.bankLogo,
                  i > 0 && { marginLeft: -7.2 },
                ]}
                resizeMode="contain"
              />
            ))}
            <View style={[styles.bankMoreChip, { marginLeft: -4 }]}>
              <Text style={styles.bankMoreText}>+2</Text>
            </View>
          </View>

          <Text style={styles.buyText}>Buy at ₹7,888 with offers</Text>
          <Text style={styles.firstOrderText}>
            + Flat ₹100 OFF on your first order via SLAP
          </Text>
        </View>

        {/* Pagination */}
        <PaginationDots total={4} active={0} />
      </Animated.View>

      {/* CTA */}
      <CTABar label="What are the best offers on this?" progress={progress} />
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: Spacing.S6,
    paddingHorizontal: Spacing.S6,
    gap: Spacing.S3,
  },
  badgeImg: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary2,
  },
  headerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.S6,
    width: '100%',
  },
  productCard: {
    width: 200,
    backgroundColor: Colors.subtleNeutralGroup2,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  watermarkLeft: {
    position: 'absolute',
    left: -30,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    transform: [{ rotate: '-90deg' }],
    zIndex: 1,
  },
  watermarkRight: {
    position: 'absolute',
    right: -30,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    transform: [{ rotate: '-90deg' }],
    zIndex: 1,
  },
  watermarkText: {
    fontSize: 59,
    fontWeight: '900',
    color: Colors.textSecondary,
    opacity: 0.2,
    letterSpacing: 2,
  },
  productImgWrapper: {
    width: 200,
    height: 200,
    backgroundColor: Colors.white,
    overflow: 'visible',
  },
  productImg: {
    width: 200,
    height: 200,
    backgroundColor: Colors.white,
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  productInfo: {
    alignItems: 'center',
    paddingHorizontal: Spacing.S5,
    paddingTop: Spacing.S6,
    paddingBottom: Spacing.S5,
    gap: Spacing.S2,
  },
  productName: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  productOriginal: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  productFinal: {
    ...Typography.bodySmallSB,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  offersSection: {
    alignItems: 'center',
    gap: Spacing.S3,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  bankMoreChip: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.subtleNeutralGroup,
    borderWidth: 1,
    borderColor: Colors.separator,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankMoreText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  buyText: {
    ...Typography.bodySB,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  firstOrderText: {
    ...Typography.bodySB,
    color: Colors.successHighlight,
    textAlign: 'center',
  },
});
