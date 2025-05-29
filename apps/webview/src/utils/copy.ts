export const copyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.log('복사에 실패하였습니다');
  }
};
