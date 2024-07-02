import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { v5 as uuidv5 } from 'uuid';
import { sendEmail } from "./../../../../libs/SendMail/sendMail"




export async function POST(req) {

    const {
        raisonSociale,
        secteurActivite,
        nom,
        prenom,
        fonction,
        email,
        fixe,
        mobile,
        userID
    } = await req.json()

    const NAMESPACE_UUID = process.env.NAMESPACE_UUID

    const parrainageId = uuidv5(email, NAMESPACE_UUID);

    const dateNow = new Date();
    const dateExpiration = new Date(dateNow);
    dateExpiration.setDate(dateNow.getDate() + 7);



    const prisma = new PrismaClient()

    try {
        const filleul = await prisma.filleul.create({
            data: {
                raison_sociale: raisonSociale,
                secteur_activite: secteurActivite,
                nom,
                prenom,
                fonction,
                email,
                fixe,
                mobile,
                user_id: userID,
                lien_affiliation: parrainageId,
                date_expiration: dateExpiration,
                
            }
        })

        if (filleul) {
            const lienAffiliation = `${process.env.HOST_LINK}/inscription?ref=${parrainageId}`;
            const emailOptions = {
                to: email,
                subject: "Lien d'inscription pour votre compte",
                text: "Bonjour, veuillez utiliser le lien suivant pour créer votre compte : " + lienAffiliation,
                html: `<b>Bonjour,</b><br>Veuillez utiliser le lien suivant pour créer votre compte : <a href="${lienAffiliation}">${lienAffiliation}</a>`,
            };
            await sendEmail(emailOptions);


            return NextResponse.json({ message: `Un mail viens d'étre envoyer à ${nom} ${prenom} vous serrez tenu au courant quand ce dernier s'inscrira !` }, { status: 201 })

        }
    } catch (error) {
        return NextResponse.json({ message: `Erreur Serveur` }, { status: 500 })

    }






}
