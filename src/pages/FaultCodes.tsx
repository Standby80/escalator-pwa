import { useState } from 'react';
import { Search } from 'lucide-react';

const mockFaultCodes = [
  { code: 'E101', brand: 'KONE', description: 'Kommunikationsfel mellan moderkort och drivkrets.', solution: 'Kontrollera CanBus-kablar. Starta om systemet.' },
  { code: 'F012', brand: 'TKE', description: 'Fel på inverter. Överspänning detekterad.', solution: 'Mät inkommande spänning. Kontrollera bromsresistor.' },
  { code: 'ERR_04', brand: 'OTIS', description: 'Stegkedja för slapp eller bruten.', solution: 'Kontrollera kedjespänningsbrytare i nedre grop.' },
  { code: '0032', brand: 'Schindler', description: 'Säkerhetskrets bruten vid handledarinlopp.', solution: 'Rensa handledarinloppet från skräp, återställ kontakt.' },
];

const FaultCodes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  const filteredCodes = mockFaultCodes.filter(fc => {
    const matchesSearch = fc.code.toLowerCase().includes(searchTerm.toLowerCase()) || fc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || fc.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="px-4 py-6 flex flex-col min-h-[calc(100vh-140px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-sans tracking-tight text-white">Felkoder</h1>
        <p className="text-sm text-gray-400">Slå upp koder från olika tillverkare</p>
      </div>

      <div className="relative mb-4">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input 
          type="text" 
          placeholder="Sök på felkod eller beskrivning..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-card border border-dark-border rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'KONE', 'TKE', 'OTIS', 'Schindler'].map(brand => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${selectedBrand === brand ? 'bg-orange-500 text-white' : 'bg-dark-card border border-dark-border text-gray-400'}`}
          >
            {brand === 'All' ? 'Alla märken' : brand}
          </button>
        ))}
      </div>

      <div className="space-y-3 mt-2 flex-1">
        {filteredCodes.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Inga felkoder hittades.</div>
        ) : (
          filteredCodes.map(fc => (
            <div key={fc.code} className="bg-dark-card border border-dark-border rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold text-red-500 tracking-wider">{fc.code}</span>
                <span className="text-xs font-bold text-gray-400 bg-dark-bg px-2 py-0.5 rounded uppercase border border-dark-border">{fc.brand}</span>
              </div>
              <p className="text-gray-200 text-sm mb-3">{fc.description}</p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                <p className="text-xs font-semibold text-emerald-500 mb-1 uppercase tracking-wider">Lösning</p>
                <p className="text-emerald-50 text-sm">{fc.solution}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FaultCodes;
