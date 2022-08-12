import type { NextPage } from 'next'
import { Layout } from '../../components'
import CardsView from '../../components/ui/CardsView/CardsView';
import { Box } from '@mui/material';
const FunnelPage: NextPage = () => {
  return (
    <>
      <Layout title='Hator - Cloting'>
        <Box display='flex' justifyContent='center' sx={{ flexWrap: 'wrap' }}>
          <CardsView />
        </Box>
      </Layout>
    </>
  )
}

export default FunnelPage
