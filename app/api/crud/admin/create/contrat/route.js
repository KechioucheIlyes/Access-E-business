import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req) {

    const prisma = new PrismaClient()

    const {
        ref,
        nom_site,
        fournisseurElec,
        fournisseurGaz,
        etudeID,
    } = await req.json()

    const fournisseur = `${fournisseurElec}-${fournisseurGaz}`

    const contrat = await prisma.contrats.create({
        data: {
            reference_contrat: ref,
            nom_site,
            fournisseur,
            id_etudes: etudeID
        }
    })

    if (contrat) {
        return NextResponse.json({ message: 'Contrat Généré avec success !' }, { status: 201 })
    } else {
        return NextResponse.json({ message: "Erreur l'or de la génération du contrat !" }, { status: 401 })
    }

}