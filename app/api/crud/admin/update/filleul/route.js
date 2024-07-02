import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function PUT(req) {
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
        dateLien,
        dateAvantage,
        filleulID
    } = await req.json()

    try {
        const updatedFilleul = await prisma.filleul.update({
            where: {
                id: filleulID
            }, data: {
                raison_sociale: raisonSociale,
                secteur_activite: secteurActivite,
                nom,
                prenom,
                fonction,
                fixe,
                email,
                mobile,
                pourcentage_promo: parseInt(pourcentages),
                date_expiration: dateLien,
                date_expiration_avantage: dateAvantage
            }
        })

        if (updatedFilleul) {
            return NextResponse.json({
                message: "Filleul modifié avec succès !"
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: "Erreur l'or de la modification du filleul !"
            }, { status: 400 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Erreur serveur!"
        }, { status: 500 })
    }


}

