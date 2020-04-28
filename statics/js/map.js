let map = L.map('map').setView([40.416688, -3.703773], 12);  

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9ueXN0aXZlbnMiLCJhIjoiY2s5anI1dzhjMDlzOTNlcGl1NTdxeHN1biJ9.xKlCOyq7HpR2PcMgPA0Isw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);
    
let geojson_url = "https://opendata.arcgis.com/datasets/7698bfcee79142918ed0f040505adfc0_0.geojson";
        
fetch(geojson_url)
.then(res => res.json())
.then(data => {
    L.geoJson(data, {
        onEachFeature: (feature,layer)=>{
            layer.bindPopup(feature.properties.Texto)
        }
    }).addTo(map)
})
.catch(error => console.log("No se pudo caragar correctamente el geojson"));    
