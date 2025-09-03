import { useEffect } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { createQuizContext } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
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
    // const router = useRouter();
    useEffect(() => {
      if (isSolved) {
        navigate(ROUTES.GAME.QUIZ.MAIN());
      }
    }, [isSolved]);

    return (
      <div className={containerStyle}>
        <div className={contentContainerStyle}>
          <h1 className={titleStyle}>{t('category')}</h1>
          <h2 className={descriptionStyle}>{t('category-description')}</h2>
          <Tabs value={category} onValueChange={(value) => handleChangeCategory(value as QuizCategory)}>
            <TabsList>
              {categoryRadioProps.map((tabsTriggerItem) => {
                const { value, label } = tabsTriggerItem;
                const isSelected = value === category;
                const imageSrc = isSelected
                  ? `/assets/game/quiz/cursor-choiced.webp`
                  : `/assets/game/quiz/cursor-unchoiced.webp`;
                return (
                  <TabsTrigger key={value} value={value} className={tabsTriggerStyle}>
                    <Flex direction="column" align="center" gap="12px">
                      <img src={imageSrc} alt={label} width={60} height={60} />
                      <span className={tabsTriggerLabelStyle}>{label}</span>
                    </Flex>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
        <div className={buttonContainerStyle}>
          <Button className={buttonStyle} onClick={handleStart}>
            {t('start')}
          </Button>
        </div>
      </div>
    );
  });

export default SelectCategorySection;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  width: '100%',
  height: '100%',
  paddingInline: '16px',
  backgroundColor: 'gray.gray_050',
});

const titleStyle = css({
  textStyle: 'glyph40.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const descriptionStyle = css({
  marginBottom: '60px',
  textStyle: 'body18.regular',
  fontFamily: 'Product Sans',
  fontWeight: 400,
  color: 'white.white_90',
});

const tabsTriggerStyle = css({
  width: '100%',
  height: '214px',
});

const tabsTriggerLabelStyle = css({
  textStyle: 'body18.bold',
  fontFamily: 'Product Sans',
  fontWeight: 700,
  color: 'white',
});

const contentContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

const buttonContainerStyle = css({
  width: '100%',
  paddingBlock: '8px',
});

const buttonStyle = css({
  width: '100%',
});
