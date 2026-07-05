import Image from 'next/image';

interface SliderItemProps {
  title: string;
  description: string;
  img: string;
  webpImg: string;
}

function SliderItem({ item }: { item: SliderItemProps }) {
  return (
    <div className="flex flex-col gap-[40px] p-[40px_40px_60px_40px] mobile:gap-[28px] mobile:p-[20px_20px_28px_20px]">
      <picture className="px-[24px]">
        <source srcSet={item.webpImg} type="image/webp" />
        <Image src={item.img} alt={item.title} width={1024} height={594} />
      </picture>
      <hgroup className="px-[20px] text-left text-white">
        <h2 className="glyph32-bold mobile:glyph18-bold">{item.title}</h2>
        <p className="mt-[8px] glyph18-regular mobile:glyph14-regular">{item.description}</p>
      </hgroup>
    </div>
  );
}

export default SliderItem;
