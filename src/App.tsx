import Card from "./components/Card";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from "./components/Card/types";


export default function App() {
  const product: Product = {
    benifits: [
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
    ],
    stickers: [
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
    ],
    name: "Пылесос Tefal TW-7272EA",
    imgPath: "../../assets/product.png",
    initialQuantity: 1,
    sku: "2864",
    pricesPerOne: {
      price: 94_990,
      oldPrice: 121_990,
    }
  }




  return (
    <div>
      <div className="p-8 flex flex-col gap-8 bg-gray-100">
        <div>
          <span className="text-xs text-gray-500">Product Card non-optimistic (currently on &nbsp;<a className="text-blue-300" href="https://www.technodom.kz">technodom.kz</a>)</span>
          <Card product={product} />
        </div>
        <div>
          <p className="text-xs text-gray-500">Product Card non-optimistic with loaders</p>
          <Card product={product} />
        </div>
        <div>
          <p className="text-xs text-gray-500">Product Card optimistic</p>
          <Card product={product} />
        </div>
        <hr />
        <div className="flex gap-12">
          <div>
            <p className="text-xs text-gray-500">Mobile Product Card non-optimistic (currently on &nbsp;<a className="text-blue-300" href="https://www.technodom.kz">technodom.kz</a>)</p>
            <Card product={product} foreceMobile />
          </div>
          <div>
            <p className="text-xs text-gray-500">Mobile Product Card non-optimistic with loaders</p>
            <Card product={product} foreceMobile />
          </div>
          <div>
            <p className="text-xs text-gray-500">Mobile Product Card optimistic</p>
            <Card product={product} foreceMobile />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
