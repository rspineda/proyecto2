
const firebaseConfig = {
    apiKey: "",
    authDomain: "alumnos-a6801.firebaseapp.com",
    databaseURL: "https://alumnos-a6801.firebaseio.com",
    projectId: "alumnos-a6801",
    storageBucket: "alumnos-a6801.appspot.com",
    messagingSenderId: "958924277619",
    appId: "1:958924277619:web:0af491a9fd69d75dc7e706"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


//feedbacks
let alertas = null;
function feedback(mensaje){
    if(alertas) {
        clearTimeout(futuro);
      }
    let divFeedback = document.getElementById("feedback");
    divFeedback.style.top = (15 + window.scrollY) + 'px';
    divFeedback.innerHTML = mensaje;
    divFeedback.style.display = 'block';
    alertas = setTimeout( () => { divFeedback.style.display = 'none'} , 5000);
}

//Regitrarse
function registrarse(){
    autenticacion();
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const level = document.getElementById("level").value;
    const levelName = document.getElementById("levelName").value;
    const degree = document.getElementById("degree").value;
    const comments = document.getElementById("comments").value;
    const counseling = document.getElementById("yes").value;
    const key = `${name} ${surname}`;
    const keyPublica = `${name} ${surname.charAt(0)}`;

    const perfil = {
        nombre : name,
        apellido : surname,
        telefono : phone,
        nivel : level,
        nombreEntidad: levelName,
        carrera: degree,
        consejo: counseling,
        comentario: comments
    }
    const especialidad = {
        nombreEntidad : levelName,
        carrera: degree 
    }
    const refPerfil = database.ref(`perfiles/${key}`);
    const refEspecialidades = database.ref(`especialidades/${keyPublica}`);
    refPerfil.set(perfil)
    .then(()=>{
        console.log('Perfil del alumno guardado correctamente');
        feedback("Se han guardado sus datos correctamente!");
    })
    .catch(()=>{
        console.log('error al guardar perfil en la base de datos');
    });

    refEspecialidades.set(especialidad)
    .then(()=>{
        console.log(`especialidad guardadada correctamente`);
    })
    .catch(()=>{
        console.log(`error al guardar especialidad`);
    })
}

function reanudar(){
    router.navigate('home');
    feedback("Estás en Home");
}









