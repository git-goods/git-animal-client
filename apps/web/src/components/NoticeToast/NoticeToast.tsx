'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { performCancellableAsyncTask } from '@gitanimals/util-common';
import { toast } from 'sonner';

import { useClientSession } from '@/utils/clientAuth';

import { NOTICE_LIST } from './notice';

const generationNoticeKey = (noticeKey: string) => {
  return `notice_${noticeKey}`;
};

function NoticeToast() {
  const router = useRouter();
  const { status } = useClientSession();
  const isLogin = status === 'authenticated';

  const setViewNoticeItem = (id: string | number) => {
    const viewStorageData = window.localStorage.getItem('viewNotice');
    const viewList = viewStorageData ? JSON.parse(viewStorageData) : [];

    viewList.push(id);
    window.localStorage.setItem('viewNotice', JSON.stringify(viewList));
  };

  const getRenderNoticeList = () => {
    const viewStorageData = window.localStorage.getItem('viewNotice');

    if (!viewStorageData) {
      return NOTICE_LIST;
    }

    const viewList = JSON.parse(viewStorageData);

    return NOTICE_LIST.filter((notice) => !viewList.includes(generationNoticeKey(notice.key)));
  };

  const renderToast = (notice: (typeof NOTICE_LIST)[number]) => {
    const toastId = generationNoticeKey(notice.key);
    if (notice?.isAuth && notice.isAuth === isLogin) return;

    toast(notice.label, {
      id: toastId,
      duration: Infinity,
      className: 'notice-toast',
      onDismiss: () => setViewNoticeItem(toastId),
      onAutoClose: () => setViewNoticeItem(toastId),
      closeButton: true,
      action: notice.redirectUrl
        ? {
            label: 'GO',
            onClick: () => {
              router.push(notice.url);
              setViewNoticeItem(toastId);
            },
          }
        : undefined,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    performCancellableAsyncTask(null, {
      signal: controller.signal,
    }).then(() => {
      const renderList = getRenderNoticeList();
      renderList.forEach((notice) => renderToast(notice));
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}

export default NoticeToast;
