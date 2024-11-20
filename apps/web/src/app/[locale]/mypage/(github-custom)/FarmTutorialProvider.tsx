'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';
import { driver } from 'driver.js';

const FARM_TUTORIAL = {
  container: 'farm-tutorial-container',
  preview: 'preview',
  personaSelect: 'persona-select',
  copyButton: 'copy-button',
};

interface FarmTutorialContextType {
  classes: typeof FARM_TUTORIAL;
}

const FarmTutorialContext = createContext<FarmTutorialContextType>({
  classes: FARM_TUTORIAL,
});

export const FarmTutorialProvider = ({ children }: PropsWithChildren) => {
  const driverObj = driver({
    steps: [
      {
        element: `.${FARM_TUTORIAL.container}`,
        popover: {
          title: 'Farm Type',
          description: 'Farm Mode는 자신이 가지고 있는 펫중 하나를 지정해서, 지정한 범위에서 움직이게 할 수 있어요.',
        },
      },

      {
        element: `.${FARM_TUTORIAL.personaSelect}`,
        popover: {
          title: '펫 선택',
          description: '먼저 돌아다닐 펫을 하나를 선택해요.\n우측 버튼으로 펫 선택 리스트를 확장할 수 있어요.',
        },
      },
      {
        element: `.${FARM_TUTORIAL.preview}`,
        popover: {
          title: 'Farm 미리보기',
          description: '돌아다닐 범위를 설정한 후, 설정한 범위 내에서 펫이 돌아다니는 모습을 미리볼 수 있어요.',
        },
      },
      {
        element: `.${FARM_TUTORIAL.copyButton}`,
        popover: {
          title: '이미지 링크 복사',
          description: '복사 버튼을 눌러서 펫이 돌아다니는 이미지를 복사할 수 있어요!',
          side: 'right',
          align: 'start',
        },
      },
    ],
  });

  driverObj.drive();

  return <FarmTutorialContext.Provider value={{ classes: FARM_TUTORIAL }}>{children}</FarmTutorialContext.Provider>;
};

export const useFarmTutorial = () => {
  const context = useContext(FarmTutorialContext);

  if (!context) {
    throw new Error('useFarmTutorial must be used within a FarmTutorialProvider');
  }

  return context;
};
