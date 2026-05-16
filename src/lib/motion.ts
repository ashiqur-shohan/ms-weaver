/**
 * Shared easing curves and duration tiers for Motion animations.
 * All animated components should reference these values — never hardcode.
 *
 * Pairs with useReducedMotion() from motion/react for accessible animation.
 */

export const easings = {
  /** General transitions — modals, tabs, color swaps */
  default: [0.22, 1, 0.36, 1],
  /** Elements entering viewport — scroll reveals, page transitions */
  entrance: [0.16, 1, 0.3, 1],
  /** Clip-path wipes on images */
  image: [0.65, 0, 0.35, 1],
} as const;

export const durations = {
  /** 200ms — hover states, color swaps, opacity fades */
  micro: 0.2,
  /** 500ms — modals, sheet open/close, tab switches */
  standard: 0.5,
  /** 800ms — hero entrance, section reveals */
  ambient: 0.8,
} as const;
