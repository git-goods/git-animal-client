export const SpinningLoader = () => {
  return (
    <div className={spinningLoaderContainerStyle}>
      <div className={spinningLoaderStyle} />
    </div>
  );
};

const spinningLoaderContainerStyle =
  'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full z-floating h-full bg-[rgba(0,0,0,0.5)]';

const spinningLoaderStyle =
  'w-[64px] h-[64px] border-[4px] border-solid border-transparent border-t-[4px] border-t-[#fff] rounded-full animate-spin';
