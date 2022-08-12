
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Box, Divider, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
export const Footer = () => {

    return (
        <footer >

            <div data-aos="zoom-in-down">
                <Box >
                    <Divider sx={{ my: 1, backgroundColor: 'white' }} />

                    <Box display='flex' justifyContent='center' sx={{ mt: 3 }} >
                        <Typography component='h5'><CopyrightIcon sx={{ fontSize: 14 }} />  all rights reserved. Hator</Typography>
                    </Box>
                    <Box display='flex' justifyContent='center' sx={{ mt: 3, mb: 2 }} >
                        <CodeIcon sx={{ fontSize: 20, mr: 1 }} />
                        <Typography component='h5'> Development by Jorge Ochipinti</Typography>
                    </Box>
                </Box>
            </div>
        </footer>
    )
}