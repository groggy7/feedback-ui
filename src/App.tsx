import Card from "./components/Card"
import Header from "./components/Header"

function App() {
  return <div className="p-4 flex flex-col gap-2">
    <Header />
    <Card rating={10} comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."/>
  </div>
}

export default App
