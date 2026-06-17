const fs = require('fs');

const rawData = `[E_06] - [E_07]	KB3, KB4	Service brake contact pick (Driftsbromskontakt drar / lyfter ej)
[E_08] - [E_0b]	KB1 - KB4	Service brake contact drop (Driftsbromskontakt släpper ej)
[E_0C] - [E_0E]	KBA2, KBA31, KBA32	Safety brake contact pick (Säkerhetsbromskontakt drar / lyfter ej)
[E_0F]	KBA1	Safety brake contact drop (Säkerhetsbromskontakt släpper ej)
[E_10]	KKP-TL	Combplate contact, top left (Kamplattskontakt, övre vänster)
[E_11]	KHLE-TL	Handrail entry contact, top left (Handledarinlopp, övre vänster)
[E_12]	KSL-TL	Skirt contact, top left (Kjolplåtskontakt, övre vänster)
[E_14]	DH-T, DH-B	Emergency stop (Nödstopp tryckt)
[E_15]	KKP-BL	Combplate contact, bottom left (Kamplattskontakt, nedre vänster)
[E_16]	KHLE-BL	Handrail entry contact, bottom left (Handledarinlopp, nedre vänster)
[E_17]	KKS-BR	Step chain tension contact, right (Kedjespänningsvakt, höger)
[E_18]	INVA, INVB	20% motor overspeed (20% motoröverhastighet)
[E_19]	INAK-TR, KAK-TR	Drive chain contact, top right (Drivkedjekontakt, övre höger)
[E_1A]	KBFM-T	Smoke detector, top (Rökdetektor, övre)
[E_1b]	KHLB-L	Handrail rupture, left (Handledarbrott, vänster)
[E_1C]	INVA, INVB	Motor underspeed (Underhastighet motor)
[E_1d]	KUS-TL	Step upthrust contact, top left (Steglyftsskydd, övre vänster)
[E_1E]	ITH-B	Combplate heating, bottom (Kamplattsvärme, nedre)
[E_1F]	KSL-BL	Skirt contact, bottom left (Kjolplåtskontakt, nedre vänster)
[E_20]	KHW	Handwheel contact (Handhjulskontakt)
[E_23]	KKPV-TL	Combplate contact, vertical, top left (Kamplattskontakt vertikal, övre vänster)
[E_24]	PTC	PTC resistor, drive motor (PTC-termistor, motoröverhettning)
[E_25]	INST-B_PB, INST1-B	Rotation direction error, step band (Riktningsfel stegband)
[E_26]	INVA, INVB	Rotation direction error (Riktningsfel motor)
[E_28]	KKA-BL	Step level contact, bottom left (Stegnivåkontakt, nedre vänster)
[E_29]	KKPV-BL	Combplate contact, vertical, bottom left (Kamplattskontakt vertikal, nedre vänster)
[E_2A]	JH-T	PT: Stop button, top (Stoppknapp, övre)
[E_2b]	KHLB-R	Handrail rupture, right (Handledarbrott, höger)
[E_2C]	JH-B	PB: Stop button, bottom (Stoppknapp, nedre)
[E_2d]	FU_KS	Controlled drive failure (Fel på frekvensomformare/drivenhet)
[E_2E]	JH-A	Stop button, external control cabinet (Stoppknapp externt apparatskåp)
[E_2F]	KDMR1/2-T	Floor cover contact, top (Golvplatta/lucka, övre)
[E_32]	INHL-L	Handrail monitor 15% 15 s, left (Handledarövervakning 15%, vänster)
[E_33]	INHL-R	Handrail monitor 15% 15 s, right (Handledarövervakning 15%, höger)
[E_34]	KB1	Service brake contact pick (Driftsbromskontakt lyfter ej)
[E_35]	KBA1	Safety brake contact pick (Säkerhetsbromskontakt lyfter ej)
[E_36]	KKA-TL	Step level contact, top left (Stegnivåkontakt, övre vänster)
[E_39]	INST-T-PT m.fl.	Missing step/pallet, top (Saknat steg/pall, övre)
[E_3A]	INST-T-PT m.fl.	Initiator defective, top (Givare saknat steg defekt, övre)
[E_3b]	INST-B-PT m.fl.	Missing step/pallet, bottom (Saknat steg/pall, nedre)
[E_3C]	INST-B-PT	Initiator defective, bottom (Givare saknat steg defekt, nedre)
[E_3E]	INVA, INVB m.fl.	20% Step band overspeed (20% överhastighet stegband)
[E_41]	-	Key switch stop (Stopp via nyckelbrytare)
[E_42]	KSL-TML	Skirt contact, top middle left (Kjolplåt, mitten övre vänster)
[E_43]	KOLG-R	Oil level gear box, right (Låg oljenivå i växel, höger)
[E_44]	-	Parameters lost (Förlorade parametrar, ladda default)
[E_45]	-	Inspection outlet cover open (Inspektionslucka öppen)
[E_47]	RM-STOP	Remote stop (Fjärrstopp)
[E_48]	KHLE-TR	Handrail entry contact, top right (Handledarinlopp, övre höger)
[E_49]	KHLE-BR	Handrail entry contact, bottom right (Handledarinlopp, nedre höger)
[E_4A]	KKP-TR	Combplate contact, top right (Kamplattskontakt, övre höger)
[E_4b]	KKP-BR	Combplate contact, bottom right (Kamplattskontakt, nedre höger)
[E_4C]	RSK1, SB m.fl.	Safety circuit interruption (Avbrott i säkerhetskrets)
[E_4E]	KDMR1/2-B	Floor cover contact, bottom (Golvplatta/lucka, nedre)
[E_4F]	-	Shutdown (Nedstängning)
[E_53]	KSEIS	Seismic monitor (Seismisk övervakning / Jordbävningslarm)
[E_54]	PHTK B	Pit light barrier, bottom (Fotocell i nedre grop)
[E_55]	FU K W	Braking resistor (Fel på bromsmotstånd)
[E_56]	KGLP1, KGLP2	Glass cladding monitor (Glasövervakning balustrad)
[E_57]	EoS	Engineer on Site (EoS-läge, tekniker på plats)
[E_58]	LC-PE1, LC-PE2	Light curtain active too long (Ljusridå bruten för länge)
[E_59]	INHLA-BL	Handrail displacement sensor, bottom left (Handledarförskjutning nedre V)
[E_5A]	INHLA-BR	Handrail displacement sensor, bottom right (Handledarförskjutning nedre H)
[E_5b]	INHLA-TL	Handrail displacement sensor, top left (Handledarförskjutning övre V)
[E_5C]	INHLA-TR	Handrail displacement sensor, top right (Handledarförskjutning övre H)
[E_5d]	INHL-L	Handrail monitor, left (Handledarövervakning, vänster)
[E_5E]	INHL-R	Handrail monitor, right (Handledarövervakning, höger)
[E_5F] - [E_61]	KBA2-KBA42	Safety brake contact drop (Säkerhetsbromskontakt släpper ej)
[E_63]	KWL-T	Water level monitor, top (Vattennivåvakt övre grop)
[E_64]	DH-B	Emergency stop, bottom (Nödstopp nedre)
[E_65]	-	Start command pending (Startkommando ligger kvar aktivt)
[E_66]	-	Remote stop via BMS (Fjärrstopp via fastighetssystem BMS)
[E_67]	-	PA system status
[E_6C]	SB	SB dropout check (Dropout-övervakning SB)
[E_6d]	SR-D, SR-U m.fl.	SR dropout check (Dropout-övervakning riktningskontaktor SR)
[E_6F]	SY, SD	SY/SD dropout check (Dropout-övervakning Stjärn/Triangel SY/SD)
[E_75]	INAK-TL, KAK-TL	Drive chain contact, top left (Drivkedjekontakt, övre vänster)
[E_76]	PB board X6.1	Overheat monitoring of truss (Överhettning fackverk)
[E_77] - [E_78]	I-EVAK1/2	Evacuation / End of evacuation (Utrymningskörning larm / avslutad)
[E_79]	SIS2	Fuse 110 VAC (Säkring 110 VAC bränd)
[E_7A]	SIHM	Fuse main motor (Säkring huvudmotor bränd)
[E_7b]	DH-BS2	Stop button, customer-provided (Kundspecifik stoppknapp)
[E_8d]	KDMR1/2-T	Floor cover contact 5 s delay, top (Golvlucka öppen med 5s fördröjning, övre)
[E_8E]	KDMR1/2-B	Floor cover contact 5 s delay, bottom (Golvlucka öppen med 5s fördröjning, nedre)
[E_8F]	KKA-TR	Step level contact, top right (Stegnivåkontakt, övre höger)
[E_90]	KKA-BR	Step level contact, bottom right (Stegnivåkontakt, nedre höger)
[E_92]	KB2	Service brake contact pick (Driftsbromskontakt lyfter ej)
[E_9d]	DH-M	Emergency stop (Nödstopp aktiverat)
[E_A0] - [E_A4]	PB/PT/PA m.fl.	Hardware reset-koder för olika kretskort (Kräver spänningsomstart)
[E_A5]	KBV-L	Blocking device, left (Blockeringsenhet / Trappstegslås aktivt vänster)
[E_A6]	KKS-BL	Step chain tension contact bottom, left (Kedjespänningsvakt, nedre vänster)
[E_A7]	KKL-L	Step chain link contact, left (Länkkontakt stegkedja, vänster)
[E_A8]	KKL-R	Step chain link contact, right (Länkkontakt stegkedja, höger)
[E_b0] - [E_b4]	PT/PB/PA m.fl.	Kretskort reset (Reset identifierare för specifika noder)
[E_b8]	-	Bus retry reset (Startar om buss-kommunikation)
[E_b9]	-	Buffer full reset (Systembuffer full)
[E_bA]	-	Wrong message reset (Felaktigt meddelande, kontrollera anslutning)
[E_bb]	-	Time-out reset (Timeout-fel buss)
[E_bC]	-	Flash reset (Återställ default parametrar)
[E_Cb]	-	24 VDC voltage reset (Övervaka 24 VDC strömförsörjning)
[E_CC]	INVA, INVB	40% Motor overspeed (40% motoröverhastighet)
[E_d1]	KBFM-B	Smoke detector, bottom (Rökdetektor, nedre)
[E_d2]	KSL-ML	Skirt contact, middle left (Kjolplåtskontakt, mitten vänster)
[E_d3]	RKPH	Phase failure (Fasfel/Avsaknad av fas)
[E_d6]	KBV-R	Blocking device, right (Blockeringsenhet / Trappstegslås aktivt höger)
[E_d7]	ITH-T	Combplate heating, top (Kamplattsvärme övre)
[E_d8]	KUS-BL	Step upthrust contact, bottom left (Steglyftsskydd, nedre vänster)
[E_d9]	INBB-R	Brake lining monitor, right (Slitagevakt bromsbelägg, höger)
[E_dA]	DH-BS	Stop button, customer-provided (Kundspecifik stoppknapp)
[E_db]	KWL-B	Water level monitor, bottom (Vattennivåvakt nedre grop)
[E_dF]	KDS	Shutdown with lubrication failure (Nedstängning pga smörjsystemfel)
[E_E4]	PB PCB	PB Over-temperature (Övertemperatur kort i vändstation)
[E_E5]	PT PCB	PT Over-temperature (Övertemperatur kort i drivstation)
[E_E6]	PA PCB	PA Over-temperature (Övertemperatur kort i externt skåp)
[E_EA]	INVA, INVB	Braking distance 20% exceeded (Bromssträcka överskriden med 20%)
[E_Eb]	RKH1/2-B	Consecutive operation, down (Sekventiell drift, ner)
[E_Ed]	DH	Emergency stop 2 (Nödstopp 2 aktiverat)
[E_F2]	-	PT system status (Systemstatus drivstationskort)
[E_F3]	-	PB system status (Systemstatus vändstationskort)
[E_F8]	INVA, INVB	Braking distance too short (Bromssträcka för kort)
[E_F9]	PHTK_T	Pit light barrier, top (Fotocell i övre grop bryten)
[E_FA]	KGLP1, KGLP2	Glass cladding monitor 5 s delay (Glasövervakning utlöst med 5s fördröjning)
[E_Fb]	INVA, INVB	Speed sensor difference 20% (Hastighetsgivardifferens 20% mellan givare)
[E_FC]	INHL-L, INHL-R	Handrail monitor 15% 15 s, both (Handledarövervakning utlöst båda sidor)
[E_Fd]	RKH1/2-B	Consecutive operation delay, down (Sekventiell drift fördröjd, ner)
[E_FE]	RKH1/2-T	Consecutive operation up (Sekventiell drift, upp)
[E_FF]	RKH1/2-T	Consecutive operation delay, up (Sekventiell drift fördröjd, upp)
[E100]	SGBA1, SGBA2	SGBA drop out check (Övervakning Säkerhetsbromskontaktor)
[E101]	SNBA1, RRUN1	SNBA drop out check (Övervakning Nätkontaktor Säkerhetsbroms)
[E102]	SBFU	SBFU drop out check (Övervakning Frekvensomformarkontaktor)
[E103]	RSK1, RSK2	Safety chain signal 5 s delay (Säkerhetskrets öppen > 5 sekunder)
[E104]	ISF1, ISF2	Information safety function PB (Info säkerhetsfunktion vändstation)
[E105] - [E106]	-	P1 / P2 system status
[E107]	KFM-BS	Fire alarm, customer-provided (Brandlarm, externt)
[E108]	KKPV-BR	Combplate contact, vertical, bottom right (Kamplattskontakt vertikal, nedre höger)
[E109]	KKPV-TR	Combplate contact, vertical, top right (Kamplattskontakt vertikal, övre höger)
[E10A]	INBB-L	Brake lining monitor, left (Slitagevakt bromsbelägg, vänster)
[E10b]	KSL-BR	Skirt contact, bottom right (Kjolplåtskontakt, nedre höger)
[E10C]	KSL-MR	Skirt contact, middle right (Kjolplåtskontakt, mitten höger)
[E10d]	KSL-TR	Skirt contact, top right (Kjolplåtskontakt, övre höger)
[E10E]	KSL-TMR	Skirt contact, top middle right (Kjolplåtskontakt, övre mitten höger)
[E10F]	KUS-BR	Step upthrust contact, bottom right (Steglyftsskydd, nedre höger)
[E110]	KUS-TR	Step upthrust contact, top right (Steglyftsskydd, övre höger)
[E111]	SIHM-L	Fuse main motor, left (Säkring huvudmotor bränd, vänster)
[E112]	KOLG-L	Oil level gear box, left (Oljenivå växel låg, vänster)
[E113]	DH-A	Emergency stop, external controller (Nödstopp yttre apparatskåp)
[E114]	-	24 VDC monitoring (Övervakning 24 VDC kraftförsörjning)
[E115]	INVA, INVB	INV same signal (Motorhastighetsgivare har identiska/korsslutna signaler)
[E117]	-	PCB Flash fault (Minnesfel Flash, ladda om parametrar)
[E118]	-	Electrical braking too long (Elektrisk inbromsning med omformare tog för lång tid)
[E500 - E545]	System	Kritiska Systemfel / Hårdvarufel (t.ex. RAM, ADC, Temperatur, Spänningsfall). Kräver ofta maskinomstart.`;

