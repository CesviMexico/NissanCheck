import React, { useContext } from "react";
import { Image } from 'antd';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const ModalGaleriaFotos = (props) => {
    const { visible, setVisible, listImage } = props
    const listImageF = listImage.filter(item => item.tipo == "foto");
    return (
        <div style={{ display: 'none', }}>
            <Image.PreviewGroup
                preview={{
                    visible: visible,
                    onVisibleChange: (vis) => setVisible(vis),
                }}
            >
                {listImageF.map((images, index) =>
                    <Image
                        key={(index)}
                        //with="20"
                        height={100}
                        style={{ padding: 5, }}
                        src={images.evidencia} />
                )}
            </Image.PreviewGroup>
        </div>
    );
}

export const ModalGaleriaVideo = (props) => {
    const { visible, setVisible, listImage } = props
    const listImageF = listImage.filter(item => item.tipo == "video");
    let ban = 0
    return (
        <div style={{ display: 'none' }}>
            <Image.PreviewGroup
                preview={{
                    visible: visible,
                    onVisibleChange: (vis) => setVisible(vis),
                    imageRender: () => (
                        <ImageList
                            sx={{ width: '88%', height: '88%' }}
                            variant="standard" gap={8}
                        >
                            {/* <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div">December</ListSubheader>
                            </ImageListItem> */}

                            {listImageF.map((item, index) => {

                                const cols = (ban === 2) ? 2 : 1;
                                const rows = (ban === 2) ? 2 : 1;
                                ban = (ban === 2) ? 0 : ban + 1;

                                return (
                                    <ImageListItem key={item.evidencia} cols={cols} rows={rows}>
                                        <video width="100%" loop controls poster={item.evidencia}>
                                            <source src={item.evidencia} type="video/mp4" />
                                        </video>
                                        <ImageListItemBar
                                            title={item.pregunta}
                                            subtitle={item.respuesta}
                                            position="top"
                                        />
                                    </ImageListItem>
                                )
                            })}
                        </ImageList>
                    )
                }}
            />
        </div>
    );
}

export default ModalGaleriaFotos;