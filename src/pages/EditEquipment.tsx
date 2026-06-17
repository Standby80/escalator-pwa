import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { mockEquipment } from '../data/mockData';

const EditEquipment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    const eq = mockEquipment.find(e => e.id === id);
    if (eq) {
      setName(eq.name);
      setLocation(eq.location);
      setModel(eq.model);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const eqIndex = mockEquipment.findIndex(e => e.id === id);
    if (eqIndex !== -1) {
      mockEquipment[eqIndex] = {
        ...mockEquipment[eqIndex],
        name,
        location,
        model,
      };
    }
    navigate(`/equipment/${id}`);
  };

  const handleDelete = () => {
    const confirm = window.confirm("Är du säker på att du vill radera denna rulltrappa?");
    if (confirm) {
      const eqIndex = mockEquipment.findIndex(e => e.id === id);
      if (eqIndex !== -1) {
        mockEquipment.splice(eqIndex, 1);
      }
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-bg">
      <div className="bg-dark-card border-b border-dark-border p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <h1 className="text-xl font-bold text-white">Redigera Utrustning</h1>
        </div>
        <button onClick={handleDelete} className="p-2 rounded-full text-red-500 hover:bg-red-500/10 transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">ID</label>
            <input 
              type="text" 
              value={id}
              disabled
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Namn på Rulltrappa</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
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
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(5,150,105,0.4)] mt-6 transition-all flex justify-center items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Spara Ändringar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEquipment;
