
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import mapDataMX from '@highcharts/map-collection/countries/mx/mx-all.geo.json';

const MexicoMap = (props) => {
    const {
        data = [
            ['mx-mx', 20], ['mx-sl', 20],
        ]


    } = props

    const [options, setOptions] = useState({});

    useEffect(() => {
        setOptions({
            chart: {
                map: mapDataMX,
                width: 999, // Ancho del gráfico
                height: 700 // Altura del gráfico
            },
            title: {
                text: ''
            },
            mapNavigation: {
                enabled: false, // Deshabilitar la navegación del mapa
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            colorAxis: {
                min: 0,
                stops: [
                    [0, '#f44336'],
                    [0.5, '#fff176'],
                    [1, '#76ff03']
                ]
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    data: [
                        ['mx-3627', 0], // Example data
                        ...data,
                        ['mx-3626', 100],
                        // Add more data points as needed                       
                    ],
                    mapData: mapDataMX,
                    joinBy: 'hc-key',
                    name: 'Promedio',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    },
                    // color: '#FF0000', // Color base del mapa
                    // borderColor: '#000000', // Color del borde
                    // borderWidth: 1 // Ancho del borde
                    point: {
                        events: {
                            click: function () {
                                alert(`You clicked on ${this.name}`);
                                console.log("click",this)
                                // Puedes reemplazar el alert con cualquier acción que desees
                            }
                        }
                    }
                }
            ]
        });
    }, [data]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'mapChart'}
                options={options}
            />
        </div>
    );
};

export default MexicoMap;
