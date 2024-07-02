import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"



export async function POST(req, { params }) {

    const client_id = parseInt(params.slug)

    const {
        nom_etude,
        type,
    } = await req.json()

    const prisma = new PrismaClient()

    const createEtude = await prisma.etudes.create({
        data: {
            nom_etude,
            type,
            ID_clients: client_id
        }
    })

    if (createEtude) {
        return NextResponse.json({ message: "étude créer avec succes !", etude_id: createEtude.id }, { status: 201 })
    }

    else {
        return NextResponse.json("Erreur l'or de la creation de l'étude !", { status: 400 })
    }




}