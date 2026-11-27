import { Modal, Pressable, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useTranslation } from 'react-i18next';
import { CanaryButton } from '../ui/CanaryButton';
import { sans } from '../ui/sans';

type Props = { visible: boolean; price: number; busy: boolean; onCancel: () => void; onSell: () => void };

// 피그마 943:38080: 검정 75% 덮개 위 300 폭 dialog
export function SellDialog({ visible, price, busy, onCancel, onSell }: Props) {
  const { t } = useTranslation();
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <Pressable className="flex-1 items-center justify-center" style={{ backgroundColor: colors['black-alpha']['75'] }} onPress={onCancel}>
        <Pressable style={{ width: 300, gap: 20, padding: 24, borderRadius: 16, backgroundColor: colors.gray['150'] }}>
          <Text style={[sans(20, 1.2), { color: colors['white-alpha']['90'] }]}>{t('mypage.sellConfirm', { price })}</Text>
          <View className="flex-row" style={{ gap: 8 }}>
            <CanaryButton tone="white" label={t('common.cancel')} onPress={onCancel} className="h-8 flex-1" />
            <CanaryButton label={t('mypage.sellAction')} onPress={onSell} disabled={busy} className="h-8 flex-1" />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
