import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext'
import Select from 'react-select';
import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import Editor from '@monaco-editor/react';
import { IoCloseSharp, IoCopy } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import { ImNewTab } from 'react-icons/im';
import { FiRefreshCcw } from 'react-icons/fi';
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Home = () => {
  const { isDark } = useTheme();

  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
    { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  async function getResponse() {
    if (!apiKey) {
      toast.error("API key not configured. Please set VITE_GEMINI_API_KEY");
      return;
    }

    if (!prompt.trim()) return toast.error("Please describe your component first");

    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.
      `,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy");
    }
  };

  const downnloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html"
    const blob = new Blob([code], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-8 lg:px-16 py-8 transition-all duration-300 ${isDark ? 'bg-[#0a0e27]' : 'bg-blue-50/30'}`}>
        <div className={`w-full py-6 rounded-2xl mt-5 p-6 transition-all duration-300 border-2 slide-in ${isDark ? 'bg-[#131829] text-white border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' : 'bg-white text-gray-900 border-blue-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'}`}>
          <h3 className='text-[28px] font-bold sp-text'>AI Component Generator</h3>
          <p className={`mt-3 text-[15px] transition-colors duration-300 ${isDark ? 'text-blue-300/80' : 'text-blue-600'}`}>Describe your component and let AI code it for you.</p>

          <p className='text-[15px] font-[700] mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>Framework</p>
          <Select
            className='mt-3'
            options={options}
            value={frameWork}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: isDark ? "#0a0e27" : "#f0f4ff",
                borderColor: isDark ? "#0080ff33" : "#bfdbfe",
                borderWidth: '2px',
                color: isDark ? "#fff" : "#111",
                boxShadow: isDark ? "0 0 10px rgba(0, 128, 255, 0.2)" : "0 0 8px rgba(37, 99, 235, 0.1)",
                "&:hover": { 
                  borderColor: isDark ? "#00d9ff" : "#60a5fa",
                  boxShadow: isDark ? "0 0 15px rgba(0, 217, 255, 0.4)" : "0 0 12px rgba(59, 130, 246, 0.2)"
                }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: isDark ? "#131829" : "#f9fafb",
                color: isDark ? "#fff" : "#111",
                border: `2px solid ${isDark ? "#0080ff33" : "#bfdbfe"}`,
                boxShadow: isDark ? "0 10px 25px rgba(0, 128, 255, 0.2)" : "0 10px 25px rgba(59, 130, 246, 0.1)"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: isDark 
                  ? (state.isSelected ? "#0080ff" : state.isFocused ? "#1a2038" : "#131829")
                  : (state.isSelected ? "#2563eb" : state.isFocused ? "#f0f4ff" : "#f9fafb"),
                color: isDark ? (state.isSelected ? "#fff" : "#fff") : (state.isSelected ? "#fff" : "#111"),
                borderRadius: '6px',
                margin: '4px',
                transition: 'all 0.2s'
              }),
              singleValue: (base) => ({ ...base, color: isDark ? "#fff" : "#1a1f3a" }),
              placeholder: (base) => ({ ...base, color: isDark ? "#666" : "#999" }),
              input: (base) => ({ ...base, color: isDark ? "#fff" : "#111" })
            }}
            onChange={(selected) => setFrameWork(selected)}
          />

          <p className='text-[15px] font-bold mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>Describe your component</p>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className={`w-full min-h-[220px] rounded-xl mt-3 p-4 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all duration-300 border-2 ${isDark ? 'bg-[#0a0e27] text-white placeholder-blue-400/50 border-cyan-500/20 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/30' : 'bg-blue-50 text-gray-900 placeholder-blue-500/50 border-blue-200 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20'}`}
            placeholder="Describe your component in detail and AI will generate it..."
          ></textarea>

          <div className="flex items-center justify-between mt-6 gap-4">
            <p className={`text-sm transition-colors duration-300 ${isDark ? 'text-blue-300/70' : 'text-blue-600'}`}>Click on generate button to get your code</p>
            <button
              onClick={getResponse}
              className={`flex items-center px-6 py-3 rounded-xl gap-2 transition-all duration-300 font-semibold shadow-lg hover:scale-105 active:scale-95 ${isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/30 hover:shadow-cyan-500/50' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/30 hover:shadow-blue-500/50'} hover:shadow-xl`}
            >
              {loading ? <ClipLoader color='white' size={18} /> : <BsStars />}
              Generate
            </button>
          </div>
        </div>

        <div className={`relative mt-2 w-full h-[80vh] rounded-2xl overflow-hidden transition-all duration-300 border-2 slide-in ${isDark ? 'bg-[#131829] border-cyan-500/20 hover:border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'bg-white border-blue-200 hover:border-blue-400 shadow-lg shadow-blue-500/5'}`}>
          {
            !outputScreen ? (
              <div className="w-full h-full flex items-center flex-col justify-center gap-4">
                <div className={`p-5 w-[80px] flex items-center justify-center text-[40px] h-[80px] rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:scale-110 transition-transform duration-300 ${isDark ? '' : 'ring-2 ring-blue-300'}`}>
                  <HiOutlineCode />
                </div>
                <p className={`text-[16px] mt-4 transition-colors duration-300 ${isDark ? 'text-blue-300/70' : 'text-blue-600'}`}>Your component & code will appear here.</p>
              </div>
            ) : (
              <>
                <div className={`w-full h-[50px] flex items-center gap-2 px-4 transition-all duration-300 border-b-2 ${isDark ? 'bg-[#131829] border-cyan-500/20' : 'bg-blue-50 border-blue-200'}`}>
                  <button
                    onClick={() => setTab(1)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${tab === 1 ? isDark ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30" : isDark ? "text-blue-300/70 hover:text-cyan-400" : "text-blue-600 hover:text-blue-700"}`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setTab(2)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${tab === 2 ? isDark ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30" : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30" : isDark ? "text-blue-300/70 hover:text-cyan-400" : "text-blue-600 hover:text-blue-700"}`}
                  >
                    Preview
                  </button>
                </div>

                <div className={`w-full h-[50px] flex items-center justify-between px-4 transition-all duration-300 border-b-2 ${isDark ? 'bg-[#131829] border-cyan-500/10' : 'bg-blue-50 border-blue-200'}`}>
                  <p className={`font-bold transition-colors duration-300 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>Code Editor</p>
                  <div className="flex items-center gap-2">
                    {tab === 1 ? (
                      <>
                        <button onClick={copyCode} className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:-rotate-12 ${isDark ? 'border-cyan-500/40 text-cyan-400 hover:border-cyan-500/100 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30' : 'border-blue-400 text-blue-600 hover:border-blue-600 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/20'}`}><IoCopy size={18} /></button>
                        <button onClick={downnloadFile} className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:-rotate-12 ${isDark ? 'border-cyan-500/40 text-cyan-400 hover:border-cyan-500/100 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30' : 'border-blue-400 text-blue-600 hover:border-blue-600 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/20'}`}><PiExportBold size={18} /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setIsNewTabOpen(true)} className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:-rotate-12 ${isDark ? 'border-cyan-500/40 text-cyan-400 hover:border-cyan-500/100 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30' : 'border-blue-400 text-blue-600 hover:border-blue-600 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/20'}`}><ImNewTab size={18} /></button>
                        <button onClick={() => setRefreshKey(prev => prev + 1)} className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-180 ${isDark ? 'border-cyan-500/40 text-cyan-400 hover:border-cyan-500/100 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30' : 'border-blue-400 text-blue-600 hover:border-blue-600 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/20'}`}><FiRefreshCcw size={18} /></button>
                      </>
                    )}
                  </div>
                </div>

                <div className="h-full">
                  {tab === 1 ? (
                    <Editor value={code} height="100%" theme={isDark ? 'vs-dark' : 'vs-light'} language="html" />
                  ) : (
                    <iframe key={refreshKey} srcDoc={code} className="w-full h-full bg-white"></iframe>
                  )}
                </div>
              </>
            )
          }
        </div>
      </div>

      {isNewTabOpen && (
        <div className="fixed inset-0 bg-white w-screen h-screen overflow-auto z-50">
          <div className="w-full h-[60px] flex items-center justify-between px-5 bg-gray-100 border-b border-gray-300">
            <p className='font-bold text-gray-900'>Preview</p>
            <button onClick={() => setIsNewTabOpen(false)} className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-200 text-gray-700">
              <IoCloseSharp />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
        </div>
      )}
    </>
  )
}

export default Home