const lines = rawData.split('\n');
const newCodes = [];

for (let line of lines) {
  const match = line.match(/^\[?(E_?[0-9A-Fa-f]{1,3}(?:\s*-\s*\[?E_?[0-9A-Fa-f]{1,3}\]?)?)\]?\t(.*?)\t(.*)$/i);
  if (match) {
    const code = match[1].trim();
    const source = match[2].trim();
    const desc = match[3].trim();
    newCodes.push(`  { code: '${code}', brand: 'Schindler', model: 'Schindler MICONIC F 6', description: '${source !== '-' ? source + ': ' : ''}${desc}', solution: 'Åtgärda enligt beskrivning/larmkälla' },`);
  } else if (line.trim()) {
    // Try without tabs
    const parts = line.split(']');
    if (parts.length > 1 && parts[0].startsWith('[')) {
        const codePart = parts[0].substring(1);
        const rest = parts.slice(1).join(']').trim();
        newCodes.push(`  { code: '${codePart}', brand: 'Schindler', model: 'Schindler MICONIC F 6', description: '${rest}', solution: 'Åtgärda enligt beskrivning' },`);
    }
  }
}

let fileContent = fs.readFileSync('src/data/faultCodesData.ts', 'utf8');

const lastBracket = fileContent.lastIndexOf('];');
if (lastBracket !== -1) {
  const insertion = '\n  // Schindler MICONIC F 6\n' + newCodes.join('\n') + '\n';
  fileContent = fileContent.slice(0, lastBracket) + insertion + fileContent.slice(lastBracket);
  fs.writeFileSync('src/data/faultCodesData.ts', fileContent);
  console.log('Appended to faultCodesData.ts');
} else {
  console.log('Could not find end of array');
}
