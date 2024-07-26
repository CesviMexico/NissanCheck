import React, {  useContext } from "react";
import { Icon } from '@iconify/react';
import ThemeContext from "../../../context/ThemContext";
import Typography from '@mui/joy/Typography';

//ANT
import { List } from 'antd';

const ComponenLista = (props) => {
    const { data, title, icon, color = themeGral.header_colorIconMenu } = props
    const themeContext = useContext(ThemeContext);
    const { themeGral } = themeContext;

    return (
        <List
            size="small"
            header={<Typography level="title-lg" style={{ fontSize: 14, textAlign: 'center', }}>{title}</Typography>}
            bordered
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item actions={[<Typography level="title-lg" style={{ fontSize: 12 }}>{item.item2}</Typography>]} >
                    <List.Item.Meta
                        avatar={<Icon icon={icon} style={{ fontSize: 21, color: color }} />}
                        description={
                            <Typography level="inherit" style={{ fontSize: 13 }}   >
                                {item.item1}
                            </Typography>
                        }
                    />
                </List.Item>
            )}
        />
    )
}


export default ComponenLista;