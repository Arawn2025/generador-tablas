export function descargarPDF() {
  const mensaje = document.querySelector('.mensaje-edicion');
  if (mensaje) mensaje.style.display = 'none';

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'letter' });

  const selector = document.getElementById('selector');
  if (selector) selector.style.display = 'none';
  document.body.classList.remove('selector-activo');

  const originalTablas = document.getElementById('contenidoPDF');
  html2canvas(originalTablas, {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgRatio = canvas.width / canvas.height;
    const usableWidth = pageWidth * 0.95;
    const usableHeight = pageHeight * 0.95;
    let imgWidth, imgHeight;
    if (usableWidth / usableHeight < imgRatio) {
      imgWidth = usableWidth;
      imgHeight = imgWidth / imgRatio;
    } else {
      imgHeight = usableHeight;
      imgWidth = imgHeight * imgRatio;
    }
    const xOffset = (pageWidth - imgWidth) / 2;
    const yOffset = (pageHeight - imgHeight) / 2;
    doc.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
    doc.save("tabla.pdf");
    if (mensaje) mensaje.style.display = 'block';
  });
}
