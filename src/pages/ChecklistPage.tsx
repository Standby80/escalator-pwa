import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultChecklist, assignedTasks } from '../data/mockData';
import { ArrowLeft, CheckCircle2, AlertCircle, Camera, FileText } from 'lucide-react';
import { generatePDFReport } from '../lib/pdfGenerator';

const ChecklistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = assignedTasks.find(t => t.id === id);
  
  const [activeCategory, setActiveCategory] = useState(0);
  const [checklist, setChecklist] = useState(defaultChecklist);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!task) return <div className="p-4">Task not found</div>;

  const currentCategory = checklist[activeCategory];
  // Only show items that are meant for this task's service type (A or C)
  const filteredItems = currentCategory.items.filter(item => 
    item.serviceTypes.includes(task.serviceType)
  );

  const progress = Math.round((activeCategory / (checklist.length)) * 100);

  const handleStatusChange = (itemId: string, newStatus: 'ok' | 'issue') => {
    const newChecklist = [...checklist];
    const item = newChecklist[activeCategory].items.find(i => i.id === itemId);
    if (item) {
      item.status = newStatus;
      if (newStatus === 'issue') {
        setExpandedItem(itemId);
      } else if (expandedItem === itemId) {
        setExpandedItem(null);
      }
    }
    setChecklist(newChecklist);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border sticky top-0 z-40">
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">{task.escalatorName}</h1>
            <p className="text-xs text-gray-400">Task {task.id}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-dark-border rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Category Tabs (Scrollable) */}
      <div className="overflow-x-auto no-scrollbar border-b border-dark-border bg-dark-bg">
        <div className="flex px-4 py-3 gap-2 min-w-max">
          {checklist.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === idx 
                  ? 'bg-orange-500/10 border-orange-500 text-orange-500' 
                  : 'bg-dark-card border-dark-border text-gray-400 hover:text-gray-200'
              }`}
            >
              {idx}. {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4 text-white">
          {currentCategory.title}
        </h2>
        
        {filteredItems.length === 0 && (
          <div className="text-gray-400 italic text-sm p-4 border border-dark-border rounded-xl bg-dark-card/50">
            Inga punkter för denna servicetyp i denna kategori.
          </div>
        )}

        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className={`border rounded-xl transition-all ${
              item.status === 'issue' 
                ? 'border-orange-500/50 bg-orange-500/5' 
                : item.status === 'ok' 
                  ? 'border-emerald-500/30 bg-emerald-500/5' 
                  : 'border-dark-border bg-dark-card'
            }`}
          >
            <div className="p-4">
              <p className={`text-sm mb-4 ${item.status === 'unchecked' ? 'text-gray-200' : 'text-gray-400'}`}>
                {item.description}
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => handleStatusChange(item.id, 'ok')}
                  className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors border ${
                    item.status === 'ok' 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'bg-dark-bg border-dark-border text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Godkänd
                </button>
                <button 
                  onClick={() => handleStatusChange(item.id, 'issue')}
                  className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors border ${
                    item.status === 'issue' 
                      ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' 
                      : 'bg-dark-bg border-dark-border text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  Åtgärd krävs
                </button>
              </div>
            </div>

            {/* Expandable Section for Issues */}
            {expandedItem === item.id && (
              <div className="px-4 pb-4 pt-2 border-t border-dark-border/50 animate-in slide-in-from-top-2">
                <div className="flex gap-3 mb-3">
                  <label className="flex-1 py-2 rounded border border-dashed border-dark-border text-gray-400 hover:text-white hover:border-gray-500 flex flex-col items-center gap-1 transition-colors text-xs cursor-pointer">
                    <Camera className="w-5 h-5 mb-1" />
                    Lägg till bild
                    {/* The capture="environment" attribute tells mobile browsers to open the rear camera directly */}
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                        // In a real app, upload this file to Supabase Storage here
                        console.log('Image selected for:', item.id);
                      }
                    }}/>
                  </label>
                </div>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                  <textarea 
                    placeholder="Beskriv åtgärd eller problem..."
                    className="w-full bg-dark-bg border border-dark-border rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500 transition-colors h-24 resize-none"
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Navigation Footer */}
      <div className="fixed bottom-[65px] w-full max-w-lg left-1/2 -translate-x-1/2 p-4 bg-gradient-to-t from-dark-bg via-dark-bg to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          {activeCategory < checklist.length - 1 ? (
            <button 
              onClick={() => {
                setActiveCategory(prev => prev + 1);
                window.scrollTo(0, 0);
              }}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(234,88,12,0.4)] transition-all active:scale-[0.98]"
            >
              Nästa kategori
            </button>
          ) : (
            <button 
              onClick={() => {
                generatePDFReport(task, checklist);
                navigate('/');
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(5,150,105,0.4)] transition-all active:scale-[0.98]"
            >
              Signera och Skapa PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistPage;
