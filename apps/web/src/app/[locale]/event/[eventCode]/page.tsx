import { notFound } from 'next/navigation';

import { ChristmasContent } from '../(christmas)';
import { EventEndOverlay } from '../(common)/EventEndOverlay';
import { HalloweenContent } from '../(halloween)/Content';

const EVENT_INFO = {
  HALLOWEEN_2024: {
    endTime: new Date('2024-11-07'),
    Content: HalloweenContent,
  },
  HALLOWEEN_2024_STAR_BONUS: {
    endTime: new Date('2024-11-07'),
    Content: HalloweenContent,
  },
  CHRISTMAS_2024: {
    endTime: new Date('2024-12-31'),
    Content: ChristmasContent,
  },
  CHRISTMAS_2024_STAR_BONUS: {
    endTime: new Date('2024-12-31'),
    Content: ChristmasContent,
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

  const { endTime, Content } = EVENT_INFO[params.eventCode as EventCode];

  const now = new Date();
  const isEndEvent = now.getTime() > endTime.getTime();

  return (
    <>
      <Content />

      {isEndEvent && <EventEndOverlay />}
    </>
  );
}

export default EventPage;
