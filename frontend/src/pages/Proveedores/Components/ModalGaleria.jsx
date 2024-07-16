import React, { useContext } from "react";
import {  Image } from 'antd';

const ModalGaleria = (props) => {
    const {visible, setVisible , listImage} = props

    return (
        <div style={{ display: 'none', }}>
            <Image.PreviewGroup
                preview={{
                    visible: visible,
                    onVisibleChange: (vis) => setVisible(vis),
                }}
            >
                {listImage.map((images, index) =>
                    <Image
                        key={(index)}
                        //with="20"
                        height={100}
                        style={{ padding: 5, }}
                        src={"https://appweb.cesvimexico.com.mx/LevInfoCesvi/assets/evidencia/" + images.id_evaluacion_fb + "/" + images.evidencia} />
                )}
            </Image.PreviewGroup>
        </div>
    );
}

export default ModalGaleria;