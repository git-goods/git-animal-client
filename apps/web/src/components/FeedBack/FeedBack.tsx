'use client';

import styled from 'styled-components';

import Input from '@/components/Input';
import Select from '@/components/Select';

import { ISSUE_LABEL } from './FeedBack.constants';

function FeedBack() {
  return (
    <Container>
      <Input placeholder="Input placeholder" />

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
    </Container>
  );
}

export default FeedBack;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
`;

const IssueOptionColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
