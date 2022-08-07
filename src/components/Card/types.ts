export type Sticker = {
  icon: string,
  text: string,
  color: string,
  backgroundColor: string,
}
export type Stickers = Sticker[]

export type Benifit = {
  text: string,
  backgroundColor: string,
}
export type Benifits = Benifit[]


export type Product = {
  name: string,
  sku: string,
  benifits: Benifit[],
  stickers: Sticker[],
  pricesPerOne: {
    price: number,
    oldPrice?: number,
  },
  imgPath: string,
  quantity: number,
}
