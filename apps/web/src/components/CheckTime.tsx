/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { cn } from '@gitanimals/ui-tailwind/utils';

const CHECK_DATE = '2024-07-28T18:00:00';

function CheckTime() {
  const isCheckTime = new Date().getTime() < new Date(CHECK_DATE).getTime();
  if (!isCheckTime) return null;

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden flex-col fixed top-0 left-0 right-0 bottom-0 z-loading bg-[#00894D]">
      <div className="mb-4">
        <img src="/main/cats.png" width={216} height={140} alt="cat" />
      </div>

      <h1 className="font-product text-glyph-48 font-bold">서비스 일시중지 안내</h1>
      <p className="my-5 font-product text-glyph-24 font-bold text-center">
        <span className="mb-2 block">
          죄송합니다. <br />
        </span>
        서버 이전작업으로 인한 서비스가 일시 중지 중 이오니 <br />
        점검 시간 이후 이용하여 주시기 바랍니다.
      </p>
      <p className="font-product text-glyph-24 font-bold text-center">서버 이전 시간 : ~ 7월 28일 18시</p>
    </div>
  );
}

export default CheckTime;
