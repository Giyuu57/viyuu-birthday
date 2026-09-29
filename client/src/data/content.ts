import type { SiteContent } from '../types';

/**
 * ✏️ EDIT ME
 * ----------
 * Every piece of text on the website lives here. Change a line here and it
 * updates everywhere it's used — no need to touch any component.
 *
 * This is also the fallback content used if the backend API is unreachable,
 * so the site never breaks even if the server isn't running.
 */
export const content: SiteContent = {
  name: 'Viyuu',

  hero: {
    greeting: 'Hey Viyuu… ♡',
    subtitle: 'I made something for you.',
    cta: 'Open your surprise ✨',
  },

  birthday: {
    title: 'Happy Birthday, Viyuu 💗',
    candleHint: 'tap the candles ✦',
    wish: 'Make a wish, Viyuu ✨',
    wishFollowUp: 'I hope all your little wishes find their way to you.',
  },

  loveJourney: [
    'Some people make life louder.',
    'You somehow make mine softer.',
    "And I'm really glad I get to have you in my little world.",
  ],

  loveCards: [
    {
      title: 'Something I love about you ♡',
      message:
        "The way you get quietly excited about small things — it's one of my favorite things to watch happen.",
    },
    {
      title: 'A little reminder for you 🌷',
      message:
        "You don't have to earn rest, or love, or good things. You're allowed to just receive them today.",
    },
    {
      title: 'Something I want you to remember ✨',
      message:
        "On your worst days you're still someone's favorite person. On your best days, you're still mine.",
    },
  ],

  letter: {
    title: 'I wrote something for you…',
    subtitle: "open it whenever you're ready",
    hint: 'tap the envelope',
  },

  gallery: {
    title: 'A few little things for my Viyuu ♡',
    hint: 'tap a drawing to open it',
  },

  loveMeter: {
    title: 'How much do I love you?',
    overflowTitle: 'ERROR: Love overflow.',
    overflowMessage: "Yeah… I don't think there's a number big enough. ♡",
  },

  secret: {
    foundTitle: 'You found my little secret.',
    messageLines: [
      "If I could give you one thing today, I'd give you the ability to see yourself through my eyes.",
      "Maybe then you'd understand just how special you are to me. ❤️",
    ],
  },

  finale: [
    "And that's all I wanted to say…",
    'Happy Birthday, Viyuu. ❤️',
    'I hope you always remember that you are loved, appreciated, and incredibly special.',
    'Thank you for being you.',
    '♡ Always yours',
  ],
};
