import React from 'react';

interface Props {
  title: string;
  description?: string;
  content: React.ReactNode;
}

const QuizField = ({ title, description, content }: Props) => {
  return (
    <div>
      <h4 className="font-product text-glyph-15 font-bold text-white">{title}</h4>
      <p className="font-product text-glyph-14 font-normal text-white-50">{description}</p>
      <div className="mt-3">{content}</div>
    </div>
  );
};

export default QuizField;
