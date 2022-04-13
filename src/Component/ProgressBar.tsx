import React from 'react'
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

const ProgressBar:React.FC = () => {
    return (
        <>
            <Box style={{ left: '50%', top: '50%', position: 'fixed' }}>
                <CircularProgress />
            </Box>
        </>
    );
}
export default ProgressBar;