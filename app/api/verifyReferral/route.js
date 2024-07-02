
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function GET(req, res) {
    if (req.method === 'GET') {

        const { searchParams } = new URL(req.url);


        const ref = searchParams.get('ref')


        try {
            const filleul = await prisma.filleul.findUnique({
                where: {
                    lien_affiliation: ref,
                },
            });



            if (filleul) {

                const now = new Date();
                const expirationDate = new Date(filleul.date_expiration);
                
                if (now <= expirationDate) {
                    return NextResponse.json({ valid: true, message: 'Le lien de parrainage est valide.' , filleul }, { status: 200 })
                } else {
                    return NextResponse.json({ valid: false, message: 'Le lien de parrainage est expiré.' }, { status: 200 })

                }
            } else {
                return NextResponse.json({ valid: false, message: 'Identifiant de parrainage introuvable.' }, { status: 404 })
            }
        } catch (error) {
            return NextResponse.json({ message: "Erreur lors de la vérification de l'identifiant de parrainage." }, { status: 500 })

        }
    } else {

        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('Allow', ['GET'])
        NextResponse.next().setHeader('Allow', ['GET']);
        return NextResponse.json({ message: `Method ${req.method} Not Allowed` })
    }
}
