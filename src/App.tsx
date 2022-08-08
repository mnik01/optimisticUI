import Card from "./components/Card";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from "./components/Card/types";
import CardLoaders from "./components/CardLoaders";
import CardOptimistic from "./components/CardOptimistic";
import { useEffect, useState } from "react";
import { useIsMobile } from "./hooks/useIsMobile";
import { submitPolling } from "./api/polling";

// TODO: add tooltip: скорость ответа от серва одинаковая во всех подходах
// TODO: add input implementation in loades and optimistic
// TODO: set input type number

export default function App() {
  const product: Product = {
    benifits: [],
    stickers: [],
    name: "Смартфон Redmi 9A 32GB Grey",
    imgPath: "https://api.technodom.kz/f3/api/v1/images/800/800/226119_1.jpg",
    quantity: 1,
    sku: "2864",
    pricesPerOne: {
      price: 49_990,
      oldPrice: 59_990,
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

  const [selectedVariant, setSelectedVariant] = useState<null | string>(null)
  const [votes, setVotes] = useState<null | {value: string, percent: number}[]>(null)


  const chooseVariantHandler = async (variant: string) => {
    const { votes } = await submitPolling(variant)
    setSelectedVariant(variant)
    setVotes(votes.map(vote => ({value: vote.title, percent: vote.votedPercent})))
  }


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




        <div className="mb-16">
          <p className="mb-2">
            { votes ? "Вот за какие голосовали:" : "Какой вариант тебе нравится больше?"}
          </p>
          <div className="w-fit p-4 flex gap-8 bg-white rounded-xl">
            <button onClick={() => {chooseVariantHandler("Не optimistic")}} className={`outline w-[220px] outline-2 rounded-md p-2 outline-gray-200 ${selectedVariant !== "Не optimistic" || 'text-orange-400'} hover:text-orange-400 transition`}>
              {
                votes ? `${votes.find(vote => vote.value === "Не optimistic")?.percent || 0}%` : "Не optimistic"
              }
            </button>
            <button onClick={() => {chooseVariantHandler("Не optimistic с лоадерами")}} className={`outline w-[220px] outline-2 rounded-md p-2 outline-gray-200 ${selectedVariant !== "Не optimistic с лоадерами" || 'text-orange-400'} hover:text-orange-400 transition`}>
              {
                votes ? `${votes.find(vote => vote.value === "Не optimistic с лоадерами")?.percent || 0}%` : "Не optimistic с лоадерами"
              }
            </button>
            <button onClick={() => {chooseVariantHandler("Optimistic")}} className={`outline w-[220px] outline-2 rounded-md p-2 outline-gray-200 ${selectedVariant !== "Optimistic" || 'text-orange-400'} hover:text-orange-400 transition`}>
              {
                votes ? `${votes.find(vote => vote.value === "Optimistic")?.percent || 0}%` : "Optimistic"
              }
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
