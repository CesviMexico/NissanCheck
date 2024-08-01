import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import { Icon } from '@iconify/react';

//component Global
import BadgeMUIImg from '../../components/Global/BadgeComponent'
import DrawerAntd from '../../components/Global/DrawerComponent'
import ComponentDistribuidor from '../Distribuidor/ComponentDistribuidor'


//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';


//ANT
import { Card as CardAntd, Tooltip, List, } from 'antd';
import { SyncOutlined, } from '@ant-design/icons';

//servicios
import Data, { DataHistorico, GetGalery } from "./Services";
import { DataFicha } from "../Distribuidor/Services";

import { ExportToExcel,  FiterData } from '../../components/Global/funciones'

//component local
import Filtros from "./Components/Filtros";
import CardInfo from './Components/CardInfo'
import ModalHistorico from './Components/ModalHistorico'
import ModalGaleriaFotos, { ModalGaleriaVideo } from './Components/ModalGaleria'
import ModalMaps from './Components/ModalMaps'



const Proveedores = (props) => {

  const { xs = 12, sm = 6, md = 3, } = props
  const themeContext = useContext(ThemeContext);
  const { keycloak } = useKeycloak();
  const { themeGral, msErrorApi, logoutOptions, colorBadge } = themeContext;


  const [dataItem, setDataItem] = useState([]);
  const [loading, setloading] = useState(false);

  // const [noEvaluado, setNoEvaluado] = useState([]);
  // const [zona, setZona] = useState([]);
  // const [estado, seEstado] = useState([]);
  // const [csa, setCsa] = useState([]);
  // const [marca, setMarca] = useState([]);
  // const [tipo, setTipo] = useState([]);
  // const [grupo, setGrupo] = useState([]);
  // const [distribuidor, setDistribuidor] = useState([]);


  useEffect(() => { ActualizaTabla() }, []);

  //inicaliza maps
  useEffect(() => {
    setLatitud(19.400352327662368)
    setLongitud(-99.56366303164687)
    setZoom(5)
    setCreate('null')
  }, []);

  const ActualizaTabla = async () => {
    try {
      const response = await Data(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
      )
      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setDataItem(response.data)
          // setNoEvaluado(response.noEvaluado)
          // setZona(response.zona)
          // seEstado(response.estado)
          // setCsa(response.csa)
          // setMarca(response.marca)
          // setTipo(response.tipo)
          // setGrupo(response.grupo)
          // setDistribuidor(response.distribuidor)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
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


  //history
  const [visibleHist, setVisibleHist] = useState(false)
  const [loadingHist, setloadingHist] = useState(false);
  const [tabProps, setTabProps] = useState([])
  const [tabCol, setTabCol] = useState([])
  const [tabData, setTabData] = useState([])

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
          setTabProps(response.props_table)
          setTabCol(response.columns)
          setTabData(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloadingHist(false);
    }

  }


  //maps
  const [visibleMaps, setVisibleMaps] = useState(false)
  const [create, setCreate] = useState([])
  const [latitud, setLatitud] = useState()
  const [longitud, setLongitud] = useState()
  const [zoom, setZoom] = useState()
  const [arrayMarkInfo, setArrayMarkInfo] = useState([])
  const [arrayMarkProv, setArrayMarkProv] = useState([])

  const onViewMaps = (row) => {

    setVisibleMaps(true)
    setLatitud(row.latitud)
    setLongitud(row.Longitud)
    setZoom(5)
    setArrayMarkInfo([row])
  }
  const onViewMapsAll = (dataInfo) => {
    setVisibleMaps(true)
    setCreate('null')
    setArrayMarkInfo(dataInfo.filter(row => row.latitud != null))
    setZoom(5)

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

  }

  const onviewFicha = (code) => {
    setVisibleFicha(true)
    if (code) {
      GetDataFicha(code)
    }
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

  const onCloseFicha = (code) => {
    setVisibleFicha(false)
    setDataFinal([])
    setLoadingFicha(false)
  }


  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }} >

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
          tabCol={tabCol}
          tabData={tabData}
          setTabData={setTabData}
          tabProps={tabProps}

          onviewGal={onviewGal}
          onViewMaps={onViewMaps}
          onviewFicha={onviewFicha}
        />

        <Grid container spacing={1}>


          <Grid item xs={12}>
            <CardAntd
              style={{ width: '99%' }}
              title="Filtros de consulta"
              extra={
                <Tooltip title="Actualizar">
                  <IconButton onClick={() => ActualizaTabla()}                  >
                    <SyncOutlined spin={loading}
                      style={{ fontSize: themeGral.table_sizeIcon, color: themeGral.header_colorIconMenu }}
                    />
                  </IconButton>
                </Tooltip>
              }
            >
              <Filtros onFinish={onFinish} loadingConsultar={loading} />
            </CardAntd>
          </Grid>

          <Grid item xs={12}>
            <CardAntd
              extra={
                <>
                  <Tooltip title="Mapa">
                    <IconButton aria-label="settings"
                      onClick={() => onViewMapsAll(FiterData(dataItem, filter))}
                    >
                      <BadgeMUIImg
                        sizeIcon={themeGral.table_sizeIcon}
                        icon={"gis:map-route"}
                        badgeContent={dataItem && FiterData(dataItem, filter).length}
                        max={9999}
                        colorIcon={themeGral.header_colorIconMenu}
                        colorBadge={colorBadge}
                      />

                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Exportar a Excel"} >
                    <IconButton aria-label="settings"
                      onClick={() => ExportToExcel({ datasource: FiterData(dataItem, filter), Title: "Resultados de la búsqueda", })}
                    >
                      <Icon icon={"mdi:microsoft-excel"} style={{ fontSize: themeGral.table_sizeIcon, color: themeGral.header_colorIconMenu }} />
                    </IconButton>
                  </Tooltip>
                </>
              }
              style={{
                width: '99%',
              }}
            >

              <List
                split={false}
                dataSource={FiterData(dataItem, filter)}
                loading={loading}
                locale={{ emptyText: 'No hay datos por mostrar' }}
                renderItem={(dataItem, index) =>
                  <List.Item>
                    <CardInfo
                      dataItem={dataItem}
                      onviewGal={onviewGal}
                      modalHist={modalHist}
                      onViewMaps={onViewMaps}
                      onviewFicha={onviewFicha}
                    />
                  </List.Item>
                }
              />
            </CardAntd>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Proveedores;
