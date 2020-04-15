/*
// My web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEwX2nyLNbYQMiwmeC6wHATE4xzPE6S58",
    authDomain: "alumnos-a6801.firebaseapp.com",
    databaseURL: "https://alumnos-a6801.firebaseio.com",
    projectId: "alumnos-a6801",
    storageBucket: "alumnos-a6801.appspot.com",
    messagingSenderId: "958924277619",
    appId: "1:958924277619:web:0af491a9fd69d75dc7e706"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
*/



//Registro de un nuevo usuario mediante usuario y contraseña
document.getElementById("send").addEventListener("click", registro);
function registro(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode+"("+errorMessage+")");
  }); 
}

//acceso mediante usuario y contraseña:
document.getElementById("loginEmail").addEventListener("click", accesoRegistrado); 
function accesoRegistrado(){
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      } else {
        alert(errorMessage);
      }
    });
}