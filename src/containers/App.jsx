import React from 'react'
import Header from './Header'
import  Home  from "./Home";
function App() {
  return (
    <div className="w-full xl:w-[1600px] py-32 px-4 lg:px-12 pr-4 lg-pr-32">
    {/* Header */}
    <Header />
    {/* Home Container */}
    <Home />
    </div>
  )
}

export default App
