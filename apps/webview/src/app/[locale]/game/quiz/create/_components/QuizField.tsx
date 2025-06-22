import React from 'react';
import { css } from '_panda/css';

interface Props {
  title: string;
  description?: string;
  content: React.ReactNode;
}

const QuizField = ({ title, description, content }: Props) => {
  return (
    <div>
      <h4 className={titleStyle}>{title}</h4>
      <p className={descriptionStyle}>{description}</p>
      <div className={contentStyle}>{content}</div>
    </div>
  );
};

export default QuizField;

const titleStyle = css({
  textStyle: 'glyph15.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const descriptionStyle = css({
  textStyle: 'glyph14.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_50',
});

const contentStyle = css({
  marginTop: '12px',
});
