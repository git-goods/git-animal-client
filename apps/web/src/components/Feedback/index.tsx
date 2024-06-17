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
      <h2>Feedback</h2>
      <p>Hello!! I'm Gitanimals Developer. Please leave any improvements, and it will be register GitHub issue.</p>
      <button onClick={onSubmit}>submit</button>
    </div>
  );
}

export default Feedback;
