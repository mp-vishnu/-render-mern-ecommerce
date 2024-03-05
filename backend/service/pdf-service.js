const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = ({ lastOrder, items }) => {
  const today = new Date();
  const pdfPath = `invoice_${lastOrder._id}.pdf`;
  const doc = new PDFDocument();

  // Pipe the PDF content to a file
  doc.pipe(fs.createWriteStream(pdfPath));

  // Add content to the PDF
  doc.fontSize(20).text(`Invoice for Order ID: ${lastOrder._id}`, { align: 'center' });

  doc.fontSize(12).text(`Date: ${today.toDateString()}`, { align: 'right' });

  // Table header
  doc.font('Helvetica-Bold').fontSize(12).text('Name', 100, 100);
  doc.text('Quantity', 250, 100);
  doc.text('Total Amount', 350, 100);
  doc.text('Thumbnail', 450, 100);

  // Table rows
  let y = 130;
  items.forEach(item => {
    doc.font('Helvetica').fontSize(10).text(item.name, 100, y);
    doc.text(item.quantity.toString(), 250, y);
    doc.text(item.totalAmount.toString(), 350, y);
    doc.image(item.image, 450, y - 10, { width: 50 });
    y += 50;
  });

  // Thank you message
  doc.fontSize(12).text('Thank you for shopping with us!', 100, y + 50);

  // Finalize the PDF
  doc.end();

  return pdfPath;
};
