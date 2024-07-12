import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import { useKeycloak } from "@react-keycloak/web";

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';

//ANT
import { Card as CardAntd, Tooltip, Form, Select, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

//servicios
import Data from "./Services";



///card list
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BallotIcon from '@mui/icons-material/Ballot';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { AspectRatio } from '@mui/joy';


const { Option } = Select;
const Proveedores = (props) => {
  const {
    xs = 12,
    sm = 6,
    md = 3,

    xsBotton = 12,
    smBotton = 12,
    mdBotton = 12,
  } = props


  const themeContext = useContext(ThemeContext);
  const { keycloak } = useKeycloak();
  const { themeGral, msErrorApi, logoutOptions, } = themeContext;


  const [datasource, setDataSource] = useState([]);
  const [loading, setloading] = useState(false);


  const [states, setStates] = useState([]);



  useEffect(() => { ActualizaTabla() }, []);

  const ActualizaTabla = async () => {
    try {
      const response = await Data(
        setloading,
        msErrorApi,
        keycloak,
        logoutOptions,
      )
      console.log("FiltersController", response);

      switch (response.status) {
        case 403:
          setloading(false);
          break;

        case undefined:
          setloading(false);
          break;

        case 200:
          console.log("data", response.data);
          setStates(response.data.states)

          break;

        default:
          break;
      }
    } catch (error) {
      setloading(false);
    }

  };


  function NestedCard() {
    return (
      <Card sx={{ borderRadius: 0, width: '100%', maxWidth: '100%' }}>
        <CardContent>
          <Typography level="body-xs">IN DESIGN</Typography>
          <Typography level="title-lg">AFSL Web App</Typography>
        </CardContent>
        <Card
          orientation="horizontal"
          size="sm"
          sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
        >
          <CardOverflow>
            <AspectRatio
              ratio="1"
              sx={{ minWidth: 70, '& img[data-first-child]': { p: 1.5 } }}
            >
              <img
                src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=70"
                srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=70&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="title-md">Sub project</Typography>
            <Typography level="body-sm">Next review in 17 days</Typography>
          </CardContent>
        </Card>
        <CardOverflow
          variant="soft"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            justifyContent: 'space-around',
            py: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography startDecorator={<BallotIcon color="danger" />} level="title-sm">
            13
          </Typography>
          <Divider orientation="vertical" />
          <Typography startDecorator={<CommentOutlinedIcon />} level="title-sm">
            9
          </Typography>
          <Divider orientation="vertical" />
          <Typography startDecorator={<InboxOutlinedIcon />} level="title-sm">
            32
          </Typography>
        </CardOverflow>
      </Card>
    );
  }



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
            <CardAntd
              title="Evaluación técnica"
              extra={
                <Tooltip title="Actualizar tabla">
                  <IconButton aria-label="settings"
                    onClick={() => ActualizaTabla()}
                  >
                    <SearchOutlined spin={loading}
                      style={{ fontSize: themeGral.table_sizeIcon, color: themeGral.header_colorIconMenu }}
                    />
                  </IconButton>
                </Tooltip>
              }
              style={{
                width: '99%',
              }}
            >
              <Form
                name="Filtros"
                size="small"
                labelCol={{ flex: '40px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}

              >
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_zona"
                      label="Zona"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Zona!',
                          type: 'array',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Zona"
                        options={states}
                      />
                    </Form.Item>

                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_estado"
                      label="Estado"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Estado!',
                          type: 'array',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Estado"
                        options={states}
                      />
                    </Form.Item>


                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_csa_territorio"
                      label="CSA"
                      rules={[
                        {
                          required: true,
                          message: 'Please select CSA / Territorio!',
                          type: 'array',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select CSA / Territorio"
                        options={states}
                      />
                    </Form.Item>



                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_marca"
                      label="Marca"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Marca!',
                          type: 'array',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Marca"
                        options={states}
                      />
                    </Form.Item>


                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_representacion"
                      label="Tipo"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Tipo!',
                          type: 'array',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Tipo"
                        options={states}
                      />
                    </Form.Item>


                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_grupo"
                      label="Grupo"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Grupo!',
                          type: 'array',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Grupo"
                        options={states}
                      />
                    </Form.Item>



                  </Grid>
                  <Grid
                    item
                    xs={xs}
                    sm={sm}
                    md={md}
                  >

                    <Form.Item
                      name="id_distribuidor"
                      label="Distribuidor"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Distribuidor!',
                          type: 'array',
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select Distribuidor"
                        options={states}
                      />
                    </Form.Item>


                  </Grid>
                </Grid>
              </Form>
            </CardAntd>
          </Grid>


          <Grid item xs={12}>
            <CardAntd
              title="Lista"
              // extra={
              //   <Tooltip title="Actualizar tabla">
              //     <IconButton aria-label="settings"
              //       onClick={() => ActualizaTabla()}
              //     >
              //       <SearchOutlined spin={loading}
              //         style={{ fontSize: themeGral.table_sizeIcon, color: themeGral.header_colorIconMenu }}
              //       />
              //     </IconButton>
              //   </Tooltip>
              // }
              style={{
                width: '99%',
              }}
            >

              <NestedCard />



            </CardAntd>
          </Grid>


        </Grid>
      </Box>
    </>
  );
};

export default Proveedores;
