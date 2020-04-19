
//Registro de un nuevo usuario mediante usuario y contraseña
document.getElementById("send").addEventListener("click", registro);
function registro(){
  //const name = document.getElementById("name").value;
  //const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((data)=>{
    //me creo un registro en la database con el uid de cada nuevo usuario
    console.log(data.user.uid); 
    const datos = {
      nombre: document.getElementById("name").value,
      apellido : document.getElementById("surname").value,
      email : data.user.email
    }
    const refUsuario = database.ref("usuariosRegistrados").child(data.user.uid);
    refUsuario.set(datos)
    .then(()=>{
        console.log('los datos del alumno han sido guradados correctamente')
    })
    .catch(()=>{
        console.log('error al guardar los datos en la base de datos')
    })
  })
  .catch((error)=> {
    let errorCode = error.code;
    let errorMessage = error.message;
    //console.log(errorCode+"("+errorMessage+")");
    console.log(`${errorCode} ("${errorMessage}")`);
  }); 
}

//acceso mediante usuario y contraseña:
document.getElementById("loginEmail").addEventListener("click", accesoRegistrado); 
function accesoRegistrado(){
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      //console.log(user);
      console.log(`${user.email} esta logueado`)
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(error.code);
      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      } else {
        alert(errorMessage);
      }
    });
}

//Log out de usuarios
document.getElementById("logout").addEventListener("click", salir);
function salir(){
    firebase.auth().signOut().then( () => {
      console.log("Deslogado") // Sign-out successful.
    }).catch( (error) => {
        console.log("Error en el signOut") // An error happened.
    });
};

//para ver los usuarios conectados en ese momento
firebase.auth().onAuthStateChanged((user)=> {  
  if (user) {
    // User is signed in.
    console.log(`el ususario ${user.email} está conectado`)
  } else {
    // No user is signed in.
    console.log(`Ningun usuario logueado`)
  }
});

//Para restablacer la contraseña
document.getElementById("getPass").addEventListener("click", restablecerContraseña);
function restablecerContraseña(){
  let auth = firebase.auth();
  let emailAddress = document.getElementById("logEmail").value;
  
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    console.log("se ha enviado un email de restablacimiento de contraseña");
  }).catch(function(error) {
    // An error happened.
    console-log("error al restablecer la contraseña");
  });
}

/*
//Para dar de baja a un usuario (estando logueado) Si no está logueado pondré una alternativa mediante email
let user = firebase.auth().currentUser;
document.getElementById("").addEventListener("click", eliminarUsuario);
function eliminarUsuario(){
  user.delete().then(function() {
    // User deleted.
    console.log(`el usuario ${user} ha sido eliminado de la plataforma`);
    //Podría implementar aquí tambien el borrar sus datos (perfil académico) de la base de datos
  }).catch(function(error) {
    // An error happened.
    console.log(`ha ocrrido un error al eliminar el usuario ${user}, intenta con logout y login nuevamente para reutenticar`);
  });
}
*/
