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

import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

import BadgeMUIImg from '../../../components/Global/BadgeComponent'


import { Image, Tooltip, } from 'antd';

const CardInfo = (props) => {
    const { onviewFicha, dataItem, onviewGal, modalHist, onViewMaps, fontSize = 25 } = props

    const themeContext = useContext(ThemeContext);
    const { themeGral,colorBadge } = themeContext;

    // const onviewFicha = async (code) => {
    //     window.open('https://appweb.cesvimexico.com.mx/LevInfoCesvi/assets/ScripWeb/reportPDF/PDFEvaluacionBAJAJ.php?code_acces=' + code, '_blank');
    // }


    return (
        <Card sx={{ borderRadius: 10, width: '100%', maxWidth: '100%' }}>
            <CardHeader
                sx={{ borderRadius: 0, mb: -2, border: 0, width: '100%', mt: -2 }}
                // avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"> R </Avatar> }
                // dataItem.noAudito
                action={
                    <Tooltip title="Historial de auditorías">
                        <IconButton
                            onClick={() => modalHist(dataItem.url_code)}
                            size="medium"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: 'auto', alignSelf: 'flex-start', mt: -0.5, mb: -1, mr: -2 }}
                        >
                            {/* <Icon icon={"fluent:document-text-clock-20-regular"}
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize + 3,
                                    // marginLeft: "5px",
                                    color: themeGral.header_colorIconMenu
                                }}
                            /> */}

                            <BadgeMUIImg
                                sizeIcon={themeGral.table_sizeIcon}
                                icon={"fluent:document-text-clock-20-regular"}
                                badgeContent={dataItem.noAudito }
                                max={9999}
                                colorIcon={themeGral.header_colorIconMenu}
                                colorBadge={themeGral.header_colorIconMenu}
                            />
                        </IconButton>
                    </Tooltip>
                }
                title={<Typography fontWeight="md" textColor="success.plainColor" level="h4" >{dataItem.distribuidor}</Typography>}
                subheader={dataItem.date_str} //"September 14, 2016"
            />

            {/* <CardContent> */}
            {/* <Grid container spacing={1}> */}
            {/* <Grid item xs={10}>
                        <Typography fontWeight="md" textColor="success.plainColor" level="title-lg">{dataItem.distribuidor}</Typography>
                    </Grid> */}
            {/* <Grid item xs={2}> */}
            {/* <Typography
                            onClick={() => modalHist(dataItem.url_code)}
                            color="success"
                            level="body-lg"
                            noWrap={false}
                            variant="soft"
                            sx={{ borderRadius: 10 }}
                        > */}
            {/* {"Auditorias :  " + dataItem.noAudito} */}
            {/* {"Cumplimiento "} */}
            {/* {
                                dataItem.socre >= dataItem.limite_3 ? <span style={{ color: '#887f83', margin: '-1em 0 0 5px ' }}> Platino</span> :
                                    dataItem.socre >= dataItem.limite_2 ? <span style={{ color: '#f8ca47', margin: '-1em 0 0 5px ' }}>  Oro</span> :
                                        dataItem.socre >= dataItem.limite_1 ? <span style={{ color: '#cccccc', margin: '-1em 0 0 5px ' }}>  Plata</span> :
                                            dataItem.socre < dataItem.limite_1 ? <span style={{ color: '#048B96', margin: '-1em 0 0 5px ' }}>  Básico</span> :
                                                dataItem.socre != 'No evaluado' ? <span style={{ color: '#ccc', margin: '-1em 0 0 5px ' }}> No evaluado</span> :
                                                    <span style={{ margin: '-1em 0 0 5px ' }}> {dataItem.socre}</span>
                            } */}
            {/* </Typography> */}
            {/* </Grid> */}
            {/* </Grid> */}
            {/* </CardContent> */}

            <Card
                orientation="horizontal"
                size="sm"
                sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: -0, border: 0, width: dataItem.socre && '102.7%', }}
            >
                <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 160, borderRadius: 10, }}>
                        <Image
                            visible={0}
                            width={'100%'}
                            src={dataItem.path_img ? dataItem.path_img : "error"}
                            fallback={process.env.REACT_APP_fallbackImg}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent sx={{ px: 1, }} >
                    <span><strong>Dirección: </strong>{dataItem.full_dir}</span>
                    <span><strong>Teléfono: </strong>{dataItem.tel_1}</span>
                    <span><strong>Grupo: </strong>{dataItem.grupo}</span>
                    <span><strong>Razón social: </strong>{dataItem.razon_social}</span>
                    <span><strong>Tipo: </strong>{dataItem.representacion}</span>
                    <span><strong>Clave: </strong>{dataItem.clave}</span>
                    {/* <span><strong>Fecha de última auditoría: </strong>{dataItem.date_ls}</span> */}
                </CardContent>
                {dataItem.socre &&
                    <CardOverflow
                        // onClick={() => modalHist(dataItem.url_code)}
                        variant="soft"
                        color={dataItem.socre >= 60 ? "success" : "danger"}  //success warning primary danger neutral
                        sx={{
                            px: 0,
                            writingMode: 'vertical-rl',
                            justifyContent: 'center',
                            fontSize: '35px',
                            fontWeight: 'xl',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            borderLeft: '0px solid',
                            borderColor: 'divider',
                            // cursor: "pointer",
                        }}
                    >
                        {/* {"Auditorias :  " + dataItem.socre+" %" } */}
                        {dataItem.socre + " %"}
                    </CardOverflow>
                }
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
                    Ficha técnica
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
                    Mapa
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                    level="title-sm"
                    startDecorator={
                        <IconButton
                            onClick={() => onviewGal(dataItem.url_code, 'foto')}
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
                    Galería
                </Typography>
                <Divider orientation="vertical" />
                <Typography
                    level="title-sm"
                    startDecorator={
                        <IconButton
                            onClick={() => onviewGal(dataItem.url_code, 'video')}
                            size="sm"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: 'auto', alignSelf: 'flex-start' }}
                        >
                            <Icon icon={"clarity:video-gallery-line"}
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
                    Videos
                </Typography>
            </CardOverflow>
        </Card>
    );
}

export default CardInfo;