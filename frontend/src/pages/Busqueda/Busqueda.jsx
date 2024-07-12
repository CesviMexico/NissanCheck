import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


//servicios
import Data from "./Services";

const Busqueda = (props) => {

  const themeContext = useContext(ThemeContext);
  const { keycloak } = useKeycloak();
  const { themeGral, msErrorApi, logoutOptions, } = themeContext;


  const [datasource, setDataSource] = useState([]);
  const [loading, setloading] = useState(false);

  // useEffect(() => { ActualizaTabla() }, []);

  const ActualizaTabla = async () => {
    try {
      const response = await Data(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
      )
      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          console.log("USUARIOS", response.data);

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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": { m: 1, width: "99%", height: "100%" },
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
          Busqueda
          </Grid>

        </Grid>
      </Box>
    </>
  );
};


export default Busqueda;
