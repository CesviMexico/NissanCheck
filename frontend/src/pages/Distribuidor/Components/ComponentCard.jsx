import React, { useState, useContext, useEffect } from "react";
import { Icon } from '@iconify/react';
import ThemeContext from "../../../context/ThemContext";

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';


const ComponentCard = (props) => {
    const { value = 20, monto = '$ 432.6M', title = 'Gross profit', titleValue = 'profit', icon = 'f7:doc-richtext' } = props
    
    const themeContext = useContext(ThemeContext);
    const { themeGral } = themeContext;

    return (
        <Card
            variant="outlined"  // outlined  plain  soft solid
            color="primary"  // primary  neutral  success  warning  danger  info  inverted
            invertedColors
            size="xl" // sm md lg xl
            sx={{ borderRadius: 10 }}
        >
            <Typography level="title-md">{title}</Typography>
            <CardContent orientation="horizontal">
                <CircularProgress
                    size="md"
                    determinate
                    value={value}
                    style={{ marginLeft: "10px", top: -2 }}
                >
                    <Icon icon={icon} style={{ fontSize: 20, color: themeGral.header_colorIconMenu }} />
                </CircularProgress>
                <CardContent>
                    <Typography level="body-sm">{titleValue}</Typography>
                    <Typography level="h3">{monto}</Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
}

export default ComponentCard;