import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"



export const authOptions = {

    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials
                const prisma = new PrismaClient()
                try {
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
                            if (user.activated && user.confirmed) {
                                return user
                            } else {
                                return null
                            }
                        } else {
                            return null
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            if(user) token.prenom = user.prenom
            return token
        },
        async session({ session, token }) {
            session.user.role = token.role
            session.user.id = token.sub
            session.user.prenom = token.prenom

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: process.env.NEXTAUTH_URL,
    }
}

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST }
