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
import { SearchOutlined } from '@ant-design/icons';

//servicios
import Data from "./Services";

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

  };

  //image action
  const [visible, setVisible] = useState(false)
  const [listImage, setListImage] = useState([
    {
      "pregunta": "Fachada",
      "respuesta": "",
      "comentario": ".",
      "id_evidencia": 0,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "FRONT_3184351344534453180.jpg"
    },
    {
      "pregunta": "Cuenta con \u00f3rdenes de reparaci\u00f3n y las captura en un sistema de gesti\u00f3n de talleres",
      "respuesta": "Registro manual",
      "comentario": "",
      "id_evidencia": 9797,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_2514055680198243663.jpg"
    },
    {
      "pregunta": "Rampas",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9798,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_419967418041627102.jpg"
    },
    {
      "pregunta": "Mesa de trabajo",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9799,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_9206276585337232294.jpg"
    },
    {
      "pregunta": "Torqu\u00edmetro",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9800,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_3804147960265032071.jpg"
    },
    {
      "pregunta": "Compresor port\u00e1til 1.5 hp 10 Lts.",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9801,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_7572495267753071784.jpg"
    },
    {
      "pregunta": "Esmeril de banco",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9802,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_8248589129096608613.jpg"
    },
    {
      "pregunta": "Prensa hidr\u00e1ulica",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9803,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_99414093501535373.jpg"
    },
    {
      "pregunta": "Tornillo de banco",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9804,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_4543099039014377828.jpg"
    },
    {
      "pregunta": "Herramienta b\u00e1sica",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9805,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_8276239451533819137.jpg"
    },
    {
      "pregunta": "Caja o tablero de herramientas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9806,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_9161106623457637415.jpg"
    },
    {
      "pregunta": "Compresor fijo 2 1\/2 hp",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9807,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_4723789172839906806.jpg"
    },
    {
      "pregunta": "Cargador de bater\u00edas inteligente",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9808,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_1446109902746490360.jpg"
    },
    {
      "pregunta": "Mult\u00edmetro",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9809,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_7378274811279176949.jpg"
    },
    {
      "pregunta": "Scanner",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9810,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_6917348334114260623.jpg"
    },
    {
      "pregunta": "Pigtail para Bajaj",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9811,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_6007233229074426047.jpg"
    },
    {
      "pregunta": "Herramienta especial",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9812,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_6532538007083359111.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9813,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_4653104777799600633.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9814,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_7797735791388063841.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9815,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_2028977165457992166.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9816,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_3326507823696896065.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9817,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_8380227287335683257.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9818,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_6627314427689384718.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9819,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_2663562381236833061.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9820,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_8660720645176311732.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9821,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_8436785197694214270.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9822,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_2975372529664296466.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9823,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_7852638968110879355.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9824,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_373232014568805404.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9825,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_1017372419284277287.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9826,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_3248133023202423754.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9827,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_5457360649973844511.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9828,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_511134861730849055.jpg"
    },
    {
      "pregunta": "Fotos alternas",
      "respuesta": "",
      "comentario": "",
      "id_evidencia": 9829,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_2151433342152589914.jpg"
    },
    {
      "pregunta": "Limpieza de piezas",
      "respuesta": "Si",
      "comentario": "",
      "id_evidencia": 9830,
      "id_evaluacion_fb": "1712247384",
      "evidencia": "PR_61_509567361083428628.jpg"
    }
  ])
  const onviewGal = async (code) => {
    // const response = await GetGalery(
    //   setloadingGral,
    //   msErrorApi,
    //   keycloak,
    //   logoutOptions,
    //   code
    // )
    // console.log("responser0", response)
    // setListImage(response.data)
    setVisible(true)
  }


  //history
  const [visibleHist, setVisibleHist] = useState(false)
  const [loadingGral, setloadingGral] = useState(false);
  const [tabProps, setTabProps] = useState([])
  const [tabCol, setTabCol] = useState([])
  const [tabData, setTabData] = useState([])
  const modalHist = async (code) => {
    console.log('setear on view modal')
    setVisibleHist(true)
    // const response = await getHist(
    //     setloadingGral,
    //     msErrorApi,
    //     keycloak,
    //     logoutOptions,
    //     code,
    // )
    // setTabProps(response.props_table)
    // setTabCol(response.columns)
    // setTabData(response.data) 
    //     console.log("response.......", response)

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


  const [id_zona, setId_zona] = useState([]);
  // const [estado, seEstado] = useState([]);
  // const [csa, setCsa] = useState([]);
  // const [marca, setMarca] = useState([]);
  // const [tipo, setTipo] = useState([]);
  // const [grupo, setGrupo] = useState([]);
  // const [distribuidor, setDistribuidor] = useState([]);


  const [filter, setFilter] = useState({});
  const [dataItemfilter, setDataItemfilter] = useState([]);

  const onFinish = (values) => {

    console.log('Success:', values);

    console.log('id_zona.length:', values.id_zona.length);

    const newFilter = {
      id_zona: values.id_zona[0],
      id_estado: values.id_estado[0],
      id_csa_territorio: values.id_csa_territorio[0],
      id_marca: values.id_marca[0],
      id_representacion: values.id_representacion[0],
      id_grupo: values.id_grupo[0],
      id_distribuidor: values.id_distribuidor[0]
    }

    values.id_zona.length == 0 && delete newFilter.id_zona;
    values.id_estado.length == 0 && delete newFilter.id_estado;
    values.id_csa_territorio.length == 0 && delete newFilter.id_csa_territorio;
    values.id_marca.length == 0 && delete newFilter.id_marca;
    values.id_representacion.length == 0 && delete newFilter.id_representacion;
    values.id_grupo.length == 0 && delete newFilter.id_grupo;
    values.id_distribuidor.length == 0 && delete newFilter.id_distribuidor;


    setFilter(newFilter)
    console.log('newFilter:', newFilter);

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
          loadingGral={loadingGral}
          tabCol={tabCol}
          tabData={tabData}
          setTabData={setTabData}
          tabProps={tabProps}
        />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Form
              name="Filtros"
              size="small"
              labelCol={{ flex: '40px' }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              onFinish={onFinish}
            >
              <CardAntd
                title="Evaluación técnica"
                extra={
                  <Tooltip title="Actualizar tabla">
                    <Form.Item>
                      <Button
                        shape="circle"
                        type="text"
                        // onClick={() => ActualizaTabla()}
                        htmlType="submit"
                      >
                        <SearchOutlined spin={loading}
                          style={{ fontSize: themeGral.table_sizeIcon, color: themeGral.header_colorIconMenu }}
                        />
                      </Button>
                    </Form.Item>
                  </Tooltip>
                }
                style={{
                  width: '99%',
                }}
              >

                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_zona"
                      label="Zona"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Zona!',
                    //     type: 'array',
                    //   },
                    // ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Zona"
                        options={zona}
                      />
                    </Form.Item>

                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_estado"
                      label="Estado"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Estado!',
                    //     type: 'array',
                    //   },
                    // ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Estado"
                        options={estado}
                      />
                    </Form.Item>


                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_csa_territorio"
                      label="CSA"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select CSA / Territorio!',
                    //     type: 'array',
                    //   },
                    // ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select CSA / Territorio"
                        options={csa}
                      />
                    </Form.Item>



                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_marca"
                      label="Marca"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Marca!',
                    //     type: 'array',
                    //   },
                    // ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Marca"
                        options={marca}
                      />
                    </Form.Item>


                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_representacion"
                      label="Tipo"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Tipo!',
                    //     type: 'array',
                    //   },
                    // ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Tipo"
                        options={tipo}
                      />
                    </Form.Item>


                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_grupo"
                      label="Grupo"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Grupo!',
                    //     type: 'array',
                    //   },
                    // ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Grupo"
                        options={grupo}
                      />
                    </Form.Item>



                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_distribuidor"
                      label="Distribuidor"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please select Distribuidor!',
                    //     type: 'array',
                    //   },
                    // ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Distribuidor"
                        options={distribuidor}
                      />
                    </Form.Item>


                  </Grid>
                </Grid>
              </CardAntd>
            </Form>
          </Grid>


          <Grid item xs={12}>
            <CardAntd
              title={
                <>
                  {/* <BadgeMUIImg
                      sizeIcon={themeGral.table_sizeIcon}
                      icon={"gis:map-route"}
                      badgeContent={dataItem && 10} //dataItem.length}
                      max={9999}
                      colorIcon={themeGral.header_colorIconMenu}
                      colorBadge={colorBadge}
                    /> */}
                  {' Resultados de la busquda '}
                </>
              }
              extra={
                <>
                  <Tooltip title="ubicaciones">
                    <IconButton aria-label="settings"
                      onClick={() => onViewMapsAll(dataItem.filter(item => {
                        for (let key in filter) {
                          if (item[key] === undefined || item[key] != filter[key])
                            return false;
                        }
                        return true;
                      }))}
                    >
                      {/* <Icon icon={"gis:map-route"} style={{ fontSize: themeGral.table_sizeIcon, color: themeGral.header_colorIconMenu }} /> */}
                      <BadgeMUIImg
                        sizeIcon={themeGral.table_sizeIcon}
                        icon={"gis:map-route"}
                        badgeContent={
                          dataItem &&
                          dataItem.filter(item => {
                            for (let key in filter) {
                              if (item[key] === undefined || item[key] != filter[key])
                                return false;
                            }
                            return true;
                          }).length
                        }
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
                dataSource={
                  dataItem.filter(item => {
                    for (let key in filter) {
                      if (item[key] === undefined || item[key] != filter[key])
                        return false;
                    }
                    return true;
                  })
                }
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
