import { Image, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { personaImageUrl } from '../home/pickHomePets';
import { PET_SIZE as PET_PNG } from '../home/WanderingPet';
import { PixelSprite } from '../ui/pixel';
import { sans } from '../ui/sans';
import { cardName, cardTier, type CardTier } from './cardTier';

const BG: Record<CardTier, number> = {
  EX: require('../../assets/card/card-bg-EX.webp'),
  S_PLUS: require('../../assets/card/card-bg-S_PLUS.webp'),
  A_PLUS: require('../../assets/card/card-bg-A_PLUS.webp'),
  B_MINUS: require('../../assets/card/card-bg-B_MINUS.webp'),
};
const THUMBNAIL: Record<CardTier, number> = {
  EX: require('../../assets/card/card-thumbnail-EX.webp'),
  S_PLUS: require('../../assets/card/card-thumbnail-S_PLUS.webp'),
  A_PLUS: require('../../assets/card/card-thumbnail-A_PLUS.webp'),
  B_MINUS: require('../../assets/card/card-thumbnail-B_MINUS.webp'),
};
const BACK = require('../../assets/card/card-back-S_PLUS.webp');

// 피그마 card 인스턴스(943:39432) 108.975 × 134.883 을 기준으로 폭에 비례해 키운다
const BASE_W = 108.975;
const RATIO = 134.883 / BASE_W;

type Props = { type: string; dropRate: string; width: number };

export function GameCard({ type, dropRate, width }: Props) {
  const tier = cardTier(dropRate);
  const u = width / BASE_W;
  const pet = 95.816 * u;

  return (
    <View accessibilityLabel={`${cardName(type)} ${dropRate}`} style={{ width, height: width * RATIO }}>
      <Image source={BG[tier]} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
      <View style={{ padding: 6.58 * u, paddingBottom: 0 }}>
        <View className="items-center justify-center overflow-hidden" style={{ width: pet, height: pet }}>
          <Image source={THUMBNAIL[tier]} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
          {/* 펫 PNG(140) 는 둘레 여백이 커서 칸에 맞춰 줄이면 펫이 너무 작다. 원본 배율로 그리고 여백을 자른다 */}
          <PixelSprite source={personaImageUrl(type)} maxWidth={PET_PNG * u} maxHeight={PET_PNG * u} />
        </View>
      </View>
      <View className="flex-row items-center" style={{ padding: 8.225 * u, gap: 3.29 * u }}>
        <Text numberOfLines={1} className="flex-1" style={[sans(9.869 * u, 1.2, true), { color: colors.black.DEFAULT }]}>
          {cardName(type)}
        </Text>
        <Text style={[sans(9.047 * u, 1.5), { color: colors.black['90'] }]}>{`${dropRate.replace('%', '')}%`}</Text>
      </View>
    </View>
  );
}

export function CardBack({ width }: { width: number }) {
  return <Image source={BACK} style={{ width, height: width * RATIO }} />;
}
