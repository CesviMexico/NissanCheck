import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import { Icon } from '@iconify/react';
import UserContext from "../../../context/UserContext";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

//ANT
import { Card as CardAntd, Tooltip, Form, Select, List, Button } from 'antd';
import { SyncOutlined, } from '@ant-design/icons';



//servicios
import Data from "../../Proveedores/Services";
import { Uid } from '../../../components/Global/funciones'

const Filtros = (props) => {

    const { xs = 12, sm = 6, md = 3, onFinish } = props

    const userContext = useContext(UserContext);
    const themeContext = useContext(ThemeContext);

    const { keycloak } = useKeycloak();
    const { user } = userContext;
    const { themeGral, msErrorApi, logoutOptions, colorBadge } = themeContext;

    const [dataItem, setDataItem] = useState([]);
    const [loading, setloading] = useState(false);

    const [noEvaluado, setNoEvaluado] = useState([]);
    const [zona, setZona] = useState([]);
    const [estado, seEstado] = useState([]);
    const [csa, setCsa] = useState([]);
    const [marca, setMarca] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [distribuidor, setDistribuidor] = useState([]);

    useEffect(() => { ActualizaTabla() }, []);


    const ActualizaTabla = async () => {
        try {
            const response = await Data(
                setloading,
                msErrorApi,
                keycloak,
                logoutOptions,
            )
            console.log('ActualizaTabla', response)

            switch (response.status) {
                case 403:
                    setloading(false);
                    break;

                case undefined:
                    setloading(false);
                    break;

                case 200:
                    setDataItem(response.data)
                    setNoEvaluado(response.noEvaluado)
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

    // const [filter, setFilter] = useState({});
    // const onFinish = (values) => {

    //     const newFilter = {
    //         staAudito: values.staAudito && values.staAudito,

    //         id_zona: values.id_zona && values.id_zona,
    //         id_estado: values.id_estado && values.id_estado,
    //         id_csa_territorio: values.id_csa_territorio && values.id_csa_territorio,
    //         id_marca: values.id_marca && values.id_marca,
    //         id_representacion: values.id_representacion && values.id_representacion,
    //         id_grupo: values.id_grupo && values.id_grupo,
    //         id_distribuidor: values.id_distribuidor && values.id_distribuidor
    //     }

    //     values.staAudito === undefined ? delete newFilter.staAudito : values.staAudito.length == 0 && delete newFilter.staAudito

    //     values.id_zona === undefined ? delete newFilter.id_zona : values.id_zona.length == 0 && delete newFilter.id_zona
    //     values.id_estado === undefined ? delete newFilter.id_estado : values.id_estado.length == 0 && delete newFilter.id_estado
    //     values.id_csa_territorio === undefined ? delete newFilter.id_csa_territorio : values.id_csa_territorio.length == 0 && delete newFilter.id_csa_territorio
    //     values.id_marca === undefined ? delete newFilter.id_marca : values.id_marca.length == 0 && delete newFilter.id_marca
    //     values.id_representacion === undefined ? delete newFilter.id_representacion : values.id_representacion.length == 0 && delete newFilter.id_representacion
    //     values.id_grupo === undefined ? delete newFilter.id_grupo : values.id_grupo.length == 0 && delete newFilter.id_grupo
    //     values.id_distribuidor === undefined ? delete newFilter.id_distribuidor : values.id_distribuidor.length == 0 && delete newFilter.id_distribuidor

    //     setFilter(newFilter)

    //     console.log('newFilter', newFilter)


    // }


    return (
        <>
            {/* <CardAntd
                style={{ width: '100%' }}
                // title="Filtros de consulta"
                extra={
                    <Tooltip title="Actualizar">
                        <IconButton onClick={() => ActualizaTabla()}                  >
                            <SyncOutlined spin={loading}
                                style={{ fontSize: themeGral.table_sizeIcon, color: themeGral.header_colorIconMenu }}
                            />
                        </IconButton>
                    </Tooltip>
                }
            > */}
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

                        {/* <Grid item xs={xs} sm={sm} md={md}>
                      <Form.Item name="staAudito" label="Estatus" >
                        <Select
                          key={Uid(1)}
                          allowClear
                          mode="multiple"
                          placeholder="Por favor seleccione estatus"
                          options={noEvaluado}
                        />
                      </Form.Item>
                    </Grid> */}


                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_zona" label="Zona" >
                                <Select
                                    key={Uid(2)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione zona"
                                    options={zona}
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_estado" label="Estado">
                                <Select
                                    key={Uid(3)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione estado"
                                    options={estado}
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_csa_territorio" label="CSA">
                                <Select
                                    key={Uid(4)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione csa/territorio"
                                    options={csa}
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_marca" label="Marca">
                                <Select
                                    key={Uid(5)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione marca"
                                    options={marca}
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_representacion" label="Tipo">
                                <Select
                                    key={Uid(6)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione tipo"
                                    options={tipo}
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_grupo" label="Grupo">
                                <Select
                                    key={Uid(7)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione grupo"
                                    options={grupo}
                                />
                            </Form.Item>
                        </Grid>

                        {/* <Grid item xs={xs} sm={sm} md={md}>
                      <Form.Item name="id_distribuidor" label="Distribuidor">
                        <Select
                          key={Uid(8)}
                          allowClear
                          mode="multiple"
                          placeholder="Por favor seleccione distribuidor"
                          options={distribuidor}
                        />
                      </Form.Item>
                    </Grid> */}

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
            {/* </CardAntd> */}

        </>
    );
};

export default Filtros;
