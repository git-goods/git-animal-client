import React from 'react';

function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}

export default TestLayout;
