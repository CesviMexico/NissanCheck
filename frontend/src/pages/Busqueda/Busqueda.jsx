import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

//ANT
import { Card as CardAntd, AutoComplete } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';

//servicios
import Data from "./Services";
import { GetGalery } from "../Proveedores/Services";

//component Global
import TablaANTD from "../../components/Global/TablaComponent";
import ModalGaleria from '../Proveedores/Components/ModalGaleria'

const Busqueda = () => {

  const themeContext = useContext(ThemeContext);
  const { keycloak } = useKeycloak();
  const { msErrorApi, logoutOptions, } = themeContext;

  const [tabProps, setTabProps] = useState([])
  const [tabCol, setTabCol] = useState([])
  const [tabData, setTabData] = useState([])
  const [options, setOptions] = useState([])
  const [loading, setloading] = useState(false);

  useEffect(() => { ActualizaTabla() }, []);

  const ActualizaTabla = async () => {
    try {
      const response = await Data(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
      )
      // console.log("Busqueda", response);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:

          setTabProps(response.props_table)
          setTabCol(response.columns)
          setTabData(response.data)
          setOptions(response.options)

          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  };

  const OnClickAction = (row, key) => {
    swicthComponentAction[key](row)
  }
  const swicthComponentAction = {
    Informe: (row) => onViewRes(row),
    Galeria: (row) => onviewGal(row.url_code)
  }
  const onViewRes = (row) => {
    let code = row.url_code
    window.open('https://appweb.cesvimexico.com.mx/LevInfoCesvi/assets/ScripWeb/reportPDF/PDFEvaluacionBAJAJ.php?code_acces=' + code, '_blank');
  }


  //image action
  const [visible, setVisible] = useState(false)
  const [listImage, setListImage] = useState([])
  const onviewGal = async (code) => {
    try {
      const response = await GetGalery(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      // console.log("onviewGal", response);
      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setVisible(true)
          setListImage(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  }


  const handleSearch = (value) => {
    !value && setValueSelect(0)
  }
  const [valueSelect, setValueSelect] = useState(0)
  const onSelect = (value) => {
    setValueSelect(value)
  }

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>

        <ModalGaleria
          visible={visible}
          setVisible={setVisible}
          listImage={listImage}
        />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CardAntd
              style={{ width: '99%' }}
              title="Búsqueda por razon social"
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                  <AutoComplete
                    size="large"
                    style={{ width: '100%', }}
                    options={options}
                    placeholder="Búsqueda por razon social"
                    filterOption={(inputValue, options) =>
                      options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    allowClear={{
                      clearIcon: <CloseSquareFilled />,
                    }}
                  />
                </Grid>
              </Grid>

            </CardAntd>
          </Grid>

          <Grid item xs={12}>
            <TablaANTD
              loading={loading}
              columnsTable={tabCol}
              datasource={valueSelect ? tabData.filter(Item => Item.value == valueSelect) : tabData}
              // datasource={tabData.filter(Item => Item.value == valueSelect) }
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
              ExportaExcel={true}
              ActualizaTabla={ActualizaTabla}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


export default Busqueda;
