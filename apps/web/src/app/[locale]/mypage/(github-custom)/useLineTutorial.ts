import { driver } from 'driver.js';

export const LINE_TUTORIAL = {
  container: 'line-type-tutorial-container',
  preview: 'preview',
  personaSelect: 'persona-select',
  customizeSize: 'customize-size',
  copyButton: 'copy-button',
  selectExpand: 'select-expand',
};

export const useLineTutorial = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: `.${LINE_TUTORIAL.container}`,
        popover: {
          title: 'Line Type',
          description: 'Line Mode는 자신이 가지고 있는 펫중 하나를 지정해서, 지정한 범위에서 움직이게 할 수 있어요.',
        },
      },

      {
        element: `.${LINE_TUTORIAL.personaSelect}`,
        popover: {
          title: '펫 선택',
          description: '먼저 돌아다닐 펫을 하나를 선택해요.',
        },
      },
      {
        element: `.${LINE_TUTORIAL.selectExpand}`,
        popover: {
          title: '펫 선택 확장',
          description: '선택 리스트가 작아서 불편하다면, 확장 버튼을 눌러서 펫 선택 리스트를 확장할 수 있어요.',
        },
      },
      {
        element: `.${LINE_TUTORIAL.customizeSize}`,
        popover: {
          title: '돌아다닐 범위 설정',
          description: '펫이 돌아다닐 범위를 설정할 수 있어요. ',
          side: 'right',
          align: 'start',
        },
      },
      {
        element: `.${LINE_TUTORIAL.preview}`,
        popover: {
          title: 'Line 미리보기',
          description: '설정한 범위에서 펫이 돌아다니는 모습을 미리볼 수 있어요.',
        },
      },
      {
        element: `.${LINE_TUTORIAL.copyButton}`,
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
};
