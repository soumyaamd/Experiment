/**
 * ProductCompare — Section 4
 * Side-by-side product comparison with feature tabs.
 */

import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import PriceRow from '../shared/PriceRow';
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

const FEATURE_TABS = ['Cooling', 'Energy Saving', 'Air filtration'];

// ---------------------------------------------------------------------------
// Sub-component: ProductCard
// ---------------------------------------------------------------------------

function ProductCard({ align }: { align: 'left' | 'right' }) {
  const isRight = align === 'right';
  return (
    <View style={[styles.productCard, isRight ? styles.productCardLeft : styles.productCardRight]}>
      <Image
        source={{ uri: Assets.COMPARE_PRODUCT }}
        style={styles.productImg}
        resizeMode="contain"
      />
      <RatingChip rating="4.2" count="1.2k" size="sm" />
      <Text
        style={[
          styles.productName,
          { textAlign: isRight ? 'left' : 'right' },
        ]}
        numberOfLines={3}
      >
        Panasonic 1.5 ton 5 star dual invertor
      </Text>
      <Text
        style={[
          styles.productDiscount,
          { textAlign: isRight ? 'left' : 'right' },
        ]}
      >
        ↓ 18%
      </Text>
      <Text
        style={[
          styles.productOriginal,
          { textAlign: isRight ? 'left' : 'right' },
        ]}
      >
        ₹32,299
      </Text>
      <Text
        style={[
          styles.productFinal,
          { textAlign: isRight ? 'left' : 'right' },
        ]}
      >
        ₹22,299
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ProductCompare({ scrollY, sectionIndex }: Props) {
  const [activeTab, setActiveTab] = useState(1); // 'Energy Saving' active by default
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Header */}
      <SectionHeader
        title="Compare before you buy"
        subtitle="Compare with the closest matches before buying"
        totalDots={9}
        activeDot={3}
        progress={progress}
      />

      <Animated.View style={[styles.content, contentStyle]}>
        {/* Filter chip */}
        <View style={styles.filterChipRow}>
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>1.5 ton AC under 30k</Text>
          </View>
        </View>

        {/* Products row */}
        <View style={styles.productsRow}>
          <ProductCard align="right" />

          {/* Compare icon */}
          <View style={styles.compareIcon}>
            <Text style={styles.compareIconText}>⇌</Text>
          </View>

          <ProductCard align="left" />
        </View>

        {/* Feature tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          <View style={styles.tabs}>
            {FEATURE_TABS.map((tab, i) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  i === activeTab ? styles.tabActive : styles.tabInactive,
                ]}
                onPress={() => setActiveTab(i)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    i === activeTab ? styles.tabTextActive : styles.tabTextInactive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Feature description cards */}
        <View style={styles.featureCards}>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>
              30% extra saving, save up to ₹1,200 per year
            </Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>
              Key strength 1 and more things about it
            </Text>
          </View>
        </View>

        {/* Pagination */}
        <PaginationDots total={4} active={1} />
      </Animated.View>

      {/* CTA */}
      <CTABar label="Suggest some designer styles" progress={progress} />
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.S6,
    justifyContent: 'center',
    gap: Spacing.S5,
  },
  filterChipRow: {
    alignItems: 'center',
  },
  filterChip: {
    backgroundColor: Colors.brandPrimary,
    borderRadius: Radius.sm,
    height: 26,
    paddingHorizontal: Spacing.S5,
    justifyContent: 'center',
  },
  filterChipText: {
    ...Typography.bodySmall,
    color: Colors.white,
  },
  productsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  productCard: {
    width: 136,
    gap: Spacing.S3,
  },
  productCardRight: {
    alignItems: 'flex-end',
  },
  productCardLeft: {
    alignItems: 'flex-start',
  },
  productImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  productName: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
  productDiscount: {
    ...Typography.bodySmallSB,
    color: Colors.successHighlight,
  },
  productOriginal: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  productFinal: {
    ...Typography.bodySmallSB,
    color: Colors.textPrimary,
  },
  compareIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.boldNeutralEmphasis,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareIconText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  tabsScroll: {
    flexGrow: 1,
  },
  tabs: {
    flexDirection: 'row',
    gap: Spacing.S4,
    width: 328,
  },
  tab: {
    flex: 1,
    height: 28,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: Colors.boldNeutralGroup,
  },
  tabInactive: {
    backgroundColor: Colors.subtleNeutralGroup2,
  },
  tabText: {
    ...Typography.bodySmall,
  },
  tabTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  tabTextInactive: {
    color: Colors.textSecondary,
  },
  featureCards: {
    flexDirection: 'row',
    gap: Spacing.S4,
  },
  featureCard: {
    flex: 1,
    backgroundColor: Colors.subtleNeutralGroup2,
    borderRadius: Radius.md,
    padding: Spacing.S5,
    minHeight: 60,
    justifyContent: 'center',
  },
  featureText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
});
