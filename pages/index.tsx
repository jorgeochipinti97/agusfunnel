import { Box, Button } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { Layout } from '../components'
import CardsView from '../components/ui/CardsView/CardsView';
import { db } from '../database';
import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: '10% OFF', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: 'La proxima quizá!' },
  { option: '5% OFF', style: { backgroundColor: 'black', textColor: 'white' } },
  { option: 'La proxima quizá!' },
]



const Home: NextPage = () => {


  useEffect(() => {
    console.log("window.innerHeight", window.innerHeight);


  }, [])
  const [start, setStart] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  return (
    <>
      <Layout title='Hator - Cloting'>
        <div data-aos="zoom-in-down">
          <Box display='flex' justifyContent='center'>
            <Wheel
              mustStartSpinning={start}
              prizeNumber={3}
              data={data}
              backgroundColors={['#3e3e3e', '#df3428']}
              textColors={['#ffffff']}
            />
          </Box>
        </div>
        <Button onClick={() => setStart(true)}>spin</Button>
      </Layout>
    </>
  )
}

export default Home
export const getServerSideProps: GetServerSideProps = async (context) => {
  const movies = await db.connect()
  return {
    props: {
      movies: JSON.parse(JSON.stringify({ message: 'exito' })),
    },
  };
}
