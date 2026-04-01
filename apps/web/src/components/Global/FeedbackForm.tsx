/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@gitanimals/ui-tailwind';
import { XIcon } from '@gitanimals/ui-icon';
import { Button } from '@gitanimals/ui-tailwind';
import { toast } from 'sonner';

import { usePostFeedback } from '@/apis/github/usePostFeedback';
import type { PostIssueRequest } from '@/apis/github/usePostIssue';
import Input from '@/components/Input';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import type { GithubIssueType } from '@/constants/github';
import { GITHUB_ISSUE_TYPE, SERVICE_MAINTAINER } from '@/constants/github';
import { useClientUser } from '@/utils/clientAuth';
import { sendLog } from '@/utils/log';

const ISSUE_LABEL: Record<
  string,
  {
    label: string;
    color: string;
    relations?: GithubIssueType[];
  }
> = {
  BUG: {
    label: 'bug',
    color: '#FFDBEE',
    relations: [GITHUB_ISSUE_TYPE.BUG],
  },
  REQUEST: {
    label: 'request',
    color: '#C4F2F7',
    relations: [GITHUB_ISSUE_TYPE.ENHANCEMENT],
  },
  ETC: {
    label: 'etc',
    color: '#FFCC91',
  },
} as const;

function FeedBack() {
  const [isOpen, setIsOpen] = useState(false);
  const { name: username } = useClientUser();

  const { content, onContentChange, isValid, initContent } = useFeedbackContent();
  const { mutate, isPending } = usePostFeedback();

  const onSubmit = async () => {
    sendLog({ title: content.title, username: username ?? 'not login' }, 'feedback form submitted');

    mutate(
      { ...content, assignees: SERVICE_MAINTAINER, username },
      {
        onSuccess(data) {
          toast.success(`Thank you for your feedback!`, {
            duration: 3000,
            position: 'top-center',
            action: {
              label: 'View',
              onClick: () => {
                toast.dismiss();
                window.open(data.html_url);
              },
            },
          });
          setIsOpen(false);
          initContent();
        },
      },
    );
  };

  return (
    <>
      <button
        className="fixed bottom-0 right-1 h-[121px] w-[110px] z-floating max-mobile:scale-[0.7] max-mobile:-right-3 max-mobile:-bottom-3"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src={isOpen ? `/feedback/icon-channeltalk-close.svg` : `/feedback/icon-channeltalk-default.svg`}
          alt="feedback"
          width={140}
          height={160}
        />
      </button>

      {isOpen && (
        <div className="fixed bottom-[120px] right-6 flex flex-col w-[406px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] bg-white z-drawer animate-fade-in-up max-mobile:w-full max-mobile:bottom-0 max-mobile:right-0 max-mobile:left-0 max-mobile:gap-0">
          <section className="px-8 py-6 relative bg-brand-sky flex flex-col gap-6 items-center max-mobile:p-4 [&_h2]:text-black-90 [&_h2]:text-center [&_h2]:font-product [&_h2]:text-glyph-18 [&_h2]:font-bold [&_p]:text-black-75 [&_p]:font-product [&_p]:text-glyph-14">
            <h2>Feedback</h2>
            <img src="/feedback/feedback-profile.png" alt="feedback" width={67.5} height={67} />
            <p>
              Hi there! I&apos;m a Gitanimals developer.
              <br />
              Feel free to leave feedback — it will be automatically posted as a GitHub issue. We'd love to hear from
              you!
            </p>
            <button className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsOpen(false)}>
              <XIcon color="black" width={20} height={20} />
            </button>
          </section>
          <section className="p-5 flex flex-col gap-6 max-mobile:gap-3">
            <LabelSelect onChange={(relations) => onContentChange('labels', relations)} />
            <Input
              placeholder="Enter a title for your feedback"
              value={content.title}
              onChange={(e) => onContentChange('title', e.target.value)}
            />
            <TextArea
              placeholder="Let us know what could be improved! "
              value={content.body}
              onChange={(e) => onContentChange('body', e.target.value)}
            />
          </section>
          <div className="text-center my-6 mx-auto">
            <Button disabled={!isValid || isPending} onClick={onSubmit}>
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default FeedBack;

type FeedbackContentType = Omit<PostIssueRequest, 'assignees'>;

const INIT_CONTENT: FeedbackContentType = {
  title: '',
  body: '',
  labels: [],
};

const useFeedbackContent = () => {
  const [content, setContent] = useState<FeedbackContentType>(INIT_CONTENT);

  const isValid = content.title && content.body;

  const onContentChange = (key: keyof FeedbackContentType, value: string | string[]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const initContent = () => {
    setContent(INIT_CONTENT);
  };

  return { content, onContentChange, isValid, initContent };
};

function LabelSelect({ onChange }: { onChange: (value: string[]) => void }) {
  return (
    <Select>
      <Select.Label placeholder="Choose a feedback type ">
        {({ value }) =>
          value && (
            <>
              <div className="w-3.5 h-3.5 rounded-full" style={{ background: ISSUE_LABEL[value].color }} />
              <span>{ISSUE_LABEL[value].label}</span>
            </>
          )
        }
      </Select.Label>
      <Select.Panel>
        {Object.entries(ISSUE_LABEL).map(([key, item]) => (
          <Select.Option key={item.label} value={key} onClick={() => onChange(item.relations ?? [])}>
            <div className="w-3.5 h-3.5 rounded-full" style={{ background: item.color }} />
            <span>{item.label}</span>
          </Select.Option>
        ))}
      </Select.Panel>
    </Select>
  );
}
