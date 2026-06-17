import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { MaintenanceTask, ChecklistCategory } from '../data/mockData';

export const generatePDFReport = (task: MaintenanceTask, checklist: ChecklistCategory[]) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('sv-SE');

  // Header
  doc.setFontSize(20);
  doc.text('Serviceprotokoll', 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Datum: ${date}`, 14, 32);
  doc.text(`Rulltrappa: ${task.escalatorName}`, 14, 38);
  doc.text(`Plats: ${task.location}`, 14, 44);
  doc.text(`Servicetyp: ${task.serviceType}-Service`, 14, 50);

  let yPos = 60;

  // Flatten items for the table
  const tableData: any[] = [];
  
  checklist.forEach(category => {
    const relevantItems = category.items.filter(item => item.serviceTypes.includes(task.serviceType));
    
    if (relevantItems.length > 0) {
      // Add category header row
      tableData.push([{ content: category.title, colSpan: 3, styles: { fillColor: [240, 240, 240], fontStyle: 'bold', textColor: [0,0,0] } }]);
      
      relevantItems.forEach(item => {
        let statusText = 'Ej utförd';
        if (item.status === 'ok') statusText = 'Godkänd';
        if (item.status === 'issue') statusText = 'Åtgärd krävs';
        if (item.status === 'na') statusText = 'N/A';

        tableData.push([
          item.description,
          statusText,
          item.comment || '-'
        ]);
      });
    }
  });

  autoTable(doc, {
    startY: yPos,
    head: [['Uppgift', 'Status', 'Kommentar']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [234, 88, 12] }, // Orange-600
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 30 },
      2: { cellWidth: 'auto' }
    }
  });

  // Save the PDF
  doc.save(`Serviceprotokoll_${task.escalatorName}_${date}.pdf`);
};
