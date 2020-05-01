
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


const registroHabilitado = document.getElementById("send");
const loginHabilitado = document.getElementById("loginEmail");

if (registroHabilitado != null){
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
    
        const refPerfil = database.ref(`perfiles/${key}`);
        const refEspecialidades = database.ref(`especialiades/${key}`);
    
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
    
    document.getElementById("reset").addEventListener("click",()=>{location.reload()});
    
    
}









