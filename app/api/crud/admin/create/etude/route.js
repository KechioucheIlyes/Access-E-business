import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function POST(req) {

    const {
        nomEtude,
        typeEtude,
        statutEtude,
        selectedClientId
    } = await req.json()



    const prisma = new PrismaClient()

    const createEtude = await prisma.etudes.create({
        data: {
            nom_etude: nomEtude,
            statut: statutEtude,
            type: typeEtude,
            ID_clients: parseInt(selectedClientId),
        }
    })

    if (createEtude) {
        return NextResponse.json({ message: "Étude créée avec succès" }, { status: 201 })

    } else {
        return NextResponse.json({ message: "Erreur l'or de la création de l'étude veuillez reessayer plus tard !" }, { status: 400 })
    }



}