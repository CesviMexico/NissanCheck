import React, { useState, useContext, useEffect } from "react";
import { Icon } from '@iconify/react';
import ThemeContext from "../../../context/ThemContext";

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';


import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';



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
                    size="lg"
                    determinate
                    value={value}
                    style={{ marginLeft: "20px", top: -10 }}
                >
                    <Icon icon={icon} style={{ fontSize: 35, color: themeGral.header_colorIconMenu }} />
                </CircularProgress>
                <CardContent>
                    <Typography level="body-sm">{titleValue}</Typography>
                    <Typography level="h3">{monto}</Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
}


export const CongratCard = (props) => {
    return (
        <Card
            data-resizable
            sx={{
                textAlign: 'center',
                alignItems: 'center',
                width: 343,
                // to make the demo resizable
                overflow: 'auto',
                resize: 'horizontal',
                '--icon-size': '100px',
            }}
        >
            <CardOverflow variant="solid" color="warning">
                <AspectRatio
                    variant="outlined"
                    color="warning"
                    ratio="1"
                    sx={{
                        m: 'auto',
                        transform: 'translateY(50%)',
                        borderRadius: '50%',
                        width: 'var(--icon-size)',
                        boxShadow: 'sm',
                        bgcolor: 'background.surface',
                        position: 'relative',
                    }}
                >
                    <div>
                        <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} />
                    </div>
                </AspectRatio>
            </CardOverflow>
            <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
                🎊 Congrats Julia 🎊
            </Typography>
            <CardContent sx={{ maxWidth: '40ch' }}>
                You just gain one Cookhat for Salad cooking. Share your achievement with your
                friends.
            </CardContent>
            <CardActions
                orientation="vertical"
                buttonFlex={1}
                sx={{
                    '--Button-radius': '40px',
                    width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                }}
            >
                <Button variant="solid" color="warning">
                    Share
                </Button>
                <Button variant="plain" color="neutral">
                    Skip
                </Button>
            </CardActions>
        </Card>
    );
}

export default ComponentCard;