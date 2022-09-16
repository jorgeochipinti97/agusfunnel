import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import { ISize, IProduct } from '../../../interfaces/product';
import { useForm } from 'react-hook-form'
import { TextField, Box, capitalize, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, InputLabel, MenuItem, Select, Checkbox, FormGroup, Button, Typography, Card, CardActions, CardMedia, Chip, Grid, Divider } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import Product from '../../../models/Product';
import { dbProducts } from '../../../database';
import { UploadOutlined } from '@mui/icons-material';
import { agusApi } from '../../../api';
import { useRouter } from 'next/router';
import { Layout } from '../../../components';




interface FormData {
    _id?: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string[];
    title: string;
    type: string;
    gender: string;
    popular: boolean;
    destacados: boolean;
}
interface Props {
    product: IProduct;
}

const ProductsSlugPage: NextPage<Props> = ({ product }) => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const types_ = ['remeras', 'bodys', 'tops', 'vestidos', 'zapatos', 'zapatillas', 'gorros', 'carteras', 'buzos']
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Unique', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15']
    const [type, setType] = useState('')
    const [newTagValue, setNewTagValue] = useState('');
    const [popular, setPopular] = useState<Boolean>(false)
    const [destacado, setDestacado] = useState<Boolean>(false)
    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: {
            description: '',
            images: [],
            inStock: 10,
            price: 10,
            sizes: [],
            slug: '',
            tags: [],
            title: '',
            type: '',
            popular: false,
            destacados: false
        }
    })

    useEffect(() => {
        try {
            const subscription = watch((value, { name, type }) => {
                if (name === 'title') {
                    const newSlug = value.title?.trim()
                        .replaceAll(' ', '_')
                        .replaceAll("'", '')
                        .toLocaleLowerCase() || '';

                    setValue('slug', newSlug);
                }
            });
            return () => subscription.unsubscribe();
        }
        catch (err) {
            alert(err)
        }
    }, [watch, setValue])

    const onNewTag = () => {
        try {

            const newTag = newTagValue.trim().toLocaleLowerCase();
            setNewTagValue('');
            const currentTags = getValues('tags');

            if (currentTags.includes(newTag)) {
                return;
            }

            currentTags.push(newTag);
        } catch (err) {
            alert(err)
        }
    }
    const onSubmit = async (form: FormData) => {

        if (form.images.length < 2) return alert('Mínimo 2 imagenes');

        try {
            const { data } = await agusApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
                data: form
            });

            console.log({ data });
            if (!form._id) {
                router.replace(`/admin/products/${form.slug}`);
            } else {
            }


        } catch (error) {
            console.log(error);
        }

    }

    const onDeleteTag = (tag: string) => {

        try {
            const updatedTags = getValues('tags').filter(t => t !== tag);
            setValue('tags', updatedTags, { shouldValidate: true });
        }
        catch (err) {
            alert(err)
        }
    }

    const onChangePopular = async (e: string) => {
        e == 'true' && setValue('popular', true)
        e == 'true' && setPopular(true)
        e == 'false' && setValue('popular', false)
        e == 'false' && setPopular(false)
    }

    const onChangeDestacados = async (e: string) => {
        e == 'true' && setValue('destacados', true)
        e == 'true' && setDestacado(true)
        e == 'false' && setValue('destacados', false)
        e == 'false' && setDestacado(false)
    }
    const onChangeSize = (size: string) => {
        try {
            const currentSizes = getValues('sizes');
            if (currentSizes.includes(size)) {
                return setValue('sizes', currentSizes.filter((s: any) => s !== size), { shouldValidate: true });
            }
            setValue('sizes', [...currentSizes, size], { shouldValidate: true });
        }
        catch (err) {
            alert(err)
        }
    }

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        try {
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await agusApi.post<{ message: string }>('/admin/upload', formData);
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
            }


        } catch (error) {
            console.log({ error });
        }
    }

    const onDeleteImage = (image: string) => {
        setValue(
            'images',
            getValues('images').filter(img => img !== image),
            { shouldValidate: true }
        );
    }
    return (
        <>
            <Layout title='hator - clothing'>
                <Box sx={{ backgroundColor: 'white'}}>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Box display='flex' flexDirection='column' sx={{ pt: 3 }}>
                            <Box display='flex' justifyContent='center'>
                                <Box >
                                    <Box >
                                        <TextField
                                            label="Título"
                                            variant="filled"
                                            sx={{ mb: 1 }}
                                            {...register('title', {
                                                required: 'Este campo es requerido',
                                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                            })}
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                        />

                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Slug - URL"
                                            variant="filled"

                                            sx={{ mb: 1 }}
                                            {...register('slug', {
                                                required: 'Este campo es requerido',
                                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined
                                            })}
                                            error={!!errors.slug}
                                            helperText={errors.slug?.message}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Descripción"
                                            variant="filled"
                                            {...register('description', {
                                                required: 'Este campo es requerido',
                                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                            })}
                                        />
                                        <Box>

                                            <TextField
                                                label="Precio"
                                                variant="filled"
                                                type='number'
                                                sx={{ mb: 1 }}
                                                {...register('price', {
                                                    required: 'Este campo es requerido',
                                                    min: { value: 0, message: 'Mínimo de valor cero' },
                                                    valueAsNumber: true,

                                                })}

                                                error={!!errors.price}
                                                helperText={errors.price?.message}
                                            />
                                        </Box>
                                        <Box>
                                            <TextField
                                                label="Stock"
                                                variant="filled"
                                                type='number'
                                                sx={{ mb: 1 }}
                                                {...register('inStock', {
                                                    required: 'Este campo es requerido',
                                                    min: { value: 0, message: 'Mínimo de valor cero' },
                                                    valueAsNumber: true,

                                                })}

                                                error={!!errors.inStock}
                                                helperText={errors.inStock?.message}
                                            />

                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='center'>
                                <FormControl variant="standard" sx={{ m: 1, width: 120 }}>
                                    <InputLabel >Types</InputLabel>
                                    <Select
                                        value={type}
                                        label="type"
                                        {
                                        ...register('type')
                                        }
                                        onChange={(e) => setType(e.target.value as string)}
                                    >
                                        {
                                            types_.map(e => (
                                                <MenuItem key={e} value={e}> {e} </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl variant="standard" sx={{ m: 1, width: 120 }}
                                >
                                    <InputLabel >Popular</InputLabel>
                                    <Select

                                        value={popular}
                                        label="Popular"
                                        {
                                        ...register('popular')
                                        }
                                        onChange={(e) => onChangePopular(e.target.value as string)}
                                    >

                                        <MenuItem value={'false'}> False</MenuItem>
                                        <MenuItem value={'true'}> True</MenuItem>

                                    </Select>
                                </FormControl>
                                <FormControl variant="standard" sx={{ m: 1, width: 120 }}

                                >
                                    <InputLabel >Destacado</InputLabel>
                                    <Select
                                        value={destacado}
                                        label="Destacado"
                                        {
                                        ...register('destacados')
                                        }
                                        onChange={(e) => onChangeDestacados(e.target.value as string)}
                                    >

                                        <MenuItem value={'false'}> False</MenuItem>
                                        <MenuItem value={'true'}> True</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                            <FormGroup>
                                <FormLabel>Tallas</FormLabel>
                                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                                    {
                                        sizes.map(size => (
                                            <FormControlLabel
                                                key={size}
                                                sx={{ color: 'black' }}
                                                control={<Checkbox sx={{ color: 'black', m: 1 }} checked={getValues('sizes').includes(size)} />}
                                                label={size}
                                                onChange={() => onChangeSize(size)}
                                            />
                                        ))
                                    }
                                </Box>
                            </FormGroup>
                            <Box sx={{ m: 3 }}>
                                <TextField
                                    label="Etiquetas"
                                    variant="filled"
                                    fullWidth
                                    sx={{ mb: 1 }}
                                    helperText="Presiona [spacebar] para agregar"
                                    value={newTagValue}
                                    onChange={({ target }) => setNewTagValue(target.value)}
                                    onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}
                                />

                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0,
                                    m: 0,
                                }}
                                    component="ul">
                                    {
                                        getValues('tags').map((tag) => {

                                            return (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    onDelete={() => onDeleteTag(tag)}
                                                    color="primary"
                                                    size='small'
                                                    sx={{ ml: 1, mt: 1 }}
                                                />
                                            );
                                        })}
                                </Box>

                            </Box>
                            <Box display='flex' flexDirection="column">
                                <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    startIcon={<UploadOutlined />}
                                    sx={{ mb: 3 }}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Cargar imagen
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept='image/png, image/gif, image/jpeg'
                                    style={{ display: 'none' }}
                                    onChange={onFilesSelected}
                                />


                                <Chip
                                    label="Es necesario al 2 imagenes"
                                    color='error'
                                    variant='outlined'
                                    sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
                                />

                                <Grid container spacing={2}>
                                    {
                                        getValues('images').map(img => (
                                            <Grid item xs={4} sm={3} key={img}>
                                                <Card>
                                                    <CardMedia
                                                        component='img'
                                                        className='fadeIn'
                                                        image={img}
                                                        alt={img}
                                                    />
                                                    <CardActions>
                                                        <Button
                                                            fullWidth
                                                            color="error"
                                                            onClick={() => onDeleteImage(img)}
                                                        >
                                                            Borrar
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <FormGroup>
                                    <Box sx={{ p: 3 }} display='flex' justifyContent='center'>
                                        <Button variant='contained' type='submit'>Enviar</Button>
                                    </Box>
                                </FormGroup>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Layout>
        </>)
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let product: IProduct | null;

    if (slug === 'new') {
        const tempProduct = JSON.parse(JSON.stringify(new Product()));
        delete tempProduct._id;
        tempProduct.images = ['https://res.cloudinary.com/djk4q3tys/image/upload/v1649803292/ayamwt6hdthkkqnhyhkw.jpg', 'https://res.cloudinary.com/djk4q3tys/image/upload/v1649803292/ayamwt6hdthkkqnhyhkw.jpg'];
        product = tempProduct;

    }
    else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }

    if (!product && product != undefined) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }


    return {
        props: {
            product,
        }
    }
}


export default ProductsSlugPage