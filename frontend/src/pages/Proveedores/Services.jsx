
// import React, {useContext} from "react";
import { getAxiosLumen } from '../../components/Global/funciones'

export const Data = async (setloading, msErrorApi, keycloak, logoutOptions) => {
    const response = await getAxiosLumen({
        uri: `/Censo/Filter`,
        setloading: setloading,
        msErrorApi: msErrorApi,
        keycloak: keycloak,
        notification: false,
        request: 'get',
        logoutOptions: logoutOptions

    })
    return response
}

export const DataHistorico = async (setloading, msErrorApi, keycloak, logoutOptions,data_id, ) => {
    const response = await getAxiosLumen({
        uri: `/Censo/Filter/Historial/${data_id}`,
        setloading: setloading,
        msErrorApi: msErrorApi,
        keycloak: keycloak,
        notification: false,
        request: 'get',
        logoutOptions: logoutOptions

    })
    return response
}

export const GetGalery = async (setloading ,msErrorApi ,keycloak ,logoutOptions, code) => {
    const response = await getAxiosLumen({
        uri:`Censo/Busqueda/Galery/${code}`,
        setloading: setloading,
        msErrorApi: msErrorApi,
        keycloak: keycloak,
        notification: false,
        request: 'get',
        logoutOptions: logoutOptions,
    })
return response
}


export default Data;