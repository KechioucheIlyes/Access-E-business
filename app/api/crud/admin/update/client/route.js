import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function PUT(req) {

    const {
        clientID,
        siret,
        nom_entreprise,
        raison_sociale,
        forme_juridique,
        code_naf,
        adresse_postal,
        ville,
        code_postal,
        user_id,
        secteur_activite
    } = await req.json()

    const prisma = new PrismaClient()

    try {

        const updatedClient = await prisma.clients.update({
            where: {
                id: clientID,
                user_id: user_id
            },
            data: {
                siret,
                nom_entreprise: nom_entreprise == '' ? raison_sociale : nom_entreprise,
                raison_sociale: raison_sociale == '' ? nom_entreprise : raison_sociale,
                forme_juridique,
                code_naf,
                adresse_postal,
                ville,
                code_postal,
                user_id,
                secteur_activite,
            }
        })

        if (updatedClient) {
            return NextResponse.json({ message: "Client modifier avec succès !" }, { status: 200 })

        } else {
            return NextResponse.json({ message: "Erreur l'or de la modification du Client !" }, { status: 400 })
        }

    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
    }


}