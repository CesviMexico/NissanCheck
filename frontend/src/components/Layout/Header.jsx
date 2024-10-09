import React, { useContext, useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

//ANTD
import { Layout as AntLayout } from "antd";

//CONTEX
import ThemeContext from "../../context/ThemContext";
import UserContext from "../../context/UserContext";

//MUI
import Box from "@mui/material/Box";
import MenuB from "@mui/material/Menu";
import MenuItemB from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/joy/IconButton';

//iconos
import { Icon } from "@iconify/react";
import bellOutline from "@iconify/icons-mdi/bell-outline";

//componentes
import { AvatarMUI } from "../Global/AvatarComponent";
import BadgeMUIImg from "../Global/BadgeComponent";
import CloudPlatform from './CloudPlatform'
import CardColaborador, { GridColaborador } from "../Global/Colaborador/CardColaborador";
// FUNCIONES
import { ExportToExcel } from '../Global/funciones'
import { DetalleApiGet, xPartesApiGet } from "./Services"


//servicios
import { DataOneUser } from "./Services";

//JVV
import { writeFile, utils } from 'xlsx';
 


const { Header } = AntLayout;

const HeaderComponent = () => {
  let navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const userContext = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const themeContext = useContext(ThemeContext);
  const [loading, setloading] = useState(false);

  const {
    themeGral,
    setThemeGral,
    setThemeAntd,

    colorBadge,
    setColorBadge,
    setPrimaryColor,
    setSecondaryColor,

    msErrorApi,
    logoutOptions,

    id_Modulo,
    Modulo,
  } = themeContext;

  const { user, updateUser } = userContext;

  useEffect(() => {
    if (!!keycloak.authenticated) {
      DatosPerfil(keycloak)
    }
  }, [keycloak]);

  let userLocal

  const DatosPerfil = async (keycloak) => {
    await keycloak.loadUserInfo()
    let user_info = keycloak.userInfo
    const response = await DataOneUser(
      setloading,
      msErrorApi,
      keycloak,
      logoutOptions,
      user_info.sub
    );



    updateUser({
      ...response[0],
      path_foto: response[0].path_foto,
      path_fotoB: response[0].path_fotoB,
      id_modulo: process.env.REACT_APP_Modulo,
      id_keycloak: user_info.sub,
      preferred_username: user_info.preferred_username,
      email: user_info.email,
      given_name: user_info.given_name,
      family_name: user_info.family_name,
      // name: user_info.name,
      // id_company: 1,
      rolkeycloak: keycloak.resourceAccess ? keycloak.resourceAccess[process.env.REACT_APP_clientId].roles[0] : null
    });

    setThemeGral({
      header_color: response[0].header_color,
      header_color_text: response[0].header_color_text,
      header_colorIcon: response[0].header_colorIcon,
      header_colorIconMenu: response[0].header_colorIconMenu,
      header_sizeIcon: response[0].header_sizeIcon,
      footer_color: response[0].footer_color,
      footer_colorText: response[0].footer_colorText,
      Layout_themeAntd: response[0].Layout_themeAntd,
      Layout_colorIcon: response[0].Layout_colorIcon,
      Layout_sizeIcon: response[0].Layout_sizeIcon,
      Layout_colorIconChildre: response[0].Layout_colorIconChildre,
      Layout_sizeIconChildre: response[0].Layout_sizeIconChildre,
      table_color: response[0].table_color,
      table_colorIcon: response[0].table_colorIcon,
      table_sizeIcon: response[0].table_sizeIcon,
      action_colorIcon: response[0].action_colorIcon,
      action_sizeIcon: response[0].action_sizeIcon,

      componente_color: response[0].componente_color,
      componente_colorIcon: response[0].componente_colorIcon,
      componente_sizeIcon: response[0].componente_sizeIcon,

    })

    setColorBadge(response[0].color_badge)
    setPrimaryColor(response[0].primary_color)
    setSecondaryColor(response[0].secondary_color)
    setThemeAntd(response[0].Layout_themeAntd)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const swicthTipo = {
    Login: () => {
      keycloak.login(process.env.REACT_APP_logoutOption);
    },
    Salir: () => {
      keycloak.logout(process.env.REACT_APP_logoutOption);
    },
  };

  const handleSalir = (event, tipo) => {
    setAnchorEl(event.currentTarget);
    swicthTipo[tipo]();
  };


  const [loadingDetalle, setloadingDetalle] = useState(false);
  const DetalleApi = async () => {
    try {
      const response = await DetalleApiGet(
        setloadingDetalle,
        msErrorApi,
        keycloak,
        logoutOptions,
      )

      switch (response.status) {
        case 403:
          setloadingDetalle(false);
          break;

        case undefined:
          setloadingDetalle(false);
          break;

        case 200:
          ExportToExcel({ datasource: response.data, Title: response.message })
          break;

        default:
          break;
      }
    } catch (error) {
      setloadingDetalle(false);
    }

  }


  const descargar = (datasourceExportar,datasource, T1,T2) => {
 
    //ExportToExcel({ datasource: datasourceExportar, Title: "ok" })
 
    const wb = utils.book_new(); // Crear nuevo libro de trabajo (workbook)
 
    // Crear hoja de trabajo para el primer array
    const ws1 = utils.json_to_sheet(datasourceExportar);
    utils.book_append_sheet(wb, ws1, T1); // Agregar hoja con nombre 'Sheet1'
 
    // Crear hoja de trabajo para el segundo array
    const ws2 = utils.json_to_sheet(datasource);
    utils.book_append_sheet(wb, ws2, T2); // Agregar hoja con nombre 'Sheet2'
 
    // Exportar el archivo
    writeFile(wb, T1+'.xlsx'); // Nombre del archivo de salida
 
  }


  const [loadingxPartesApi, setloadingxPartesApi] = useState(false);
  const xPartesApi = async () => {
    try {
      const response = await xPartesApiGet(
        setloadingxPartesApi,
        msErrorApi,
        keycloak,
        logoutOptions,
      )

      switch (response.status) {
        case 403:
          setloadingxPartesApi(false);
          break;

        case undefined:
          setloadingxPartesApi(false);
          break;

        case 200:
          // ExportToExcel({ datasource: response.data, Title: response.message })
          descargar(response.data,response.dataClasicacion,response.message,response.message2)

          break;

        default:
          break;
      }
    } catch (error) {
      setloadingxPartesApi(false);
    }

  }




  return (
    <Header
      className="site-layout-background"
      style={{
        textAlign: "right",
        background: themeGral.header_color,
      }}
    >
      {/* <Typography
        variant="h6"
        component="h7"
        color={themeGral.header_color_text}
        style={{ top: -1, position: "relative", }}
      >
        {process.env.REACT_APP_Name}
      </Typography> */}

      <Typography
        variant="h6"

        color={themeGral.header_color_text}
        style={{ top: 15, position: "relative", float: "left" }}
      >
        {Modulo}
      </Typography>

      <Box sx={{ position: "relative", float: "right", mt: 1 }}>
        <Tooltip title="Datos de la cuenta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // style={{ right: -100 }}
            style={{ right: -20 }}
          >
            <AvatarMUI
              alt="NameUser"
              // src={process.env.REACT_APP_BASE_URL+"SIC_Empleado_Fotos/" + user.cve_empleado + ".JPG"}
              src={user.path_fotoB}


            />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Notificación">
          <IconButton
            onClick={() => navigate("/DemosComponents")}
            size="small"
            sx={{ ml: 2 }}
            style={{ right: 70, top: -6 }}
          >
            <BadgeMUIImg
              sizeIcon={themeGral.header_sizeIcon}
              icon={bellOutline}
              badgeContent={10}
              max={9999}
              colorIcon={themeGral.header_colorIcon}
              colorBadge={colorBadge}
            />
          </IconButton>
        </Tooltip> */}

        {/* <CloudPlatform /> */}

      </Box>
      <MenuB
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            // '& .MuiAvatar-root': {
            //     width: 32,
            //     height: 32,
            //     ml: -0.5,
            //     mr: 1,
            // },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 17,
              width: 15,
              height: 15,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {
            user.id_rol === 3 ?
              <CardColaborador user={user} />
              :
              <GridColaborador user={user} />
          }
        </Box>


        <Divider />
        {
          user.id_rol === 3 ?
            <Divider />
            :
            <Box>
              <MenuItemB
                disabled={loadingDetalle}
                onClick={() => DetalleApi()}
              >
                <ListItemIcon>
                  <Icon
                    icon={"vscode-icons:file-type-excel"}
                    style={{ fontSize: themeGral.header_sizeIcon, color: themeGral.header_colorIconMenu }}
                  />
                </ListItemIcon>
                <Typography variant="caption" display="block" gutterBottom>
                  Reporte detalle
                </Typography>
              </MenuItemB>
              <Divider />
              <MenuItemB
                disabled={loadingxPartesApi}
                onClick={() => xPartesApi()}
              >
                <ListItemIcon>
                  <Icon
                    icon={"vscode-icons:file-type-excel"}
                    style={{ fontSize: themeGral.header_sizeIcon, color: themeGral.header_colorIconMenu }}
                  />
                </ListItemIcon>
                <Typography variant="caption" display="block" gutterBottom>
                  Reporte No.parte
                </Typography>
              </MenuItemB>
            </Box>
        }

        <Divider />


        {!keycloak.authenticated && (
          <MenuItemB onClick={(event) => handleSalir(event, "Login")}>
            <ListItemIcon>
              <Icon
                icon={"uil:exit"}
                style={{ fontSize: themeGral.header_sizeIcon, color: themeGral.header_colorIconMenu }}
              />
            </ListItemIcon>
            <Typography variant="caption" display="block" gutterBottom>
              Login
            </Typography>
          </MenuItemB>
        )}

        {!!keycloak.authenticated && (
          <MenuItemB onClick={(event) => handleSalir(event, "Salir")}>
            <ListItemIcon>
              <Icon
                icon={"uil:exit"}
                style={{ fontSize: themeGral.header_sizeIcon, color: themeGral.header_colorIconMenu }}
              />
            </ListItemIcon>
            <Typography variant="caption" display="block" gutterBottom>
              Salir
            </Typography>
          </MenuItemB>
        )}
      </MenuB>
    </Header>
  );
};

export default HeaderComponent;
