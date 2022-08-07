import Card from "./components/Card";



export default function App() {

  return (
    <div className="p-8 flex flex-col gap-8 bg-gray-100">
      <div>
        <span className="text-xs text-gray-500">Product Card non-optimistic (currently on &nbsp;<a className="text-blue-300" href="https://www.technodom.kz">technodom.kz</a>)</span>
        <Card />
      </div>
      <div>
        <p className="text-xs text-gray-500">Product Card non-optimistic with loaders</p>
        <Card />
      </div>
      <div>
        <p className="text-xs text-gray-500">Product Card optimistic</p>
        <Card />
      </div>
    </div>
  )
}
