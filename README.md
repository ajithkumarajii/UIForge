# UIForge - AI Component Generator

A modern web application that leverages **Google Gemini AI** to generate beautiful, responsive UI components instantly. Describe what you want, and AI creates production-ready code with multiple framework options.

## 🚀 Key Features

- **AI-Powered Generation**: Uses Google Gemini API to generate components from text descriptions
- **Multi-Framework Support**: HTML + CSS, Tailwind CSS, Bootstrap, and JavaScript
- **Live Preview**: Real-time preview of generated components
- **Code Editor**: Monaco editor with syntax highlighting
- **Dark/Light Mode**: Theme toggle with persistent storage
- **Export Options**: Copy to clipboard or download as HTML file
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Modern UI**: Smooth animations, gradient colors, and glassmorphism effects

## 🛠 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom CSS animations
- **AI Service**: Google Generative AI (Gemini API)
- **Code Editor**: Monaco Editor
- **Routing**: React Router v7
- **State Management**: React Context API
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Build Tool**: Vite with ESLint

## 📋 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ajithkumarajii/UIForge.git
   cd UIForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env.local` file in the root directory:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

## 💡 How to Use

1. **Describe your component** in the text area
2. **Select a framework** (HTML + CSS, Tailwind, Bootstrap, etc.)
3. **Click Generate** to create the component with AI
4. **View code** in the editor or **preview** the component live
5. **Copy or download** your generated code

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx      # Navigation bar with theme toggle
├── context/            # React Context for state management
│   └── ThemeContext.jsx # Dark/Light mode context
├── pages/              # Page components
│   ├── Home.jsx        # Main application page
│   └── NoPage.jsx      # 404 page
├── App.jsx             # Root component
├── App.css             # Global animations and styles
├── index.css           # Tailwind + custom components
└── main.jsx            # Entry point
```

## 🎨 Color Scheme

- **Dark Mode**: Deep blue (#0a0e27) with cyan accents (#00d9ff)
- **Light Mode**: Light blue (#f0f4ff) with blue accents
- **Accent Colors**: Cyan (#00d9ff), Blue (#0080ff), Purple (#8b5cf6)

## 🔐 Environment Variables

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The `dist` folder is ready for deployment to any static hosting service.

## 🤝 Key Functions

| Function | Purpose |
|----------|---------|
| `getResponse()` | Sends prompt to Gemini API and generates component code |
| `extractCode()` | Parses markdown code blocks from AI response |
| `copyCode()` | Copies generated code to clipboard |
| `downnloadFile()` | Downloads code as HTML file |
| `toggleTheme()` | Switches between dark and light mode |

## 💻 Performance Features

- **Code Splitting**: Lazy loading with React Router
- **Hot Module Replacement (HMR)**: Fast refresh during development
- **Optimized Animations**: CSS-based animations for performance
- **Efficient Re-renders**: Context API for minimal re-renders

## 📚 Learning Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Generative AI](https://ai.google.dev)

## 🐛 Troubleshooting

**API Key Error**: Ensure `VITE_GEMINI_API_KEY` is set in `.env.local`

**Styling Issues**: Clear cache and rebuild:
```bash
npm run build
```

**Port 5173 in use**: Change port in `vite.config.js`

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Created as an AI Component Generator demonstration using modern web technologies.

---

**Made with ❤️ using React, Tailwind CSS, and Google Gemini AI**
