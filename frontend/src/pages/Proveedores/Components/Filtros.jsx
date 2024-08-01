import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import { Icon } from '@iconify/react';
import UserContext from "../../../context/UserContext";

import Grid from "@mui/material/Grid";
import { Form, Select, Button, Spin } from 'antd';

//servicios
import {DataFilter as Data } from "../Services";
import { Uid } from '../../../components/Global/funciones'


const Filtros = (props) => {

    const { xs = 12, sm = 6, md = 3, onFinish, loadingConsultar } = props

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


    useEffect(() => { ActualizaTabla([], 'LIMPIA') }, []);

    const ActualizaTabla = async (parametros, tipo) => {
        try {
            const response = await Data(
                setloading,
                msErrorApi,
                keycloak,
                logoutOptions,
                parametros,
            )

            console.log(`Params-->${tipo}`, response.params)


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
                    switch (tipo) {
                        case 'FILTRA':
                            const newFilterRequTmp = {
                                ...newFilterRequ,
                                ...response.params
                            }
                            // console.log('newFilterRequTmp-->', newFilterRequTmp)
                            setNewFilterRequ(newFilterRequTmp)
                            break;
                        case 'LIMPIA':
                            setNewFilterRequ([])
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

    let EstatusValue
    let DistribuidorValue

    let ZonaValue
    let EstadoValue
    let CsaValue
    let MarcaValue
    let TipoValue
    let GrupoValue

    const [newFilterRequ, setNewFilterRequ] = useState([]);

    const handleChange = async (value, tipo) => {

        switch (tipo) {
            case "EstatusValue":
                EstatusValue = value;
                break;
            case "ZonaValue":
                ZonaValue = value;
                break;
            case "EstadoValue":
                EstadoValue = value;
                break;
            case "CsaValue":
                CsaValue = value;
                break;
            case "MarcaValue":
                MarcaValue = value;
                break;
            case "TipoValue":
                TipoValue = value;
                break;
            case "GrupoValue":
                GrupoValue = value;
                break;
            case "DistribuidorValue":
                DistribuidorValue = value;
                break;
            default:
                break;
        }
    };


    const [form] = Form.useForm();
    const handleBlur = async (tipo) => {

        const newFilter = {
            ...newFilterRequ,
            staAudito: EstatusValue && EstatusValue,
            id_zona: ZonaValue && ZonaValue,
            id_estado: EstadoValue && EstadoValue,
            id_csa_territorio: CsaValue && CsaValue,
            id_marca: MarcaValue && MarcaValue,
            id_representacion: TipoValue && TipoValue,
            id_grupo: GrupoValue && GrupoValue,
            id_distribuidor: DistribuidorValue && DistribuidorValue,
        }

        EstatusValue === undefined ? delete newFilter.staAudito : EstatusValue.length == 0 && delete newFilter.staAudito
        ZonaValue === undefined ? delete newFilter.id_zona : ZonaValue.length == 0 && delete newFilter.id_zona
        EstadoValue === undefined ? delete newFilter.id_estado : EstadoValue.length == 0 && delete newFilter.id_estado
        CsaValue === undefined ? delete newFilter.id_csa_territorio : CsaValue.length == 0 && delete newFilter.id_csa_territorio
        MarcaValue === undefined ? delete newFilter.id_marca : MarcaValue.length == 0 && delete newFilter.id_marca
        TipoValue === undefined ? delete newFilter.id_representacion : TipoValue.length == 0 && delete newFilter.id_representacion
        GrupoValue === undefined ? delete newFilter.id_grupo : GrupoValue.length == 0 && delete newFilter.id_grupo
        DistribuidorValue === undefined ? delete newFilter.id_distribuidor : DistribuidorValue.length == 0 && delete newFilter.id_distribuidor

        // console.log("newFilterRequ: ", newFilterRequ);
        // console.log("newFilter: ", newFilter);
        // console.log("union: ", {...newFilter,...newFilterRequ});

        await ActualizaTabla({ ...newFilter, ...newFilterRequ }, 'FILTRA')
    }

    const Limpiar = () => {

        EstatusValue = null
        ZonaValue = null
        EstadoValue = null
        CsaValue = null
        MarcaValue = null
        TipoValue = null
        GrupoValue = null
        DistribuidorValue = null


        setNoEvaluado([])
        setZona([])
        seEstado([])
        setCsa([])
        setMarca([])
        setTipo([])
        setGrupo([])
        setDistribuidor([])

        setNewFilterRequ([])
        form.resetFields()
        ActualizaTabla([], 'LIMPIA')
    }

    return (
        <>
            <Spin spinning={loading}>
                <Form
                    form={form}
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
                            <Form.Item name="staAudito" label="Estatus" >
                                <Select
                                    key={Uid(1)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione estatus"
                                    options={noEvaluado}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    onChange={(e) => handleChange(e, "EstatusValue")}
                                    onBlur={() => handleBlur("EstatusValue")}
                                />
                            </Form.Item>
                        </Grid>

                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_zona" label="Zona" >
                                <Select
                                    key={Uid(2)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione zona"
                                    options={zona}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }

                                    onChange={(e) => handleChange(e, "ZonaValue")}
                                    onBlur={() => handleBlur("ZonaValue")}


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
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    onChange={(e) => handleChange(e, "EstadoValue")}
                                    onBlur={() => handleBlur("EstadoValue")}
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
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={csa}
                                    onChange={(e) => handleChange(e, "CsaValue")}
                                    onBlur={() => handleBlur("CsaValue")}
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
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={marca}
                                    onChange={(e) => handleChange(e, "MarcaValue")}
                                    onBlur={() => handleBlur("MarcaValue")}
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
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={tipo}
                                    onChange={(e) => handleChange(e, "TipoValue")}
                                    onBlur={() => handleBlur("TipoValue")}
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
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={grupo}
                                    onChange={(e) => handleChange(e, "GrupoValue")}
                                    onBlur={() => handleBlur("GrupoValue")}
                                />
                            </Form.Item>
                        </Grid>
                        <Grid item xs={xs} sm={sm} md={md}>
                            <Form.Item name="id_distribuidor" label="Distribuidor">
                                <Select
                                    key={Uid(8)}
                                    allowClear
                                    mode="multiple"
                                    placeholder="Por favor seleccione distribuidor"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={distribuidor}
                                    onChange={(e) => handleChange(e, "DistribuidorValue")}
                                    onBlur={() => handleBlur("DistribuidorValue")}
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
                                    onClick={() => Limpiar()}
                                    shape="round"
                                    icon={<Icon icon={"ant-design:clear-outlined"} style={{ fontSize: 20, verticalAlign: '-0.125em' }} />}
                                    size={"large"}
                                >
                                    <span style={{ marginLeft: '8px' }}  >Limpiar</span>
                                </Button>
                            </Form.Item>
                        </Grid>
                    </Grid>
                </Form>
            </Spin>
        </>
    );
};


export default Filtros;


{/* <Grid item xs={12}> */}
    {/* <CardAntd
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
    > */}
        {/* <Form
            name="Filtros"
            size="small"
            labelCol={{ flex: '40px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            onFinish={onFinish}
        > */}

            // <Grid container spacing={1}>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="staAudito" label="Estatus" >
            //             <Select
            //                 key={Uid(1)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione estatus"
            //                 options={noEvaluado}
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="id_zona" label="Zona" >
            //             <Select
            //                 key={Uid(2)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione zona"
            //                 options={zona}
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="id_estado" label="Estado">
            //             <Select
            //                 key={Uid(3)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione estado"
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //                 options={estado}
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="id_csa_territorio" label="CSA">
            //             <Select
            //                 key={Uid(4)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione csa/territorio"
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //                 options={csa}
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="id_marca" label="Marca">
            //             <Select
            //                 key={Uid(5)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione marca"
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //                 options={marca}
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="id_representacion" label="Tipo">
            //             <Select
            //                 key={Uid(6)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione tipo"
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //                 options={tipo}
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="id_grupo" label="Grupo">
            //             <Select
            //                 key={Uid(7)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione grupo"
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //                 options={grupo}
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item name="id_distribuidor" label="Distribuidor">
            //             <Select
            //                 key={Uid(8)}
            //                 allowClear
            //                 mode="multiple"
            //                 placeholder="Por favor seleccione distribuidor"
            //                 filterOption={(input, option) =>
            //                     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            //                 }
            //                 options={distribuidor}
            //             />
            //         </Form.Item>
            //     </Grid>
            //     <Grid item xs={xs} sm={sm} md={md}>
            //         <Form.Item>
            //             <Button
            //                 loading={loading}
            //                 block={true}
            //                 style={{
            //                     backgroundColor: themeGral.header_colorIconMenu,
            //                     color: 'white',
            //                     position: "absolute",
            //                     align: 'center',
            //                     right: -5,
            //                     top: -10,
            //                 }}
            //                 htmlType="submit"
            //                 shape="round"
            //                 icon={<Icon icon={"line-md:search"} style={{ fontSize: 20, verticalAlign: '-0.125em' }} />}
            //                 size={"large"}
            //             >
            //                 <span style={{ marginLeft: '8px' }}  >Consultar</span>
            //             </Button>
            //         </Form.Item>
            //     </Grid>
            // </Grid>
        // </Form>
    // </CardAntd>
// </Grid>