import React, { useContext } from "react";
import ThemeContext from "../../../context/ThemContext";
import { Icon } from '@iconify/react';

//card list
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { AspectRatio } from '@mui/joy';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/Grid";

import { Image } from 'antd';


const CardInfo = (props) => {
    const { dataItem, onviewGal, modalHist, onViewMaps,fontSize=25  } = props

    const themeContext = useContext(ThemeContext);
    const { themeGral } = themeContext;

    const onviewFicha = async (code) => {
        window.open('https://appweb.cesvimexico.com.mx/LevInfoCesvi/assets/ScripWeb/reportPDF/PDFEvaluacionBAJAJ.php?code_acces=' + code, '_blank');
    }


    return (
        <Card sx={{ borderRadius: 10, width: '100%', maxWidth: '100%' }}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Typography fontWeight="md" textColor="success.plainColor" level="title-lg">{dataItem.razon_social}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography
                            color="success"
                            level="body-sm"
                            noWrap={false}
                            variant="soft"
                            sx={{ borderRadius: 10 }}
                        > {"Cumplimiento "}
                            {
                                dataItem.socre >= dataItem.limite_3 ? <span style={{ color: '#887f83', margin: '-1em 0 0 5px ' }}> Platino</span> :
                                    dataItem.socre >= dataItem.limite_2 ? <span style={{ color: '#f8ca47', margin: '-1em 0 0 5px ' }}>  Oro</span> :
                                        dataItem.socre >= dataItem.limite_1 ? <span style={{ color: '#cccccc', margin: '-1em 0 0 5px ' }}>  Plata</span> :
                                            dataItem.socre < dataItem.limite_1 ? <span style={{ color: '#048B96', margin: '-1em 0 0 5px ' }}>  Básico</span> :
                                                dataItem.socre != 'No evaluado' ? <span style={{ color: '#ccc', margin: '-1em 0 0 5px ' }}> No evaluado</span> :
                                                    <span style={{ margin: '-1em 0 0 5px ' }}> {dataItem.socre}</span>
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>

            <Card
                orientation="horizontal"
                size="sm"
                sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 0, border: 0, width: '101.7%', }}
            >
                <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 160, borderRadius: 10, }}>
                        <Image
                            visible={0}
                            width={'100%'}
                            src={"https://appweb.cesvimexico.com.mx/LevInfoCesvi/assets/evidencia/" + dataItem.path_img}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent sx={{ px: 1, }} >
                    <span><strong>Dirección: </strong>{dataItem.full_dir}</span>
                    <span><strong>Teléfono: </strong>{dataItem.tel_1}</span>
                    <span><strong>Grupo: </strong>{dataItem.grupo}</span>
                    <span><strong>Tipo: </strong>{dataItem.representacion}</span>
                    <span><strong>Clave: </strong>{dataItem.clave}</span>
                    <span><strong>Fecha de última auditoría: </strong>{dataItem.date_ls}</span>
                </CardContent>
                <CardOverflow
                    onClick={() => modalHist(dataItem.url_code)}
                    variant="soft"
                    color="primary"
                    sx={{
                        px: 0.50,
                        writingMode: 'vertical-rl',
                        justifyContent: 'center',
                        fontSize: 'xs',
                        fontWeight: 'xl',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        borderLeft: '0px solid',
                        borderColor: 'divider',
                        cursor: "pointer",
                    }}
                >
                    {"Auditorias :  " + dataItem.noAudito}
                </CardOverflow>

            </Card>

            <CardOverflow
                variant="soft"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    justifyContent: 'space-around',
                    py: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >

                <Typography
                    level="title-sm"
                    startDecorator={
                        <IconButton
                            onClick={() => onviewFicha(dataItem.url_code)}
                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: 'auto', alignSelf: 'flex-start' }}
                        >
                            <Icon icon={"f7:doc-richtext"}
                                // key={key}
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize,
                                    // marginLeft: "5px",
                                    color: themeGral.header_colorIconMenu
                                }}
                            />
                        </IconButton>
                    }
                >
                    FichaTecnica
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                    level="title-sm"
                    startDecorator={
                        <IconButton
                            onClick={() => onViewMaps(dataItem)}

                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: 'auto', alignSelf: 'flex-start' }}
                        >
                            <Icon icon={"gis:map-route"}
                                // key={key}
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize,
                                    // marginLeft: "5px",
                                    color: themeGral.header_colorIconMenu
                                }}
                            />
                        </IconButton>
                    }
                >
                    Ver Mapa
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                    level="title-sm"
                    startDecorator={
                        <IconButton
                            onClick={() => onviewGal(dataItem.url_code)}
                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: 'auto', alignSelf: 'flex-start' }}
                        >
                            <Icon icon={"clarity:image-gallery-line"}
                                // key={key}
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize,
                                    // marginLeft: "5px",
                                    color: themeGral.header_colorIconMenu
                                }}
                            />
                        </IconButton>
                    }>
                    Galeria
                </Typography>
            </CardOverflow>
        </Card>
    );
}

export default CardInfo;