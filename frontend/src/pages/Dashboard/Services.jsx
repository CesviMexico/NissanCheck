
// import React, {useContext} from "react";
import { getAxiosLumen } from '../../components/Global/funciones'

export const Data = async (setloading, msErrorApi, keycloak, logoutOptions) => {
    const response = await getAxiosLumen({
        uri: `/Censo/Filter/Dashboard`,
        setloading: setloading,
        msErrorApi: msErrorApi,
        keycloak: keycloak,
        notification: false,
        request: 'get',
        logoutOptions: logoutOptions

    })
    return response
}

export const DataDashboard = async (setloading, msErrorApi, keycloak, logoutOptions,code, parametros) => {
    const response = await getAxiosLumen({
        uri: `/Censo/Busqueda/Dashboard/${code}`,
        setloading: setloading,
        msErrorApi: msErrorApi,
        keycloak: keycloak,
        notification: false,
        request: 'post',
        logoutOptions: logoutOptions,
        parametros,

    })
    return response
}

export default Data;