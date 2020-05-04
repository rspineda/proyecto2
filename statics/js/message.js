function mensaje (){
    let user = firebase.auth().currentUser;
    let data = {
        solicitante :{
            name : document.getElementById("nombreSolicitante").value,
            email : user.email
        },
        destinatario : {
            name : document.getElementById("nombreDestinatario").value,
            especialidad : document.getElementById("especialidadDestinatario").value,
            motivo: document.getElementById("motivo").value
        }
    }
    const mensajes = database.ref(`mensajes/${user.uid}`);
    mensajes.push().set(data)
    .then(()=>{
        console.log('Mensaje guardado correctamente');
        feedback("Tu mensaje ha sido guardado correctamente!");
    })
    .catch(()=>{
        console.log('Error al guardar al mensaje en la base de datos')
    });
}