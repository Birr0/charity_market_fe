import { jsPDF } from "jspdf";

export const handleBarcodeRequest = (value, price) => {
  
  var JsBarcode = require('jsbarcode');

  let canvas;
  canvas = document.createElement('canvas');
  if(value){
    JsBarcode(canvas, value);
    const barcode = canvas.toDataURL(); 
    
    const doc = new jsPDF({
      orientation:"landscape",
      unit:"in",
      format: [3, 2]
    });
    //doc.autoPrint({variant: 'non-conform'});
    doc.addImage(barcode, 0, 0, 2.95, 1.7);
    
    if(price){
      doc.text(1.2, 1.95, `£ ${(parseFloat(price)).toFixed(2).toString()}`); 
    }
    doc.save(`${value}.pdf`);
  }
}