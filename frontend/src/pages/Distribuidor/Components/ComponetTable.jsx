import React from "react";
import { Table, Typography  } from 'antd';

const ComponetTable = (props) => {

    const { columns, data, } = props
    const { Text } = Typography;

    return (
        <>
            <Table
                size="small"
                columns={columns && columns}
                dataSource={ data && data}
                pagination={false}
                bordered
                summary={(pageData) => {
                    let totalBorrow = 0;
                    let totalRepayment = 0;
                    let totalCumplimiento = 0;
                    let contador = 0;

                    pageData.forEach(({ borrow, repayment, cumplimiento }) => {
                        totalBorrow += Number(borrow);
                        totalRepayment += Number(repayment);
                        totalCumplimiento += Number(cumplimiento);
                        contador += 1;
                    });

                    return (
                        <>
                            <Table.Summary.Row
                                style={{ backgroundColor: '#FAFAFA' }}
                            >
                                <Table.Summary.Cell index={0} align="right">  <Text  strong >{"Total "}</Text> </Table.Summary.Cell>
                                <Table.Summary.Cell index={1} align="center"> <Text  strong >{totalBorrow}</Text> </Table.Summary.Cell>
                                <Table.Summary.Cell index={2} align="center"> <Text  strong >{totalRepayment}</Text> </Table.Summary.Cell>
                                <Table.Summary.Cell index={3} align="center"> <Text  strong >{(totalCumplimiento * 100 / contador).toPrecision(2)} %</Text> </Table.Summary.Cell>


                            </Table.Summary.Row>
                        </>
                    );
                }}
            />
        </>
    )
}


export default ComponetTable;