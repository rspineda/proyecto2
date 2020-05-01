window.addEventListener("load", home);

function home(){
  document.getElementById("divUniversidades").style.visibility = "hidden";
  document.getElementById("map").style.height= "2vh";
}

function usuarios() {
  document.getElementById("vistaDinamica").innerHTML= ""  
    home();
    document.getElementById("vistaDinamica").innerHTML += "<h1>Listados de alumnos y especialidades</h1>";
    const ref = database.ref("especialidades").orderByKey();
    ref.once('value', (snapshot)=>{
            snapshot.forEach((childSnapshot)=>{
                document.getElementById("vistaDinamica").innerHTML += `<b>${childSnapshot.key}</b> estudia <b>${childSnapshot.child("carrera").val()}</b> en <b>${childSnapshot.child("nombreEntidad").val()}</b><br>`;
            })          
    });

}

function universidades(){
  document.getElementById("vistaDinamica").innerHTML= "";
  document.getElementById("univ").innerHTML = "<h1>Localización de todas las Universidades Españolas</h1>";
  document.getElementById("divUniversidades").style.visibility= "visible";
  document.getElementById("map").style.height= "90vh";
}

function loadHTML(url, id) {
    req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();
    req.onload = () => {
      document.getElementById(id).innerHTML = req.responseText;
    };
}
  
router = new Navigo(null, true, '#!');
router.on({
    'home': () => {loadHTML('./statics/templates/home.html', 'vistaDinamica'); home()},
    'logIn-logOut': () => { loadHTML('./statics/templates/logIn-logOut.html', 'vistaDinamica'); home()} ,
    'registro': () => { loadHTML('./statics/templates/registro.html', 'vistaDinamica'); home()} ,
    'usuarios': usuarios,
    'universidades': universidades,
    'contacto': ()=>{loadHTML('./statics/templates/contacto.html', 'vistaDinamica'); home()},
});
  
router.on(() => {loadHTML('./statics/templates/home.html', 'vistaDinamica')});
  
router.notFound((query) => { document.getElementById('vistaDinamica').innerHTML = '<h3>Página no encontrada</h3>'; });
  
router.resolve();