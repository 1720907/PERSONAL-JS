const ingresos=[
    new Ingreso('Salario', 2000.00),
    new Ingreso('Venta coche',2000.00)
];

const egresos=[
    new Egreso('Renta departamento',900.00),
    new Egreso('Ropa',400.00)
];

let agregarIngreso=(descripcion, valor)=>{
    ingresos.push(new Ingreso(descripcion,valor));
}
let agregarEgreso=(descripcion, valor)=>{
    egresos.push(new Egreso(descripcion,valor));
}

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos=()=>{
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso+=ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos=()=>{
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero=()=>{
    let presupuesto = totalIngresos()-totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML=formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML=formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML=formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML=formatoMoneda(totalEgresos());
}

//Dar formato a los valores de la moneda y el porcentaje
const formatoMoneda=(valor)=>{
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
}

const formatoPorcentaje=(valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2})
}

const cargarIngresos=()=>{
    let ingresosHTML='';
    for(let ingreso of ingresos){
        ingresosHTML+=crearIngresosHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML=ingresosHTML;
}
const cargarEgresos=()=>{
    let egresosHTML='';
    for(let egreso of egresos){
        egresosHTML+=crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML=egresosHTML;
}

const crearIngresosHTML=(ingreso)=>{
    let ingresoHTML=`
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick='eliminarIngreso(${ingreso.id})'>
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>  
    `;
    return ingresoHTML;
}

const crearEgresosHTML=(egreso)=>{
    let porcentaje = egreso.valor/totalEgresos();
    let egresoHTML=`
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick='eliminarEgreso(${egreso.id})'>
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>  
    `;
    return egresoHTML;
}

const eliminarEgreso=(id)=>{
    index=0;
    for(let egreso of egresos){
        if(egreso.id==id){
            index=egresos.indexOf(egreso);
            break;
        }
    }
    egresos.splice(index,1);
    cargarCabecero();
    cargarEgresos();
}
const eliminarIngreso=(id)=>{
    index=0;
    for(let ingreso of ingresos){
        if(ingreso.id==id){
            index=ingresos.indexOf(ingreso);
            break;
        }
    }
    ingresos.splice(index,1);
    cargarCabecero();
    cargarIngresos();
}

const agregarDato = ()=>{
    let formulario = document.forms['forma'];
    if(formulario['descripcion'].value!=''&&formulario['valor'].value!=''){
        if(formulario['tipo'].value=='ingreso'){
            //aqui podemos ver + antes de formulario['valor'].value, lo que significa q lo convertira a numero 
            //automaticamente si es un numero
            agregarIngreso(formulario['descripcion'].value,+formulario['valor'].value);
            cargarCabecero();
            cargarIngresos();
        }
        else{
            agregarEgreso(formulario['descripcion'].value,Number(formulario['valor'].value));
            cargarCabecero();
            cargarEgresos();
        }   
    }
}

const limpiar_Inputs = ()=>{
    let formulario = document.forms['forma'];
    formulario['descripcion'].value = '';
    formulario['valor'].value = '';
}