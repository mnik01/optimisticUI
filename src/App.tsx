import Card from "./components/Card";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from "./components/Card/types";
import CardLoaders from "./components/CardLoaders";
import CardOptimistic from "./components/CardOptimistic";
import { useEffect, useState } from "react";
import { useIsMobile } from "./hooks/useIsMobile";

// TODO: add tooltip: скорость ответа от серва одинаковая во всех подходах
// TODO: add input implementation in loades and optimistic
// TODO: set input type number
// TODO: add polling

export default function App() {
  const product: Product = {
    benifits: [],
    stickers: [],
    name: "Пылесос Tefal TW-7272EA",
    imgPath: "../../assets/product.png",
    quantity: 1,
    sku: "2864",
    pricesPerOne: {
      price: 94_990,
      oldPrice: 121_990,
    }
  }
  const [isNegativeCase, setIsNegativeCase] = useState(false)
  useEffect(() => {
    // @ts-ignore
    window.isNegativeCase = isNegativeCase
  }, [isNegativeCase])

  const toggleCaseHandler = () => {
    setIsNegativeCase(!isNegativeCase)
  }
  const isMobile = useIsMobile();



  return (
    <div>
      <div className="p-8 min-w-fit flex flex-col gap-8 bg-gray-100">
        <h1 className="min-w-fit bg-gray-100 text-[48px] font-bold text-gray-00">Карточка товара</h1>
        <div className="flex items-center gap-8">
          {
            !isMobile &&
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Не optimistic (текущее положение дел на &nbsp;<a className="text-blue-300" href="https://www.technodom.kz">technodom.kz</a>)</span>
            <Card isMobile={isMobile} product={product} />
          </div>
          }
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">{isMobile ? 'Не optimistic' : 'Мобилка не optimistic'}</p>
            <Card isMobile={isMobile} product={product} foreceMobile />
          </div>
        </div>
        <div className="flex items-center gap-8">
          {
            !isMobile &&
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Не optimistic с лоадером</span>
            <CardLoaders isMobile={isMobile} product={product} />
          </div>
          }
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">{isMobile ? 'Не optimistic с лоадерами' : 'Мобилка не optimistic с лоадерами'}</p>
            <CardLoaders isMobile={isMobile} product={product} foreceMobile />
          </div>
        </div>
        <div className="flex items-center gap-8">
          {
            !isMobile &&
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Optimistic</span>
            <CardOptimistic isMobile={isMobile} product={product} />
          </div>
          }
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">{isMobile ? 'Optimistic' : 'Мобилка optimistic'}</p>
            <CardOptimistic isMobile={isMobile} product={product} foreceMobile />
          </div>
        </div>
        <div className="flex gap-8 justify-center">
          <button onClick={toggleCaseHandler} className="text-[#2196f3] font-light outline-1">{
            isNegativeCase ? "Вернуться к положительному кейсу" : "Показать негативный кейс"
          }</button>
          <a href="https://simonhearne.com/2021/optimistic-ui-patterns/#feedback-first" className="text-[#2196f3] font-light outline-1">Прочитать про optimistic UI</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
