import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { Interface } from "readline"



export async function POST(req) {
    const { nom, prenom, email, tel, fix, raison_social, password, fonction, commentaire, siren, ref } = await req.json()

    const prisma = new PrismaClient()
    if (ref) {

        try {

            const hashedPassword = bcrypt.hashSync(password, 10)
            const createUser = await prisma.user.create({
                data: {

                    name: nom,
                    prenom,
                    email,
                    numero: tel,
                    fix,
                    raison_social,
                    fonction: fonction,
                    commentaire,
                    siren,
                    affiliation_id: ref,
                    authentication: {
                        create: {
                            password: hashedPassword

                        }
                    }

                }
            })


            const filleul = await prisma.filleul.update({
                where: {
                    lien_affiliation: ref
                },
                data: {
                    affiliated: true,
                    date_affilation: new Date(),
                    actif: true,
                }
            })


            if (createUser && filleul) {
                if (!createUser.confirmed) {

                    const confirmationToken = jwt.sign({ userId: createUser.id }, process.env.SECRET_KEY_TOKEN, { expiresIn: "1d" })

                    const createToken = await prisma.token_mail.create({
                        data: {
                            token: confirmationToken,
                            userId: createUser.id
                        }
                    })
                    try {
                        const transporter = nodemailer.createTransport({
                            host: process.env.MAIL_HOST,
                            port: process.env.MAIL_PORT,
                            secure: process.env.MAIL_SECURE,
                            auth: {
                                user: process.env.MAIL_USERNAME,
                                pass: process.env.MAIL_PASSWORD
                            }
                        })

                        const emailContent = {
                            from: process.env.MAIL_USERNAME,
                            to: email,
                            subject: 'Confirmation de votre inscription',
                            html: `<h1>Confirmation inscription</h1> 
                            
                            <p>Bonjour ${createUser.name},</p>

                            <p>Merci d’avoir rejoint Access OptimScore.</p> 

                            <p>Nous aimerions vous confirmer que votre compte a été créé avec succès. Pour accéder a Access OptimScore, cliquez sur le lien ci-dessous.</p>

                            <a href ='${process.env.HOST_LINK}/confirmation?token=${confirmationToken}'>Lien de confirmation de votre email !</a><br><br>

                            Si vous rencontrez des difficultés pour vous connecter à votre compte, contactez-nous à contact@accessenergies.fr.<br><br>

                            Cordialement,<br>
                            L’équipe Access Energies.
                        `
                        };

                        await transporter.sendMail(emailContent)

                        return NextResponse.json({ message: 'Un e-mail de confirmation a été envoyé à votre adresse e-mail.', success: true }, { status: 201 });
                    } catch (error) {
                        console.log(error)
                    }


                }

            } else {
                return NextResponse.json({ message: 'Creation échouée !', success: false }, { status: 400 })
            }
        }
        catch (err) {
            console.log(err);
            return NextResponse.json({ message: 'Erreur Serveur !', err }, { status: 501 })

        }
        finally {
            await prisma.$disconnect()
        }
    } else {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10)
            const createUser = await prisma.user.create({
                data: {

                    name: nom,
                    prenom,
                    email,
                    numero: tel,
                    fix,
                    raison_social,
                    fonction: fonction,
                    commentaire,
                    siren,
                    authentication: {
                        create: {
                            password: hashedPassword

                        }
                    }

                }
            })

            if (createUser) {
                if (!createUser.confirmed) {
                    const confirmationToken = jwt.sign({ userId: createUser.id }, process.env.SECRET_KEY_TOKEN, { expiresIn: "1d" })

                    const createToken = await prisma.token_mail.create({
                        data: {
                            token: confirmationToken,
                            userId: createUser.id
                        }
                    })

                    const transporter = nodemailer.createTransport({
                        host: process.env.MAIL_HOST,
                        port: process.env.MAIL_PORT,
                        secure: process.env.MAIL_SECURE,
                        auth: {
                            user: process.env.MAIL_USERNAME,
                            pass: process.env.MAIL_PASSWORD
                        }
                    })
                    const emailContent = {

                        from: process.env.MAIL_USERNAME,
                        to: email,
                        subject: 'Confirmation de votre inscription',
                        html: `<h1>Confirmation inscription</h1> 
                            
                            <p>Bonjour ${createUser.name},</p>

                            <p>Merci d’avoir rejoint Access OptimScore.</p> 

                            <p>Nous aimerions vous confirmer que votre compte a été créé avec succès. Pour accéder a Access OptimScore, cliquez sur le lien ci-dessous.</p>

                            <a href ='${process.env.HOST_LINK}/confirmation?token=${confirmationToken}'>Lien de confirmation de votre email !</a><br><br>

                            Si vous rencontrez des difficultés pour vous connecter à votre compte, contactez-nous à contact@accessenergies.fr.<br><br>

                            Cordialement,<br>
                            L’équipe Access Energies.
                        `
                    };

                    await transporter.sendMail(emailContent)

                    return NextResponse.json({ message: 'Un e-mail de confirmation a été envoyé à votre adresse e-mail.', success: true }, { status: 201 });

                }


            } else {
                return NextResponse.json({ message: 'Creation échouée !', success: false }, { status: 400 })
            }
        }
        catch (err) {
            console.log(err);
            return NextResponse.json({ message: 'Erreur Serveur !', err }, { status: 501 })

        }
        finally {
            await prisma.$disconnect()
        }
    }

}