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
import { DataDashboard } from "./Services";
import { DataFicha } from "../Distribuidor/Services";
import { DataHistorico, GetGalery } from "../Proveedores/Services";
import ModalMaps from '../Proveedores/Components/ModalMaps'

//componentes
import Filtros from "./Components/Filtros";
import ComponentCard from './Components/ComponentCard'
import { GraficaRadar } from './Components/GraficasChart'
import ComponenLista from './Components/ComponentLista'
import ModalDetalle from './Components/ModalDetalle'
import MexicoMap from './Components/MexicoMap'
import ChipWithDecorators from './Components/ChipWithDecorators'


//components detalle
import DrawerAntd from '../../components/Global/DrawerComponent'
import ComponentDistribuidor from '../Distribuidor/ComponentDistribuidor'
import ModalGaleriaFotos, { ModalGaleriaVideo } from '../Proveedores/Components/ModalGaleria'
import ModalHistorico from '../Proveedores/Components/ModalHistorico'



const Dashboard = (props) => {


  const userContext = useContext(UserContext);
  const themeContext = useContext(ThemeContext);

  const { keycloak } = useKeycloak();
  const { user } = userContext;
  const { themeGral, msErrorApi, logoutOptions, colorBadge } = themeContext;

  const [loading, setloading] = useState(false);
  const GetResulData = async (code, parametros) => {
    try {
      const response = await DataDashboard(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
        code,
        parametros

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
          setTabProps(response.data.props_table)
          setTabCol(response.data.columns)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }
  }


  // const [filter, setFilter] = useState({});
  const onFinish = (values) => {

    const newFilter = {
      id_zona: values.id_zona && values.id_zona,
      id_estado: values.id_estado && values.id_estado,
      id_csa_territorio: values.id_csa_territorio && values.id_csa_territorio,
      id_marca: values.id_marca && values.id_marca,
      id_representacion: values.id_representacion && values.id_representacion,
      id_grupo: values.id_grupo && values.id_grupo,
    }

    values.id_zona === undefined ? delete newFilter.id_zona : values.id_zona.length == 0 && delete newFilter.id_zona
    values.id_estado === undefined ? delete newFilter.id_estado : values.id_estado.length == 0 && delete newFilter.id_estado
    values.id_csa_territorio === undefined ? delete newFilter.id_csa_territorio : values.id_csa_territorio.length == 0 && delete newFilter.id_csa_territorio
    values.id_marca === undefined ? delete newFilter.id_marca : values.id_marca.length == 0 && delete newFilter.id_marca
    values.id_representacion === undefined ? delete newFilter.id_representacion : values.id_representacion.length == 0 && delete newFilter.id_representacion
    values.id_grupo === undefined ? delete newFilter.id_grupo : values.id_grupo.length == 0 && delete newFilter.id_grupo

    // setFilter(newFilter)
    GetResulData('Code', newFilter)
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
    setVisibleDetalle(true);
    setTabData(e)
  };

  const DetalleTipo = (e) => {
    setVisibleDetalle(true);
    setTabData(e)
  };

  const DetalleFaltantes = (e, tipo) => {
    // ////console.log('Tipo ', e, tipo)
    ////console.log('talleres ', e.talleres)
    ////console.log('tabCol ', tabCol)

    setVisibleDetalle(true);
    setTabData(e.talleres)
  };

  const DetalleDistribuidores = (item, tipo) => {
    modalHist(item.url_code)
  };


  //Detalle
  const [visibleDetalle, setVisibleDetalle] = useState(false)
  const [loadingDetalle, setloadingDetalle] = useState(false);
  const [tabProps, setTabProps] = useState([])
  const [tabCol, setTabCol] = useState([])
  const [tabData, setTabData] = useState([])

  /// detalle modal
  const onCloseFicha = (code) => {
    setVisibleFicha(false)
    setDataFinal([])
    setLoadingFicha(false)
  }

  //consulta  de ficha tecnica
  const [visibleFicha, setVisibleFicha] = useState(false)
  const [dataFinal, setDataFinal] = useState([])
  const [loadingFicha, setLoadingFicha] = useState(false);

  const GetDataFicha = async (code) => {
    try {
      const response = await DataFicha(
        setLoadingFicha,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      switch (response.status) {
        case 403:
          setLoadingFicha(false);
          break;

        case undefined:
          setLoadingFicha(false);
          break;

        case 200:
          setDataFinal(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setLoadingFicha(false);
    }

  };

  const onviewFicha = (code) => {
    setVisibleFicha(true)
    if (code) {
      GetDataFicha(code)
    }
  }

  //image action
  const [visibleFotos, setVisibleFotos] = useState(false)
  const [visibleVideos, setVisibleVideos] = useState(false)

  const [listImage, setListImage] = useState([])
  const onviewGal = async (code, tipo) => {
    try {
      const response = await GetGalery(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          switch (tipo) {
            case 'foto':
              setVisibleFotos(true)
              setListImage(response.data.filter(item => item.tipo == "foto"))
              break;
            case 'video':
              setVisibleVideos(true)
              setListImage(response.data.filter(item => item.tipo == "video"))
              break;
            default:
              break;
          }


          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  }


  //inicaliza maps
  useEffect(() => {
    setLatitud(19.400352327662368)
    setLongitud(-99.56366303164687)
    setZoom(5)
    setCreate('null')
  }, []);

  //maps
  const [visibleMaps, setVisibleMaps] = useState(false)
  const [create, setCreate] = useState([])
  const [latitud, setLatitud] = useState()
  const [longitud, setLongitud] = useState()
  const [zoom, setZoom] = useState()
  const [arrayMarkInfo, setArrayMarkInfo] = useState([])
  const [arrayMarkProv, setArrayMarkProv] = useState([])

  const onViewMaps = (row) => {
    ////console.log('onViewMaps ', row)

    setVisibleMaps(true)
    setLatitud(row.latitud)
    setLongitud(row.Longitud)
    setZoom(5)
    setArrayMarkInfo([row])
  }


  //history
  const [visibleHist, setVisibleHist] = useState(false)
  const [loadingHist, setloadingHist] = useState(false);
  const [tabProps2, setTabProps2] = useState([])
  const [tabCol2, setTabCol2] = useState([])
  const [tabData2, setTabData2] = useState([])

  const modalHist = async (code) => {
    try {
      const response = await DataHistorico(
        setloadingHist,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      switch (response.status) {
        case 403:
          setloadingHist(false);
          break;

        case undefined:
          setloadingHist(false);
          break;

        case 200:
          setVisibleHist(true);
          setTabProps2(response.props_table)
          setTabCol2(response.columns)
          setTabData2(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloadingHist(false);
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
                  src={user.path_foto}

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
                <ChipWithDecorators total={data.T_All}  promedio={data.T_AVG}   />
                <Divider orientation="left">Zona</Divider>
                <Grid container spacing={1}>
                  {data.dataZona && data.dataZona.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index * 3}>
                      <ComponentCard detalle={item.detalle} onClick={Detallezona} value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                    </Grid>
                  ))}
                </Grid>
              </Spin>

              <Spin spinning={loading}>
                <Divider orientation="left">Tipo de representación</Divider>
                <Grid container spacing={1}>
                  {data.dataRepresentacion && data.dataRepresentacion.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index * 3}>
                      <ComponentCard detalle={item.detalle} onClick={DetalleTipo} value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                    </Grid>
                  ))}
                </Grid>
              </Spin>

            </CardAntd.Grid>
          }

          {data.dataMapa &&
            <CardAntd.Grid hoverable={false} style={gridStyle100}>
              <Spin spinning={loading}>
                {/* <Divider orientation="left">Estado</Divider> */}
                <MexicoMap
                  data={data.dataMapa}
                />
              </Spin>
            </CardAntd.Grid>
          }

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
                  onClick={DetalleDistribuidores}
                  tipo={'Distribuidores'}
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
                  onClick={DetalleFaltantes}
                  tipo={'faltantes'}
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

          onviewGal={onviewGal}
          onViewMaps={onViewMaps}
          onviewFicha={onviewFicha}
        />

        <DrawerAntd
          visible={visibleFicha}
          onClose={() => onCloseFicha()}
          width="90%"
        >
          <ComponentDistribuidor
            loading={loadingFicha}
            data={dataFinal}
            resultSize={100}
          />
        </DrawerAntd>

        <ModalGaleriaFotos
          visible={visibleFotos}
          setVisible={setVisibleFotos}
          listImage={listImage}
        />
        <ModalGaleriaVideo
          visible={visibleVideos}
          setVisible={setVisibleVideos}
          listImage={listImage}
        />

        <ModalMaps
          visibleMaps={visibleMaps}
          setVisibleMaps={setVisibleMaps}
          create={create}
          latitud={latitud}
          longitud={longitud}
          zoom={zoom}
          arrayMarkInfo={arrayMarkInfo}
          arrayMarkProv={arrayMarkProv}
        />

        <ModalHistorico
          visibleHist={visibleHist}
          setVisibleHist={setVisibleHist}
          loadingHist={loadingHist}
          tabCol={tabCol2}
          tabData={tabData2}
          setTabData={setTabData2}
          tabProps={tabProps2}

          onviewGal={onviewGal}
          onViewMaps={onViewMaps}
          onviewFicha={onviewFicha}
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
