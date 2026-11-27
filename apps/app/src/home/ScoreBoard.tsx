import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PixelBox, PixelText } from '../ui/pixel';

function Score({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 items-center gap-1">
      <PixelText variant="glyph12" className="text-gray-500">{label}</PixelText>
      <PixelText variant="glyph18" bold>{value}</PixelText>
    </View>
  );
}

// ponytail: 방문자·다음 펫까지는 render 서버가 더 이상 주지 않아(GET /users 없음) 기여·펫 수만 보인다
export function ScoreBoard({ contribution, petCount }: { contribution: string; petCount: number }) {
  const { t } = useTranslation();
  return (
    <PixelBox className="self-stretch">
      <View className="flex-row">
        <Score label={t('home.contribution')} value={contribution} />
        <Score label={t('home.pet_count')} value={String(petCount)} />
      </View>
    </PixelBox>
  );
}
