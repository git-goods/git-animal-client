import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { createQuiz, type CreateQuizRequest } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { colors } from '@gitanimals/ui-tailwind/theme';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomDim } from '../src/ui/BottomDim';
import { CanaryButton } from '../src/ui/CanaryButton';
import { sans } from '../src/ui/sans';

const BG = colors.gray['050'];
const MAX_LENGTH = 1000;
const BOTTOM_SPACE = 160;

// 피그마 Radio-button: 고르면 밝은 면 + 테두리, 아니면 어두운 면에 흐린 글자
function Choices<T extends string>({ options, value, onChange }: { options: { label: string; value: T }[]; value: T; onChange: (v: T) => void }) {
  return (
    <View className="flex-row" style={{ gap: 6 }}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.value)}
            className="flex-1 items-center justify-center"
            style={{
              paddingVertical: 8,
              borderRadius: 6,
              backgroundColor: on ? colors['white-alpha']['25'] : colors['white-alpha']['10'],
              borderWidth: on ? 1 : 0,
              borderColor: colors['white-alpha']['50'],
            }}
          >
            <Text style={[sans(16, 1.5, true), { color: on ? colors.white : colors['white-alpha']['25'] }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Field({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: 12 }}>
      <View>
        <Text style={[sans(15, 1.5, true), { color: colors.white }]}>{title}</Text>
        {description ? <Text style={[sans(14, 1.5), { color: colors['white-alpha']['50'] }]}>{description}</Text> : null}
      </View>
      {children}
    </View>
  );
}

// 피그마 943:28981 Create quiz
export default function QuizCreate() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [level, setLevel] = useState<CreateQuizRequest['level']>('EASY');
  const [category, setCategory] = useState<CreateQuizRequest['category']>('FRONTEND');
  const [problem, setProblem] = useState('');
  const [answer, setAnswer] = useState<CreateQuizRequest['expectedAnswer']>('YES');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setSaving(true);
    try {
      const res = await createQuiz({
        level,
        category,
        problem: problem.trim(),
        expectedAnswer: answer,
        locale: i18n.language === 'ko' ? 'ko_KR' : 'en_US',
      });
      if (res.result !== 'SUCCESS') {
        Alert.alert(res.message);
        return;
      }
      void queryClient.invalidateQueries({ queryKey: userQueries.userKey() });
      router.dismissTo({ pathname: '/game', params: { notice: res.message } });
    } catch {
      Alert.alert(t('common.load_failed'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: BG, paddingTop: insets.top }}>
      <View className="items-center justify-center" style={{ height: 44 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('common.back')} onPress={() => router.back()} style={{ position: 'absolute', left: 16 }} hitSlop={10}>
          <Image source={require('../assets/ui/chevron-left.png')} style={{ width: 24, height: 24 }} />
        </Pressable>
        <Text style={[sans(18, 1.2, true), { color: colors.white }]}>{t('quiz.create-quiz-card-title')}</Text>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ gap: 24, paddingHorizontal: 16, paddingTop: 16, paddingBottom: BOTTOM_SPACE + insets.bottom }}>
        <Field title={t('quiz.difficulty-level')}>
          <Choices
            value={level}
            onChange={setLevel}
            options={[
              { label: t('quiz.easy'), value: 'EASY' },
              { label: t('quiz.medium'), value: 'MEDIUM' },
              { label: t('quiz.difficult'), value: 'DIFFICULT' },
            ]}
          />
        </Field>
        <Field title={t('quiz.category')}>
          <Choices
            value={category}
            onChange={setCategory}
            options={[
              { label: 'Frontend', value: 'FRONTEND' },
              { label: 'Backend', value: 'BACKEND' },
            ]}
          />
        </Field>
        <Field title={t('quiz.quiz-contents')}>
          <View style={{ height: 200, borderRadius: 8, borderWidth: 1, borderColor: colors['white-alpha']['25'], paddingLeft: 20, paddingRight: 12, paddingTop: 16, paddingBottom: 8 }}>
            <TextInput
              multiline
              value={problem}
              onChangeText={setProblem}
              maxLength={MAX_LENGTH}
              placeholder={t('quiz.quiz-contents-description')}
              placeholderTextColor={colors['white-alpha']['50']}
              textAlignVertical="top"
              className="flex-1"
              style={[sans(14, 1.5), { color: colors.white }]}
            />
            <Text style={[sans(12, 1.5), { textAlign: 'right', color: colors['white-alpha']['50'] }]}>
              <Text style={{ color: colors.brand.green }}>{problem.length}</Text>
              {`/${MAX_LENGTH}`}
            </Text>
          </View>
        </Field>
        <Field title={t('quiz.answer-title')} description={t('quiz.answer-description')}>
          <Choices
            value={answer}
            onChange={setAnswer}
            options={[
              { label: 'O', value: 'YES' },
              { label: 'X', value: 'NO' },
            ]}
          />
        </Field>
      </ScrollView>

      <BottomDim />
      <View pointerEvents="box-none" className="absolute inset-x-0 bottom-0" style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: insets.bottom + 8 }}>
        <CanaryButton
          label={t('quiz.create-quiz-button')}
          className="h-10 px-4"
          disabled={saving || problem.trim().length === 0}
          onPress={() => void submit()}
        />
      </View>
    </View>
  );
}
