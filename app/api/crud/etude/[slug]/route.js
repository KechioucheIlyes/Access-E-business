import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "./../../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth";

export async function GET(req, { params }) {
    const etude_id = parseInt(params.slug)
    const session = await getServerSession(authOptions)

    const prisma = new PrismaClient()


    const etude = await prisma.etudes.findFirst({
        where: {
            id: etude_id,

        },

    })


    if (etude) {
        const client = await prisma.clients.findFirst({
            where: {
                id: etude.ID_clients,
                user_id: parseInt(session.user.id)
            },
        })


        
        if (client && etude.statut === "en cours") {
            return NextResponse.json({ etude, client }, { status: 200 })
        }
        else {

            return NextResponse.json({ message: "aucune étude trouvée !" }, { status: 404 })
        }

    } else {
        return NextResponse.json({ message: "aucune étude trouvée !" }, { status: 404 })
    }





} 