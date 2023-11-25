document.getElementById('sumar').onclick=sumar;
function sumar(){
    let suma=Number(document.getElementById('opA').value)+Number(document.getElementById('opB').value)
    let texto='';
    if(isNaN(suma)||suma==0){
        texto='La operación no incluye números';
    }else{
        texto=`Resultado: ${suma}`;
    }
    document.getElementById('texto').innerHTML=texto;
}