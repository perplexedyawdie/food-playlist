import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter();
    function handleHeaderClick(e: any) {
        e.preventDefault();
        router.push('/');
    }
    return (
        <Image className='cursor-pointer' onClick={handleHeaderClick} src={'/assets/header-4.png'} alt='Logo saying Food Playlist' width={855} height={124} />
    )
}

export default Header