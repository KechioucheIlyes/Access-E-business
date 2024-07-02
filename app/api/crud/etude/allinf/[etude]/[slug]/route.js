import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth";



export async function GET(req, { params }) {
    const clientIdEncoded = params.slug
    const decodedClientId = Buffer.from(clientIdEncoded, 'base64').toString('ascii');

    const clientId = parseInt(decodedClientId)

    const session = await getServerSession(authOptions)

    const userId = parseInt(session?.user?.id)

    const parsedId = parseInt(userId)
    const prisma = new PrismaClient()

    const client = await prisma.clients.findUnique({
        where: {
            user_id: userId,
            id: clientId
        }, include: {
            Etudes: true,
            Dirigeants: true
        }
    })

    if (client) {
        const etude = await prisma.etudes.findUnique({
            where: {
                id: client.Etudes[0].id
            },
            include: {
                resultats: true
            }
        })

        if (etude) {
            const resultat = await prisma.resultats.findUnique({
                where: {
                    id: etude.resultats[0].id
                }
            })
            if (resultat) {
                return NextResponse.json({ resultat, client, etude })
            } else {
                return NextResponse.json({ redirection: "redirection" }, { status: 404 })
            }
        } else {
            return NextResponse.json({ redirection: "redirection" }, { status: 404 })
        }
    } else {
        return NextResponse.json({ redirection: "redirection" }, { status: 404 })
    }



}