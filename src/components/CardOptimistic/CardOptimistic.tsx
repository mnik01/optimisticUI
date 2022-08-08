import { formatPrice } from "../../utils/formatPrice";
import { patchProduct } from "../../api/product";
import BenifitList from "./parts/BenifitList";
import StickerList from "./parts/StickerList";
import { FC, useState, useRef } from "react";
import { toast } from 'react-toastify';
import { Product } from "./types";
import { debounce } from "lodash";

type CardProps = { foreceMobile?: boolean, product: Product, isMobile: boolean }

export const CardOptimistic: FC<CardProps> = ({ foreceMobile, isMobile, product: initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);
  const [uiBlockStatus, setUiBlockStatus] = useState<"clicking" | 'fetching' | null>(null);

  const priceTotal = product.pricesPerOne.price * product.quantity;
  const oldPriceTotal = product.pricesPerOne.oldPrice ? product.pricesPerOne.oldPrice * product.quantity : null;


  const notifySuccess = (text: string) => toast(text, {type: "success"});
  const notifyError = (text: string) => toast(text, {type: "error"});
  const notifyNotImplemented = () => {notifyError("Not implemented")}

  const operations = useRef<number[]>([]);
  const currentUiQuantity = useRef(product.quantity);

  const debouncedHandler = useRef(debounce(async () => {
    setUiBlockStatus('fetching')

    try {
      const { stickers, benifits } =  await patchProduct({...product, quantity: currentUiQuantity.current})
      setProduct({ ...product, stickers, benifits, quantity: currentUiQuantity.current })
      notifySuccess("Success")
    } catch (err) {
      // UI revert
      let revertDelta = operations.current.map(x => x * -1).reduce((a, b) => a + b, 0);
      const revertedQuantity = currentUiQuantity.current + revertDelta;

      setProduct({...product, quantity: revertedQuantity})
      currentUiQuantity.current = revertedQuantity;

      notifyError('Some network error occurred')
    } finally {
      operations.current = [];
      setUiBlockStatus(null)
    }
  }, 400)).current;


  const incrementHandler = async (): Promise<void> => {
    setUiBlockStatus('clicking');

    const newQuantity = product.quantity + 1;
    const newProduct = {...product, quantity: newQuantity}

    // Optimisticly update UI
    setProduct(newProduct)
    currentUiQuantity.current++;
    operations.current.push(1);

    // Batch requests
    debouncedHandler()
  }

  const decrementHandler = async (): Promise<void> => {
    if (product.quantity <= 1) {
      notifyNotImplemented()
      return;
    }
    setUiBlockStatus('clicking');

    const newQuantity = product.quantity - 1;
    const newProduct = {...product, quantity: newQuantity}

    // Optimisticly update UI
    setProduct(newProduct)
    currentUiQuantity.current--;
    operations.current.push(-1);

    // Batch requests
    debouncedHandler()
  }

  const isFetching = uiBlockStatus === 'fetching'
  const opacity = {
    content: uiBlockStatus === 'clicking' ? 'opacity-50' : uiBlockStatus !== "fetching" || 'opacity-20',
    counter: !isFetching || 'cursor-not-allowed opacity-20',
  }

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
            <img alt={`product image ${product.name}`} src={product.imgPath} />
          </div>
        </div>
        <button
          onClick={notifyNotImplemented}
          className="uppercase w-full h-5 text-[8px]
          text-[#B2B2B2] font-bold
          tracking-widest text-center py-1"
        >
          удалить
        </button>
      </div>
      <main className="flex justify-between w-full">
        <div className={`transition flex justify-center flex-col gap-1 ${opacity.content}`}>
          <StickerList stickers={product.stickers} />
          <div>
            <h2 style={{color: '#404040'}} className="text-base font-[700]">{product.name}</h2>
            <span className="flex items-end gap-1">
              {product.pricesPerOne.oldPrice &&
                <p className="text-sm text-[#B2B2B2] font-bold h-5 flex items-end">
                  {formatPrice(product.pricesPerOne.oldPrice)}
                </p>
              }
              <p
                className="text-[10px] font-medium line-through
                text-[#B2B2B2] h-5 flex
                items-end leading-[15px]"
              >
                {formatPrice(product.pricesPerOne.price)}
              </p>
            </span>
          </div>
          <BenifitList benifits={product.benifits} />
        </div>
        <div className='flex items-center'>
          <span className="flex flex-col gap-1">
            <p className="text-xl font-bold text-orange-400 h-5 flex items-end leading-[15px]">
              {formatPrice(priceTotal)}
            </p>
            {oldPriceTotal &&
              <p className="text-[10px] text-[#737171] font-medium h-5 flex line-through justify-end">
                {formatPrice(oldPriceTotal)}
              </p>
            }
          </span>
        </div>
      </main>
      <div className={`counter flex flex-col justify-between`}>
        <button
          disabled={isFetching}
          onClick={incrementHandler}
          className={`${opacity.counter} transition w-[32px] flex justify-center`}
        >
          <img src="../../assets/icons/plus.svg" alt="increase button image" />
        </button>
        <input
          disabled={isFetching}
          onChange={notifyNotImplemented}
          className={`${opacity.counter} transition w-[32px] bg-transparent
          flex justify-center text-center
          text-[#161616] font-bold`}
          value={product.quantity}
        />
        <button
          disabled={isFetching}
          onClick={decrementHandler}
          className={`${opacity.counter} transition w-[32px] flex justify-center`}
        >
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
              <img alt={`product image ${product.name}`} src={product.imgPath} />
            </div>
          </div>
          <div className={`transition flex gap-1 flex-col ${opacity.content}`}>
            <h2 style={{color: '#404040'}} className="text-xs font-bold">{product.name}</h2>
            <BenifitList benifits={product.benifits} />
          </div>
        </main>
        <footer className="flex items-center justify-between">
          <button onClick={notifyNotImplemented} className="uppercase w-14 h-5 text-[8px] text-[#B2B2B2] font-bold tracking-widest text-center px-2 py-1">удалить</button>
          <span className="flex items-end gap-1">
            {oldPriceTotal &&
              <p className="text-[10px] text-[#737171] font-medium h-5 flex line-through items-end">{formatPrice(oldPriceTotal)}</p>
            }
            <p className="text-sm font-bold text-orange-400 h-5 flex items-end leading-[15px]">{formatPrice(priceTotal)}</p>
          </span>
        </footer>
      </div>
      <div className="counter flex flex-col justify-between">
        <button disabled={isFetching} onClick={incrementHandler} className={`transition w-[32px] flex justify-center ${opacity.counter}`}>
          <img src="../../assets/icons/plus.svg" alt="increase button image" />
        </button>
        <input disabled={isFetching} onChange={notifyNotImplemented} className={`transition w-[32px] bg-transparent flex justify-center text-center text-[#161616] font-bold ${opacity.counter}`} value={product.quantity} />
        <button disabled={isFetching} onClick={decrementHandler} className={`transition w-[32px] flex justify-center ${opacity.counter}`}>
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
function ref(arg0: never[]) {
  throw new Error("Function not implemented.");
}
