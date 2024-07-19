import React from "react";
import { Table, Typography as TypographyAntd, } from 'antd';

//MIU
import Grid from "@mui/material/Grid";
import Typography from '@mui/joy/Typography';

const ComponetTable = (props) => {
    const { columns, data, } = props
    const { Text } = TypographyAntd;

    let fontSize = 13;
    let xs=4
    return (
        <>
            {/* <Grid container spacing={0}>
                <Grid item xs={xs} style={{ textAlign: 'left', }} >
                    <Typography level="body-sm" style={{ fontSize: fontSize }} >Distribuidor: </Typography>
                    <Typography level="title-md" style={{ fontSize: fontSize }} > SLP SENDERO</Typography>
                </Grid>
                <Grid item xs={xs} >
                    <Typography level="body-sm" style={{ fontSize: fontSize }} > Marca: </Typography>
                    <Typography level="title-md" style={{ fontSize: fontSize }} > NISSAN</Typography>

                </Grid>
                <Grid item xs={xs} style={{ textAlign: 'center', }} >
                    <Typography level="body-sm" style={{ fontSize: fontSize }} >Tipo: </Typography>
                    <Typography level="title-md" style={{ fontSize: fontSize }} > Matríz</Typography>
                </Grid>

            </Grid><br/> */}
            <Table
                        // title={() =>
                        //     <Grid container spacing={0} >
                        //         <Grid item xs={4} style={{ textAlign: 'left',  }} >
                        //             <Typography level="body-sm" style={{ fontSize: fontSize }} >Distribuidor: </Typography>
                        //             <Typography level="title-md" style={{ fontSize: fontSize }} > SLP SENDERO</Typography>                       
                        //         </Grid>
                        //         <Grid item xs={4} >
                        //             <Typography level="body-sm" style={{ fontSize: fontSize }} > Marca: </Typography>
                        //             <Typography level="title-md" style={{ fontSize: fontSize }} > NISSAN</Typography>                   

                        //         </Grid>
                        //         <Grid item xs={4} style={{ textAlign: 'center', }} >
                        //             <Typography level="body-sm" style={{ fontSize: fontSize }} >Tipo: </Typography>
                        //             <Typography level="title-md" style={{ fontSize: fontSize }} > Matríz</Typography> 
                        //         </Grid>

                        //     </Grid>
                        // }      

                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                summary={(pageData) => {

                    let totalBorrow = 0;
                    let totalRepayment = 0;
                    let totalCumplimiento = 0;
                    let index = 0;

                    pageData.forEach(({ borrow, repayment, cumplimiento }) => {
                        totalBorrow += Number(borrow);
                        totalRepayment += Number(repayment);
                        totalCumplimiento += Number(cumplimiento);
                        index+=1;
                    });

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>

                                <Table.Summary.Cell index={1}> <Text type="danger">{totalBorrow}</Text> </Table.Summary.Cell>
                                <Table.Summary.Cell index={2}> <Text type="danger">{totalRepayment}</Text> </Table.Summary.Cell>
                                <Table.Summary.Cell index={3}> <Text type="danger">{(totalCumplimiento*100 / index).toPrecision(2)} %</Text> </Table.Summary.Cell>


                            </Table.Summary.Row>
                        </>
                    );
                }}
            />
        </>
    )
}


export default ComponetTable;