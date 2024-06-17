'use client';

import React from 'react';

import Select from './Select';

function FeedBack() {
  return (
    <div>
      <Select>
        <Select.Label placeholder="Select label" />
        <Select.Panel>
          <Select.Option value="Option1" />
          <Select.Option value="Option2" />
          <Select.Option value="Option3" />
        </Select.Panel>
      </Select>
    </div>
  );
}

export default FeedBack;
