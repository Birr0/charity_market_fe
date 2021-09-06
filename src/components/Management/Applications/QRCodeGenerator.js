
export const QRCodeGenerator = () => {
    //var QRious = require('qrious');
    var QRCode = require('qrcode.react');

    const code = <QRCode
        id="code"
        ref="code"
        value={"dddcsdd"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        renderAs={"canvas"}
    />;

    console.log(code, typeof(code));
    
  
    //let canvas;
    //canvas = document.getElementById('code');
    //var img = canvas.toDataURL('image/png');
    //console.log(renderToString(code)); 
   
    

    

    //const code = renderToString(<QRCode />)
    //doc.autoPrint({variant: 'non-conform'});
    //doc.addImage(img ,0, 0, 2.95, 1.7);

    //if(price){
    //doc.text(1.2, 1.95, `£ ${(parseFloat(price)).toFixed(2).toString()}`); 
    //}
    //doc.save(`${'test'}.pdf`);

    return code //renderToString(<QRCode />);
    //(
    //    <QRCode />
    //)
}

/*

html2canvas($("#code")).then(
        (canvas) => {
            const imgData = canvas.toDataURL('img/png');
            doc.addImage(imgData)
            doc.save('test.pdf')
        }
    )

*/