
import React from "react";
import BarChart, { PastelChart, LineChart, RadarChart } from '../../../components/Global/GraficasComponent'

const GraficaBarras = (props) => {
    const { labels = [], datasets = [], } = props
    return (
        <BarChart
            data={{
                labels: labels,
                datasets: datasets,
            }}
        />);
}

export const GraficaPastel = (props) => {
    const { labels = [], datasets = [], } = props
    return (
        <>
            <PastelChart
                data={{
                    labels: labels,
                    datasets: datasets,
                }}
            />
        </>
    );
}

export const GraficaLineal = (props) => {
    const { labels = [], datasets = [], } = props
    return (
        <LineChart
            data={{
                labels: labels,
                datasets: datasets,
            }}
        />
    );
}


export const GraficaRadar = (props) => {
    const { labels = [], datasets = [], } = props

    const options = {
        scales: {
            r: {
                ticks: {
                    font: {
                        size: 16, // Tamaño de la fuente de los valores de la escala
                    },
                },
                pointLabels: {
                    font: {
                        size: 20, // Tamaño de la fuente de los labels
                    },
                },
                min: 0, // Establece el valor mínimo de la escala en 0
                suggestedMin: 0, // Sugerir que la escala empiece en 0 (refuerza la configuración anterior)
                suggestedMax: 100, // Puedes ajustar esto según tus datos para controlar el rango superior
            },
        },
    }

    return (
        <RadarChart
            data={{
                labels: labels,
                datasets: datasets,
            }}
            options={options}
        />
    );
}

export default GraficaBarras;