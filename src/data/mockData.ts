export interface Equipment {
  id: string;
  name: string;
  location: string;
  model: string;
  lastServiceDate?: string;
  lastServiceType?: 'A' | 'C';
  history: { date: string; type: 'A' | 'C'; technician: string }[];
}

export const mockEquipment: Equipment[] = [
  {
    id: 'EQ-001',
    name: 'Rulltrappa 1 (Upp)',
    location: 'Terminal 3, Gate A8',
    model: 'OTIS 510-E',
    lastServiceDate: '2023-10-14',
    lastServiceType: 'A',
    history: [
      { date: '2023-10-14', type: 'A', technician: 'Kambiz Tabrizi' },
      { date: '2022-10-10', type: 'C', technician: 'Anders Andersson' }
    ]
  },
  {
    id: 'EQ-002',
    name: 'Rulltrappa 2 (Ner)',
    location: 'Central Station, North Exit',
    model: 'KONE TravelMaster',
    lastServiceDate: '2023-09-02',
    lastServiceType: 'C',
    history: [
      { date: '2023-09-02', type: 'C', technician: 'Kambiz Tabrizi' }
    ]
  }
];

export interface MaintenanceTask {
  id: string;
  escalatorName: string;
  location: string;
  lastVisit: string;
  hasIssues: boolean;
  serviceType: 'A' | 'C';
  status: 'pending' | 'in-progress' | 'completed';
}

export const assignedTasks: MaintenanceTask[] = [
  {
    id: 'MT0891',
    escalatorName: 'OTIS 510-E',
    location: 'Terminal 3, Gate A8',
    lastVisit: '14 Oct 2023',
    hasIssues: true,
    serviceType: 'C',
    status: 'in-progress'
  },
  {
    id: 'MT0892',
    escalatorName: 'KONE TravelMaster',
    location: 'Central Station, North Exit',
    lastVisit: '02 Sep 2023',
    hasIssues: false,
    serviceType: 'A',
    status: 'pending'
  }
];

export interface ChecklistItem {
  id: string;
  categoryId: number;
  description: string;
  serviceTypes: ('A' | 'C')[];
  status: 'unchecked' | 'ok' | 'issue' | 'na';
  comment?: string;
  photoUrl?: string;
}

export interface ChecklistCategory {
  id: number;
  title: string;
  items: ChecklistItem[];
}

