/**
 * DecodedLooks — Section 3
 * Instagram outfit decoded with a blurred side panel showing matched brands.
 */

import React from 'react';
import {
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
import { BlurView } from 'expo-blur';

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

interface Props {
  scrollY: SharedValue<number>;
  sectionIndex: number;
}

const BRANDS = [
  { name: 'Zara', price: '₹160', img: Assets.DECODED_ZARA },
  { name: 'Levis', price: '₹160', img: Assets.DECODED_LEVIS },
  { name: 'Pepabella...', price: '₹160', img: Assets.DECODED_PEPABELLA },
];

const CARD_W = 310;
const CARD_H = 475;
const BLUR_PANEL_W = 80;

export default function DecodedLooks({ scrollY, sectionIndex }: Props) {
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Header */}
      <SectionHeader
        title="Instagram looks decoded"
        subtitle="Instagram trends, now made shoppable"
        totalDots={9}
        activeDot={2}
        progress={progress}
      />

      {/* Main card */}
      <Animated.View style={[styles.cardWrapper, contentStyle]}>
        <View style={[styles.card, { width: CARD_W, height: CARD_H }]}>
          {/* Background photo */}
          <Image
            source={{ uri: Assets.DECODED_IMG }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />

          {/* Indie chic tag chip — top left */}
          <View style={styles.tagChip}>
            <Text style={styles.tagChipIcon}>📸</Text>
            <Text style={styles.tagChipText}>Indie chic</Text>
          </View>

          {/* Blur panel — right side */}
          <BlurView
            intensity={40}
            tint="dark"
            style={[styles.blurPanel, { width: BLUR_PANEL_W }]}
          >
            {/* Best Match label */}
            <View style={styles.bestMatchRow}>
              <View style={styles.bestMatchLine} />
              <Text style={styles.bestMatchText}>BEST{'\n'}MATCH</Text>
              <View style={styles.bestMatchLine} />
            </View>

            {/* Brand items */}
            {BRANDS.map((brand, i) => (
              <React.Fragment key={brand.name}>
                <View style={styles.brandItem}>
                  <Image
                    source={{ uri: brand.img }}
                    style={styles.brandAvatar}
                    resizeMode="cover"
                  />
                  <Text style={styles.brandName} numberOfLines={1}>
                    {brand.name}
                  </Text>
                  <Text style={styles.brandPrice}>{brand.price}</Text>
                </View>
                {i < BRANDS.length - 1 && <View style={styles.brandDivider} />}
              </React.Fragment>
            ))}
          </BlurView>

          {/* View similar button — bottom center */}
          <View style={styles.viewSimilarWrapper}>
            <TouchableOpacity style={styles.viewSimilarBtn} activeOpacity={0.85}>
              <Text style={styles.viewSimilarIcon}>👁</Text>
              <Text style={styles.viewSimilarText}>View similar</Text>
              {/* Stacked avatars */}
              <View style={styles.avatarsRow}>
                {[0, 1, 2].map((i) => (
                  <View
                    key={i}
                    style={[styles.avatar, i > 0 && { marginLeft: -7 }]}
                  />
                ))}
                <View style={[styles.avatarCount, { marginLeft: -4 }]}>
                  <Text style={styles.avatarCountText}>+20</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* CTA */}
      <CTABar label="Decode more looks" progress={progress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.appBackground,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  // Tag chip
  tagChip: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.subtleOpacity,
    borderRadius: 20,
    paddingHorizontal: Spacing.S4,
    paddingVertical: Spacing.S3,
    zIndex: 10,
  },
  tagChipIcon: {
    fontSize: 11,
  },
  tagChipText: {
    ...Typography.label,
    color: Colors.textPrimary,
  },
  // Blur side panel
  blurPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.S6,
    gap: Spacing.S4,
    overflow: 'hidden',
  },
  bestMatchRow: {
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.S3,
  },
  bestMatchLine: {
    width: 24,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  bestMatchText: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  brandItem: {
    alignItems: 'center',
    gap: 2,
  },
  brandAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  brandName: {
    fontSize: 9,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  brandPrice: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  brandDivider: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  // View similar
  viewSimilarWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: BLUR_PANEL_W,
    alignItems: 'center',
  },
  viewSimilarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.S3,
    backgroundColor: Colors.subtleNeutralGroup2,
    borderRadius: Radius.lg,
    height: 42,
    paddingHorizontal: Spacing.S5,
  },
  viewSimilarIcon: {
    fontSize: 14,
  },
  viewSimilarText: {
    ...Typography.bodySmallSB,
    color: Colors.textPrimary,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.emphasisDark,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  avatarCount: {
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.boldNeutralGroup,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  avatarCountText: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.white,
  },
});
