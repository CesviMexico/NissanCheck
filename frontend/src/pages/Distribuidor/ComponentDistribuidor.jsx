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

    const { loading, setloading, data, resultSize = 200 } = props


    const themeContext = useContext(ThemeContext);
    const { keycloak } = useKeycloak();
    const { msErrorApi, logoutOptions, themeGral } = themeContext;
    const gridStyle50 = { width: '50%', }
    const gridStyle25 = { width: '50%', textAlign: 'center', }
    const gridStyle75 = { width: '50%', textAlign: 'center', }
    const gridStyle100 = { width: '100%' }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
    });


    return (
        <>
            {/* <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}> */}
            <LinearProgress
                color="primary"
                determinate={!loading}
                size="sm"
                variant="plain"
            />
            <Grid container spacing={1}
                  sx={{  border: 0, mt: -4  }}
            >
                {data.title ?

                    <Grid item xs={12}>
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
                                            // src={"https://www.nissantollocan.com.mx/assets/logos/transparent/nissan-gv.png"}
                                            src={"https://appweb.cesvimexico.com.mx/NissanCenso/static/media/LogoNISSAN3.png"}

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
                        {!loading &&
                            <Result
                                title="El taller no cuenta con auditorio."
                                icon={<Icon icon={"flat-color-icons:info"} style={{ fontSize: resultSize, color: themeGral.header_colorIconMenu }} />}
                            />
                        }
                    </Grid>
                }
            </Grid>
            {/* </Box> */}
        </>
    );
};


export default ComponentDistribuidor;
