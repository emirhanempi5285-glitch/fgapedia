import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ExamView from './pages/ExamView';

function App() {
  return (
    <Router basename="/fgapedia">
      <div className="flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant/20">
          <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
            <Link to="/" className="text-headline-md font-headline-md font-bold tracking-tighter text-primary">
              FGApédia
            </Link>
            <nav className="hidden md:flex items-center space-x-gutter">
              <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1 font-label-sm text-label-sm">Home</Link>
              <a href="https://github.com/Guilherme115/fgapedia/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-secondary font-medium hover:text-primary transition-colors font-label-sm text-label-sm">
                How to Contribute
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Guilherme115/fgapedia" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 hover:bg-surface-container-high px-3 py-1.5 transition-all duration-200">
                <span className="material-symbols-outlined text-[20px]">code</span>
                <span className="font-label-sm text-label-sm">GitHub</span>
              </a>
              <button className="md:hidden p-2">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prova/:id" element={<ExamView />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-surface-container w-full py-stack-lg px-margin-mobile md:px-margin-desktop mt-auto border-t border-outline-variant/20">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <div className="font-headline-md text-headline-md text-primary">FGApédia</div>
              <p className="text-secondary font-label-sm text-label-sm max-w-xs uppercase tracking-wider">
                © 2026 FGApédia. Academic Resource Repository. Criado por e para alunos da FCTE.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-gutter gap-y-4">
              <a className="text-on-surface-variant hover:text-primary transition-opacity font-label-sm text-label-sm" href="#">Privacy Policy</a>
              <a className="text-on-surface-variant hover:text-primary transition-opacity font-label-sm text-label-sm" href="#">Terms of Service</a>
              <a className="text-on-surface-variant hover:text-primary transition-opacity font-label-sm text-label-sm" href="https://github.com/Guilherme115/fgapedia">GitHub Repository</a>
              <a className="text-on-surface-variant hover:text-primary transition-opacity font-label-sm text-label-sm" href="#">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
