import { FC } from "react";
import CascadeProduct from "../../Icons/cascadeProduct";
import DigitalProduct from "../../Icons/digitalProduct";
import EsdProduct from "../../Icons/esdProduct";
import { Stickers } from "../types";

type StickerListProps = { stickers: Stickers }

const getIcon = (icon: "digitalProduct" | "esdProduct" | "cascadeProduct") => {
  if (icon === "cascadeProduct") {
    return <CascadeProduct />;
  }
  if (icon === "digitalProduct") {
    return <DigitalProduct />;
  }
  return <EsdProduct />;
}

const StickerList: FC<StickerListProps> = ({ stickers }): JSX.Element => {


  return (
    <div className="flex gap-2">
      {
        stickers.map(({text, color, icon, backgroundColor}, index) => (
          <div key={text + index.toString()} style={{backgroundColor}} className="flex items-center gap-1 py-0.5 px-1 rounded-md">
            {
              getIcon(icon)
            }
            <p className="font-bold text-xs" style={{color}}>{text}</p>
          </div>
          )
        )}
    </div>
  )
}

export default StickerList;
