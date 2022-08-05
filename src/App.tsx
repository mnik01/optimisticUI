import { Card } from "./components/Card";



export default function App() {

  return (
    <div className="p-8 flex flex-col gap-8 bg-gray-100">
      <div>
        <p className="text-xs text-gray-500">Product Card non-optimistic</p>
        <Card />
      </div>
      <div>
        <p className="text-xs text-gray-500">Product Card optimistic</p>
        <Card />
      </div>
    </div>
  )
}
