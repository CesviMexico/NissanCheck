import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import { Icon } from '@iconify/react';
import UserContext from "../../../context/UserContext";

import Grid from "@mui/material/Grid";
import { Form, Select, Button, Spin } from 'antd';

//servicios
import Data from "../Services";
import { Uid } from '../../../components/Global/funciones'


const Filtros = (props) => {

    const { xs = 12, sm = 6, md = 3, onFinish, loadingConsultar } = props

    const userContext = useContext(UserContext);
    const themeContext = useContext(ThemeContext);

    const { keycloak } = useKeycloak();
    const { user } = userContext;
    const { themeGral, msErrorApi, logoutOptions, colorBadge } = themeContext;

    const [loading, setloading] = useState(false);

    const [zona, setZona] = useState([]);
    const [estado, seEstado] = useState([]);
    const [csa, setCsa] = useState([]);
    const [marca, setMarca] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [grupo, setGrupo] = useState([]);

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
                    setZona(response.zona)
                    seEstado(response.estado)
                    setCsa(response.csa)
                    setMarca(response.marca)
                    setTipo(response.tipo)
                    setGrupo(response.grupo)
                    break;

                default:
                    break;
            }
        } catch (error) {
            setloading(false);
        }
    }

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
            <Spin spinning={loading}>
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
                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item>
                                <Button
                                    loading={loadingConsultar}
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
            </Spin>
            {/* </CardAntd> */}


        </>
    );
};

export default Filtros;
