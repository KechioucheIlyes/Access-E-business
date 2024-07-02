import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req) {


    const prisma = new PrismaClient()

    const {
        contratID,
        nom_site,
        fournisseurElec,
        fournisseurGaz
    } = await req.json()

    try {
        const contratModified = await prisma.contrats.update({
            where: {
                id: contratID
            },
            data: {
                nom_site,
                fournisseur: `${fournisseurElec}-${fournisseurGaz}`
            }
        })

        if (contratModified) {
            return NextResponse.json({ message: "Contrat modifié avec success !" }, { status: 200 })
        } else {
            return NextResponse.json({ error: "Une erreur est survenue veuillez reessayer plus tard ! " }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Erreur Serveur !" }, { status: 500 })
    }





}