'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@gitanimals/ui-tailwind';

import DevModePage from '@/components/DevMode/DevModePage';
import GNB from '@/components/GNB/GNB';

import DevClient from './Client';

function DevPage() {
  return (
    <DevModePage>
      <div className="p-8">
        <GNB />
        <h1>server</h1>
        <hr className="my-6" />
        <h1>client</h1>
        <DevClient />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </DevModePage>
  );
}

export default DevPage;
