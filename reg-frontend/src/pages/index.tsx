import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from './dashboard'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router=useRouter()
  React.useEffect(() => { 
    router.push('/application')
  },[])
  return (
    <></>
  )
}

export default Home
