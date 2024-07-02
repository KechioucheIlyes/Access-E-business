import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v5 as uuidv5 } from 'uuid';
import { sendEmail } from "./../../../../../../libs/SendMail/sendMail"

export async function POST(req) {
    const prisma = new PrismaClient()

    const {
        raisonSociale,
        secteurActivite,
        nom,
        prenom,
        fonction,
        email,
        fixe,
        mobile,
        pourcentages,
        userID
    } = await req.json()



    const emailsUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (emailsUser) {
        return NextResponse.json({ message: `L'Email renseinger existe déja dans la base de données` }, { status: 402 })
    }
    else {
        const splittedPercent = pourcentages ? parseInt(pourcentages.split("%")[0]) : 5




        const NAMESPACE_UUID = process.env.NAMESPACE_UUID

        const parrainageId = uuidv5(email, NAMESPACE_UUID);

        const dateNow = new Date();
        const dateExpiration = new Date(dateNow);
        dateExpiration.setDate(dateNow.getDate() + 7);



        const createdFilleul = await prisma.filleul.create({
            data: {
                raison_sociale: raisonSociale,
                secteur_activite: secteurActivite,
                nom,
                prenom,
                fonction,
                email,
                fixe,
                mobile,
                pourcentage_promo: splittedPercent,
                user_id: userID,
                date_expiration: dateExpiration,
                lien_affiliation: parrainageId,
                date_affilation: new Date(),
            }
        })


        if (createdFilleul) {
            const lienAffiliation = `${process.env.HOST_LINK}/inscription?ref=${parrainageId}`;
            const emailOptions = {
                to: email,
                subject: "Lien d'inscription pour votre compte",
                text: "Bonjour, veuillez utiliser le lien suivant pour vous connecté : " + lienAffiliation,
                html: `<b>Bonjour,</b><br>Veuillez utiliser le lien suivant pour créer votre compte : <a href="${lienAffiliation}">${lienAffiliation}</a>`,
            };
            await sendEmail(emailOptions);

            return NextResponse.json({ message: `Un mail viens d'étre envoyer à ${nom} ${prenom} vous serrez tenu au courant quand ce dernier s'inscrira !` }, { status: 201 })

        }
    }



}