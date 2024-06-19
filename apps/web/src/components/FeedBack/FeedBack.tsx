'use client';

import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Button from '@/components/Button/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';

import { ISSUE_LABEL } from './FeedBack.constants';

function FeedBack() {
  return (
    <Container>
      <Heading>
        <h2>Feedback</h2>
        <Image src="/feedback/feedback-profile.png" alt="feedback" width={67.5} height={67} />
        <p>Hello!! I’m Gitanimals Developer. Please leave any improvements, and it will be register GitHub issue.</p>
        <CloseIconWrapper>
          <CloseIcon />
        </CloseIconWrapper>
      </Heading>
      <Form>
        <LabelSelect />
        <Input placeholder="Type issue title..." />
        <TextArea placeholder="Please feel free to leave any good points for improvement..." />
      </Form>
      <ButtonStyled>Send</ButtonStyled>
    </Container>
  );
}

export default FeedBack;

interface FeedbackContentType {
  title: string;
  body: string;
  label: string;
}

const useFeedbackContent = () => {
  const [content, setContent] = useState<FeedbackContentType>({
    title: '',
    body: '',
    label: '',
  });

  const onContentChange = (key: keyof FeedbackContentType, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  return { content, onContentChange };
};

function LabelSelect() {
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
          <Select.Option key={item.label} value={key}>
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

const Container = styled.div`
  position: absolute;
  bottom: 24px;
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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.68076 2.62009C3.38788 2.32718 2.91301 2.32716 2.6201 2.62004C2.3272 2.91291 2.32717 3.38779 2.62005 3.6807L8.93938 10.0006L2.62004 16.3206C2.32716 16.6135 2.32718 17.0884 2.62009 17.3812C2.91299 17.6741 3.38787 17.6741 3.68075 17.3812L9.99999 11.0613L16.3192 17.3812C16.6121 17.6741 17.087 17.6741 17.3799 17.3812C17.6728 17.0884 17.6728 16.6135 17.3799 16.3206L11.0606 10.0006L17.3799 3.6807C17.6728 3.38779 17.6728 2.91291 17.3799 2.62004C17.087 2.32716 16.6121 2.32718 16.3192 2.62009L9.99999 8.93992L3.68076 2.62009Z"
        fill="black"
        fillOpacity="0.5"
      />
    </svg>
  );
}
