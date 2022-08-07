import { FC } from "react";
import { Benifits } from "../types";


type BenifitListProps = {benifits: Benifits}
const BenifitList: FC<BenifitListProps> = ({ benifits }) => (
  <div className="flex gap-1">
  {
    benifits.map(({text, backgroundColor}) => (<p className="font-bold max-h-[24px] whitespace-nowrap text-ellipsis h-fit text-xs py-1 px-1.5 rounded-lg text-white" style={{backgroundColor}}>{text}</p>))
  }
  </div>
)

export default BenifitList;
