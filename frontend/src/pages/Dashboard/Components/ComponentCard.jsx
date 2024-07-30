import React, { useContext } from "react";
import { Icon } from '@iconify/react';
import ThemeContext from "../../../context/ThemContext";

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Button from '@mui/joy/Button';

import { Col, Row, Statistic } from 'antd';



const ComponentCard = (props) => {
    const { value = 20, monto = '', title = '', icon = '', onClick , detalle} = props

    const themeContext = useContext(ThemeContext);
    const { themeGral } = themeContext;

    return (
        <Card
            variant="outlined"  // outlined  plain  soft solid
            color="primary"  // primary  neutral  success  warning  danger  info  inverted
            invertedColors
            size="sm" // sm md lg xl
            sx={{ borderRadius: 10 }}
        >
            <CardOverflow>
                <Typography level="title-lg">{title}</Typography>
            </CardOverflow>

            <CardContent orientation="horizontal">
                <CircularProgress
                    size="lg"
                    determinate
                    value={value}
                    style={{ marginLeft: "20px", top: -10 }}
                    color="primary"
                >
                    <Icon icon={icon} style={{ fontSize: 35, color: themeGral.header_colorIconMenu }} />
                </CircularProgress>
                <CardContent>
                    {/* <Typography level="body-sm">{titleValue}</Typography> */}
                    <Button
                        variant="plain"
                        color="primary"
                        sx={{
                            '--variant-borderWidth': '2px',
                            borderRadius: 20,
                            borderColor: 'primary.500',
                            mx: 'auto',
                        }}
                        onClick={() => onClick(detalle)}                        
                    >
                        <Typography level="h2">{monto}</Typography>
                    </Button>
                </CardContent>
            </CardContent>
        </Card>
    );
}

export default ComponentCard;