import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import UserContext from "../../context/UserContext";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

//ANT
import { Card as CardAntd, Divider, Spin, } from 'antd';

//servicios
import { DataDashboard,DataDashboardDetalle } from "./Services";
import { Uid } from '../../components/Global/funciones'

//componentes
import Filtros from "./Components/Filtros";
import ComponentCard from './Components/ComponentCard'
import { GraficaRadar } from './Components/GraficasChart'
import ComponenLista from './Components/ComponentLista'
import ModalDetalle from './Components/ModalDetalle'


const Dashboard = (props) => {


  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);

  const { keycloak } = useKeycloak();
  const { user } = userContext;
  const { themeGral, msErrorApi, logoutOptions, colorBadge } = themeContext;

  const [dataItem, setDataItem] = useState([]);
  const [loading, setloading] = useState(false);


  const GetResulData = async (code) => {
    try {
      const response = await DataDashboard(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      console.log('GetResulData', response.data);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setData(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }
  }


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

    GetResulData('20240724143215_7ojqCXNELW5Ag1Htw0n2bcST9ZiO4leVDx6uFpsrJ8dyhMzkIR')
    // GetResulData('20240724100651_kG5DYFnwfqWQrTthIUgZca9BENeC410KJ2ldSmuPxj6s83vpV7')
    // GetResulData('20240722142223_71xVguykilGFtCO9TpSKnIvsZ20HPLWweBA3EcXY5mdaDQJUR4')


  }

  const gridStyle50 = { width: '50%', }
  const gridStyle25 = { width: '25%', textAlign: 'center', }
  const gridStyle75 = { width: '75%', textAlign: 'center', }
  const gridStyle100 = { width: '100%', textAlign: 'center', }


  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
  });

  const [data, setData] = useState([])

  const Detallezona = (e) => {
    console.log('Detallezona', e)
    modalHist(e)
  };

  const DetalleTipo = (e) => {
    console.log('Tipo ', e)
    modalHist(e)
  };

  const DetalleFaltantes = (e, tipo) => {
    console.log('Tipo ', e, tipo)
    modalHist(e)
  };

  const DetalleDistribuidores = (e, tipo) => {
    console.log('Tipo ', e, tipo)
    modalHist(e)
  };


   //history
   const [visibleDetalle, setVisibleDetalle] = useState(false)
   const [loadingDetalle, setloadingDetalle] = useState(false);
   const [tabProps, setTabProps] = useState([])
   const [tabCol, setTabCol] = useState([])
   const [tabData, setTabData] = useState([])
 
   const modalHist = async (code) => {
     try {
       const response = await DataDashboardDetalle(
         setloadingDetalle,
         msErrorApi,
         keycloak,
         logoutOptions,
         code
       )
       switch (response.status) {
         case 403:
           setloadingDetalle(false);
           break;
 
         case undefined:
           setloadingDetalle(false);
           break;
 
         case 200:
           setVisibleDetalle(true);
           setTabProps(response.props_table)
           setTabCol(response.columns)
           setTabData(response.data)
           break;
 
         default:
           break;
       }
     } catch (error) {
       setloadingDetalle(false);
     }
 
   }
 



  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>
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
          {/* <Spin spinning={loading}> */}

          <CardAntd.Grid hoverable={false} style={gridStyle100} >
            <Filtros onFinish={onFinish} loadingConsultar={loading} />
          </CardAntd.Grid>

          {data.dataZona &&
            <CardAntd.Grid hoverable={false} style={gridStyle100}>

              <Spin spinning={loading}>
                <Divider orientation="left">Zona</Divider>
                <Grid container spacing={1}>
                  {data.dataZona && data.dataZona.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index * 3}>
                      <ComponentCard onClick={Detallezona} value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                    </Grid>
                  ))}
                </Grid>
              </Spin>

              <Spin spinning={loading}>
                <Divider orientation="left">Tipo de representación</Divider>
                <Grid container spacing={1}>
                  {data.dataRepresentacion && data.dataRepresentacion.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index * 3}>
                      <ComponentCard onClick={DetalleTipo} value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                    </Grid>
                  ))}
                </Grid>
              </Spin>

            </CardAntd.Grid>
          }

          {/* <CardAntd.Grid hoverable={false} style={gridStyle100}>
            <Divider orientation="left">Estado</Divider>
          </CardAntd.Grid> */}
          {data.dataGrafica &&
            <CardAntd.Grid hoverable={false} style={gridStyle100}>
              <Spin spinning={loading}>
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
              </Spin>
            </CardAntd.Grid>
          }
          {data.dataDistribuidores &&
            <CardAntd.Grid hoverable={false} style={gridStyle50}>
              <Spin spinning={loading}>
                <ComponenLista
                  color={"#4caf50"}
                  icon={'solar:cup-first-outline'}
                  title='Ranking de cumplimiento de Distribuidores'
                  data={data.dataDistribuidores && data.dataDistribuidores}
                  onClick={DetalleFaltantes}
                  tipo={'tipo'}
                />
              </Spin>
            </CardAntd.Grid>
          }
          {data.dataFaltantes &&
            <CardAntd.Grid hoverable={false} style={gridStyle50}>
              <Spin spinning={loading}>
                <ComponenLista
                  color={"#ff5722"}
                  icon={'material-symbols-light:tools-power-drill-outline-sharp'}
                  title='Ranking de HES faltantes'
                  data={data.dataFaltantes && data.dataFaltantes}
                  onClick={DetalleDistribuidores}
                  tipo={'tipo'}
                />
              </Spin>
            </CardAntd.Grid>
          }

          {/* </Spin> */}
        </CardAntd>


        <ModalDetalle

          visibleDetalle={visibleDetalle}
          setVisibleDetalle={setVisibleDetalle}
          loadingDetalle={loadingDetalle}
          tabCol={tabCol}
          tabData={tabData}
          setTabData={setTabData}
          tabProps={tabProps}

          // onviewGal={onviewGal}
          // onViewMaps={onViewMaps}
          // onviewFicha={onviewFicha}
        />


      </Box>
    </>
  );
};

export default Dashboard;



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
