import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', backgroundColor: '#2C2929' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    defaultValue: '검색어',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    disabled: true,
  },
};

export const WithOnSubmit: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    onSubmit: () => alert('검색이 실행되었습니다!'),
  },
};
