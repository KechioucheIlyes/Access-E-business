'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from "./acceuil.module.css"
import Image from 'next/image'

import NavBar from '../NavBar/NavBar'

import handtox from "../../Assets/img-2.svg"

import accueil3 from "../../Assets/contract.svg"
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import Eur from "./../../Assets/€.svg"
import footerPic from "./../../Assets/footer-pic.svg"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { motion, useScroll } from "framer-motion"
const Accueil = () => {
    const { data: session, status } = useSession()
    if (status === "authenticated") {
        redirect("/protected/user/accueil")
    }
    const { scrollYProgress } = useScroll();
    return (

        <>
            <motion.div className={styles.progressBar} style={{ scaleX: scrollYProgress }} />
            <NavBar accueilClient={false} burgerAccueil={true} />
            <main className={styles.mainContainer}>
                <div className={styles.ContainerzWave}>

                    <section className={`${styles.sectionContainer}`} >
                        <div className={styles.marketContainer}>

                            <h2>En tant qu'apporteur d'affaire,</h2>
                            <h2>évaluez et offrez a vos clients</h2>
                            <h2>des conseils complets pour </h2>
                            <h2>réduire leur budget énergetique,</h2>
                            <h2>en contrepartie de revenu</h2>
                            <h2>additionnel</h2>
                        </div>
                        <div className={styles.imageSection}>
                            <Image src={Eur} height={600} width={600} alt='image-Access-OptiScore-accueil' priority />
                        </div>

                        <Link href={"/connexion"}></Link>
                    </section>
                    <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className={styles.parallax}>
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use href="#gentle-wave" x="48" y="7" fill="#fbf6f2" />
                        </g>
                    </svg>
                </div>

                <section className={`${styles.secondSection}`}>
                    <h2>Ensemble, offrons à vos clients des solutions personalisées pour réaliser d'importantes</h2>
                    <h2>économies et améliorer leurs efficacité énergétique</h2>
                    <div className={styles.containsSecondSection}>
                        <div className={styles.uls}>

                            <div className={styles.listes}>

                                <div className={styles.checkingListes}>
                                    <div className={styles.successAnimation}>
                                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none" /><path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                    </div>
                                    <p> Accès à une plateforme conviviale</p>
                                </div>
                                <div className={styles.checkingListes}>
                                    <div className={styles.successAnimation}>
                                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none" /><path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                    </div>
                                    <p>Évaluation des lacunes d'optimisation</p>
                                </div>
                                <div className={styles.checkingListes}>
                                    <div className={styles.successAnimation}>
                                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none" /><path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                    </div>
                                    <p>Obtention d'un score de performance</p>
                                </div>
                                <div className={styles.checkingListes}>
                                    <div className={styles.successAnimation}>
                                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none" /><path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                    </div>
                                    <p>Proposition de solutions d'optimisation</p>
                                </div>
                                <div className={styles.checkingListes}>
                                    <div className={styles.successAnimation}>
                                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none" /><path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                    </div>
                                    <p>Suivis de l'évolution des actions mises en place</p>
                                </div>
                                <div className={styles.checkingListes}>
                                    <div className={styles.successAnimation}>
                                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className={styles.checkmark__circle} cx="26" cy="26" r="25" fill="none" /><path className={styles.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                    </div>
                                    <p>Commissionement pour chaque dossier transformé</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageSection}>
                            <Image src={handtox} height={550} width={900} alt='image-Access-OptiScore-accueil2' priority />
                        </div>

                    </div>
                    <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className={styles.parallax}>
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use href="#gentle-wave" x="48" y="7" fill="#1a2529" />
                        </g>
                    </svg>
                </section>
                <section className={styles.thirdSection}>
                    <div className={styles.title}>
                        <h2>L'optimisation énergétique, une préocupation majeure </h2>
                        <h2>Pour de nombreuses entreprises </h2>
                        <h3>  Non do quis nulla reprehenderit occaecat irure excepteur dolor dolor eiusmod laborum. Eiusmod cillum officia est nostrud enim exercitation ipsum quis sunt in. Eu anim laboris consequat laboris mollit aliquip incididunt enim aliquip consequat qui ea. Do cupidatat incididunt et exercitation dolor. Commodo consectetur id do officia sit in exercitation eu et. Quis proident minim pariatur sint. Ea et irure dolore est officia reprehenderit ullamco quis qui ex eiusmod velit.

                            Culpa tempor ut duis commodo. Officia. </h3>
                    </div>

                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <div className={styles.imageContainer}>
                                <Image src={"/courtage.png"} width={70} height={70} priority />
                            </div>
                            <div className={styles.information}>

                                <h3>CONTRACTUALISATION</h3>
                                <p>Trouver le contrat le plus adaptée à votre profil auprès de fournisseur alternatif.</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image src={"/taxe.png"} width={70} height={70} priority />
                            </div>
                            <div className={styles.information}>

                                <h3>TAXES</h3>
                                <p>Bénéficiez d’une exonération, d’un taux réduit ou d’un réajustement de vos taxes.</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image src={"/light.png"} width={70} height={70} priority />
                            </div>
                            <div className={styles.information}>

                                <h3>EFFICACITÉ ÉNÉRGETIQUE</h3>
                                <p>Réduire efficacement et durablement votre consommation énergétique</p>
                            </div>
                        </div>

                    </div>
                    <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className={styles.parallax}>
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use href="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                    </svg>
                </section>
                <section id='about' className={styles.fourthSection}>
                    <div className={styles.fourthSectionmin}>
                        <div className={styles.card}>
                            <div className={styles.containerImage}>
                                <Image className={styles.contract} src={"/contract.png"} width={70} height={70} priority />
                            </div>
                            <h2>Contractualisation</h2>
                            <h3>Vous souhaitez associer votre marque à ACCESS ENERGIES et devenir apporteur d'affaire ?</h3>
                            <h3>Bénéficiez de notre expertise pour satisfaire vos clients en ajoutant une préstation supplémentaire à votre activité et faire croître votre business.</h3>
                            <h3>Inscrivez vous dès maintenant et un conseiller vous contactera pour faciliter la mise en place et vous donner accès à votre plateforme dédiée.</h3>
                            <div className={styles.linkContainer}>
                                <Link className={styles.link} href="/inscription">INSCRIPTION</Link>
                            </div>
                        </div>

                        <div className={styles.imageSection}>
                            <Image src={accueil3} height={550} width={700} alt='image-Access-OptiScore-accueil' priority />
                        </div>
                    </div>
                    <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className={styles.parallax}>
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use href="#gentle-wave" x="48" y="7" fill="#000" />
                        </g>
                    </svg>
                </section>
                <section id='contact' className={styles.fivthSection}>

                    <div className={styles.imageSection}>
                        <Image src={footerPic} height={550} width={700} alt='image-Access-OptiScore-accueil' priority />
                    </div>
                    <div className={styles.infosContainer}>

                        <div className={styles.titleInfos}>
                            <h2>D'autre question ? Contactez nous</h2>
                        </div>

                        <div className={styles.contactInfos}>
                            <div className={styles.blockContact}>
                                <h3 className={styles.title}>TÉLÉPHONE : </h3>
                                <h3>+33 2 78 94 01 30</h3>
                            </div>
                            <div className={styles.blockContact}>
                                <h3 className={styles.title}>EMAIL :</h3>
                                <h3>contact@accessenergies.fr</h3>
                            </div>


                            <div className={styles.blockContact}>
                                <h3 className={styles.title}>ADRESSE : </h3>
                                <h3>181 Rue Joliot Curie, 76650 Petit-Couronne</h3>
                            </div>

                            <div className={styles.blockContact}>

                                <h3 className={styles.title}>RÉSEAUX SOCIAUX : </h3>
                                <div className={styles.reseaux}>
                                    <Link href="https://www.linkedin.com/company/access-energies/" target='_blank' ><LinkedInIcon sx={{ color: "#4ad397" }} /></Link>
                                    <Link href="https://www.facebook.com/accesenergies/" target='_blank'><FacebookIcon sx={{ color: "#4ad397" }} /></Link>
                                    <Link href="https://twitter.com/accessenergies" target='_blank'><TwitterIcon sx={{ color: "#4ad397" }} /></Link>
                                    <Link href="https://www.youtube.com/channel/UCRdJQS4TF19gRlnsKJ-EiQw" target='_blank'><YouTubeIcon sx={{ color: "#4ad397" }} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            </main>

        </>


    )
}

export default Accueil