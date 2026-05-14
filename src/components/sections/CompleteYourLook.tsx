/**
 * CompleteYourLook — Section 6
 * Horizontal product card scroll showing complementary items.
 */

import React from 'react';
import {
  Image,
  ScrollView,
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

interface ProductCardData {
  id: string;
  name: string;
  image: string;
  discount: string;
  original: string;
  final: string;
}

const PRODUCTS: ProductCardData[] = [
  {
    id: '1',
    name: 'White slim fit Oxford shirt',
    image: Assets.DECODED_ZARA,
    discount: '↓ 8%',
    original: '3,799',
    final: '₹900',
  },
  {
    id: '2',
    name: 'Classic chino trousers',
    image: Assets.DECODED_LEVIS,
    discount: '↓ 12%',
    original: '4,200',
    final: '₹1,299',
  },
  {
    id: '3',
    name: 'Canvas sneakers low top',
    image: Assets.DECODED_PEPABELLA,
    discount: '↓ 20%',
    original: '2,500',
    final: '₹799',
  },
];

// ---------------------------------------------------------------------------
// Sub-component: ProductCard
// ---------------------------------------------------------------------------

function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <View style={cardStyles.card}>
      <Image
        source={{ uri: product.image }}
        style={cardStyles.image}
        resizeMode="cover"
      />
      <View style={cardStyles.info}>
        <Text style={cardStyles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={cardStyles.priceRow}>
          <Text style={cardStyles.discount}>{product.discount}</Text>
          <Text style={cardStyles.original}>{product.original}</Text>
          <Text style={cardStyles.final}>{product.final}</Text>
        </View>
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.separator,
    overflow: 'hidden',
  },
  image: {
    width: 160,
    height: 140,
    borderRadius: 12,
  },
  info: {
    padding: Spacing.S4,
    gap: Spacing.S2,
  },
  name: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.S2,
    flexWrap: 'wrap',
  },
  discount: {
    ...Typography.labelLight,
    color: Colors.successHighlight,
    fontWeight: '600',
  },
  original: {
    ...Typography.labelLight,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  final: {
    ...Typography.labelLight,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function CompleteYourLook({ scrollY, sectionIndex }: Props) {
  const progress = useSectionProgress(scrollY, sectionIndex);
  const containerStyle = useContainerStyle(progress);
  const contentStyle = useContentStyle(progress);
  const ctaStyle = useCTAStyle(progress);

  return (
    <Animated.View style={[styles.root, { height: SECTION_HEIGHT }, containerStyle]}>
      {/* Header with icon */}
      <View style={styles.headerArea}>
        <PaginationDots total={9} active={5} />
        {/* Icon circle placeholder */}
        <View style={styles.iconCircle}>
          <Image source={{ uri: Assets.COMPLETE_IMG }} style={styles.iconImg} resizeMode="cover" />
        </View>
        <Text style={styles.title}>Complete your look</Text>
        <Text style={styles.subtitle}>Products that go with your recent picks</Text>
      </View>

      {/* Horizontal product scroll */}
      <Animated.View style={[styles.scrollWrapper, contentStyle]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={160 + Spacing.S5}
          snapToAlignment="start"
        >
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ScrollView>
      </Animated.View>

      {/* Pagination */}
      <PaginationDots total={3} active={0} />

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
  headerArea: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: Spacing.S6,
    paddingHorizontal: Spacing.S6,
    gap: Spacing.S3,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.emphasisDark,
  },
  iconImg: {
    width: 48,
    height: 48,
  },
  title: {
    ...Typography.sectionHeading,
    color: Colors.textPrimary2,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  scrollWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.S6,
    gap: Spacing.S5,
    alignItems: 'center',
  },
});
