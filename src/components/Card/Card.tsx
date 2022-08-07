import type { FC } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import BenifitList from "./parts/BenifitList";
import StickerList from "./parts/StickerList";
import { Product } from "./types";
import { toast } from 'react-toastify';
import { formatPrice } from "../../utils/formatPrice";

type CardProps = { foreceMobile?: boolean, product: Product }

export const Card: FC<CardProps> = ({ foreceMobile, product }) => {
  const isMobile = useIsMobile();

  const notifyInfo = (text: string) => toast(text, {type: "info"});
  const notifySuccess = (text: string) => toast(text, {type: "success"});
  const notifyError = (text: string) => toast(text, {type: "error"});


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
            <img alt="product image TODO" src={product.imgPath} />
          </div>
        </div>
        <button className="uppercase w-full h-5 text-[8px] text-[#B2B2B2] font-bold tracking-widest text-center py-1">удалить</button>
      </div>
      <main className="flex justify-between w-full">
        <div className="flex flex-col gap-1">
          <StickerList stickers={product.stickers} />
          <h2 style={{color: '#404040'}} className="text-base font-[700]">{product.name}</h2>
          <span className="flex items-end gap-1">
            {product.pricesPerOne.oldPrice &&
              <p className="text-sm text-[#B2B2B2] font-bold h-5 flex items-end">{formatPrice(product.pricesPerOne.oldPrice)}</p>
            }
            <p className="text-[10px] font-medium line-through text-[#B2B2B2] h-5 flex items-end leading-[15px]">{formatPrice(product.pricesPerOne.price)}</p>
          </span>
          <BenifitList benifits={product.benifits} />
        </div>
        <div className='flex items-center'>
          <span className="flex flex-col gap-1">
            {product.pricesPerOne.oldPrice &&
              <p className="text-xl font-bold text-orange-400 h-5 flex items-end leading-[15px]">{formatPrice(product.pricesPerOne.oldPrice)}</p>
            }
            <p className="text-[10px] text-[#737171] font-medium h-5 flex line-through justify-end">{formatPrice(product.pricesPerOne.price)}</p>
          </span>
        </div>
      </main>
      <div className="counter flex flex-col justify-between">
        <button onClick={() => {notifySuccess('Success')}} className="w-[32px] flex justify-center">
          <img src="../../assets/icons/plus.svg" alt="increase button image" />
        </button>
        <input className="w-[32px] bg-transparent flex justify-center text-center text-[#161616] font-bold" value={product.initialQuantity} />
        <button onClick={() => {notifySuccess('Success')}} className="w-[32px] flex justify-center">
          <img src="../../assets/icons/minus.svg" alt="decrease button image" />
        </button>
      </div>
    </article>
  )
  const mobileLayout = (
    <article className="
      w-[304px]
      rounded-2xl bg-white py-[8px]
      min-h-[112px] flex
      justify-between
    ">
      <div className="max-h-24 flex flex-col w-full">
        <main className="flex gap-2">
          <div className="p-1">
            <div className="h-14 w-14">
              <img alt="product image TODO" src={product.imgPath} />
            </div>
          </div>
          <div className="flex gap-1 flex-col">
            <h2 style={{color: '#404040'}} className="text-xs font-bold">{product.name}</h2>
            <BenifitList benifits={product.benifits} />
          </div>
        </main>
        <footer className="flex items-center justify-between">
          <button className="uppercase w-14 h-5 text-[8px] text-[#B2B2B2] font-bold tracking-widest text-center px-2 py-1">удалить</button>
          <span className="flex items-end gap-1">
            <p className="text-[10px] text-[#737171] font-medium h-5 flex line-through items-end">{formatPrice(product.pricesPerOne.price)}</p>
            {product.pricesPerOne.oldPrice &&
              <p className="text-sm font-bold text-orange-400 h-5 flex items-end leading-[15px]">{formatPrice(product.pricesPerOne.oldPrice)}</p>
            }
          </span>
        </footer>
      </div>
      <div className="counter flex flex-col justify-between">
        <button className="w-[32px] flex justify-center">
          <img src="../../assets/icons/plus.svg" alt="increase button image" />
        </button>
        <input className="w-[32px] bg-transparent flex justify-center text-center text-[#161616] font-bold" value={product.initialQuantity} />
        <button className="w-[32px] flex justify-center">
          <img src="../../assets/icons/minus.svg" alt="decrease button image" />
        </button>
      </div>
    </article>
  )

  if (foreceMobile) {
    return mobileLayout;
  }


  return isMobile ? mobileLayout : desktopLayout;
}
