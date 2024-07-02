import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET(req) {




    const prisma = new PrismaClient()



    const commissions = await prisma.commissions.findMany({
        where: {
            Etudes: {
                some: {},

            },

        },
        include: {
            User: {
                include: {
                    Clients: {
                        include: {
                            Dirigeants: true
                        }
                    },

                }
            },
            Etudes: {
                where: {
                    contrats: {
                        some: {}
                    }
                },
                include: {
                    Clients: {
                        include: {
                            Dirigeants: true
                        }
                    },
                    contrats: true
                }
            },

        },
        orderBy: {
            id: 'desc', 
        },
    })


    if (commissions) {
        return NextResponse.json({ commissions }, { status: 200 })
    } else {
        return NextResponse.json({ error: "Une erreur est survenue veuillez reessayer plus tard ! " }, { status: 401 })
    }



}