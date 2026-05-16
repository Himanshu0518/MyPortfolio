import React from 'react'
import { Menus } from '../utils/helper'
import { MenuItem } from '../components'

function Header() {
  return (
    /* Mobile: fixed bottom bar | Desktop: fixed right-side vertical nav */
    <div className="fixed bottom-0 right-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-4 xl:right-6
      w-full h-auto lg:w-auto lg:h-auto
      flex justify-center items-end lg:items-center
      pb-6 lg:pb-0 z-50">

      <div className="
        px-4 py-3
        lg:px-3 lg:py-4
        rounded-full
        border border-[rgba(255,255,255,0.3)]
        flex flex-row lg:flex-col
        justify-center items-center
        gap-5 md:gap-6 lg:gap-3 xl:gap-4
        backdrop-blur-md
        duration-200
      ">
        {Menus && Menus.map((item, index) => (
          <MenuItem key={index} menu={item} index={index} />
        ))}
      </div>

    </div>
  )
}

export default Header
