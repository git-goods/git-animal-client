import { Image, Text, View } from 'react-native';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { personaImageUrl } from '../home/pickHomePets';
import { PixelSprite } from '../ui/pixel';
import { fitScale } from '../ui/pixel/scale';
import { sans } from '../ui/sans';
import { cardTier, rateNumber, type CardTier } from './cardTier';

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

// 피그마 card 인스턴스(943:39432)
export const CARD_W = 108.975;
export const CARD_H = 134.883;
const PET = 95.816;

export function GameCard({ type, dropRate }: { type: string; dropRate: string }) {
  const tier = cardTier(dropRate);
  const name = snakeToTitleCase(type);

  return (
    <View accessibilityLabel={`${name} ${dropRate}`} style={{ width: CARD_W, height: CARD_H }}>
      <Image source={BG[tier]} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
      <View style={{ padding: 6.58, paddingBottom: 0 }}>
        <View className="items-center justify-center" style={{ width: PET, height: PET }}>
          <Image source={THUMBNAIL[tier]} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
          {/* 피그마는 펫 PNG 를 칸에 딱 맞춰 그린다 */}
          <PixelSprite source={personaImageUrl(type)} maxWidth={PET} maxHeight={PET} scale={fitScale} />
        </View>
      </View>
      <View className="flex-row items-center" style={{ padding: 8.225, gap: 3.29 }}>
        <Text numberOfLines={1} className="flex-1" style={[sans(9.869, 1.2, true), { color: colors.black.DEFAULT }]}>
          {name}
        </Text>
        <Text style={[sans(9.047, 1.5), { color: colors.black['90'] }]}>{`${rateNumber(dropRate)}%`}</Text>
      </View>
    </View>
  );
}

export function CardBack() {
  return <Image source={BACK} style={{ width: CARD_W, height: CARD_H }} />;
}
