
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
export async function POST(req) {

    const { email } = await req.json()

    console.log(email)
    const prisma = new PrismaClient()

    const userFinded = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userFinded) {
        if (userFinded.confirmed) {
            const resetnToken = jwt.sign({ userId: userFinded.id }, process.env.SECRET_KEY_TOKEN, { expiresIn: "1d" })

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
                    subject: '[Access Energies] Réinitialisation de mot de passe',
                    html: `<h1>Réinitialisation de mot de passe</h1> 
                    <p>Bonjour ${userFinded.name},</p>
                    <p>Vous avez demandé la réinitialisation de votre mot de passe sur Access OptimScore.</p> 
                    <p>Veuillez cliquer sur le lien ci-dessous pour choisir un nouveau mot de passe :</p>
                    <a href ='${process.env.HOST_LINK}/reset-password?token=${resetnToken}'>Réinitialiser votre mot de passe</a><br><br>
                    <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail ou nous contacter à contact@accessenergies.fr.</p>
                    <p>Cordialement,<br>L’équipe Access Energies.</p>`
                };


                await transporter.sendMail(emailContent)

                return NextResponse.json({ message: 'Un e-mail de confirmation a été envoyé à votre adresse e-mail.', success: true }, { status: 201 });
            } catch (error) {
                console.log(error)
            }

        } else {
            return NextResponse.json({ msg: "vous ne pouvez pas effectuer cette action !" })
        }

    }
    else {
        return NextResponse.json({ msg: "Erreur serveur !" })
    }

}