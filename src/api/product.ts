import { Product } from "../components/Card/types";

const benifits = [
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
const stickers =  [
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
]

export const patchProduct = async (product: Product): Promise<Product> => {
  const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${product.quantity}`).then((res) => res.json());
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { quantity } = product


  if (quantity === 2) {
    return {
      ...product,
      stickers: stickers.slice(0, 1),
      benifits: benifits.slice(0, 1),
    };
  }
  if (quantity === 3) {
    return {
      ...product,
      stickers: stickers.slice(0, 2),
      benifits: benifits.slice(0, 2),
    };
  }
  if (quantity === 4) {
    return {
      ...product,
      stickers,
      benifits,
    };
  }

  return {
    ...product,
    stickers: [],
    benifits: [],
  };
}
