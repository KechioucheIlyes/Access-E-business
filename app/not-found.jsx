import React from 'react'
import Image from "next/image"
import notFoundImage from "./Assets/not-found-image.svg"
import Link from "next/link"
const notFound = () => {
  return (

    <main className='not-found'>
      <div className='redirection'>
        <Image src={notFoundImage} height={650} width={`${100}%`} alt='image-Access-OptiScore-not-found' priority />
        <h1>Oops ! Il semble que vous vous soyez égaré !</h1>
        <h2>Retournez à la page d'accueil en cliquant <Link className='link-not-found' href={"/"}>ici</Link></h2>

      </div>
    </main>


  )
}

export default notFound