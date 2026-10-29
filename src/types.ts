export interface CakeTheme {
  id: string;
  name: string;
  description: string;
  plateColor: string;
  layer1: string; // bottom tier
  layer2: string; // top tier
  frosting: string;
  dripColor: string;
  accentColor: string;
}

export interface PresetWish {
  category: string;
  title: string;
  message: string;
}

export interface BalloonItem {
  id: number;
  xPercent: number; // 0 to 100vw
  hue: number;
  scale: number;
  duration: number; // in seconds
  swayDelay: number;
  startY: number; // start below screen
}

export interface GiftSurprise {
  id: string;
  title: string;
  badge: string;
  emoji: string;
  message: string;
}

export interface CardCustomization {
  recipientName: string;
  senderName: string;
  age: string;
  message: string;
  cakeThemeId: string;
  bgThemeId: string;
  numCandles: number;
}
