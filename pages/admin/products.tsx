import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IProduct } from '../../interfaces/';
import { dbProducts } from '../../database';
import { AddOutlined } from '@mui/icons-material';
import { Box, Button, capitalize, Card, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material'
import Image from 'next/image';
import NextLink from 'next/link';

interface Props {
    products: IProduct[]
}
const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Foto',
        renderCell: ({ row }: any) => {
            return (
                <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
                    <CardMedia
                        component='img'
                        alt={row.title}
                        className='fadeIn'
                        image={row.img}
                    />
                </a>
            )
        }
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 250,
        renderCell: ({ row }: any) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='always'>
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },

];


const ProductsPage: NextPage<Props> = ({ products }) => {

    const rows = products!.map(product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }));
    return (
        <>
            <Box sx={{ backgroundColor: 'white', higth: '100vh' }}>

                <Box display='flex' justifyContent='start' sx={{ mb: 2 }}>
                    <Button
                        variant='contained'
                        startIcon={<AddOutlined />}
                        color="secondary"
                        href="/admin/products/new"
                    >
                        Crear producto
                    </Button>
                </Box>
                <Grid container className='fadeIn'>
                    <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />

                    </Grid>
                </Grid>


            </Box>
        </>
    )
}

export default ProductsPage


export const getServerSideProps: GetServerSideProps = async () => {
    const products = await dbProducts.getAllProducts()
    return {
        props: {
            products
        },
    };
}
