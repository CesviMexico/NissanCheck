
// import React, {useContext} from "react";
import { getAxiosLumen } from '../../components/Global/funciones'

export const Data = async (setloading, msErrorApi, keycloak, logoutOptions) => {
    const response = await getAxiosLumen({
        uri: `/Censo/Busqueda`,
        setloading: setloading,
        msErrorApi: msErrorApi,
        keycloak: keycloak,
        notification: false,
        request: 'get',
        logoutOptions: logoutOptions

    })
    return response
}


export const DataFicha = async (setloading, msErrorApi, keycloak, logoutOptions,code) => {
    const response = await getAxiosLumen({
        uri: `/Censo/Busqueda/Ficha/${code}`,
        setloading: setloading,
        msErrorApi: msErrorApi,
        keycloak: keycloak,
        notification: false,
        request: 'get',
        logoutOptions: logoutOptions

    })
    return response
}
export default Data;