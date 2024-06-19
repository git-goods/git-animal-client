import { useState } from 'react';
import styled from 'styled-components';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

function TextArea(props: TextAreaProps) {
  const [inputLen, setInputLen] = useState(String(props.value ?? '')?.length || 0);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputLen(e.target.value.length);
    props?.onChange?.(e);
  };

  return (
    <Container $error={props.error}>
      <TextAreaStyled {...props} onChange={onChange} />
      <TextLen>
        <strong>{inputLen}</strong>
        <span> / {props.maxLength}</span>
      </TextLen>
    </Container>
  );
}

TextArea.defaultProps = {
  maxLength: 300,
};

export default TextArea;

const TextAreaStyled = styled.textarea`
  background: transparent;
  border: none;

  color: #000000bf;
  padding: 16px 20px;

  /* glyph16 regular */
  font-family: 'Product Sans';
  font-size: 16px;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.3px;

  border-radius: 8px;
  outline: none;
  width: 100%;
  resize: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    /* glyph16 regular */
    font-family: 'Product Sans';
    font-size: 16px;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.3px;
  }
`;

const TextLen = styled.div`
  position: absolute;
  bottom: 8px;
  color: rgba(0, 0, 0, 0.5);
  right: 20px;
  font-family: 'Product Sans';
  font-size: 12px;
  font-weight: 400;
  width: fit-content;

  strong {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.75);
  }
`;

const Container = styled.div<{
  $error?: boolean;
}>`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-bottom: 26px;

  &:focus-within {
    border: 1px solid #00894d;

    ${TextLen} {
      strong {
        color: #00894d;
      }
    }
  }

  ${({ $error }) =>
    $error &&
    `
    ${TextAreaStyled} {
      border: 1px solid #FF6B56;
    }

    ${TextLen} {
      strong {
        color: #FF6B56;
      }
    }
  `}
`;
