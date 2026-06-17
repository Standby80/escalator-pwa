import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockEquipment } from '../data/mockData';

const AddEquipment = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [model, setModel] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newEq = {
      id: `EQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      location,
      model,
      history: []
    };
    // In a real app we'd save to DB here. For now just push to mock array (will reset on refresh)
    mockEquipment.push(newEq);
    navigate(`/equipment/${newEq.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg">
      <div className="bg-dark-card border-b border-dark-border p-4 flex items-center gap-3 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-white">Ny Utrustning</h1>
      </div>

      <div className="p-4">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Namn på Rulltrappa</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="t.ex. Rulltrappa 3 (Mitt)"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Plats / Byggnad</label>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="t.ex. Huvudentrén"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Modell / Tillverkare</label>
            <input 
              type="text" 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="t.ex. KONE"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(234,88,12,0.4)] mt-6 transition-all active:scale-[0.98]"
          >
            Spara & Registrera
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
