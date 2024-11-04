import React from 'react'

const Navbar = () => {
  return (
    <nav className='sticky top-0 bg-purple-400 flex justify-between items-center px-4 h-12'>
        <div className="logo font-bold text-2xl">
          <span>&lt;  </span>
          PassOP
          <span> /&gt;</span>
          </div>
        <button className='flex'>
           <a href="https://github.com/DevSuhail" target="_blank" rel="noopener noreferrer" className='flex'>
          <img width={40} src="icons/github.svg" alt="github" />
          <span className='flex p-2 font-bold'>
        Github</span>
        </a>
        </button>
    </nav>
  )
}

export default Navbar
