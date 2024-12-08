import React from 'react';

import GNB from '@/components/GNB/GNB';

export async function generateMetadata({ params }: { params: { eventCode: string } }) {
  return {
    openGraph: {
      images: [
        {
          url: `/event/${params.eventCode}/og-image.png`,
        },
      ],
    },
  };
}

function EventLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <GNB />
      {children}
    </div>
  );
}

export default EventLayout;
