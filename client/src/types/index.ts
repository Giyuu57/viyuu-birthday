export interface LoveCardData {
  title: string;
  message: string;
}

export interface SiteContent {
  name: string;
  hero: {
    greeting: string;
    subtitle: string;
    cta: string;
  };
  birthday: {
    title: string;
    candleHint: string;
    wish: string;
    wishFollowUp: string;
  };
  loveJourney: string[];
  loveCards: LoveCardData[];
  letter: {
    title: string;
    subtitle: string;
    hint: string;
  };
  gallery: {
    title: string;
    hint: string;
  };
  loveMeter: {
    title: string;
    overflowTitle: string;
    overflowMessage: string;
  };
  secret: {
    foundTitle: string;
    messageLines: string[];
  };
  finale: string[];
}

export interface DrawingItem {
  id: number;
  filename: string;
  url: string;
}
