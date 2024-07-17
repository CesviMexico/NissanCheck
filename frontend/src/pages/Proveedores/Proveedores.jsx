import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import { Icon } from '@iconify/react';

//component Global
import BadgeMUIImg from '../../components/Global/BadgeComponent'


//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';



//ANT
import { Card as CardAntd, Tooltip, Form, Select, List, Button } from 'antd';
import { SyncOutlined, } from '@ant-design/icons';

//servicios
import Data, { DataHistorico, GetGalery } from "./Services";

import { ExportToExcel, Uid } from '../../components/Global/funciones'

//component local
import CardInfo from './Components/CardInfo'
import ModalHistorico from './Components/ModalHistorico'
import ModalGaleria from './Components/ModalGaleria'
import ModalMaps from './Components/ModalMaps'



const Proveedores = (props) => {

  const { xs = 12, sm = 6, md = 3, } = props
  const themeContext = useContext(ThemeContext);
  const { keycloak } = useKeycloak();
  const { themeGral, msErrorApi, logoutOptions, colorBadge } = themeContext;


  const [dataItem, setDataItem] = useState([]);
  const [loading, setloading] = useState(false);

  const [zona, setZona] = useState([]);
  const [estado, seEstado] = useState([]);
  const [csa, setCsa] = useState([]);
  const [marca, setMarca] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [grupo, setGrupo] = useState([]);
  const [distribuidor, setDistribuidor] = useState([]);


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
      console.log("FiltersController", response);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          // console.log("data", response.data);
          setDataItem(response.data)
          setZona(response.zona)
          seEstado(response.estado)
          setCsa(response.csa)
          setMarca(response.marca)
          setTipo(response.tipo)
          setGrupo(response.grupo)
          setDistribuidor(response.distribuidor)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }
  }

  //image action
  const [visible, setVisible] = useState(false)
  const [listImage, setListImage] = useState([])
  const onviewGal = async (code) => {
    try {
      const response = await GetGalery(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      // console.log("onviewGal", response);
      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setVisible(true)
          setListImage(response.data)
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
      // console.log("modalHist", response);
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
    setLatitud(row.latitude)
    setLongitud(row.longitud)
    setZoom(5)
    // var markTalls = [row]
    setArrayMarkInfo([row])
  }
  const onViewMapsAll = (dataInfo) => {
    setVisibleMaps(true)
    setCreate('null')
    setArrayMarkInfo(dataInfo)
    setZoom(5)
  }


  // const [id_zona, setId_zona] = useState([]);
  // const [estado, seEstado] = useState([]);
  // const [csa, setCsa] = useState([]);
  // const [marca, setMarca] = useState([]);
  // const [tipo, setTipo] = useState([]);
  // const [grupo, setGrupo] = useState([]);
  // const [distribuidor, setDistribuidor] = useState([]);


  const [filter, setFilter] = useState({});
  const [dataItemfilter, setDataItemfilter] = useState([]);
  const onFinish = (values) => {

    console.log('Success:', values)

    const newFilter = {
      id_zona: values.id_zona && values.id_zona,
      id_estado: values.id_estado && values.id_estado,
      id_csa_territorio: values.id_csa_territorio && values.id_csa_territorio,
      id_marca: values.id_marca && values.id_marca,
      id_representacion: values.id_representacion && values.id_representacion,
      id_grupo: values.id_grupo && values.id_grupo,
      id_distribuidor: values.id_distribuidor && values.id_distribuidor
    }
    values.id_zona === undefined ? delete newFilter.id_zona : values.id_zona.length == 0 && delete newFilter.id_zona
    values.id_estado === undefined ? delete newFilter.id_estado : values.id_estado.length == 0 && delete newFilter.id_estado
    values.id_csa_territorio === undefined ? delete newFilter.id_csa_territorio : values.id_csa_territorio.length == 0 && delete newFilter.id_csa_territorio
    values.id_marca === undefined ? delete newFilter.id_marca : values.id_marca.length == 0 && delete newFilter.id_marca
    values.id_representacion === undefined ? delete newFilter.id_representacion : values.id_representacion.length == 0 && delete newFilter.id_representacion
    values.id_grupo === undefined ? delete newFilter.id_grupo : values.id_grupo.length == 0 && delete newFilter.id_grupo
    values.id_distribuidor === undefined ? delete newFilter.id_distribuidor : values.id_distribuidor.length == 0 && delete newFilter.id_distribuidor

    setFilter(newFilter)

    console.log('newFilter:', newFilter);

  }


  const FiterData = (items, filters) => {
    const filteredItems = items.filter(item => {
      return Object.keys(filters).every(key => {
        if (Array.isArray(item[key])) {
          return filters[key].some(filter => item[key].includes(filter));
        }
        return filters[key].includes(item[key]);
      })
    })
    return filteredItems
  }

  let arr = [];
  const [selectedValues, setSelectedValues] = useState([]);
  const onActionSelect = (value, action, id) => {
    // console.log('action-->', action)
    // console.log('value:', value)
    // console.log('id:', id)
    switch (action) {
      case 'onSelect':
        arr.push(value)
        break;
      case 'onDeselect':
        arr = arr.filter(x => x !== value)
        break;
      default:
        break;
    }

    // console.log('Selected Values:', arr);
  }

  const handleBlur = () => {
    console.log('onBlur event triggered');
    console.log('Selected Values:', arr);

    const newFilter = {
      id_estado: arr
    }

    let filtrados = FiterData(dataItem, newFilter)
    console.log('newlist', filtrados);

    const agrupadoPorEdad = filtrados.reduce((grupo, item) => {
      const zona = item.zona;
      const id_zona = item.id_zona;

      if (!grupo[zona]) {
        grupo[zona] = [];
      }

      grupo[zona].push(item.id_zona);

      return grupo;
    }, {});

    console.log('newlist', agrupadoPorEdad);

    const result = Object.keys(agrupadoPorEdad).map(category => {
      return {
        label: category,
        value: agrupadoPorEdad[category][0]
      };
    });
    setZona(result)
    console.log(result);
  };



  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }} >

        <ModalGaleria
          visible={visible}
          setVisible={setVisible}
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
        />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CardAntd
              style={{ width: '99%' }}
              title="Evaluación técnica"
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
              <Form
                name="Filtros"
                size="small"
                labelCol={{ flex: '40px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                onFinish={onFinish}
              >

                <Grid container spacing={1}>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item name="id_zona" label="Zona" >
                      <Select
                        mode="multiple"
                        placeholder="Please select Zona"
                        options={zona}
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item name="id_estado" label="Estado">
                      <Select
                        mode="multiple"
                        placeholder="Please select Estado"
                        options={estado}
                        onBlur={handleBlur}
                        onSelect={(e) => onActionSelect(e, 'onSelect', "id_estado")}
                        onDeselect={(e) => onActionSelect(e, 'onDeselect', "id_estado")}

                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item name="id_csa_territorio" label="CSA">
                      <Select
                        mode="multiple"
                        placeholder="Please select CSA / Territorio"
                        options={csa}
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item name="id_marca" label="Marca">
                      <Select
                        mode="multiple"
                        placeholder="Please select Marca"
                        options={marca}
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item name="id_representacion" label="Tipo">
                      <Select
                        mode="multiple"
                        placeholder="Please select Tipo"
                        options={tipo}
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item name="id_grupo" label="Grupo">
                      <Select
                        mode="multiple"
                        placeholder="Please select Grupo"
                        options={grupo}
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item name="id_distribuidor" label="Distribuidor">
                      <Select
                        mode="multiple"
                        placeholder="Please select Distribuidor"
                        options={distribuidor}
                      />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={xs} sm={sm} md={md}>
                    <Form.Item>
                      <Button
                        loading={loading}
                        block={true}
                        style={{
                          backgroundColor: themeGral.header_colorIconMenu,
                          color: 'white',
                          position: "absolute",
                          align: 'center',
                          right: -5,
                          top: -10,
                        }}
                        htmlType="submit"
                        shape="round"
                        icon={<Icon icon={"line-md:search"} style={{ fontSize: 20, verticalAlign: '-0.125em' }} />}
                        size={"large"}
                      >
                        <span style={{ marginLeft: '8px' }}  >Consultar</span>
                      </Button>
                    </Form.Item>
                  </Grid>
                </Grid>
              </Form>
            </CardAntd>
          </Grid>


          <Grid item xs={12}>
            <CardAntd
              title={'Resultados de la búsqueda'}
              extra={
                <>
                  <Tooltip title="ubicaciones">
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
                    //onClick={() => ExportToExcelButton()} 
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
                // size="large"
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
