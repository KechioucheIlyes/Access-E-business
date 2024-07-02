import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"



export async function GET(req, { params }) {


    const token = params.slug

    const prisma = new PrismaClient();

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_TOKEN)
        if (!decodedToken.userId) {
            return NextResponse.json({ message: false });
        }
        if (decodedToken.userId) {
            const confirmed = await prisma.user.findUnique({
                where: {
                    id: decodedToken.userId,
                    confirmed: true
                }
            })

            if (confirmed) {
                return NextResponse.json({ message: true, id: decodedToken.userId })
            } else {
                return NextResponse.json({ message: false })
            }

        }

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: false });
        }
        else {

            console.log("Erreur non gérée :", error);
            return NextResponse.json({ message: 'Erreur Serveur !' }, { status: 500 });
        }

    } finally {
        await prisma.$disconnect();
    }



}