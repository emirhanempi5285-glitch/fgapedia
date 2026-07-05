import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ExamView() {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/exams.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(e => e.id === id);
        setExam(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">Carregando...</div>;
  if (!exam) return <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">Prova não encontrada.</div>;

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="flex items-center gap-2 font-label-sm text-label-sm text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span> 
          VOLTAR PARA O ACERVO
        </Link>
        <a href={`${import.meta.env.BASE_URL}${exam.pdfUrl.startsWith('/') ? exam.pdfUrl.slice(1) : exam.pdfUrl}`} download className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2 font-label-sm text-label-sm hover:opacity-90 transition-all">
          <span className="material-symbols-outlined text-[18px]">download</span> 
          BAIXAR PDF
        </a>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-gutter flex-1 min-h-0">
        <aside className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          <div>
            <h1 className="font-headline-lg text-headline-lg">{exam.subject}</h1>
            <p className="font-body-lg text-secondary mt-2">{exam.examType}</p>
          </div>
          
          <div className="border-t border-outline-variant/20 pt-6 space-y-2">
            <p className="font-body-md"><strong className="font-bold">Professor:</strong> {exam.professor}</p>
            <p className="font-body-md"><strong className="font-bold">Semestre:</strong> {exam.semester}</p>
            <p className="font-body-md flex items-center gap-2">
              <strong className="font-bold">Dificuldade:</strong>
              <span className="flex text-primary gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className="material-symbols-outlined text-sm" 
                    style={i < exam.difficulty ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    star
                  </span>
                ))}
              </span>
            </p>
            <p className="font-body-md flex items-center gap-2">
              <strong className="font-bold">Gabarito:</strong> 
              {exam.hasAnswerKey ? (
                <span className="flex items-center gap-1 text-green-700 font-bold text-sm">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Sim
                </span>
              ) : (
                <span className="flex items-center gap-1 text-secondary font-bold text-sm">
                  <span className="material-symbols-outlined text-[16px]">history_edu</span>
                  Não
                </span>
              )}
            </p>
          </div>

          {exam.tips && (
            <div className="bg-surface-container p-4 rounded border-l-2 border-primary mt-4">
              <strong className="font-label-sm text-label-sm text-primary uppercase block mb-2">Dica de Ouro</strong>
              <p className="text-sm italic text-secondary">"{exam.tips}"</p>
            </div>
          )}
        </aside>

        <div className="bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm h-full hidden lg:block">
          <iframe 
            src={`${import.meta.env.BASE_URL}${exam.pdfUrl.startsWith('/') ? exam.pdfUrl.slice(1) : exam.pdfUrl}`}
            width="100%" 
            height="100%" 
            className="border-none"
            title={`PDF da Prova de ${exam.subject}`}
          />
        </div>
      </div>
    </div>
  )
}
