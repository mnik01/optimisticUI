import type { FC } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import BenifitList from "./parts/BenifitList";
import StickerList from "./parts/StickerList";
import { Benifits, Stickers } from "./types";

type CardProps = {}

export const Card: FC<CardProps> = () => {
  const isMobile = useIsMobile();
  const stickers: Stickers = [
    {
      icon: '../../assets/icons/digitalProduct.svg',
      text: "Цифровой товар",
      color: "#42BBF8",
      backgroundColor: "#FFFFFF"
    },
    {
      icon: '../../assets/icons/esdProduct.svg',
      text: "С витрины",
      color: "#404040",
      backgroundColor: "#F7F7F7"
    },
    {
      icon: '../../assets/icons/cascadeProduct.svg',
      text: "Каскадная скидка",
      color: "#73BE6F",
      backgroundColor: "#FFFFFF"
    }
  ];
  const benifits: Benifits = [
    {
      text: '-22%',
      backgroundColor: "#73BE6F",
    },
    {
      text: 'В комплекте',
      backgroundColor: "#5283FC",
    },
    {
      text: 'Подарок',
      backgroundColor: "#F55151",
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
        <StickerList stickers={stickers} />
        <h2 style={{color: '#404040'}} className="text-base font-[700]">Пылесос Tefal TW-7272EA</h2>
        <span className="flex items-end gap-1">
          <p className="text-sm text-[#B2B2B2] font-bold h-5 flex items-end">94 990 тг.</p>
          <p className="text-[10px] font-medium line-through text-[#B2B2B2] h-5 flex items-end leading-[15px]">121 990 тг.</p>
        </span>
        <BenifitList benifits={benifits} />
      </main>
      <div className="counter flex flex-col justify-between">
      <button className="w-[32px] flex justify-center">
          <img src="../../assets/icons/plus.svg" alt="increase button image" />
        </button>
        <input className="w-[32px] flex justify-center text-center text-[#161616] font-bold" value="1" />
        <button className="w-[32px] flex justify-center">
          <img src="../../assets/icons/minus.svg" alt="decrease button image" />
        </button>
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
            <BenifitList benifits={benifits} />
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
        <button className="w-[32px] flex justify-center">
          <img src="../../assets/icons/plus.svg" alt="increase button image" />
        </button>
        <input className="w-[32px] flex justify-center text-center text-[#161616] font-bold" value="1" />
        <button className="w-[32px] flex justify-center">
          <img src="../../assets/icons/minus.svg" alt="decrease button image" />
        </button>
      </div>
    </article>
  )


  return isMobile ? mobileLayout : desktopLayout;
}
