import React from 'react'

const Footer = () => {
  const appInitialData=JSON.parse(localStorage.getItem('appSettings'))
  return (
    <div className='absolute w-full bottom-0 bg-white shadow-xl shadow-black/80 py-4 text-right pr-1'>
      {appInitialData.copyRightText}
    </div>
  )
}

export default Footer