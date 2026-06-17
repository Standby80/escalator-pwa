import { useParams, useNavigate } from 'react-router-dom';
import { mockEquipment } from '../data/mockData';
import { ArrowLeft, Settings, PenTool } from 'lucide-react';

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipment = mockEquipment.find(eq => eq.id === id);

  if (!equipment) return <div className="p-4 text-white">Utrustning hittades inte.</div>;

  const startService = (type: 'A' | 'C') => {
    // In a real app we'd create a new Task in the DB here and get the task ID
    // For now we just route to the checklist with the type as query param or generic ID
    const mockTaskId = `NEW-${equipment.id}-${Date.now()}`;
    // We can pass the type and equipment ID via URL state or params
    navigate(`/checklist/${mockTaskId}?eq=${equipment.id}&type=${type}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)] bg-dark-bg">
      {/* Header */}
      <div className="bg-dark-card border-b border-dark-border p-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors mt-0.5">
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <div>
            <span className="text-xs font-semibold text-orange-500 tracking-wider mb-1 block">
              {equipment.id}
            </span>
            <h1 className="text-xl font-bold text-white mb-1">{equipment.name}</h1>
            <p className="text-sm text-gray-400">{equipment.location}</p>
          </div>
        </div>
        <button onClick={() => navigate(`/equipment/${equipment.id}/edit`)} className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-dark-card border border-dark-border rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Maskininformation</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-0.5">Modell</p>
              <p className="text-white font-medium">{equipment.model}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Senaste Service</p>
              <p className="text-white font-medium">{equipment.lastServiceDate || 'Okänt'} ({equipment.lastServiceType || '-'})</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-4">Starta ny service</h2>
          <div className="grid gap-3">
            <button 
              onClick={() => startService('A')}
              className="flex items-center gap-4 bg-dark-card border border-dark-border hover:border-orange-500/50 p-4 rounded-xl text-left transition-all active:scale-[0.98] group"
            >
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">A-Service</h3>
                <p className="text-gray-400 text-sm">Årlig / Standard inspektion</p>
              </div>
            </button>

            <button 
              onClick={() => startService('C')}
              className="flex items-center gap-4 bg-dark-card border border-dark-border hover:border-orange-500/50 p-4 rounded-xl text-left transition-all active:scale-[0.98] group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">C-Service</h3>
                <p className="text-gray-400 text-sm">Utökad inspektion (inkl. rengöring)</p>
              </div>
            </button>
          </div>
        </div>

        {/* History Log */}
        {equipment.history && equipment.history.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Servicehistorik</h2>
            <div className="space-y-3">
              {equipment.history.map((hist, index) => (
                <div key={index} className="bg-dark-card border border-dark-border p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-medium mb-0.5">{hist.type}-Service</h4>
                    <p className="text-gray-400 text-xs">Utförd av {hist.technician}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-300 text-sm font-medium">{hist.date}</span>
                    {/* Placeholder for PDF download button when Supabase is connected */}
                    <button className="text-orange-500 text-xs font-semibold mt-1 block hover:underline">Visa Protokoll</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDetails;
