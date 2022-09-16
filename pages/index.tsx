import { Box, Button } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { Layout } from '../components'
import CardsView from '../components/ui/CardsView/CardsView';
import { db } from '../database';
import { useEffect, useState } from 'react';


const Home: NextPage = () => {
  return (
    <>
      <Layout title='Hator - Cloting'>

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
