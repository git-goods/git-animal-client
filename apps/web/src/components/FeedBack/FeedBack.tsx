'use client';

import React from 'react';
import styled from 'styled-components';

import Select from './Select';

function FeedBack() {
  return (
    <Container>
      <Select>
        <Select.Label placeholder="Select label" />
        <Select.Panel>
          <Select.Option value="Option1" />
          <Select.Option value="Option2" />
          <Select.Option value="Option3" />
        </Select.Panel>
      </Select>
    </Container>
  );
}

export default FeedBack;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
