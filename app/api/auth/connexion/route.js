import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { SignJWT } from "jose";
import { getJwtSecretKey } from "../../../../libs/auth";



export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const prisma = new PrismaClient()

        const user = await prisma.user.findUnique({
            include: {
                authentication: true
            },
            where: {
                email
            },
        })

        if (user) {
            const userId = user.id
            const isPasswordValid = bcrypt.compareSync(password, user.authentication.password)
            if (isPasswordValid) {
                if (user.activated && user.confirmed && (user.role === 'user' || user.role === "admin")) {
                    const token = await new SignJWT({
                        userId
                    })
                        .setProtectedHeader({ alg: "HS256" })
                        .setIssuedAt()
                        .setExpirationTime("1h")
                        .sign(getJwtSecretKey());
                    //const token = jwt.sign({ userEmail, userRole, userConfirmed, userActivated }, process.env.SECRET_KEY_LOG, { expiresIn: "1d" })
                    const serialized = cookies().set('AccessToken', token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'strict',
                        maxAge: 24 * 60 * 60 * 1000,
                        path: '/'
                    })



                    return NextResponse.json({ message: "auth reussie !" }, { status: 200 }, { headers: { "Set-Cookie": serialized } })
                } else {
                    return NextResponse.json({ message: "Erreur" }, { status: 401 });
                }

            } else {
                return NextResponse.json({ message: "Paire Email/Mot de passe invalide." }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "Paire Email/Mot de passe invalide." }, { status: 404 });
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        return NextResponse.json({ message: "Une erreur s'est produite." }, { status: 500 });
    }

}