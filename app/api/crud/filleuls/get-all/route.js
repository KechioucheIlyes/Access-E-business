import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./../../../auth/[...nextauth]/route"

export async function GET(req) {
    const session = await getServerSession(authOptions)

    const id = parseInt(session?.user?.id)
    const prisma = new PrismaClient()


    if (id) {
        try {
            const filleuls = await prisma.user.findUnique({
                where: {
                    id
                },
                include: {
                    filleul: {
                        include: {
                            Commission_filleul: true
                        }
                    },
                    Commissions: true,
                }
            })

            if (filleuls) {
                return NextResponse.json({
                    filleuls: true, filleuls
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    filleuls: false
                }, { status: 400 })
            }
        } catch (error) {
            return NextResponse.json({
                filleuls: false
            }, { status: 500 })
        }
    } else {
        return NextResponse.json({
            message: "Aucun utilisateur !"
        }, { status: 404 })
    }

}