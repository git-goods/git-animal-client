import { notFound } from 'next/navigation';

import { ChristmasContent } from '../(chrismas)/Content';
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
    endTime: new Date('2024-12-30'),
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

  const eventInfo = EVENT_INFO[params.eventCode as EventCode];

  const now = new Date();
  const isEndEvent = now.getTime() > eventInfo.endTime.getTime();

  return (
    <>
      <eventInfo.Content />
      {isEndEvent && <EventEndOverlay />}
    </>
  );
}

export default EventPage;
