import React, { useContext } from "react";
import { Icon } from '@iconify/react';
import ThemeContext from "../../../context/ThemContext";
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

//ANT
import { List } from 'antd';

const ComponenLista = (props) => {
    const { data, title, icon, color = themeGral.header_colorIconMenu, onClick, tipo } = props
    const themeContext = useContext(ThemeContext);
    const { themeGral } = themeContext;

    return (
        <List
            size="small"
            header={

                <Typography level="title-lg" style={{ fontSize: 14, textAlign: 'center', }}>{title}</Typography>

            }
            bordered
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item actions={[
                    item.item2 && <Button variant="outlined" color="primary"
                        sx={{ '--variant-borderWidth': '2px', borderRadius: 20, borderColor: 'primary.500', mx: 'auto', }}
                        onClick={() => onClick(item, tipo)}                      
                    >
                        <Typography level="title-lg" style={{ fontSize: 12 }}>{item.item2 +' %'}</Typography>
                    </Button>
                ]} >
                    <List.Item.Meta
                        avatar={<Icon icon={icon} style={{ fontSize: 25, color: color }} />}
                        description={
                            <Typography level="inherit" style={{ fontSize: 14 }}   >
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