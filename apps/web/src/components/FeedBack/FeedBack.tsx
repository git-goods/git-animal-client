'use client';

import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import type { PostIssueRequest } from '@/apis/github/usePostIssue';
import { usePostIssue } from '@/apis/github/usePostIssue';
import { useGetUser } from '@/apis/user/useGetUser';
import Button from '@/components/Button/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';

import { ISSUE_LABEL } from './FeedBack.constants';
import { CloseIcon, FeedBackCloseIcon, FeedBackOpenIcon } from './FeedBack.icons';

function FeedBack() {
  const { data: userData } = useGetUser();
  const { content, onContentChange, isValid, initContent } = useFeedbackContent();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = () => {
    const username = userData?.username ?? '';

    mutate({ ...content, assignees: [username] });
  };

  const { mutate, isPending } = usePostIssue({
    onSuccess() {
      initContent();
      alert('Thank you for your feedback!');
    },
  });

  return (
    <>
      <OpenIconWrapper onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <FeedBackCloseIcon /> : <FeedBackOpenIcon />}
      </OpenIconWrapper>
      {isOpen && (
        <Container>
          <Heading>
            <h2>Feedback</h2>
            <Image src="/feedback/feedback-profile.png" alt="feedback" width={67.5} height={67} />
            <p>
              Hello!! I’m Gitanimals Developer. Please leave any improvements, and it will be register GitHub issue.
            </p>
            <CloseIconWrapper onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </CloseIconWrapper>
          </Heading>
          <Form>
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
          </Form>
          <ButtonStyled disabled={!isValid || isPending} onClick={onSubmit}>
            Send
          </ButtonStyled>
        </Container>
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
              <IssueOptionColor style={{ background: ISSUE_LABEL[value].color }} />
              <span>{ISSUE_LABEL[value].label}</span>
            </>
          )
        }
      </Select.Label>
      <Select.Panel>
        {Object.entries(ISSUE_LABEL).map(([key, item]) => (
          <Select.Option key={item.label} value={key} onClick={() => onChange(item.relations ?? [])}>
            <IssueOptionColor style={{ background: item.color }} />
            <span>{item.label}</span>
          </Select.Option>
        ))}
      </Select.Panel>
    </Select>
  );
}

const ButtonStyled = styled(Button)`
  width: fit-content;
  margin: 24px auto;

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    margin: 16px;
  }
`;

const OpenIconWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  right: 4px;

  height: 121px;
  width: 110px;
`;

const Container = styled.div`
  position: absolute;
  bottom: 120px;
  right: 24px;
  display: flex;
  flex-direction: column;
  width: 406px;

  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;

  @media (max-width: 768px) {
    width: 100%;
    bottom: 0;
    right: 0;
    left: 0;
  }

  animation: fadeIn 0.3s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IssueOptionColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;

const CloseIconWrapper = styled.div`
  top: 16px;
  right: 16px;
  position: absolute;
  cursor: pointer;
`;

const Heading = styled.section`
  padding: 24px 32px;
  position: relative;
  background: var(--brand-color-sky, #c4f2f7);
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;

  h2 {
    color: var(--text-black-90, rgba(0, 0, 0, 0.9));
    text-align: center;
    /* glyph18 bold */
    font-family: 'Product Sans';
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 21.6px */
    letter-spacing: -0.3px;
  }
  p {
    color: var(--text-black-75, rgba(0, 0, 0, 0.75));
    text-align: center;
    font-family: 'Product Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 18.2px */
    letter-spacing: -0.3px;
  }
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Form = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
