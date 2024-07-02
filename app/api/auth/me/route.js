import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client"
import { verifyJwtToken } from '../../../../libs/auth';
import bcrypt from "bcrypt"

export async function GET(req) {

    const prisma = new PrismaClient()

    try {
        const { value: token } = cookies(req.headers).get('AccessToken') ?? {
            value: null,
        };
        const hasVerifiedToken = token && (await verifyJwtToken(token));

        if (!hasVerifiedToken) {
            return NextResponse.json({ message: "Unauthorized !!!" }, { status: 400 })
        }
        else {

            const user = await prisma.user.findUnique({
                where: {
                    id: hasVerifiedToken.userId
                }
            })

            const fullName = `${user.name} ${user.prenom}`

            if (!user) {
                return NextResponse.json({ message: "Unauthorized !!" }, { status: 400 })
            }

            if (user.role === "user") {
                return NextResponse.json({ message: "Authenticated as User", fullName, userId: user.id, role: user.role, activated: user.activated }, { status: 200 })

            } else if (user.role === "admin") {
                return NextResponse.json({ message: "Authenticated as Admin", fullName, adminId: user.id, role: user.role }, { status: 200 })
            }
        }



    } catch (error) {
        return NextResponse.json({ message: "Unauthorized !" }, { status: 400 })
    }


}

