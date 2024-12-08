import { notFound } from 'next/navigation';

import { Footer } from '../../landing/Footer';
import { ChristmasContent } from '../(christmas)';
import { EventEndOverlay } from '../(common)/EventEndOverlay';
import { HalloweenContent } from '../(halloween)/Content';

const EVENT_INFO = {
  HALLOWEEN_2024: {
    endTime: new Date('2024-11-07'),
    Content: HalloweenContent,
    footerColor: '#000',
  },
  HALLOWEEN_2024_STAR_BONUS: {
    endTime: new Date('2024-11-07'),
    Content: HalloweenContent,
    footerColor: '#000',
  },
  CHRISTMAS_2024: {
    endTime: new Date('2024-12-31'),
    Content: ChristmasContent,
    footerColor: '#559FC3',
  },
  CHRISTMAS_2024_STAR_BONUS: {
    endTime: new Date('2024-12-31'),
    Content: ChristmasContent,
    footerColor: '#559FC3',
  },
} as const;

type EventCode = keyof typeof EVENT_INFO;

interface Params {
  eventCode: string;
}

async function EventPage({ params }: { params: Params }) {
  if (!params.eventCode || !(params.eventCode in EVENT_INFO)) {
    notFound();
  }

  const { endTime, Content, footerColor } = EVENT_INFO[params.eventCode as EventCode];

  const now = new Date();
  const isEndEvent = now.getTime() > endTime.getTime();

  return (
    <div>
      <Content />
      {isEndEvent && <EventEndOverlay />}
      <div style={{ backgroundColor: footerColor ?? 'black' }}>
        <Footer />
      </div>
    </div>
  );
}

export default EventPage;
