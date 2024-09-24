'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import useEffectOnce from '@/hooks/lifeCycle/useEffectOnce';
import { useClientSession } from '@/utils/clientAuth';
import { sendLog } from '@/utils/log';

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

    return NOTICE_LIST.filter((notice) => !viewList.includes(generationNoticeKey(notice.key)) && notice.visible);
  };

  const renderToast = (notice: (typeof NOTICE_LIST)[number]) => {
    const toastId = generationNoticeKey(notice.key);
    if (notice?.isAuth && notice.isAuth !== isLogin) return;

    toast(notice.label, {
      id: toastId,
      duration: Infinity,
      className: 'notice-toast',
      position: 'top-right',
      onDismiss: () => {
        setViewNoticeItem(toastId);
        sendLog({ noticeKey: toastId, type: 'notice' }, 'notice toast dismiss');
      },
      onAutoClose: () => setViewNoticeItem(toastId),
      ...notice,
      action: notice.redirect
        ? {
            label: notice.redirect.label,
            onClick: () => {
              notice.redirect?.isOutLink ? window.open(notice.redirect.url) : router.push(notice.redirect.url);
              setViewNoticeItem(toastId);
              sendLog({ noticeKey: toastId, type: 'notice' }, `notice : ${notice.redirect.label}`);
            },
          }
        : undefined,
    });
  };

  useEffectOnce(() => {
    const renderList = getRenderNoticeList();

    renderList.forEach((notice) => renderToast(notice));
  });

  return <></>;
}

export default NoticeToast;
