import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(req) {
    const prisma = new PrismaClient()

    try {
        const allContrats = await prisma.contrats.findMany({
            include: {
                
                etude: {
                    include: {
                        Clients: true,
                        
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })

        if (allContrats) {

            return NextResponse.json({ allContrats }, { status: 200 })
        } else {
            return NextResponse.json({ error: "Une erreur est survenue veuillez reessayer plus tard ! " }, { status: 401 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Erreur Serveur !" }, { status: 500 })
    }



}