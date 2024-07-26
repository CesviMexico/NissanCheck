import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import UserContext from "../../context/UserContext";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

//ANT
import { Card as CardAntd, Divider } from 'antd';

//servicios
import { Uid } from '../../components/Global/funciones'

//componentes
import Filtros from "./Components/Filtros";
import ComponentCard from './Components/ComponentCard'
import { GraficaRadar } from './Components/GraficasChart'
import ComponenLista from './Components/ComponentLista'


const Dashboard = (props) => {


  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);

  const { keycloak } = useKeycloak();
  const { user } = userContext;
  const { themeGral, msErrorApi, logoutOptions, colorBadge } = themeContext;

  const [dataItem, setDataItem] = useState([]);
  const [loading, setloading] = useState(false);


  const [filter, setFilter] = useState({});
  const onFinish = (values) => {

    const newFilter = {
      staAudito: values.staAudito && values.staAudito,

      id_zona: values.id_zona && values.id_zona,
      id_estado: values.id_estado && values.id_estado,
      id_csa_territorio: values.id_csa_territorio && values.id_csa_territorio,
      id_marca: values.id_marca && values.id_marca,
      id_representacion: values.id_representacion && values.id_representacion,
      id_grupo: values.id_grupo && values.id_grupo,
      id_distribuidor: values.id_distribuidor && values.id_distribuidor
    }

    values.staAudito === undefined ? delete newFilter.staAudito : values.staAudito.length == 0 && delete newFilter.staAudito

    values.id_zona === undefined ? delete newFilter.id_zona : values.id_zona.length == 0 && delete newFilter.id_zona
    values.id_estado === undefined ? delete newFilter.id_estado : values.id_estado.length == 0 && delete newFilter.id_estado
    values.id_csa_territorio === undefined ? delete newFilter.id_csa_territorio : values.id_csa_territorio.length == 0 && delete newFilter.id_csa_territorio
    values.id_marca === undefined ? delete newFilter.id_marca : values.id_marca.length == 0 && delete newFilter.id_marca
    values.id_representacion === undefined ? delete newFilter.id_representacion : values.id_representacion.length == 0 && delete newFilter.id_representacion
    values.id_grupo === undefined ? delete newFilter.id_grupo : values.id_grupo.length == 0 && delete newFilter.id_grupo
    values.id_distribuidor === undefined ? delete newFilter.id_distribuidor : values.id_distribuidor.length == 0 && delete newFilter.id_distribuidor

    setFilter(newFilter)

    console.log('newFilter', newFilter)


  }

  const gridStyle50 = { width: '50%', }
  const gridStyle25 = { width: '25%', textAlign: 'center', }
  const gridStyle75 = { width: '75%', textAlign: 'center', }
  const gridStyle100 = { width: '100%', textAlign: 'center', }


  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
  });

  const [data, setData] = useState(
    {
      dataZona: [
        { value: 97, monto: '97%', title: 'Centro', titleValue: 'Centro', icon: 'tdesign:map-3d' },
        { value: 88, monto: '88%', title: 'Norte', titleValue: 'Norte', icon: 'tdesign:map-3d' },
        { value: 73, monto: '73%', title: 'Occidente', titleValue: 'Occidente', icon: 'tdesign:map-3d' },
        { value: 65, monto: '65%', title: 'Sur', titleValue: 'Sur', icon: 'tdesign:map-3d' },

      ],
      dataRepresentacion: [
        { value: 98, monto: '98%', title: 'Matríz', titleValue: 'Matríz', icon: 'mdi:checkers' },
        { value: 84, monto: '84%', title: 'NEC', titleValue: 'NEC', icon: 'mdi:checkers' },
        { value: 76, monto: '76%', title: 'Pop Up', titleValue: 'Pop Up', icon: 'mdi:checkers' },
        { value: 96, monto: '96%', title: 'Sucursal', titleValue: 'Sucursal', icon: 'mdi:checkers' },
      ],
      dataGrafica: {
        datasets:
          [
            {
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              data: [20, 100, 43, 100, 50],
              fill: true,
              label: "Sistema",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
            },
          ],
        labels: ['Equipos para Diagnóstico y Mantenimiento', 'HES Hibrido', 'Mantenimiento', 'Motor', 'Equipos generales de taller']
      },
      dataDescompuestos: [
        { item1: 'Diagnóstico de sistemas electrónicamente controlados', item2: '67%' },
        { item1: 'Cambio y ajuste de fluido CVT', item2: '66%' },
        { item1: 'Adaptador para el probador de tapones de radiador', item2: '61%' },
      ],
      dataFaltantes: [
        { item1: 'Calibración sensor TPMS (Tire Pressure Monitor System)', item2: '100%' },
        { item1: 'Estado de salud de la batería MIDTRONICS', item2: '98%' },
        { item1: 'Boroscopio Esencial para toma de VIN y No. Motor', item2: '97%' },
      ]
    }
  )

  const Detallezona = (e) => {
    console.log('Detallezona', e)      
  };

  const DetalleTipo  = (e) => {
    console.log('Tipo ', e)      
  };

  const DetalleFaltantes  = (e,tipo) => {
    console.log('Tipo ', e,tipo)      
  };

  const DetalleDistribuidores  = (e,tipo) => {
    console.log('Tipo ', e,tipo)      
  };



  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>
        {/* <Grid container spacing={1}>
          <Card
            component="li"
            sx={{ minWidth: "100%", flexGrow: 1, height: "100%" }}

          >

            {
              user.id_company === 2 &&
              <CardCover>
                <video
                  autoPlay
                  loop
                  muted
                  poster="https://assets.codepen.io/6093409/river.jpg"
                >
                  <source src={"https://videos.nissan-cdn.net/nissan/es-MX/videos/nissan-2023-esto_es_nissan-nissan_master_video_back_wide-d.mp4"} type="video/mp4" />

                </video>
              </CardCover>
            }
            {
              user.id_company === 1 &&
              <CardCover>
                <video
                  autoPlay
                  loop
                  muted
                  poster="https://assets.codepen.io/6093409/river.jpg"
                >
                  <source src={"https://video.wixstatic.com/video/7822f6_e1fa3a37664a47678e1bde1fa1283209/720p/mp4/file.mp4"} type="video/mp4" />

                </video>
              </CardCover>
            }

            <CardContent>
              <Typography
                level="body-lg"
                fontWeight="lg"
                textColor="#fff"
                mt={{ xs: 12, sm: 18 }}
                style={{ width: "80%", height: "260px" }}
              >
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}

        <CardAntd style={{ width: '99%', }} bordered={true}
          title={
            <Grid container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            ><br /><br /><br />
              <Grid item >
                <Img alt="complex"
                  style={{
                    width: '75px',
                    height: '60px',
                  }}
                  // src={"https://www.nissantollocan.com.mx/assets/logos/transparent/nissan-gv.png"}
                  src={"https://appweb.cesvimexico.com.mx/NissanCenso/static/media/LogoNISSAN3.png"}

                />
              </Grid>
              <Grid item>{"INFORME DEL ESTATUS QUE GUARDA LA RED DE DISTRIBUIDORES EN MATERIA DE HERRAMIENTAS Y EQUIPOS ESPECIALES"}</Grid>
              <Grid item >
                <Img alt="complex"
                  style={{
                    width: '130px',
                    height: '45px',
                  }}
                  src={"https://static.wixstatic.com/media/7822f6_cf699a5743e2496fa95ce158e4920b1c~mv2.png/v1/fill/w_720,h_251,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7822f6_cf699a5743e2496fa95ce158e4920b1c~mv2.png"}
                />
              </Grid>
            </Grid>
          }
        >

          <CardAntd.Grid hoverable={false} style={gridStyle100} >
            <Filtros onFinish={onFinish} />
          </CardAntd.Grid>

          <CardAntd.Grid hoverable={false} style={gridStyle100}>
            <Divider orientation="left">Zona</Divider>
            <Grid container spacing={1}>
              {data.dataZona && data.dataZona.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index * 3}>
                  <ComponentCard onClick={Detallezona} value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                </Grid>
              ))}
            </Grid>
            <Divider orientation="left">Tipo de representación</Divider>
            <Grid container spacing={1}>
              {data.dataRepresentacion && data.dataRepresentacion.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index * 3}>
                  <ComponentCard onClick={DetalleTipo} value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                </Grid>
              ))}
            </Grid>
          </CardAntd.Grid>

          {/* <CardAntd.Grid hoverable={false} style={gridStyle100}>
            <Divider orientation="left">Estado</Divider>
          </CardAntd.Grid> */}

          <CardAntd.Grid hoverable={false} style={gridStyle100}>
            <Grid container spacing={1}>
              <Grid item xs={2} />
              <Grid item xs={8}>
                <GraficaRadar
                  labels={data.dataGrafica && data.dataGrafica.labels}
                  datasets={data.dataGrafica && data.dataGrafica.datasets}
                />
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </CardAntd.Grid>

          <CardAntd.Grid hoverable={false} style={gridStyle50}>
            <ComponenLista
              color={"#4caf50"}
              icon={'solar:cup-first-outline'}
              title='Ranking de cumplimiento de Distribuidores'
              data={data.dataFaltantes && data.dataFaltantes}
              onClick={DetalleFaltantes}
              tipo={'tipo'}
            />
          </CardAntd.Grid>
          <CardAntd.Grid hoverable={false} style={gridStyle50}>
            <ComponenLista
              color={"#ff5722"}
              icon={'material-symbols-light:tools-power-drill-outline-sharp'}
              title='Ranking de HES faltantes'
              data={data.dataDescompuestos && data.dataDescompuestos}
              onClick={DetalleDistribuidores}
              tipo={'tipo'}
            />
          </CardAntd.Grid>

        </CardAntd>


      </Box>
    </>
  );
};

export default Dashboard;
