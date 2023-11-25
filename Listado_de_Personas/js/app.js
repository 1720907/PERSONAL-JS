const personas=[
    new Persona('Juan','Perez'),
    new Persona('Karla','Lara'),
    new Persona('Esteban','Laguirre')
];
function mostrarPersonas(){
    let texto='';
    for(let persona of personas){
        texto+=`<li>${persona.nombre} ${persona.apellido}</li>`;
    }
    document.getElementById('personas').innerHTML=texto;
}
function agregarPersona(){
    const formulario=document.getElementById('forma');
    let nombre = formulario['nombre'];
    let apellido=formulario['apellido'];
    if(nombre.value!=''&&apellido.value!=''){
        personas.push(new Persona(nombre.value,apellido.value));
        nombre.value='';
        apellido.value='';
        mostrarPersonas();
    }
}
