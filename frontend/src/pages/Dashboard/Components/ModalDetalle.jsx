import React, { useContext } from "react";

//component Global
import { ModdalANTD } from "../../../components/Global/ModalComponent";
import TablaANTD from "../../../components/Global/TablaComponent";
//MIU
import Grid from "@mui/material/Grid";

const ModalDetalle = (props) => {
    const {onviewFicha, visibleDetalle, setVisibleDetalle, loadingDetalle, tabCol, tabData, setTabData, tabProps, onviewGal, onViewMaps } = props

    const OnClickAction = (row, key) => {
        swicthComponentAction[key](row)
    }
    const swicthComponentAction = {
        Informe: (row) => onviewFicha(row.cod_acceso),
        Galeria: (row) => onviewGal(row.cod_acceso, 'foto'),
        Videos: (row) => onviewGal(row.cod_acceso, 'video'),
        Mapa: (row) => onViewMaps(row)
    }

    return (
        <ModdalANTD
            visible={visibleDetalle}
            title={"Detalle"}
            footer={false}
            onCancel={() => setVisibleDetalle(false)}
            width={"75%"}
            centered
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TablaANTD
                        loading={loadingDetalle}
                        columnsTable={tabCol}
                        datasource={tabData}
                        setDataSource={setTabData}
                        pagination={tabProps && tabProps.pagination}
                        pageSize={tabProps && tabProps.pageSize}
                        simplepage={tabProps && tabProps.simplepage}
                        positionBottom={tabProps && tabProps.positionBottom}
                        positionTop={tabProps && tabProps.positionTop}
                        size={tabProps && tabProps.size}
                        bordered={tabProps && tabProps.bordered}
                        scrollX={tabProps && tabProps.scrollX}
                        scrollY={tabProps && tabProps.scrollY}
                        tableLayout={tabProps && tabProps.tableLayout}
                        dragSorting={tabProps && tabProps.dragSorting}
                        Title={tabProps.Title}
                        IconAvatar={tabProps && tabProps.IconAvatar}
                        OnClickAction={OnClickAction}
                    />
                </Grid>
            </Grid>
        </ModdalANTD>
    );
}

export default ModalDetalle;