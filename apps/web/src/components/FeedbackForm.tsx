'use client';

import { useState } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { XIcon } from '@gitanimals/ui-icon';
import { Button } from '@gitanimals/ui-panda';
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
      <button className={openIconStyle} onClick={() => setIsOpen((prev) => !prev)}>
        <Image
          src={isOpen ? `/feedback/icon-channeltalk-close.svg` : `/feedback/icon-channeltalk-default.svg`}
          alt="feedback"
          width={140}
          height={160}
        />
      </button>

      {isOpen && (
        <div className={containerStyle}>
          <section className={headingStyle}>
            <h2>Feedback</h2>
            <Image src="/feedback/feedback-profile.png" alt="feedback" width={67.5} height={67} />
            <p>
              Hello!! I’m Gitanimals Developer. Please leave any improvements, and it will be register GitHub issue.
            </p>
            <button className={closeIconWrapperStyle} onClick={() => setIsOpen(false)}>
              <XIcon color="black" width={20} height={20} />
            </button>
          </section>
          <section className={formStyle}>
            <LabelSelect onChange={(relations) => onContentChange('labels', relations)} />
            <Input
              placeholder="Type issue title..."
              value={content.title}
              onChange={(e) => onContentChange('title', e.target.value)}
            />
            <TextArea
              placeholder="Please feel free to leave any good points for improvement..."
              value={content.body}
              onChange={(e) => onContentChange('body', e.target.value)}
            />
          </section>
          <div className={buttonWrapperStyle}>
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
      <Select.Label placeholder="Select label">
        {({ value }) =>
          value && (
            <>
              <div className={issueOptionColorStyle} style={{ background: ISSUE_LABEL[value].color }} />
              <span>{ISSUE_LABEL[value].label}</span>
            </>
          )
        }
      </Select.Label>
      <Select.Panel>
        {Object.entries(ISSUE_LABEL).map(([key, item]) => (
          <Select.Option key={item.label} value={key} onClick={() => onChange(item.relations ?? [])}>
            <div className={issueOptionColorStyle} style={{ background: item.color }} />
            <span>{item.label}</span>
          </Select.Option>
        ))}
      </Select.Panel>
    </Select>
  );
}

const buttonWrapperStyle = css({
  textAlign: 'center',
  margin: '24px auto',
});

const openIconStyle = css({
  position: 'fixed',
  bottom: '0',
  right: '4px',
  height: '121px',
  width: '110px',
  zIndex: '100',
  '@media screen and (max-width: 768px)': {
    scale: '0.7',
    right: '-12px',
    bottom: '-12px',
  },
});

const containerStyle = css({
  position: 'fixed',
  bottom: '120px',
  right: '24px',
  display: 'flex',
  flexDirection: 'column',
  width: '406px',
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  zIndex: 100,
  '@media screen and (max-width: 768px)': {
    width: '100%',
    bottom: '0',
    right: '0',
    left: '0',
  },
  animation: 'fadeIn 0.3s ease-in-out',
});

const issueOptionColorStyle = css({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
});

const closeIconWrapperStyle = css({
  top: '16px',
  right: '16px',
  position: 'absolute',
  cursor: 'pointer',
});

const headingStyle = css({
  padding: '24px 32px',
  position: 'relative',
  background: 'brand.sky',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',
  '& h2': {
    color: 'black.black_90',
    textAlign: 'center',
    textStyle: 'glyph18.bold',
  },
  '& p': {
    color: 'black.black_75',
    textStyle: 'glyph14.regular',
  },
  '@media screen and (max-width: 768px)': {
    padding: '16px',
  },
});

const formStyle = css({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
