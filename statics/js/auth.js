
document.getElementById("send").addEventListener("click", registro);
function registro(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((data)=>{
    
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
    console.log(`${errorCode} ("${errorMessage}")`);
  }); 
}

document.getElementById("loginEmail").addEventListener("click", accesoRegistrado); 
function accesoRegistrado(){
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log(`${user.email} esta logueado`)
    })
    .catch((error) => {
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

document.getElementById("logout").addEventListener("click", salir);
function salir(){
    firebase.auth().signOut().then( () => {
      console.log("Deslogado")
    }).catch( (error) => {
        console.log("Error en el signOut") 
    });
};


firebase.auth().onAuthStateChanged((user)=> {  
  if (user) {
    console.log(`el ususario ${user.email} está conectado`)
  } else {
    console.log(`Ningun usuario logueado`)
  }
});

document.getElementById("getPass").addEventListener("click", restablecerContraseña);
function restablecerContraseña(){
  let auth = firebase.auth();
  let emailAddress = document.getElementById("logEmail").value;
  
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    console.log("se ha enviado un email de restablacimiento de contraseña");
  }).catch(function(error) {
    console-log("error al restablecer la contraseña");
  });
}

