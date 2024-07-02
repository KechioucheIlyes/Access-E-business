import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client";

export async function GET(req) {

    const session = await getServerSession(authOptions)


    const user_id = parseInt(session?.user?.id)

    const prisma = new PrismaClient()

    try {

        const usersBrouillons = await prisma.user.findUnique({
            where: {
                id: user_id,
            },
            include: {
                Clients: {
                    include: {
                        Etudes: {
                            where: {
                                brouillon: true
                            },
                            include: {
                                contrats: true,
                                resultats: true,
                            }
                        },
                        Dirigeants: true
                    }
                },
            }
        })



        if (usersBrouillons) {

            const arrayBrouillons = []

            usersBrouillons.Clients.map(client => {
                if (client.Etudes.length > 0) {

                    console.log(client)
                    arrayBrouillons.push(client)
                }

            })


            return NextResponse.json({
                arrayBrouillons
            }, { status: 200 })
        } else {
            return NextResponse.json({
                erreur: "Erreur"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            erreur: "Erreur Serveur"
        }, { status: 500 })
    }



    return NextResponse.json({ user_id })
}