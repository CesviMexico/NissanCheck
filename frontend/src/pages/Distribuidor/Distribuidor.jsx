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
import Data, { DataFicha } from "./Services";
import ComponentDistribuidor from './ComponentDistribuidor'


const Busqueda = () => {

  const themeContext = useContext(ThemeContext);
  const { keycloak } = useKeycloak();
  const { msErrorApi, logoutOptions, } = themeContext;

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
      console.log("Busqueda", response);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setOptions(response.options)
          setTabData(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  };


  const handleSearch = (value) => {
    !value && setValueSelect(0)
  }
  const [tallerSelectio, setTallerSelectio] = useState([])
  const [valueSelect, setValueSelect] = useState(0)
  const onSelect = (value) => {
    setValueSelect(value)
    // console.log("onSelect", value)
    // console.log("ItemSelect", ItemSelect)
    //  console.log("url_code", ItemSelect[0].url_code)

    let ItemSelect = tabData.filter(Item => Item.value == value)
    ItemSelect[0].url_code ? GetDataFicha(ItemSelect[0].url_code) : setDataFinal([])

  }

  //consulta  de ficha tecnica
  const [dataFinal, setDataFinal] = useState([])
  const GetDataFicha = async (code) => {
    try {
      const response = await DataFicha(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
        code
      )
      console.log("GetDataFicha", response.data);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          setDataFinal(response.data)
          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  };





  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CardAntd
              style={{ width: '99%' }}
            // title="Búsqueda por distribuidor"
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                  <AutoComplete
                    loading={loading}
                    size="large"
                    style={{ width: '100%', }}
                    options={options}
                    placeholder="Ingresa nombre del distribuidor"
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
            <ComponentDistribuidor
              loading={loading}
              data={dataFinal}
              resultSize={100}
            />
          </Grid>

        </Grid>
      </Box>
    </>
  );
};


export default Busqueda;
