import Cloud from '@mui/icons-material/Cloud';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import VerifiedIcon from '@mui/icons-material/Verified';


const ChipWithDecorators = (props) => {
    const { total = 0, promedio = 0 } = props;
    return (
        <>
            <Chip
                variant="soft"
                size="lg"
                color="success"
                startDecorator={<ApartmentIcon />}
                endDecorator={<AutoAwesomeIcon fontSize="md" />}
            >
                {total + " Distribuidores"}
            </Chip>
            <Chip
                variant="soft"
                size="lg"
                color="primary"
                startDecorator={<Diversity3Icon />}
                endDecorator={<VerifiedIcon fontSize="md" />}
            >
                {promedio + " % Promedio"}
            </Chip>
        </>


    );
}
export default ChipWithDecorators; 