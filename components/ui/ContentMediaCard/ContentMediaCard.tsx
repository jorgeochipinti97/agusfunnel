import { Card, CardContent, Box, Typography, CardActions, Button, Link, createStyles } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

interface Props {
    title: string
    icon: React.ReactElement
    url: string
    button: string

}

export const ContentMediaCard: FC<Props> = ({ title, icon, url, button }) => {
    const router = useRouter()
    const styles = createStyles({
        button: {
            '&:hover,&:focus': {
                backgroundColor: "#6B4F53",
            },
        }
    });
    return (
        <>
            <Card sx={{ minWidth: 275, color: '#C37D92', m: 5, backgroundColor: 'black', border: '1px solid white', maxWidth: 500 }}>
                <CardContent>
                    <Box display='flex' justifyContent='center'>
                        <Box sx={title == 'TikTok' ? { border: '4px solid #6B4F53', borderRadius: '9px', backgroundColor: '#846267' } : {}}>
                            {icon}
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h5' sx={{
                            color: '#AEB4A9',
                            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.91)', mt: 2
                        }}>{title}</Typography>
                    </Box>
                </CardContent>
                <Box display='flex' justifyContent='center'>
                    <CardActions sx={{ position: 'relative', bottom: title == '' ? 20 : 0 }}>
                        <Link sx={{ textDecoration: 'none' }}>
                            <Button
                                onClick={() =>  router.push(url) }
                                style={styles} size="large"  variant='text' sx={{ backgroundColor: '#846267', color: 'white', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.31)' }} >
                                <Typography variant='button' >
                                    {button}
                                </Typography>
                            </Button>
                        </Link>
                    </CardActions>
                </Box>
            </Card>
        </>
    )
}
