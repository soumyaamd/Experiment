/**
 * SLAP Design Tokens
 * Extracted from Figma — single source of truth for the snap-scroll home screen.
 */

import { Dimensions, Platform } from 'react-native';

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
export const Colors = {
  appBackground: '#fafafa',
  white: '#ffffff',
  subtleNeutralGroup: '#f9f9f9',
  subtleNeutralGroup2: '#f5f5f5',
  boldNeutralGroup: '#333333',
  boldNeutralEmphasis: '#212121',
  textPrimary: '#333333',
  textPrimary2: '#141414',
  textSecondary: '#707070',
  textInverted: '#ffffff',
  brandPrimary: '#c70255',
  brandGroup: '#a60047',
  subtleBrandGroup: '#fff0f4',
  brandSecondaryLink: '#1162f2',
  successHighlight: '#008042',
  separator: '#ebebeb',
  neutralHighlight: '#999999',
  emphasisDark: '#d6d6d6',
  gradientSecondary: '#cc7802',
  boldOpacity: 'rgba(0,0,0,0.56)',
  subtleOpacity: 'rgba(255,255,255,0.88)',
  scrim: 'rgba(0,0,0,0.68)',
} as const;

// ---------------------------------------------------------------------------
// Typography — font families with Platform fallback
// ---------------------------------------------------------------------------
const ff = (custom: string): string =>
  Platform.select({ ios: custom, android: custom, default: 'System' }) ?? 'System';

export const FontFamily = {
  bricolage700: ff('BricolageGrotesque_700Bold'),
  geist400: ff('Geist_400Regular'),
  geist600: ff('Geist_600SemiBold'),
} as const;

export const Typography = {
  sectionHeading: {
    fontFamily: FontFamily.bricolage700,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
    textAlign: 'center' as const,
  },
  bodyDefault: {
    fontFamily: FontFamily.geist400,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodySB: {
    fontFamily: FontFamily.geist600,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
  bodySmall: {
    fontFamily: FontFamily.geist400,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  bodySmallSB: {
    fontFamily: FontFamily.geist600,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
  },
  label: {
    fontFamily: FontFamily.geist600,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },
  labelLight: {
    fontFamily: FontFamily.geist400,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400' as const,
    letterSpacing: 0.1,
  },
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------
export const Spacing = {
  S2: 4,
  S3: 6,
  S4: 8,
  S5: 12,
  S6: 16,
  S7: 20,
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------
export const Radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// ---------------------------------------------------------------------------
// Snap layout constants
// ---------------------------------------------------------------------------
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const PEEK_RATIO = 0.10;
export const PEEK = Math.round(SCREEN_HEIGHT * PEEK_RATIO);
export const SECTION_HEIGHT = SCREEN_HEIGHT - PEEK * 2;
export const GAP = 1;
export const SNAP_STEP = SECTION_HEIGHT + GAP;

// ---------------------------------------------------------------------------
// Figma asset URIs
// ---------------------------------------------------------------------------
export const Assets = {
  FEATURE_CARD_1: 'https://www.figma.com/api/mcp/asset/b3524851-e239-4717-a25e-a8725ce02fb4',
  FEATURE_CARD_2: 'https://www.figma.com/api/mcp/asset/12fc1eb9-68ff-4ec3-b325-6b904e34b5fb',
  REVIEW_PRODUCT: 'https://www.figma.com/api/mcp/asset/00ccce4d-cb29-4e76-85d9-8d0cfa902d6e',
  REVIEW_STAR: 'https://www.figma.com/api/mcp/asset/61d7864d-99e0-468d-a214-50dec493c956',
  REVIEW_GOOD: 'https://www.figma.com/api/mcp/asset/22826c96-4df4-4764-a02e-b9e8d8cb61e5',
  REVIEW_BAD: 'https://www.figma.com/api/mcp/asset/ee33efc8-31b2-46ea-ad10-5f7d8cf0370e',
  DECODED_IMG: 'https://www.figma.com/api/mcp/asset/8675fef9-6ebd-4c12-9c19-95ec5c0417af',
  DECODED_ZARA: 'https://www.figma.com/api/mcp/asset/36c38491-0a70-424d-8d67-aa651a08345d',
  DECODED_LEVIS: 'https://www.figma.com/api/mcp/asset/267c70de-edb4-4219-b78b-1ec0769a9ba6',
  DECODED_PEPABELLA: 'https://www.figma.com/api/mcp/asset/a9186d79-d66e-48e3-a1b3-4b16420d1b38',
  COMPARE_PRODUCT: 'https://www.figma.com/api/mcp/asset/c0b7040b-7ea0-4056-8d15-05e64a3acf32',
  DEAL_BADGE: 'https://www.figma.com/api/mcp/asset/ddd5a34c-5744-44de-9492-fe15ecec54d2',
  DEAL_PRODUCT: 'https://www.figma.com/api/mcp/asset/e3ff727e-1c78-472e-86f5-4c4396a670d2',
  DEAL_BANK_LOGO: 'https://www.figma.com/api/mcp/asset/76d365e4-1d04-4d20-85c8-941d592b8c40',
  PERSONAL_BG: 'https://www.figma.com/api/mcp/asset/d5bdce8b-4205-4f5a-8bf3-50223b7e4b8f',
  STYLE_DROP_IMG: 'https://www.figma.com/api/mcp/asset/8e6b1dbb-72c9-4bf0-86fc-caf8be8c2490',
  COMPLETE_IMG: 'https://www.figma.com/api/mcp/asset/0d792c5e-f5c3-4941-b61e-592834a3c774',
  OCCASION_IMG: 'https://www.figma.com/api/mcp/asset/cb4ccb85-e739-40ea-99ab-142697fe85ff',
} as const;
