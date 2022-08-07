import { FC } from "react";
import { Stickers } from "../types";

type StickerListProps = { stickers: Stickers }

const StickerList: FC<StickerListProps> = ({ stickers }): JSX.Element => (
  <div className="flex gap-2">
    {
      stickers.map(({text, color, icon, backgroundColor}, index) => (
        <div key={text + index.toString()} style={{backgroundColor}} className="flex items-center gap-1 py-0.5 px-1 rounded-md">
          <img src={icon} alt="sticker icon" />
          <p className="font-bold text-xs" style={{color}}>{text}</p>
        </div>
        )
      )}
  </div>
)

export default StickerList;
