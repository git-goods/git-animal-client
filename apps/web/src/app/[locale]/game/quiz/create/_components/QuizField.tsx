import React from 'react';

interface Props {
  title: string;
  description?: string;
  content: React.ReactNode;
}

const QuizField = ({ title, description, content }: Props) => {
  return (
    <div>
      <h4 className="glyph15-bold font-['Product_Sans'] font-bold text-white">{title}</h4>
      <p className="glyph14-regular font-['Product_Sans'] font-normal text-white-50">{description}</p>
      <div className="mt-[12px]">{content}</div>
    </div>
  );
};

export default QuizField;
