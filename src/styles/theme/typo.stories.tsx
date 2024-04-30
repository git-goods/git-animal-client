import styled from 'styled-components';

import typo from './typo';

const meta = {
  title: 'Typography',
  component: Typography,
};

export default meta;

const typos = Object.keys(typo);

export function Typography() {
  return (
    <div>
      {typos.map((key) => (
        <Typo key={key} $typoKey={key as keyof typeof typo}>
          Depromeet Marker Typo Theme {key}
        </Typo>
      ))}
    </div>
  );
}

const Typo = styled.div<{ $typoKey: keyof typeof typo }>`
  ${({ theme, $typoKey }) => theme.typo[$typoKey]};

  & + & {
    margin-top: 12px;
  }
`;
