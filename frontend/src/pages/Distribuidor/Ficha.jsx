import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../../context/ThemContext";
import UserContext from "../../context/UserContext";
import { useKeycloak } from "@react-keycloak/web";
import { useParams } from 'react-router-dom';

//servicios
import { DataFicha } from "./Services";
import ComponentDistribuidor from './ComponentDistribuidor'

//function
import { cadenacaracter } from '../../components/Global/funciones'

//MIU
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

const Ficha = () => {

  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const { keycloak } = useKeycloak();
  const { msErrorApi, logoutOptions, } = themeContext;
  const { id } = useParams();

  const [loading, setloading] = useState(false);
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

  }

  useEffect(() => { id && GetDataFicha(cadenacaracter(id, '&')) }, []);

  const AnimationSkeleton = () => {
    return (
      <Stack spacing={2} useFlexGap style={{}}>
        <Card variant="outlined" sx={{ width: "97%", height: "100%" }}>
          <CardContent orientation="horizontal">
            <Skeleton animation="wave" variant="circular" width={48} height={48} />
            <div>
              <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
              <Skeleton
                animation="wave"
                variant="text"
                level="body-sm"
                sx={{ width: 200 }}
              />
            </div>
          </CardContent>
          <AspectRatio ratio="21/9">
            <Skeleton animation="wave" variant="overlay">
              <img
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
          </AspectRatio>
          <Typography sx={{ overflow: 'hidden' }}>
            <Skeleton animation="wave">
              Lorem ipsum is placeholder text commonly used in the graphic, print, and
              publishing industries.
            </Skeleton>
          </Typography>
          <Button>
            Read more
            <Skeleton animation="wave" />
          </Button>
        </Card>
      </Stack>
    );
  }


  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: "99%", height: "100%" }, }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {
              loading ?
                <AnimationSkeleton />
                :
                <ComponentDistribuidor
                  loading={loading}
                  data={dataFinal}
                  resultSize={100}
                />
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


export default Ficha;
