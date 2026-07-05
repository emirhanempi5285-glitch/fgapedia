import { useState, useEffect } from 'react';
import ExamCard from '../components/ExamCard';

export default function Home() {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterGabarito, setFilterGabarito] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState(5);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/exams.json`)
      .then(res => res.json())
      .then(data => setExams(data))
      .catch(err => console.error("Erro ao buscar provas:", err));
  }, []);

  const filteredExams = exams.filter(exam => {
    const matchSearch = exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        exam.professor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType ? exam.examType === filterType : true;
    const matchGabarito = filterGabarito ? exam.hasAnswerKey === true : true;
    const matchDifficulty = exam.difficulty <= filterDifficulty;
    
    return matchSearch && matchType && matchGabarito && matchDifficulty;
  });

  const uniqueTypes = [...new Set(exams.map(e => e.examType).filter(Boolean))];

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
      {/* Hero Section */}
      <section className="py-stack-lg md:py-24 grid md:grid-cols-12 gap-gutter items-end">
        <div className="md:col-span-7">
          <h1 className="font-display-lg text-display-lg md:text-[64px] leading-tight mb-8">
            Encontre sua <span className="editorial-underline">próxima prova</span> e materiais de estudo.
          </h1>
          <div className="relative group">
            <input 
              className="w-full bg-surface-container-high border-0 border-b-2 border-primary py-6 px-4 font-body-lg text-body-lg focus:ring-0 focus:outline-none placeholder-secondary transition-all" 
              placeholder="Pesquisar por disciplina (ex: Cálculo 1, APC)..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-6 py-2 flex items-center gap-2 hover:opacity-90 transition-all">
              <span className="material-symbols-outlined">search</span>
              <span className="font-label-sm text-label-sm">BUSCAR</span>
            </button>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9 pb-4">
          <p className="text-secondary font-body-md mb-6 leading-relaxed">
            O maior repositório acadêmico da FCTE. Contribua com a comunidade enviando seus materiais e ajude milhares de estudantes.
          </p>
          <a href="https://github.com/Guilherme115/fgapedia/issues/new/choose" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-transparent border border-primary px-8 py-3 font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-all">
            <span className="material-symbols-outlined">upload_file</span>
            ENVIAR PROVA
          </a>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-gutter py-stack-lg border-t border-outline-variant/20">
        
        {/* Filters Sidebar */}
        <aside className="w-full md:w-72 flex-shrink-0 space-y-stack-lg">
          <div className="space-y-4">
            <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Filtros Ativos</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-secondary">Tipo de Avaliação</label>
                <select 
                  className="w-full bg-surface-container border-0 border-b border-primary/20 focus:border-primary focus:ring-0 focus:outline-none py-2 font-body-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">Todas</option>
                  {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="pt-4 border-t border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-body-md text-primary">Somente com Gabarito</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      className="sr-only peer" 
                      type="checkbox" 
                      checked={filterGabarito}
                      onChange={(e) => setFilterGabarito(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="font-label-sm text-label-sm text-secondary block">Dificuldade Máxima</label>
                <input 
                  className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
                  max="5" 
                  min="1" 
                  type="range"
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-bold text-secondary px-1">
                  <span>1/5</span>
                  <span>{filterDifficulty}/5</span>
                  <span>5/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-container-highest/30 rounded-lg hidden md:block">
            <h4 className="font-headline-md text-headline-md mb-2">Sugestão Editorial</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-4">Veja as provas mais acessadas desta semana para o curso de Engenharia de Software.</p>
            <a className="font-label-sm text-label-sm text-primary flex items-center gap-1 hover:underline" href="#">
              VER COLEÇÃO <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </aside>

        {/* Cards Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <span className="font-label-sm text-label-sm text-secondary">
              EXIBINDO {filteredExams.length} DE {exams.length} RESULTADOS
            </span>
            <div className="flex gap-2">
              <button className="p-2 bg-surface-container border border-primary"><span className="material-symbols-outlined">grid_view</span></button>
              <button className="p-2 hover:bg-surface-container"><span className="material-symbols-outlined">list</span></button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-gutter">
            {filteredExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          
          {filteredExams.length === 0 && (
             <div className="text-center py-24 text-outline">
               <p>Nenhuma prova encontrada com os filtros atuais.</p>
             </div>
          )}
        </div>
      </div>

      {/* Featured Section Asymmetric Layout */}
      <section className="py-24 grid md:grid-cols-2 gap-12 items-center border-t border-outline-variant/20">
        <div className="relative h-[400px] bg-surface-container overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeCTtuAN1VpfxthTUn1t6DjcMw_iLtEDeM9YoPywArMng3VrrA5PX23GUrgQlZqiuhWy54BJFRq_3b-C1sFfQ1pD4jErRZHHaKioa2WgBNIK3SCp-mYN0yKh6Hp78Td99xuSY8xL2EL16t7bOZKCNGCEvh0qkY3VZB5K2TJ5y5zN3A1g5CH4LOEHzOPWemgBfrb_7mzOQtrxZSuXWnMy9LsNg6eZodLP3erwGh3-zJs6U-WRsGXKOFJtnVYUwED-cjis_YKTUKKw')" }}
          >
          </div>
          <div className="absolute inset-0 bg-primary/10"></div>
        </div>
        <div className="space-y-6">
          <h2 className="font-display-lg text-headline-lg">Como a curadoria acadêmica fortalece seu aprendizado.</h2>
          <p className="font-body-lg text-secondary">
            Não somos apenas um repositório. O FGApédia é um esforço coletivo para preservar a memória acadêmica e fornecer ferramentas analíticas para o sucesso dos alunos da UnB Gama.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="font-body-md">Material revisado por alunos veteranos e monitores.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">insights</span>
              <span className="font-body-md">Estatísticas de recorrência de temas em avaliações passadas.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary">groups</span>
              <span className="font-body-md">Espaço colaborativo para discussão de resoluções.</span>
            </li>
          </ul>
          <a href="https://github.com/Guilherme115/fgapedia/blob/master/README.md" target="_blank" rel="noopener noreferrer" className="font-label-sm text-label-sm text-primary editorial-underline hover:text-secondary transition-all">
            LEIA NOSSO MANIFESTO ACADÊMICO
          </a>
        </div>
      </section>
    </div>
  );
}
