import React, { useContext } from "react";

//component Global
import { ModdalANTD } from "../../../components/Global/ModalComponent";

//MIU
import Grid from "@mui/material/Grid";

//ANT
import {  Col, Row,  } from 'antd';

import Map from "../../../components/Global/Mapleaflet";


const ModalMaps = (props) => {
    const { visibleMaps, setVisibleMaps, create, latitud, longitud, zoom, arrayMarkInfo, arrayMarkProv } = props


    return (
        <ModdalANTD
            visible={visibleMaps}
            title={" "}
            footer={false}
            onCancel={() => setVisibleMaps(false)}
            width={"85%"}
            centered
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Row>

                        <Col span={1}> <div style={{ background: '#887f83', padding: '10px 10px', margin: '1erm' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>    </Grid>
                            </Grid>
                        </div>
                        </Col><Col span={2}> <div style={{ padding: '0px 10px' }} >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>     Platino      </Grid>
                            </Grid>
                        </div>
                        </Col>
                        <Col span={1}> <div style={{ background: '#f8ca47', padding: '10px 10px', margin: '1erm' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>    </Grid>
                            </Grid>
                        </div>
                        </Col><Col span={2}> <div style={{ padding: '0px 10px' }} >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>     Oro     </Grid>
                            </Grid>
                        </div>
                        </Col>
                        <Col span={1}> <div style={{ background: '#cccccc', padding: '10px 10px', margin: '1erm' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>    </Grid>
                            </Grid>
                        </div>
                        </Col><Col span={2}> <div style={{ padding: '0px 10px' }} >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>     Plata      </Grid>
                            </Grid>
                        </div>
                        </Col>

                        <Col span={1}> <div style={{ background: '#048B96', padding: '10px 10px', margin: '1erm' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>    </Grid>
                            </Grid>
                        </div>
                        </Col><Col span={2}> <div style={{ padding: '0px 10px' }} >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>     Básico      </Grid>
                            </Grid>
                        </div>
                        </Col>

                        <Col span={1}> <div style={{ background: '#fe0000', padding: '10px 10px', margin: '1erm' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>    </Grid>
                            </Grid>
                        </div>
                        </Col><Col span={3}> <div style={{ padding: '0px 10px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>     No evaluados      </Grid>
                            </Grid>
                        </div>
                        </Col>
                        <Col span={1}> <div style={{ background: '#001549', padding: '10px 10px', margin: '1erm' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>    </Grid>
                            </Grid>
                        </div>
                        </Col><Col span={3}> <div style={{ padding: '0px 10px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    Proveedores
                                </Grid>
                            </Grid>
                        </div>
                        </Col>


                        <br /><br />
                        <Map
                            render={create}
                            olat={latitud}
                            olng={longitud}
                            ozoom={zoom}
                            arrayMarkas={arrayMarkInfo}
                            arrayMarkProv={arrayMarkProv}
                        />
                    </Row>

                </Grid>
            </Grid>
        </ModdalANTD>
    );

}

export default ModalMaps;