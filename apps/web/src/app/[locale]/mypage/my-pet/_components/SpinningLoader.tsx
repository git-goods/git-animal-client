export const SpinningLoader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full z-floating h-full bg-black/50">
      <div className="w-16 h-16 border-4 border-transparent border-t-4 border-t-white rounded-full animate-spin" />
    </div>
  );
};
