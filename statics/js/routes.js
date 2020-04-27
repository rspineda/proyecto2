

function home(){
document.getElementById("divRegistro").style.display = "none";
document.getElementById("divUsuarios").style.display = "none";
document.getElementById("divUniversidades").style.display = "none";
document.getElementById("divContacto").style.display = "none";
}

function registro(){
    document.getElementById("divRegistro").style.display ="block"
    document.getElementById("divUsuarios").style.display = "none";
    document.getElementById("divUniversidades").style.display = "none";
    document.getElementById("divContacto").style.display = "none";
}

function usuarios() {
    document.getElementById("divRegistro").style.display = "none";
    document.getElementById("divUniversidades").style.display = "none";
    document.getElementById("divContacto").style.display = "none";
    document.getElementById("divUsuarios").style.display = "block";
    document.getElementById("parrafo").innerHTML = "";
    document.getElementById("parrafo").innerHTML += "<h2>Listados de alumnos y especialidades</h2>";
    const ref = database.ref("especialidades").orderByKey();
    ref.once('value', (snapshot)=>{
            snapshot.forEach((childSnapshot)=>{
                document.getElementById("parrafo").innerHTML += `<b>${childSnapshot.key}</b> estudia <b>${childSnapshot.child("carrera").val()}</b> en <b>${childSnapshot.child("nombreEntidad").val()}</b><br>`;
            })          
    });
}

function universidades() {
    document.getElementById("divRegistro").style.display = "none";
    document.getElementById("divUsuarios").style.display = "none";
    document.getElementById("divContacto").style.display = "none";
    document.getElementById("divUniversidades").style.display = "block";
    document.getElementById("univ").innerHTML = "Aquí pondré todas la universidades españolas";
}
function contacto() {
    document.getElementById("divRegistro").style.display = "none";
    document.getElementById("divUsuarios").style.display = "none";
    document.getElementById("divUniversidades").style.display = "none";
    document.getElementById("divContacto").style.display = "block";
}

const index = document.getElementById("home").addEventListener("click", home);
const reg = document.getElementById("registro").addEventListener("click", registro);
const users = document.getElementById("usuarios").addEventListener("click", usuarios);
const univ = document.getElementById("universidades").addEventListener("click", universidades);
const contact = document.getElementById("contacto").addEventListener("click", contacto);