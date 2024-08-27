'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@gitanimals/ui-panda';
import { toast } from 'sonner';

import { NOTICE_LIST } from './notice';

function NoticeToast() {
  const [isRender, setIsRender] = useState(false);

  const noticeDataList = NOTICE_LIST;
  const router = useRouter();

  const getRenderNoticeList = () => {
    const viewNotice = window.localStorage.getItem('viewNotice');

    if (!viewNotice) {
      window.localStorage.setItem('viewNotice', JSON.stringify(noticeDataList));
      return noticeDataList;
    }
  };

  useEffect(() => {
    if (isRender) return;
    setIsRender(true);

    console.log('noticeDataList: ', noticeDataList);
    noticeDataList.forEach((notice) => {
      toast(notice.label, {
        action: <Button onClick={() => router.push(notice.url)}>Action</Button>,
      });
    });
  }, []);

  return <div></div>;
}

export default NoticeToast;
