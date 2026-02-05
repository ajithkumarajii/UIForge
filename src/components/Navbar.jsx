import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { FiGithub } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`w-full transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-[#0a0e27]/80 via-[#131829] to-[#0a0e27]/80 border-cyan-500/10 shadow-lg shadow-cyan-500/5' 
        : 'bg-gradient-to-r from-white/80 via-blue-50 to-white/80 border-blue-200/30 shadow-lg shadow-blue-500/5'
    } border-b backdrop-blur-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300">
          <div className={`p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110 ${isDark ? '' : 'ring-2 ring-blue-300'}`}>
            <HiSparkles className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all duration-300">
              UIForge
            </h1>
            <p className={`text-[10px] transition-colors duration-300 ${isDark ? 'text-blue-400/60' : 'text-blue-600/60'} -mt-1`}>AI Component Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/ajithkumarajii/UIForge" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6 ${
              isDark 
                ? 'text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30' 
                : 'text-blue-600 hover:text-blue-700 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/20'
            }`}
            title="GitHub Repository"
          >
            <FiGithub size={22} />
          </a>
          
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6 ${
              isDark 
                ? 'text-blue-400/70 hover:text-yellow-400 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30' 
                : 'text-blue-600 hover:text-indigo-700 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/20'
            }`}
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar