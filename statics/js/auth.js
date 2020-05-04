//Registro de un nuevo usuario mediante email y contraseña
function autenticacion(){
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
        console.log('los datos del alumno han sido guradados correctamente en autenticación');
    })
    .catch(()=>{
        console.log('error al guardar los datos en la base de datos de autenticación')
    })
  })
  .catch((error)=> {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(`${errorCode} ("${errorMessage}")`);
  }); 
}

//acceso mediante usuario y contraseña:
function acceso(){
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data)=>{
      console.log(`${data.user.email} está logueado` );
      feedback(`Bienvenido  " ${data.user.email} " `);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(error.code);
      if (errorCode === 'auth/wrong-password') {
        feedback('Contraseña incorrecta')
      } else {
        feedback(errorMessage);
      }
    });
}

//acceso mediante Google
function accesoGoogle(){
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.email'); 
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    let user = result.user;
    let datos = {
      nombre : user.displayName,
      email : user.email
    }
    console.log(user);
    const refUsuario = database.ref("usuariosRegistrados").child(user.uid);
    refUsuario.set(datos)
    .then(()=>{
        console.log('los datos del alumno han sido guradados correctamente en autenticación');
    })
    .catch(()=>{
        console.log('error al guardar los datos en la base de datos de autenticación')
    })
  }).catch(function(error) {
    let errorMessage = error.message;
    console.log(error,errorMessage);
  });
}

//Log out
function salir(){
  firebase.auth().signOut().then( () => {
    feedback("Desconectado");
  }).catch( (error) => {
      console.log("Error en el signOut");
  });
}


//Ver usuario conectado en ese momento
firebase.auth().onAuthStateChanged((user)=> {  
if (user) {
  feedback(`Conectado como " ${user.email} " `)

} else {
  console.log(`Ningun usuario logueado`);
}
});

//Para restablacer la contraseña
function restablecerContraseña(){
  let auth = firebase.auth();
  let emailAddress = document.getElementById("logEmail").value;
  
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    console.log("se ha enviado un email de restablacimiento de contraseña");
    feedback("se ha enviado un email de restablacimiento de contraseña");
  }).catch(function(error) {
    console-log("error al restablecer la contraseña");
  });
}

