/**
 * SnapScrollHome
 * Root screen for the SLAP app home experience.
 *
 * Layout:
 *  - Fixed SLAP header at the top (outside the list).
 *  - Animated.FlatList (reanimated) renders the 9 sections vertically.
 *  - Each section height = SECTION_HEIGHT, with a 1px GAP between items.
 *  - The list has top/bottom inset (iOS: contentInset, Android: paddingTop/Bottom)
 *    equal to PEEK, so the adjacent section always shows above/below.
 *  - snapToInterval ensures one-section-at-a-time snapping.
 *  - scrollY SharedValue drives per-section stagger animations.
 */

import React, { useCallback } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import {
  Colors,
  GAP,
  PEEK,
  SECTION_HEIGHT,
  SNAP_STEP,
  Spacing,
  Typography,
} from './tokens';

// Sections
import FeaturedCards from './components/sections/FeaturedCards';
import ReviewSynthesizer from './components/sections/ReviewSynthesizer';
import DecodedLooks from './components/sections/DecodedLooks';
import ProductCompare from './components/sections/ProductCompare';
import DealWall from './components/sections/DealWall';
import CompleteYourLook from './components/sections/CompleteYourLook';
import Occasion from './components/sections/Occasion';
import StyleDrop from './components/sections/StyleDrop';
import Personalisation from './components/sections/Personalisation';

// ---------------------------------------------------------------------------
// Section registry
// ---------------------------------------------------------------------------

interface SectionConfig {
  key: string;
  Component: React.ComponentType<{
    scrollY: Animated.SharedValue<number>;
    sectionIndex: number;
  }>;
}

const SECTIONS: SectionConfig[] = [
  { key: 'featured', Component: FeaturedCards },
  { key: 'review', Component: ReviewSynthesizer },
  { key: 'decoded', Component: DecodedLooks },
  { key: 'compare', Component: ProductCompare },
  { key: 'deals', Component: DealWall },
  { key: 'complete', Component: CompleteYourLook },
  { key: 'occasion', Component: Occasion },
  { key: 'styledrop', Component: StyleDrop },
  { key: 'personalisation', Component: Personalisation },
];

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function SLAPHeader() {
  return (
    <View style={headerStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.appBackground}
        translucent={false}
      />
      <Text style={headerStyles.logo}>SLAP</Text>
      <View style={headerStyles.right}>
        <View style={headerStyles.avatarCircle}>
          <Text style={headerStyles.avatarInitial}>A</Text>
        </View>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: Colors.appBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.S6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
    zIndex: 100,
  },
  logo: {
    fontFamily:
      Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    color: Colors.brandPrimary,
    textAlign: 'center',
    flex: 1,
  },
  right: {
    position: 'absolute',
    right: Spacing.S6,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.subtleBrandGroup,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.brandPrimary,
  },
  avatarInitial: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.brandPrimary,
  },
});

// ---------------------------------------------------------------------------
// SectionItem
// ---------------------------------------------------------------------------

interface SectionItemProps {
  item: SectionConfig;
  index: number;
  scrollY: Animated.SharedValue<number>;
}

function SectionItem({ item, index, scrollY }: SectionItemProps) {
  const { Component } = item;
  return (
    <View style={itemStyles.wrapper}>
      <Component scrollY={scrollY} sectionIndex={index} />
    </View>
  );
}

const itemStyles = StyleSheet.create({
  wrapper: {
    height: SECTION_HEIGHT,
    marginBottom: GAP,
  },
});

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

export default function SnapScrollHome() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      'worklet';
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: SectionConfig; index: number }) => (
      <SectionItem item={item} index={index} scrollY={scrollY} />
    ),
    [scrollY],
  );

  const keyExtractor = useCallback((item: SectionConfig) => item.key, []);

  // iOS: contentInset creates the peek effect — list content starts at y=0
  // but the visible area is inset by PEEK from top & bottom.
  // Android: we pad the list instead (contentInset not supported on Android).
  const iosProps =
    Platform.OS === 'ios'
      ? {
          contentInset: { top: PEEK, bottom: PEEK },
          contentOffset: { x: 0, y: -PEEK },
        }
      : {};

  const androidPadding =
    Platform.OS === 'android'
      ? {
          contentContainerStyle: {
            paddingTop: PEEK,
            paddingBottom: PEEK,
          },
        }
      : {};

  return (
    <View style={styles.screen}>
      <SLAPHeader />

      <Animated.FlatList
        data={SECTIONS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        // Snap config
        snapToInterval={SNAP_STEP}
        snapToAlignment="start"
        decelerationRate="fast"
        // iOS peek insets
        {...iosProps}
        // Android contentContainerStyle for padding
        {...androidPadding}
        // Misc
        showsVerticalScrollIndicator={false}
        style={styles.list}
        removeClippedSubviews={false}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={2}
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
});
