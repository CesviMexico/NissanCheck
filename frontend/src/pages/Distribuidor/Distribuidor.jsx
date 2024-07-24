import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import UserContext from "../../context/UserContext";

import { useKeycloak } from "@react-keycloak/web";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

//ANT
import { Card as CardAntd, AutoComplete } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';

//servicios
import Data, { DataFicha } from "./Services";
import ComponentDistribuidor from './ComponentDistribuidor'

import { DataHistorico, GetGalery } from "../Proveedores/Services";

import TablaANTD from "../../components/Global/TablaComponent";
import DrawerAntd from '../../components/Global/DrawerComponent'

import ModalGaleriaFotos, { ModalGaleriaVideo } from '../Proveedores/Components/ModalGaleria'
import ModalMaps from '../Proveedores/Components/ModalMaps'



const Busqueda = () => {

  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const { keycloak } = useKeycloak();
  const { msErrorApi, logoutOptions, } = themeContext;

  const { user } = userContext;


  const [data, setData] = useState([])
  const [options, setOptions] = useState([])
  const [loading, setloading] = useState(false);

  useEffect(() => { ActualizaTabla() }, []);

  const ActualizaTabla = async () => {
    try {
      const response = await Data(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
      )
      console.log("Busqueda", response);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setOptions(response.options)
          setData(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  };


  const handleSearch = (value) => {
    !value && setValueSelect(0)
  }
  const [tallerSelectio, setTallerSelectio] = useState([])
  const [valueSelect, setValueSelect] = useState(0)
  const onSelect = (value) => {
    setValueSelect(value)
    // console.log("onSelect", value)
    // console.log("ItemSelect", ItemSelect)
    //  console.log("url_code", ItemSelect[0].url_code)

    let ItemSelect = data.filter(Item => Item.value == value)
    ItemSelect[0].url_code ? modalHist(ItemSelect[0].url_code) : setDataFinal([])

  }

  //consulta  de ficha tecnica
  const [visibleFicha, setVisibleFicha] = useState(false)
  const [dataFinal, setDataFinal] = useState([])
  const [loadingFicha, setLoadingFicha] = useState(false);
  const GetDataFicha = async (code) => {
    try {
      const response = await DataFicha(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      console.log("GetDataFicha", response.data);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setDataFinal(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  };


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
      console.log("modalHist", response);
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

  const OnClickAction = (row, key) => {
    swicthComponentAction[key](row)
  }
  const swicthComponentAction = {
    Informe: (row) => onviewFicha(row.cod_acceso),
    Galeria: (row) => onviewGal(row.cod_acceso, 'foto'),
    Videos: (row) => onviewGal(row.cod_acceso, 'video'),
    Mapa: (row) => onViewMaps(row)
  }

  const onviewFicha = (code) => {
    setVisibleFicha(true)
    if (code) {
      GetDataFicha(code)
    }
  }

  const onCloseFicha = (code) => {
    setVisibleFicha(false)
    setDataFinal([])
    setLoadingFicha(false)
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
      console.log("GetGalery", response);
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

  //maps
  const [visibleMaps, setVisibleMaps] = useState(false)
  const [create, setCreate] = useState([])
  const [latitud, setLatitud] = useState()
  const [longitud, setLongitud] = useState()
  const [zoom, setZoom] = useState()
  const [arrayMarkInfo, setArrayMarkInfo] = useState([])
  const [arrayMarkProv, setArrayMarkProv] = useState([])

  const onViewMaps = (row) => {
    console.log("row", row)
    setVisibleMaps(true)
    setLatitud(row.latitud)
    setLongitud(row.Longitud)
    setZoom(5)
    setArrayMarkInfo([row])
  }

  //inicaliza maps
  useEffect(() => {
    setLatitud(19.400352327662368)
    setLongitud(-99.56366303164687)
    setZoom(5)
    setCreate('null')
  }, []);

  useEffect(() => {
    user.id_rol === 3 &&  modalHist(user.url_code)
    user.id_rol === 3 && setValueSelect(user.distribuidor)
  }, [user.id_rol]);



  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>

        <Grid container spacing={1}>

          {
            user.id_rol !== 3 &&
            <Grid item xs={12}>
              <CardAntd
                style={{ width: '99%' }}
              // title="Búsqueda por distribuidor"
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <AutoComplete
                      loading={loading}
                      size="large"
                      style={{ width: '100%', }}
                      options={options}
                      placeholder="Ingresa nombre del distribuidor"
                      filterOption={(inputValue, options) =>
                        options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                      onSelect={onSelect}
                      onSearch={handleSearch}
                      allowClear={{
                        clearIcon: <CloseSquareFilled />,
                      }}
                    />
                  </Grid>
                </Grid>

              </CardAntd>
            </Grid>
          }


          <Grid item xs={12}>
            <TablaANTD
              loading={loadingHist}
              columnsTable={tabCol}
              datasource={tabData}
              setDataSource={setTabData}
              pagination={tabProps && tabProps.pagination}
              pageSize={tabProps && tabProps.pageSize}
              simplepage={tabProps && tabProps.simplepage}
              positionBottom={tabProps && tabProps.positionBottom}
              positionTop={tabProps && tabProps.positionTop}
              size={tabProps && tabProps.size}
              bordered={tabProps && tabProps.bordered}
              scrollX={tabProps && tabProps.scrollX}
              scrollY={tabProps && tabProps.scrollY}
              tableLayout={tabProps && tabProps.tableLayout}
              dragSorting={tabProps && tabProps.dragSorting}
              Title={tabProps.Title && tabProps.Title + " (" + valueSelect + ")"}
              IconAvatar={tabProps && tabProps.IconAvatar}
              OnClickAction={OnClickAction}
            />
          </Grid>

          <DrawerAntd
            visible={visibleFicha}
            onClose={() => onCloseFicha()}
            width="90%"
          >
            <ComponentDistribuidor
              loading={loading}
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


        </Grid>
      </Box>
    </>
  );
};


export default Busqueda;
