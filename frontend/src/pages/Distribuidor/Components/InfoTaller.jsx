import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import CardOverflow from '@mui/joy/CardOverflow';

import { Image } from 'antd';


const InfoTaller = (props) => {

    const {
        data = {
            path_img: '',
            distribuidor: '',
            full_dir: '',
            marca: '',
            representacion: '',
        }
    } = props


    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                overflow: { xs: 'auto', sm: 'initial' },
            }}
        >
            <Box
                sx={{
                    // position: 'absolute',
                    // display: 'block',
                    // width: '1px',
                    // bgcolor: 'warning.300',
                    // left: '500px',
                    // top: '-24px',
                    // bottom: '-24px',
                    // '&::before': {
                    //     top: '4px',
                    //     content: '"vertical"',
                    //     display: 'block',
                    //     position: 'absolute',
                    //     right: '0.5rem',
                    //     color: 'text.tertiary',
                    //     fontSize: 'sm',
                    //     fontWeight: 'lg',
                    // },
                    // '&::after': {
                    //     top: '4px',
                    //     content: '"horizontal"',
                    //     display: 'block',
                    //     position: 'absolute',
                    //     left: '0.5rem',
                    //     color: 'text.tertiary',
                    //     fontSize: 'sm',
                    //     fontWeight: 'lg',
                    // },
                }}
            />
            <Card
                orientation="horizontal"
                variant="outlined"  // outlined  plain  soft solid
                color="primary"  // primary  neutral  success  warning  danger  info  inverted
                invertedColors
                // sx={{ borderRadius: 10 }}

                sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    [`& > *`]: {
                        '--stack-point': '400px',
                        minWidth:
                            'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
                    },
                    // make the card resizable for demo
                    overflow: 'auto',
                    resize: 'horizontal',
                }}
            >
                <CardOverflow>
                    {/* <AspectRatio ratio="1" sx={{ width: 160, borderRadius: 10, }}> */}
                    <AspectRatio flex ratio="1" maxHeight={190} sx={{ minWidth: 190 }}>
                        <Image
                            visible={0}
                            width={'100%'}
                            src={data.path_img}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography fontSize="xl" fontWeight="xl">
                        {data.distribuidor}
                    </Typography>
                    <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                        {data.full_dir}
                    </Typography>
                    <Sheet
                        sx={{
                            bgcolor: 'background.level1',
                            borderRadius: 'sm',
                            p: 1.5,
                            my: 1.5,
                            display: 'flex',
                            gap: 2,
                            '& > div': { flex: 1 },
                        }}
                    >
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Distribuidor
                            </Typography>
                            <Typography fontWeight="lg"> {data.distribuidor}</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Marca
                            </Typography>
                            <Typography fontWeight="lg"> {data.marca}</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Tipo
                            </Typography>
                            <Typography fontWeight="lg"> {data.representacion}</Typography>
                        </div>
                    </Sheet>
                    {/* <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                        <Button variant="outlined" color="neutral">
                            Chat
                        </Button>
                        <Button variant="solid" color="primary">
                            Follow
                        </Button>
                    </Box> */}
                </CardContent>
            </Card>
        </Box>
    );
}

export default InfoTaller;