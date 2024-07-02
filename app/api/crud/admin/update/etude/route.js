import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function PUT(req) {


    const {
        etudeID,
        nomEtude,
        typeEtude,
        statutEtude,
        selectedClientId
    } = await req.json()


    const prisma = new PrismaClient()

    const modifyEtude = await prisma.etudes.update({
        where: {
            id: etudeID,
            ID_clients: selectedClientId
        },
        data: {
            nom_etude: nomEtude,
            type: typeEtude,
            statut: statutEtude,
        }
    })
    
    if (modifyEtude) {
        return NextResponse.json({
            message: "l'étude a été modifier avec success !"
        }, { status: 200 })
    }
    else {
        return NextResponse.json({ message: "Une erreur s'est produite l'or de la modification de l'étude !" }, { status: 400 })
    }

}