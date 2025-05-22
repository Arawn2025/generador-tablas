// exportar.js
// Funciones para exportar la tabla generada a PDF.
// Comentarios en español para facilitar el mantenimiento.

export function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });

  const titulo = ""; // Input eliminado
  const originalTablas = document.getElementById('tablas');

  // Cerrar selector antes de capturar
  const selector = document.getElementById('selector');
  selector.style.display = 'none';
  document.body.classList.remove('selector-activo');

  // Clonar #tablas en layout horizontal
  const clone = originalTablas.cloneNode(true);
  clone.id = 'tablas-clone';
  clone.style.display = 'flex';
  clone.style.flexDirection = 'row';
  clone.style.gap = '20px';
  clone.style.justifyContent = 'center';
  clone.style.alignItems = 'flex-start';
  clone.style.flexWrap = 'nowrap';
  clone.style.marginTop = '20px';
  clone.style.background = 'white';
  clone.style.padding = '10px';
  clone.style.width = 'auto';

  // Insertar clon fuera de pantalla y capturarlo
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.appendChild(clone);
  document.body.appendChild(container);

  html2canvas(clone, {
    scale: 2,
    useCORS: true,
    windowWidth: clone.scrollWidth
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = pageWidth - 40;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let y = 20;

    if (titulo.trim() !== '') {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text(titulo, pageWidth / 2, y, { align: 'center' });
      y += 30;
    }

    doc.addImage(imgData, 'PNG', 20, y, pdfWidth, pdfHeight);
    doc.save('tablas_loteria.pdf');

    // Eliminar clon
    document.body.removeChild(container);
  });
}
