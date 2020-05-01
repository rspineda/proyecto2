var user = firebase.auth().currentUser;
document.getElementById("sendMessage").addEventListener("click", mensaje)
function mensaje (){
    let solicitante = {
        name : document.getElementById("nombreSolicitante").value,
        uid : user.uid,
        email : user.email
    }
    let destinatario = {
        name : document.getElementById("nombreDestinatario").value,
        especialidad : document.getElementById("especialidadDestinatario").value,
        motivo: document.get

    }
}