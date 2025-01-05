import { Dialog } from '@gitanimals/ui-panda';

import GuildCreate from '../../(components)/GuildCreate';
import GuildModal from '../GuildModal';

export default function GuildCreateModal() {
  return (
    <GuildModal>
      <Dialog.Title>Create Guild</Dialog.Title>
      <GuildCreate />
    </GuildModal>
  );
}
