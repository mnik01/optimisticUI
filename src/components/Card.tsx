import type { FC } from "react";
import { useIsMobile } from "../hooks/useIsMobile";


export const Card: FC = () => {
  const isMobile = useIsMobile();
  const stickers = [
    {
      icon: "",
      text: "Цифровой товар",
      color: "#42BBF8",
    }
  ];
  const benifits = [
    {
      value: 22,
      backgroundColor: "#73BE6F",
    }
  ]

  const desktopLayout = (
    <article className="
      lg:w-[768px] w-[656px]
      rounded-xl bg-white py-[8px]
      min-h-[120px] flex gap-4
      justify-between
    ">
      <div className="flex gap-1 flex-col">
        <div className="p-1">
          <div className="h-[72px] w-[72px]">
            <img alt="product image TODO" src="../../assets/product.png" />
          </div>
        </div>
        <button className="uppercase w-full h-5 text-[8px] text-[#B2B2B2] font-bold tracking-widest text-center py-1">удалить</button>
      </div>
      <main className="content flex flex-col gap-1 w-full">
        <div>
          {stickers.map(({text, color}) => (<p className="font-bold text-xs" style={{color}}>{text}</p>))}
        </div>
        <h2 style={{color: '#404040'}} className="text-base font-[700]">Пылесос Tefal TW-7272EA</h2>
        <span className="flex items-end gap-1">
          <p className="text-sm text-[#B2B2B2] font-bold h-5 flex items-end">94 990 тг.</p>
          <p className="text-[10px] font-medium line-through text-[#B2B2B2] h-5 flex items-end leading-[15px]">121 990 тг.</p>
        </span>
        <div>
          {benifits.map(({value, backgroundColor}) => (<p className="font-bold text-xs w-fit py-1 px-1.5 rounded-lg text-white" style={{backgroundColor}}>-{value}%</p>))}
        </div>
      </main>
      <div className="counter flex flex-col justify-between">
        <button className="w-[32px] flex justify-center">+</button>
        <input className="w-[32px] flex justify-center text-center" value="0" />
        <button className="w-[32px] flex justify-center">-</button>
      </div>
    </article>
  )
  const mobileLayout = (
    <article className="
      w-[304px]
      rounded-2xl bg-white py-[8px]
      min-h-[112px] flex gap-4
      justify-between
    ">
      <div className="max-h-24 flex flex-col w-full">
        <main className="flex gap-2">
          <div className="p-1">
            <div className="h-14 w-14">
              <img alt="product image TODO" src="../../assets/product.png" />
            </div>
          </div>
          <div className="flex gap-1 flex-col">
            <h2 style={{color: '#404040'}} className="text-xs font-bold">Пылесос Tefal TW-7272EA</h2>
            <div>
              {benifits.map(({value, backgroundColor}) => (<p className="font-bold text-xs w-fit py-1 px-1.5 rounded-lg text-white" style={{backgroundColor}}>-{value}%</p>))}
            </div>
          </div>
        </main>
        <footer className="flex items-center justify-between">
          <button className="uppercase w-14 h-5 text-[8px] text-[#B2B2B2] font-bold tracking-widest text-center px-2 py-1">удалить</button>
          <span className="flex items-end gap-1">
            <p className="text-[10px] text-[#737171] font-medium h-5 flex line-through items-end">94 990 тг.</p>
            <p className="text-sm font-bold text-orange-400 h-5 flex items-end leading-[15px]">121 990 тг.</p>
          </span>
        </footer>
      </div>
      <div className="counter flex flex-col justify-between">
        <button className="w-[32px] flex justify-center">+</button>
        <input className="w-[32px] flex justify-center text-center" value="0" />
        <button className="w-[32px] flex justify-center">-</button>
      </div>
    </article>
  )

// TODO: остальное завтра

  return isMobile ? mobileLayout : desktopLayout;
}
