import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";
import { Icon } from '@iconify/react';

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/joy/LinearProgress';

//ANT
import { Card as CardAntd, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import ComponentCard, { CongratCard } from './Components/ComponentCard'
import ComponenLista from './Components/ComponentLista'
import ComponetTable from './Components/ComponetTable'
import InfoTaller from './Components/InfoTaller'
import { GraficaRadar } from './Components/GraficasChart';


const ComponentDistribuidor = (props) => {

    const { loading, setloading, data , resultSize=200} = props


    const themeContext = useContext(ThemeContext);
    const { keycloak } = useKeycloak();
    const { msErrorApi, logoutOptions, themeGral } = themeContext;

    // const [data, setData] = useState(
    //     {
    //         title: 'INFORME DEL ESTATUS QUE GUARDA EL DISTRIBUIDOR EN MATERIA DE HERRAMIENTAS Y EQUIPOS ESPECIALES',
    //         dataTaller: {
    //             clave: 4,
    //             clave_marcacion: null,
    //             clave_matriz: 4,
    //             clave_suc: null,
    //             colonia: "Cabeza de Juárez",
    //             cp: 9227,
    //             csa_territorio: "ORIENTE - TLÁHUAC",
    //             cumplimiento: "PLATINO",
    //             date_ls: "25/04/2024",
    //             direccion: "Calz. Ignacio Zaragoza No. 1927",
    //             distribuidor: "IMPERIO OTE",
    //             estado: "CDMX",
    //             full_dir: "Calz. Ignacio Zaragoza No. 1927, Colonia: Cabeza de Juárez, C.P.: 9227 , Iztapalapa , CDMX",
    //             grupo: "IMPERIO",
    //             id_csa_territorio: 58,
    //             id_distribuidor: 91,
    //             id_estado: 9,
    //             id_grupo: 30,
    //             id_marca: 1,
    //             id_representacion: 1,
    //             id_taller: 1,
    //             id_zona: 1,
    //             lada: "55",
    //             latitude: "19.28495",
    //             limite_1: 40,
    //             limite_2: 60,
    //             limite_3: 80,
    //             longitud: "-99.03358",
    //             marca: "NISSAN",
    //             municipio: "Iztapalapa",
    //             noAudito: 150,
    //             path_img: "https://appweb.cesvimexico.com.mx/LevInfoCesvi/assets/EvidenciaNissan/20240722111121/PR_1_6630532973712268545.jpg",
    //             razon_social: "IMPERIO AUTOMOTRIZ DE ORIENTE, S.A. DE C.V.",
    //             representacion: "MATRIZ",
    //             rfc: null,
    //             socre: 1,
    //             tel_1: "5745-1380",
    //             tel_2: null,
    //             url_code: "1714073566_D7UGpes4OkQWRAY6lutycrC0b2jPnmqZSMoJvKfhINVLBHgX9F",
    //             value: "IMPERIO AUTOMOTRIZ DE ORIENTE, S.A. DE C.V.",
    //             zona: "CENTRO",
    //         },
    //         dataGrafica: {
    //             labels: ['Carrocería A', 'Carrocería', 'Emisiones', 'Diferencial', 'Generale', 'Mantenimiento', 'Frenos', 'Herramienta', 'HES Hibrido', 'Kit Arneses', 'Kit CVT', 'Mantenimiento', 'Motor', 'Dirección', 'Enfriamiento', 'Suspensión', 'Transmisión Automática', 'Transmisión General', 'Transmisión Manual'],
    //             datasets: [{
    //                 label: '',
    //                 data: [67, 100, 63, 100, 60, 44, 100, 83, 88, 100, 92, 100, 90, 100, 100, 100, 82, 74, 100,],
    //                 fill: true,
    //                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 pointBackgroundColor: 'rgb(255, 99, 132)',
    //                 pointBorderColor: '#fff',
    //                 pointHoverBackgroundColor: '#fff',
    //                 pointHoverBorderColor: 'rgb(255, 99, 132)'
    //             }]
    //         },
    //         dataTabla: {
    //             columns: [
    //                 {
    //                     title: 'Sistema',
    //                     dataIndex: 'name',
    //                 },
    //                 {
    //                     title: 'Herramientas y equipos',
    //                     children: [
    //                         {
    //                             title: 'Requerido',
    //                             dataIndex: 'borrow',
    //                             align: 'center',
    //                         },
    //                         {
    //                             title: 'Disponible y funcional',
    //                             dataIndex: 'repayment',
    //                             align: 'center',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     title: 'Cumplimiento',
    //                     dataIndex: 'cumplimientoT',
    //                     align: 'center',
    //                 },
    //             ],
    //             data: [
    //                 { key: 1, name: "Carrocería", borrow: 3, repayment: 2, cumplimiento: "0.67", cumplimientoT: "67%" },
    //                 { key: 2, name: "Carrocería", borrow: 6, repayment: 6, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 3, name: "Sistema de control de emisiones", borrow: 8, repayment: 5, cumplimiento: "0.63", cumplimientoT: "63%" },
    //                 { key: 4, name: "Diferencial", borrow: 9, repayment: 9, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 5, name: "Equipos generales de taller", borrow: 5, repayment: 3, cumplimiento: "0.6", cumplimientoT: "60%" },
    //                 { key: 6, name: "Equipos para diagnóstico y mantenimiento", borrow: 9, repayment: 4, cumplimiento: "0.44", cumplimientoT: "44%" },
    //                 { key: 7, name: "Frenos", borrow: 9, repayment: 9, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 8, name: "Herramientas Especiales Comerciales Esenciales", borrow: 6, repayment: 5, cumplimiento: "0.83", cumplimientoT: "83%" },
    //                 { key: 9, name: "HES para Vehículos Eléctricos / e POWER / Hibrido", borrow: 25, repayment: 22, cumplimiento: "0.88", cumplimientoT: "88%" },
    //                 { key: 10, name: "Kit de Reparación de Arneses", borrow: 29, repayment: 29, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 11, name: "Kit transmisión CVT", borrow: 13, repayment: 12, cumplimiento: "0.92", cumplimientoT: "92%" },
    //                 { key: 12, name: "Mantenimiento", borrow: 7, repayment: 7, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 13, name: "Motor", borrow: 58, repayment: 52, cumplimiento: "0.9", cumplimientoT: "90%" },
    //                 { key: 14, name: "Sistema de Dirección", borrow: 7, repayment: 7, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 15, name: "Sistema de enfriamiento", borrow: 6, repayment: 6, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 16, name: "Suspensión", borrow: 8, repayment: 8, cumplimiento: "1", cumplimientoT: "100%" },
    //                 { key: 17, name: "Transmisión Automática", borrow: 11, repayment: 9, cumplimiento: "0.82", cumplimientoT: "82%" },
    //                 { key: 18, name: "Transmisión General", borrow: 46, repayment: 34, cumplimiento: "0.74", cumplimientoT: "74%" },
    //                 { key: 19, name: "Transmisión Manual", borrow: 30, repayment: 30, cumplimiento: "1", cumplimientoT: "100%" },

    //             ]

    //         },
    //         dataFaltantes: [
    //             { item1: "Adaptador de torsión", item2: "KV40145816" },
    //             { item1: "Extractor de la junta de rótula", item2: "KV32102700" },
    //             { item1: "Compresómetro diésel", item2: "KV101056S0" },
    //             { item1: "Dado especial para remover bujías", item2: "KV40139386" },
    //             { item1: "Juego de galgas de Espesores", item2: "KV40148761" },
    //             { item1: "Perno Guía de Fijación para Diesel", item2: "KV40150364" },
    //             { item1: "Compresor de resorte de válvula", item2: "KV40163360" },
    //             { item1: "Medidor de ángulo de giro", item2: "KV40186530" },
    //             { item1: "Protector sello de aceite izquierdo", item2: "KV40142961" },
    //             { item1: "Adaptador de precarga", item2: "KV38107700" },
    //             { item1: "Soporte para transmisión", item2: "KV40147002" },
    //             { item1: "Kit de desmontaje de engranajes y cojinetes", item2: "KV40139856" },
    //             { item1: "Opresor de flecha principal y tren de engranes", item2: "KV31100401" },
    //             { item1: "Extractor engrane frontal", item2: "KV38100300" }

    //         ],
    //         dataDescompuestos: [
    //             { item1: "Boroscopio Esencial para toma de VIN y No. Motor", item2: "KV40150190" },
    //             { item1: "Manómetro de Presión del Líquido de Frenos", item2: "KV40180020" },
    //             { item1: "Balanceadora de llantas", item2: "KV401X9020" }
    //         ],
    //         dataCumplimiento: [
    //             { value: 83, monto: "83 %", title: "Cumplimiento", titleValue: "Desempeño", icon: "unjs:destr", }
    //         ],
    //         dataTop: [
    //             { value: 70, monto: "14/87", title: "Nacional", titleValue: "Nacional", icon: "circle-flags:mx", },
    //             { value: 80, monto: "6/21", title: "Zona", titleValue: "Norte", icon: "flat-color-icons:puzzle", },
    //             { value: 50, monto: "1/2", title: "Estado", titleValue: "San Luis Potosí", icon: "flat-color-icons:globe", },
    //             { value: 30, monto: "2/5", title: "Grupo", titleValue: "Torres Corzo", icon: "flat-color-icons:conference-call", },
    //         ],

    //     }
    // )

    const gridStyle50 = { width: '50%', }
    const gridStyle25 = { width: '50%', textAlign: 'center', }
    const gridStyle75 = { width: '50%', textAlign: 'center', }
    const gridStyle100 = { width: '100%' }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        // maxWidth: '150px',
        // maxHeight: '150px',
    });


    return (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>
                <LinearProgress
                    color="primary"
                    determinate={!loading}
                    size="sm"
                    variant="plain"
                />
                {/* {data.title && */}
                <Grid container spacing={1}>
                    {data.title ?

                        <Grid item xs={12}>
                            <CardAntd style={{ width: '99%', }} bordered={false}
                                title={
                                    <Grid container
                                        direction="row"
                                        justifyContent="space-around"
                                        alignItems="center"
                                    >
                                        <Grid item >
                                            <Img alt="complex"
                                                style={{
                                                    width: '75px',
                                                    height: '60px',
                                                }}
                                                src={"https://www.nissantollocan.com.mx/assets/logos/transparent/nissan-gv.png"}
                                            />
                                        </Grid>
                                        <Grid item>{data.title && data.title}</Grid>
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
                                <CardAntd.Grid hoverable={false} style={gridStyle75} >
                                    <Grid container spacing={1}>

                                        <Grid item xs={12}>
                                            <InfoTaller
                                                data={data.dataTaller && data.dataTaller[0]}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <ComponetTable
                                                columns={data.dataTabla && data.dataTabla.columns}
                                                data={data.dataTabla && data.dataTabla.data}
                                            />
                                        </Grid>

                                    </Grid>
                                </CardAntd.Grid>
                                <CardAntd.Grid hoverable={false} style={gridStyle25}>


                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>

                                            {data.dataCumplimiento && data.dataCumplimiento.map((item, index) => (
                                                <Grid item xs={12} key={index * 2}>
                                                    <ComponentCard value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                                                </Grid>
                                            ))}

                                            {data.dataTop && data.dataTop.map((item, index) => (
                                                <Grid item xs={12} sm={9} md={6} key={index * 3}>
                                                    <ComponentCard value={item.value} monto={item.monto} title={item.title} titleValue={item.titleValue} icon={item.icon} />
                                                </Grid>
                                            ))}

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={12}>
                                        <GraficaRadar
                                            labels={data.dataGrafica && data.dataGrafica.labels}
                                            datasets={data.dataGrafica && data.dataGrafica.datasets}
                                        />
                                    </Grid>

                                </CardAntd.Grid>

                                <CardAntd.Grid hoverable={false} style={gridStyle50}>
                                    <ComponenLista
                                        color={"#f44336"}
                                        icon={'material-symbols-light:tools-power-drill-outline-sharp'}
                                        title='Lista de herramientas y equipos especiales faltantes'
                                        data={data.dataFaltantes && data.dataFaltantes}
                                    />
                                </CardAntd.Grid>
                                <CardAntd.Grid hoverable={false} style={gridStyle50}>
                                    <ComponenLista
                                        color={"#ff5722"}
                                        icon={'arcticons:apktool-m'}
                                        title='Lista de herramientas y equipos especiales descompuestos'
                                        data={data.dataDescompuestos && data.dataDescompuestos}
                                    />
                                </CardAntd.Grid>

                            </CardAntd>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            <Result
                                title="El taller no cuenta con auditorio."
                                icon={<Icon icon={"flat-color-icons:info"} style={{ fontSize: resultSize, color: themeGral.header_colorIconMenu }} />}                           
                            />
                        </Grid>
                    }
                </Grid>
                {/* } */}
            </Box>
        </>
    );
};


export default ComponentDistribuidor;
