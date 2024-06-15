import React from 'react';

import { usePostIssue } from '@/apis/github/usePostIssue';

function Feedback() {
  const { mutate: postIssue } = usePostIssue();

  const onSubmit = async () => {
    postIssue({
      title: 'Issue Auto Post Test',
      body: "I'm having a problem with this.",
      assignees: ['sumi-0011'],
      labels: ['bug'],
    });
  };
  return (
    <div>
      <button onClick={onSubmit}>submit</button>
    </div>
  );
}

export default Feedback;
