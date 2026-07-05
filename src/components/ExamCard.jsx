import { Link } from 'react-router-dom';

export default function ExamCard({ exam }) {
  return (
    <div className="bg-surface-container p-6 flex flex-col justify-between card-hover border border-primary/5 transition-all">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="bg-white/50 text-primary text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
            {exam.subject}
          </span>
          <div className="flex text-primary gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className="material-symbols-outlined text-sm" 
                style={i < exam.difficulty ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                star
              </span>
            ))}
          </div>
        </div>
        <h2 className="font-headline-md text-headline-md mb-2">{exam.examType || 'Prova'}</h2>
        <div className="space-y-1 mb-6">
          <p className="text-secondary text-sm font-medium">Prof. {exam.professor}</p>
          <p className="text-on-surface-variant text-xs">{exam.semester}</p>
        </div>

        {exam.tips && (
          <div className="bg-white/40 p-4 rounded mb-6 border-l-2 border-primary">
            <span className="font-label-sm text-label-sm text-primary uppercase block mb-1">Dica de Ouro</span>
            <p className="text-sm italic text-secondary">"{exam.tips}"</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
        {exam.hasAnswerKey ? (
          <span className="flex items-center gap-1.5 text-xs font-bold text-green-700">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            GABARITO DISPONÍVEL
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-bold text-secondary">
            <span className="material-symbols-outlined text-[16px]">history_edu</span>
            SEM GABARITO OFICIAL
          </span>
        )}
        <Link to={`/prova/${exam.id}`} className="bg-primary text-on-primary px-6 py-2 font-label-sm text-label-sm hover:opacity-90 transition-all">
          VER PROVA
        </Link>
      </div>
    </div>
  );
}
