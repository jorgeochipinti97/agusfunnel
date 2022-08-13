import React from 'react'
import { Layout } from '../../../components'
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ContentMediaCard } from '../../../components/ui/ContentMediaCard/ContentMediaCard';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
const CardsView = () => {
    const { asPath } = useRouter()
    return (
        <>
            <Box display='flex' justifyContent='center' sx={{ flexWrap: 'wrap' }}>
                <div data-aos="zoom-in-left">
                    <ContentMediaCard title='@HatorClothing' icon={<InstagramIcon sx={{ fontSize: 50, color: '#846267', textShadow: '1px 1px 1px #bf4b4b' }} />} url='https://instagram.com/hator.clothing' button='Seguinos!' />
                </div>
                <div data-aos="zoom-in-right">
                    <ContentMediaCard title='Solicita tu catálogo' icon={<WhatsAppIcon sx={{ fontSize: 50, color: '#846267', textShadow: '1px 1px 1px #bf4b4b' }} />} url='https://walink.co/cf1540' button='Consultanos!' />
                </div>
                <div data-aos="zoom-in-left">
                    <ContentMediaCard title='TikTok' icon={<MusicNoteIcon sx={{ fontSize: 45, color: '#846267', textShadow: '1px 1px 1px #bf4b4b' }} />} url='https://www.tiktok.com/@hatorclothing' button='Seguinos!' />
                </div>
                <Box sx={{ display: asPath == '/' ? 'none' : '' }}>
                    <div data-aos="zoom-in-right">
                        <ContentMediaCard title='Nuestra web' icon={<LanguageIcon sx={{ fontSize: 50, color: '#846267', textShadow: '1px 1px 1px #bf4b4b' }} />} url='/' button='visitanos!' />
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default CardsView