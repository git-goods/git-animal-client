'use client';

import React, { memo } from 'react';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAllPetsQueryOptions } from '@/apis/user/useGetAllPets';

const PersonaList = memo(
  wrap
    .Suspense({ fallback: null })
    .ErrorBoundary({
      fallback: <div>error</div>,
    })
    .on(function PersonaList({ name }: { name: string }) {
      //   console.log('name: ', name);
      const { data } = useSuspenseQuery(getAllPetsQueryOptions(name));
      console.log('data: ', data);

      //   useEffect(() => {
      //     const fetchData = async () => {
      //       const data = await getAllMyPets(name);
      //       //   const data = await getAllPets(name);
      //       console.log('data: ', data);
      //     };
      //     fetchData();
      //   }, [name]);
      return <>{}</>;
    }),
);

export default PersonaList;