export const defaultChecklist: ChecklistCategory[] = [
  {
    id: 0,
    title: 'Preliminary Checks and Fencing',
    items: [
      { id: '0-1', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera piktogram/Byt om det är defekt', status: 'unchecked' },
      { id: '0-2', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera innertäcksocklar, sparksocklar, automatisk återstart, belysning samt belysningsraster.', status: 'unchecked' },
      { id: '0-3', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera åkskydd, avvisare och avstånd', status: 'unchecked' },
      { id: '0-4', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera rulltrappans körljus (om det finns)', status: 'unchecked' },
      { id: '0-5', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera handledare (sprickor, snitt etc.)', status: 'unchecked' },
      { id: '0-6', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Komplettera vid behov avspärrningshagar övre samt nedre.', status: 'unchecked' },
      { id: '0-7', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Allmän inspektion: Kontrollera steg, HL-införingar, missljud, vibrationer.', status: 'unchecked' },
      { id: '0-8', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera handledarens meddrivning samt handledare kedje spänning etc.', status: 'unchecked' },
      { id: '0-9', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera Övre kambord/ (Skick, inriktning, centrerarad frigång, stegstyrningar)', status: 'unchecked' },
      { id: '0-10', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera Nedre kambord/ (Skick, inriktning, centrerarad frigång stegstyrningar)', status: 'unchecked' },
      { id: '0-11', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera funktionen stoppknappar samt startknappar', status: 'unchecked' },
      { id: '0-12', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera vid behov bromssträcka.', status: 'unchecked' },
      { id: '0-13', categoryId: 0, serviceTypes: ['A', 'C'], description: 'Kontrollera/Test av radar, fotoceller. Testa återstarts funktioner om det finns.', status: 'unchecked' },
    ]
  },
  {
    id: 1,
    title: 'Övre Grop (Upper Pit)',
    items: [
      { id: '1-1', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Öppna övre gropen och ta upp styrskåp. Kontrollera huvudbrytare samt låsfunktion.', status: 'unchecked' },
      { id: '1-2', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Anslut körsladd och Kontrollera dess funktion. Kontrollera arbetsbrytare i grop.', status: 'unchecked' },
      { id: '1-3', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera övervakning för (Drivkedja om det finns)', status: 'unchecked' },
      { id: '1-4', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera Justera bromsar samt nödbroms (om det finns)', status: 'unchecked' },
      { id: '1-5', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera stegkedjan spänning och skick.', status: 'unchecked' },
      { id: '1-6', categoryId: 1, serviceTypes: ['C'], description: 'Smörjning av Stegkedja och (Drivkedja om det finns)', status: 'unchecked' },
      { id: '1-7', categoryId: 1, serviceTypes: ['C'], description: 'Rengöring grop samt controller', status: 'unchecked' },
      { id: '1-8', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera/Fyll på växellådans oljenivåer och kontrollera eventuella läckor.', status: 'unchecked' },
      { id: '1-9', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera Huvudströmbrytare', status: 'unchecked' },
      { id: '1-10', categoryId: 1, serviceTypes: ['C'], description: 'Kontroll huvuddrivaxel/Smörj/fetta lager.', status: 'unchecked' },
      { id: '1-11', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera Funktionen på smörjpump samt fyll på olja på den automatiska Smörjpumpen', status: 'unchecked' },
      { id: '1-12', categoryId: 1, serviceTypes: ['C'], description: 'Kontrollera elektriska ledningar och anslutningspunkter från övre gropen.', status: 'unchecked' },
      { id: '1-13', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera brytarfunktion för handledarinföring', status: 'unchecked' },
      { id: '1-14', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera vibrationer, temperatur, ljud, frigång och koppling i motorväxellådan.', status: 'unchecked' },
      { id: '1-15', categoryId: 1, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera kambordets återvinningsfjäder och säkerhetskontakt.', status: 'unchecked' },
      { id: '1-16', categoryId: 1, serviceTypes: ['C'], description: 'Kontrollera/Justera överhastighetsstyrenheten.', status: 'unchecked' },
    ]
  },
  {
    id: 2,
    title: 'Nedre Grop (Lower Pit)',
    items: [
      { id: '2-1', categoryId: 2, serviceTypes: ['A', 'C'], description: 'Öppna övre gropen och ta upp styrskåp. Kontrollera huvudbrytare samt låsfunktion. (Obs: Det står faktiskt "övre gropen" i dokumentet här trots att avsnittet gäller nedre grop)', status: 'unchecked' },
      { id: '2-2', categoryId: 2, serviceTypes: ['A', 'C'], description: 'Anslut körsladd och Kontrollera dess funktion. Kontrollera arbetsbrytare i grop.', status: 'unchecked' },
      { id: '2-3', categoryId: 2, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera stegkedjans säkerhetsanordning.', status: 'unchecked' },
      { id: '2-4', categoryId: 2, serviceTypes: ['C'], description: 'Rengöring av grop.', status: 'unchecked' },
      { id: '2-5', categoryId: 2, serviceTypes: ['C'], description: 'Demontera skyddsgallret och två steg, kontrollera deras skick (sprickor, slitna bomrader etc.)', status: 'unchecked' },
      { id: '2-6', categoryId: 2, serviceTypes: ['C'], description: 'Kontrollera elektriska ledningar och anslutningspunkter från nedre gropen.', status: 'unchecked' },
      { id: '2-7', categoryId: 2, serviceTypes: ['C'], description: 'Kontrollera/Justera spännstation: spänning, slitage, fett och fjädrar.', status: 'unchecked' },
      { id: '2-8', categoryId: 2, serviceTypes: ['A', 'C'], description: 'Visuell inspektion av stegkedjan.', status: 'unchecked' },
      { id: '2-9', categoryId: 2, serviceTypes: ['C'], description: 'Smörj stegkedjan.', status: 'unchecked' },
      { id: '2-10', categoryId: 2, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera kambordets återvinningsfjäder och säkerhetskontakt.', status: 'unchecked' },
      { id: '2-11', categoryId: 2, serviceTypes: ['A', 'C'], description: 'Kontrollera brytarfunktion för handledarinföring', status: 'unchecked' },
    ]
  },
  {
    id: 3,
    title: 'Stegband / Paletter',
    items: [
      { id: '3-1', categoryId: 3, serviceTypes: ['C'], description: 'Kontrollera/Justera övre samt nedre stegsänkningskontakter', status: 'unchecked' },
      { id: '3-2', categoryId: 3, serviceTypes: ['C'], description: 'Kontrollera/Justera handledardrivkedjan (skick, spänning, smörjning.)', status: 'unchecked' },
      { id: '3-3', categoryId: 3, serviceTypes: ['A', 'C'], description: 'Kontrollera/Justera avståndet mellan stegkant och sparksockel.', status: 'unchecked' },
      { id: '3-4', categoryId: 3, serviceTypes: ['C'], description: 'Kontrollera/Justera drivaxel för handledare (inriktning, lager, smörjning)', status: 'unchecked' },
      { id: '3-5', categoryId: 3, serviceTypes: ['C'], description: 'Kontrollera/Justera drivsystem för handledare (rullar, tryckkedja etc.)', status: 'unchecked' },
      { id: '3-6', categoryId: 3, serviceTypes: ['C'], description: 'Kontrollera/Justera förhållandena och avstånden till stegstyrningen', status: 'unchecked' },
      { id: '3-7', categoryId: 3, serviceTypes: ['C'], description: 'Kontrollera/Justera stegrullebanor (fixering, skarvar, renhet och smörjning)', status: 'unchecked' },
      { id: '3-8', categoryId: 3, serviceTypes: ['C'], description: 'Kontrollera/Justera missingstepgivare övre samt nedre', status: 'unchecked' },
    ]
  },
  {
    id: 4,
    title: 'Handledare och Ballustrad',
    items: [
      { id: '4-1', categoryId: 4, serviceTypes: ['C'], description: 'Kontrollera handledarens skick. Avkrängning av handledare, rengöring av ändåbågar samt rullställ', status: 'unchecked' },
    ]
  }
];
