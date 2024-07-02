import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function POST(req) {

    const {
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

        const createdClient = await prisma.clients.create({
            data: {
                siret,
                nom_entreprise,
                raison_sociale,
                forme_juridique,
                code_naf,
                adresse_postal,
                ville,
                code_postal,
                user_id,
                secteur_activite,
            }
        })

        if (createdClient) {
            return NextResponse.json({ message: "Client créer avec succès !" }, { status: 201 })

        } else {
            return NextResponse.json({ message: "Erreur l'or de la création du Client !" }, { status: 400 })
        }

    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
    }


}