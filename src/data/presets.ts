import { CakeTheme, PresetWish, GiftSurprise } from '../types';

export const CAKE_THEMES: CakeTheme[] = [
  {
    id: 'strawberry',
    name: 'Strawberry Dream',
    description: 'Pastel strawberry glaze with soft whipped vanilla cream',
    plateColor: '#f1f5f9',
    layer1: '#ff8fab',
    layer2: '#ffc2d1',
    frosting: '#ffe5ec',
    dripColor: '#fb6f92',
    accentColor: '#ff007f',
  },
  {
    id: 'chocolate',
    name: 'Belgian Truffle',
    description: 'Decadent dark cocoa sponge with rich salted caramel drizzle',
    plateColor: '#e2e8f0',
    layer1: '#4a2810',
    layer2: '#6f3d1b',
    frosting: '#381e0d',
    dripColor: '#e0a96d',
    accentColor: '#d4af37',
  },
  {
    id: 'rainbow',
    name: 'Confetti Carnival',
    description: 'Buttery funfetti sponge adorned with rainbow candy sprinkles',
    plateColor: '#ffffff',
    layer1: '#38bdf8',
    layer2: '#fbbf24',
    frosting: '#ffffff',
    dripColor: '#f43f5e',
    accentColor: '#8b5cf6',
  },
  {
    id: 'lavender',
    name: 'Enchanted Velvet',
    description: 'Delicate blueberry lavender cream with shimmering violet pearls',
    plateColor: '#ede9fe',
    layer1: '#8b5cf6',
    layer2: '#c084fc',
    frosting: '#f3e8ff',
    dripColor: '#a855f7',
    accentColor: '#7c3aed',
  },
  {
    id: 'matcha',
    name: 'Matcha Blossom',
    description: 'Ceremonial matcha chiffon with ivory mascarpone and gold foil',
    plateColor: '#f0fdf4',
    layer1: '#4d7c0f',
    layer2: '#65a30d',
    frosting: '#ecfccb',
    dripColor: '#a3e635',
    accentColor: '#eab308',
  },
];

export const BACKGROUND_GRADIENTS = [
  {
    id: 'cotton-candy',
    name: 'Cotton Candy Sunset',
    css: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%)',
    textColor: 'text-white',
    glowColor: '#ff0080',
  },
  {
    id: 'midnight-glam',
    name: 'Midnight Glamour',
    css: 'linear-gradient(135deg, #090d16 0%, #200f37 40%, #1e1b4b 100%)',
    textColor: 'text-white',
    glowColor: '#ec4899',
  },
  {
    id: 'golden-hour',
    name: 'Golden Radiance',
    css: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 50%, #ec4899 100%)',
    textColor: 'text-white',
    glowColor: '#ffd700',
  },
  {
    id: 'electric-violet',
    name: 'Cosmic Violet',
    css: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
    textColor: 'text-white',
    glowColor: '#f43f5e',
  },
  {
    id: 'peachy-glow',
    name: 'Peach Sorbet',
    css: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #feb47b 100%)',
    textColor: 'text-white',
    glowColor: '#ff1493',
  },
];

export const PRESET_WISHES: PresetWish[] = [
  {
    category: 'Heartfelt',
    title: 'Warm & Loving',
    message: 'May your birthday be filled with endless warmth, genuine laughter, and cherished memories with the people who love you most! ❤️',
  },
  {
    category: 'Playful',
    title: 'Fun & Cheerful',
    message: 'Happy Birthday! Another year older, wiser, and significantly more fabulous. May your day be as extraordinary as you are! 🎂✨',
  },
  {
    category: 'Inspiring',
    title: 'New Horizons',
    message: 'Wishing you a magnificent year ahead packed with bold adventures, breakthrough dreams, and limitless happiness! 🌟',
  },
  {
    category: 'Sweet',
    title: 'Short & Classic',
    message: 'Happy Birthday! Wishing you good health, lasting prosperity, and reasons to smile every single day. 🎈',
  },
];

export const GIFT_SURPRISES: GiftSurprise[] = [
  {
    id: 'voucher-1',
    title: 'Official VIP Pass',
    badge: '100% Exemption',
    emoji: '👑',
    message: 'You are granted immunity from all chores, early alarms, and stress for the next 24 hours. Eat cake first!',
  },
  {
    id: 'voucher-2',
    title: 'A Year of Good Fortune',
    badge: 'Wish Granted',
    emoji: '⭐',
    message: 'May the universe conspire to bring you extraordinary opportunities, deep peace, and boundless joy in your next trip around the sun.',
  },
  {
    id: 'voucher-3',
    title: 'Feast of Your Dreams',
    badge: 'Treat Yourself',
    emoji: '🍕',
    message: 'Coupon valid for your favorite dessert, dream dinner, and zero calorie counting. You deserve the best banquet!',
  },
  {
    id: 'voucher-4',
    title: 'Epic Adventure Ticket',
    badge: 'Life Milestone',
    emoji: '🚀',
    message: 'Here is to ticking off big bucket-list dreams, exploring new places, and making unforgettable stories this year!',
  },
];
