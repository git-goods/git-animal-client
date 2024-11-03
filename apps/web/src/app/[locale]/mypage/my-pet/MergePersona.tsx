import React from 'react';
import { FullModalBase } from '@gitanimals/ui-panda';

import MergeAnimation from './Merging';

function MergePersona() {
  return (
    <FullModalBase isOpen={true} onClose={() => {}}>
      <MergeAnimation />
    </FullModalBase>
  );
}

export default MergePersona;
