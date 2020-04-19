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
//Accedo a la base de datos:
const database = firebase.database();

//Extraigo el los datos del alumno desde el DOM y los subo al documento
document.getElementById("send").addEventListener("click", registro);
function registro(){
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const level = document.getElementById("level").value;
    const levelName = document.getElementById("levelName").value;
    const degree = document.getElementById("degree").value;
    const comments = document.getElementById("comments").value;
    const counseling = document.getElementById("yes").value;
    const key = `${name} ${surname}`;
    
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

    //accedo a la referencia de la  base de datos
    const refPerfil = database.ref(`perfiles/${key}`);
    const refEspecialidades = database.ref(`especialiades/${key}`);
    //almaceno los datos
    refPerfil.set(perfil)
    .then(()=>{
        console.log('Perfil del alumno guardado correctamente')
    })
    .catch(()=>{
        console.log('error al guardar perfil en la base de datos')
    });

    refEspecialidades.set(especialidad)
    .then(()=>{
        console.log(`especialidad guardadada correctamente`);
    })
    .catch(()=>{
        console.log(`error al guardar especialidad`);
    })


}
//resfrescar la pagina o borrar los datos
document.getElementById("reset").addEventListener("click",()=>{location.reload()});

/*
//carga de los alumnos registrados por medio de un recorrido de los hijos
const ref = database.ref()
ref.on('value', (snapshot)=>{
    snapshot.forEach((childsnapshot)=>{
        console.log(childsnapshot.val());
    })
});
*/
const ref = database.ref()
ref.on('child_added', (snapshot)=>{
    console.log(snapshot.val());
});


/*
//eliminar un alumno
document.getElementById("").addEventListener("click", eliminar);
function eliminar(){
let refalumno = database.ref(key);
refalumno.remove()
.then(()=>{

})
.catch(()=>{

})
}
*/



