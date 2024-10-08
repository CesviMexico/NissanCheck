import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

//ANT
import { Card as CardAntd, AutoComplete } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';

//servicios
import Data from "./Services";
import { GetGalery } from "../Proveedores/Services";
import { DataFicha } from "../Distribuidor/Services";


//component Global
import TablaANTD from "../../components/Global/TablaComponent";
import ModalGaleriaFotos, { ModalGaleriaVideo } from '../Proveedores/Components/ModalGaleria'
import ModalMaps from '../Proveedores/Components/ModalMaps'

import DrawerAntd from '../../components/Global/DrawerComponent'
import ComponentDistribuidor from '../Distribuidor/ComponentDistribuidor'


const Busqueda = () => {

  const themeContext = useContext(ThemeContext);
  const { keycloak } = useKeycloak();
  const { msErrorApi, logoutOptions, } = themeContext;

  const [tabProps, setTabProps] = useState([])
  const [tabCol, setTabCol] = useState([])
  const [tabData, setTabData] = useState([])
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

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:

          setTabProps(response.props_table)
          setTabCol(response.columns)
          setTabData(response.data)
          setOptions(response.options)

          ImporExcelFiltrator(false,response.data)

          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  };

  const OnClickAction = (row, key) => {
    swicthComponentAction[key](row)
  }
  const swicthComponentAction = {
    Informe: (row) => onViewRes(row.url_code),
    Galeria: (row) => onviewGal(row.url_code, 'foto'),
    Videos: (row) => onviewGal(row.url_code, 'video'),
    Mapa: (row) => onViewMaps(row)
  }
  

  const onViewRes = (code) => {
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


  const handleSearch = (value) => {
    !value && setValueSelect(0)
  }
  const [valueSelect, setValueSelect] = useState(0)
  const onSelect = (value) => {
    setValueSelect(value)
    ImporExcelFiltrator(value,tabData)
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
  //inicaliza maps
  useEffect(() => {
    setLatitud(19.400352327662368)
    setLongitud(-99.56366303164687)
    setZoom(5)
    setCreate('null')
  }, []);

  const [arregloModificadoH, setArregloModificadoH] = useState([])


  const ImporExcelFiltrator = (valueSelect, tabData) => {
    let ArregloFiltrado = valueSelect ? tabData.filter(Item => Item.value == valueSelect) : tabData
    // console.log('ArregloFiltrado', ArregloFiltrado);
    const arregloModificado = ArregloFiltrado.map(obj => {
      const { 
        cod_acceso,
        Longitud,
        cumplimiento,
        date_ls_DB,
        date_str,
        date_str2,
        idRepresentacion,
        id_csa_territorio,
        id_distribuidor,
        id_estado,
        id_grupo,
        id_marca,
        id_representacion,
        id_taller,
        id_zona,
        latitud,
        latitude212,
        limite_1,
        limite_2,
        limite_3,
        noAudito,
        ord_representacion,
        path_img,
        url_code,
        value,
        ...nuevoObj } = obj;
      return nuevoObj;
    });

    setArregloModificadoH(arregloModificado)
    // console.log('arregloModificado', arregloModificado);  
  }




  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>

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

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CardAntd
              style={{ width: '99%' }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                  <AutoComplete
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

          <Grid item xs={12}>
            <TablaANTD
              loading={loading}
              columnsTable={tabCol}
              datasource={valueSelect ? tabData.filter(Item => Item.value == valueSelect) : tabData}
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
              Title={tabProps.Title}
              IconAvatar={tabProps && tabProps.IconAvatar}
              OnClickAction={OnClickAction}
              ExportaExcel={true}
              ExportaExcelOtro={arregloModificadoH}
              ActualizaTabla={ActualizaTabla}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


export default Busqueda;
