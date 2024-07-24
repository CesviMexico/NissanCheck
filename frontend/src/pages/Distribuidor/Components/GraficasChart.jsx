
import React from "react";
import BarChart, { PastelChart, LineChart,RadarChart } from '../../../components/Global/GraficasComponent'

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
    return (
        <RadarChart
            data={{
                labels: labels,
                datasets: datasets,
            }}
        />
    );
}

export default GraficaBarras;