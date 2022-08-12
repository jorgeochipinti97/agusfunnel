import { Box, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../components'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import CardsView from '../components/ui/CardsView/CardsView';

const Home: NextPage = () => {

  return (
    <>
      <Layout title='Hator - Cloting'>
        <div data-aos="zoom-in-down">
        <Box>
          <Typography variant='h4' sx={{ m: 3, textAlign: 'center' }}>Estamos en construcción</Typography>
        </Box>
          <Box display='flex' justifyContent='center'>
            <ConstructionOutlinedIcon sx={{ fontSize: 80 }} />
          </Box>
        </div>
        <CardsView />
      </Layout>
    </>
  )
}

export default Home
