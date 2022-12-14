import { FC } from "react";
import { Benifits } from "../types";
import { useAutoAnimate } from '@formkit/auto-animate/react'


type BenifitListProps = {benifits: Benifits}
const BenifitList: FC<BenifitListProps> = ({ benifits }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 100 })

  return (
    <div ref={parent}>
      {benifits.length > 0 &&
        <div className="flex gap-1">
          {
            benifits.map(({text, backgroundColor}, index) => (
              <p key={text + index.toString()} className="font-bold max-h-[24px] whitespace-nowrap text-ellipsis h-fit text-xs py-1 px-1.5 rounded-lg text-white" style={{backgroundColor}}>
                {text}
              </p>
            ))
          }
        </div>
      }
    </div>
  )
}

export default BenifitList;
