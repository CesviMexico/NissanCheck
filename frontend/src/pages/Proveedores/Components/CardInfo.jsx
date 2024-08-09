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
import CardHeader from '@mui/material/CardHeader';

import BadgeMUIImg from '../../../components/Global/BadgeComponent'

import { Uid } from '../../../components/Global/funciones'


import { Image, Tooltip, } from 'antd';

const CardInfo = (props) => {
    const { onviewFicha, dataItem, onviewGal, modalHist, onViewMaps, fontSize = 25, index } = props

    const themeContext = useContext(ThemeContext);
    const { themeGral } = themeContext;   

    return (
        <Card sx={{ borderRadius: 10, width: '100%', maxWidth: '100%' }}  key={Uid(index+1)} >
            <CardHeader
                sx={{ borderRadius: 0, mb: -2, border: 0, width: '100%', mt: -2 }}
                action={
                    <Tooltip title="Historial de auditorías" key={Uid(index+2)}>
                        <IconButton
                        key={Uid(index+3)}
                            onClick={() => modalHist(dataItem.url_code)}
                            size="medium"
                            variant="plain"
                            color="neutral"
                            sx={{ ml: 'auto', alignSelf: 'flex-start', mt: -0.5, mb: -1, mr: -2 }}
                        >  
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
                subheader={dataItem.date_str}
            />

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
                </CardContent>
                {dataItem.socre &&
                    <CardOverflow
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
                        }}
                    >
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
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize,
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
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize,
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
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize,
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
                                style={{
                                    cursor: "pointer",
                                    fontSize: fontSize,
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