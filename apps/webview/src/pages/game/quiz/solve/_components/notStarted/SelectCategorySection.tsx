import { useEffect } from 'react';
import { createQuizContext } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { wrap } from '@suspensive/react';
import { toast } from 'sonner';

import Tabs from '@/components/Tabs/Tabs';
import TabsList from '@/components/Tabs/TabsList';
import TabsTrigger from '@/components/Tabs/TabsTrigger';
import useTabs from '@/components/Tabs/useTabs';

import type { QuizCategory, QuizStatus } from '../../../_constants/quiz.constants';
import { QUIZ_CATEGORY, QUIZ_STATUS } from '../../../_constants/quiz.constants';
import useTodayQuizData from '../../../_hooks/useTodayQuizData';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/router/constants';
import { useNavigate } from 'react-router-dom';

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
    const { t, i18n } = useTranslation('quiz');
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

    const locale = i18n.language as 'en_US' | 'ko_KR';

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

    const navigate = useNavigate();
    useEffect(() => {
      if (isSolved) {
        navigate(ROUTES.GAME.QUIZ.MAIN());
      }
    }, [isSolved]);

    return (
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-gray-050 px-4">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="font-product text-glyph-40 font-bold text-white">{t('category')}</h1>
          <h2 className="mb-[60px] font-product text-glyph-18 font-normal text-white/90">{t('category-description')}</h2>
          <Tabs value={category} onValueChange={(value) => handleChangeCategory(value as QuizCategory)}>
            <TabsList>
              {categoryRadioProps.map((tabsTriggerItem) => {
                const { value, label } = tabsTriggerItem;
                const isSelected = value === category;
                const imageSrc = isSelected
                  ? `/assets/game/quiz/cursor-choiced.webp`
                  : `/assets/game/quiz/cursor-unchoiced.webp`;
                return (
                  <TabsTrigger key={value} value={value} className="h-[214px] w-full">
                    <div className="flex flex-col items-center gap-3">
                      <img src={imageSrc} alt={label} width={60} height={60} />
                      <span className="font-product text-glyph-18 font-bold text-white">{label}</span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
        <div className="w-full py-2">
          <Button className={cn('w-full')} onClick={handleStart}>
            {t('start')}
          </Button>
        </div>
      </div>
    );
  });

export default SelectCategorySection;
