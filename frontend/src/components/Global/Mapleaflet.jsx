import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useState } from "react";
// import LocStorage from './locStorage';

const style = { width: "100%", height: "700px" };

function Map({ markerPosition, olat, olng, direccion_origen, markerPositionGRAL, ozoom, arrayMarkas, render,arrayMarkProv }) {
  // create map
  const mapRef = useRef(render);
  const currenturlapi = "https://gsas.cesvimexico.com.mx/apis/imgs/icon_map/";

  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [olat, olng], 
      zoom: ozoom,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright"  target="_blank" >OpenStreetMap</a> contributors'
        })
      ]
    });


  }, []);

  
  const markerRef = useRef(null);
  const[arrMarcas, setArraMarcas] = useState([])

  useEffect(
    () => {
      arrMarcas.map(function(mark) {
        mapRef.current.removeLayer(mark);
      });
      let arra = []
      if(arrayMarkas !== null){
        arrayMarkas.map(function(taller) {
          if (taller.latitude !== 'No hay datos') {
            var marca = [taller.latitude,taller.longitud]
            var popup_html = '<div style="width="500px"; height="300px"> <h5>'+taller.razon_social +'</h5><p><a href="https://appweb.cesvimexico.com.mx/LevInfoCesvi/assets/ScripWeb/reportPDF/PDFEvaluacionBAJAJ.php?code_acces='+ taller.url_code +'" target="_blank">ficha tecnica</a></p> <iframe src="https://www.google.com/maps/embed/v1/streetview?location='+ marca[0] + ',' +  marca[1]+'&fov=80&heading=70&pitch=0&key=AIzaSyDy9_oujjehBZLM-MTMic1FY0BzQimmZoQ" width="250" height="250" ></iframe></div>';
            if (taller.cumplimiento == 'PLATINO') {
              var colorIcon = 'marker_platino.png'
            }else if(taller.cumplimiento == 'ORO'){
              var colorIcon = 'marker_oro.png'
            }else if(taller.cumplimiento == 'PLATA'){
              var colorIcon = 'marker_plata.png'
            }else if(taller.cumplimiento == 'BASICO'){
              var colorIcon = 'marker_turquesa.png'
            }else if(taller.cumplimiento == 'No evaluado'){
              var colorIcon = 'marker_carmin.png'
            }
            var Icon = L.icon({
              iconUrl: currenturlapi + colorIcon,
              iconAnchor: [20, 45],
            });
            //agregar marca y iframe de street view
            markerRef.current = L.marker(
              marca,
              {
                icon: Icon 
              }
            )
              .bindPopup( popup_html   ).openTooltip()
              .addTo(mapRef.current)
            
              arra.push( markerRef.current)
            return true;
          }
        });
      }
      setArraMarcas(arra)
      
      if (arrayMarkProv !== '') {
        arrayMarkProv.map(function(Provider) {
          
            var marca = [Provider.latitude,Provider.longitud]
            var popup_html = '<div style="width="500px"; height="300px"> <h5>'+Provider.name +'</h5> <iframe src="https://www.google.com/maps/embed/v1/streetview?location='+ marca[0] + ',' +  marca[1]+'&fov=80&heading=70&pitch=0&key=AIzaSyDy9_oujjehBZLM-MTMic1FY0BzQimmZoQ" width="250" height="250" ></iframe></div>';
            var colorIcon = 'marker_azulb.png'
            var Icon = L.icon({
              iconUrl: currenturlapi + colorIcon,
              iconAnchor: [20, 45],
            });
            markerRef.current = L.marker(
              marca,
              {
                icon: Icon 
              }
            )
              .bindPopup( popup_html   ).openTooltip()
              .addTo(mapRef.current)
            
              arra.push( markerRef.current)
            return true;

        });
      }
    },
    [arrayMarkas]
  );


  return <div id="map" style={style}/>;
}

export default Map;