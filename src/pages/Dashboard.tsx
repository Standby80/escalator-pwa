import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin } from 'lucide-react';
import { mockEquipment } from '../data/mockData';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredEquipment = mockEquipment.filter(eq => 
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    eq.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-6 flex flex-col min-h-[calc(100vh-140px)]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-white">Rulltrappor</h1>
          <p className="text-sm text-gray-400">Välj eller sök utrustning</p>
        </div>
        <button 
          onClick={() => navigate('/add-equipment')}
          className="bg-orange-600 hover:bg-orange-500 text-white p-2.5 rounded-full shadow-[0_4px_14px_rgba(234,88,12,0.3)] transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input 
          type="text" 
          placeholder="Sök på ID, namn eller modell..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-card border border-dark-border rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>
      
      {/* Equipment List */}
      <div className="space-y-3 flex-1">
        {filteredEquipment.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Ingen utrustning hittades.
          </div>
        ) : (
          filteredEquipment.map((eq) => (
            <Link
              key={eq.id}
              to={`/equipment/${eq.id}`}
              className="block bg-dark-card border border-dark-border rounded-xl p-4 active:scale-[0.98] transition-transform hover:border-gray-600"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded block mb-1.5 w-max">
                    {eq.id}
                  </span>
                  <h2 className="text-lg font-bold text-gray-100">{eq.name}</h2>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{eq.location}</span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 mt-3 border-t border-dark-border/50">
                <div className="flex-1">
                  Modell: <span className="text-gray-300">{eq.model}</span>
                </div>
                {eq.lastServiceDate && (
                  <div>
                    Senaste: <span className="text-gray-300">{eq.lastServiceDate} ({eq.lastServiceType})</span>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
