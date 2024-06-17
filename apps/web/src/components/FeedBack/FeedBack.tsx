'use client';

import React from 'react';

import Select from './Select';

function FeedBack() {
  return (
    <div>
      <Select>
        <Select.Label placeholder="Select label" />
        <Select.Panel>
          <Select.Option>Option 1</Select.Option>
          <Select.Option>Option 2</Select.Option>
          <Select.Option>Option 3</Select.Option>
        </Select.Panel>
      </Select>
    </div>
  );
}

export default FeedBack;
