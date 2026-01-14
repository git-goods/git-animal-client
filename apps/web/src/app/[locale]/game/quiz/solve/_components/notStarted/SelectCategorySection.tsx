import { useEffect } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { createQuizContext } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';
import { wrap } from '@suspensive/react';
import { toast } from 'sonner';

import type { QuizStatus } from '@/app/[locale]/game/quiz/solve/_constants/solveQuiz.constants';
import { QUIZ_STATUS } from '@/app/[locale]/game/quiz/solve/_constants/solveQuiz.constants';
import Tabs from '@/components/Tabs/Tabs';
import TabsList from '@/components/Tabs/TabsList';
import TabsTrigger from '@/components/Tabs/TabsTrigger';
import useTabs from '@/components/Tabs/useTabs';
import { ROUTE } from '@/constants/route';
import { type Locale, useRouter } from '@/i18n/routing';

import type { QuizCategory } from '../../../_constants/quiz.constants';
import { QUIZ_CATEGORY } from '../../../_constants/quiz.constants';
import useTodayQuizData from '../../../_hooks/useTodayQuizData';

interface Props {
  setStatus: (status: QuizStatus) => void;
  setContextId: (contextId: string) => void;
}

const SelectCategorySection = wrap
  .ErrorBoundary({
    fallback: () => <></>,
  })
  .Suspense({
    fallback: <></>,
  })
  .on(function SelectCategorySection({ setStatus, setContextId }: Props) {
    const t = useTranslations('Quiz');
    const { isSolved } = useTodayQuizData();
    const {
      tabsTriggerProps: categoryRadioProps,
      selected: category,
      handleChange: handleChangeCategory,
    } = useTabs<QuizCategory>({
      options: [
        { label: 'Frontend', value: QUIZ_CATEGORY.FRONTEND },
        { label: 'Backend', value: QUIZ_CATEGORY.BACKEND },
      ],
    });

    const locale = useLocale() as Locale;
    const handleStart = async () => {
      try {
        const { contextId } = await createQuizContext({
          category,
          locale,
        });

        setContextId(contextId);
        setStatus(QUIZ_STATUS.SOLVING);
      } catch (error) {
        console.error(error);
        toast.error('Failed to start quiz');
      }
    };

    const router = useRouter();
    useEffect(() => {
      if (isSolved) {
        router.push(ROUTE.GAME.QUIZ.MAIN());
      }
    }, [isSolved, router]);

    return (
      <div className="flex flex-col justify-center items-center flex-1 w-full h-full px-4 bg-gray-050">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="font-product text-glyph-40 font-bold text-white">{t('category')}</h1>
          <h2 className="mb-[60px] font-product text-body-18 font-normal text-white-90">{t('category-description')}</h2>
          <Tabs value={category} onValueChange={(value) => handleChangeCategory(value as QuizCategory)}>
            <TabsList>
              {categoryRadioProps.map((tabsTriggerItem) => {
                const { value, label } = tabsTriggerItem;
                const isSelected = value === category;
                const imageSrc = isSelected
                  ? `/assets/game/quiz/cursor-choiced.webp`
                  : `/assets/game/quiz/cursor-unchoiced.webp`;
                return (
                  <TabsTrigger key={value} value={value} className="w-full h-[214px]">
                    <div className="flex flex-col items-center gap-3">
                      <Image src={imageSrc} alt={label} width={60} height={60} />
                      <span className="font-product text-body-18 font-bold text-white">{label}</span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
        <div className="w-full py-2">
          <Button className="w-full" onClick={handleStart}>
            {t('start')}
          </Button>
        </div>
      </div>
    );
  });

export default SelectCategorySection;
