
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id'))



    const prisma = new PrismaClient()

    if (id) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }, include: {
                filleul: true
            }
        })
        if (user) {

            if (user.filleul.length > 0) {
                return NextResponse.json({
                    msg: id,
                    user,
                    filleuls: true
                })
            } else {
                return NextResponse.json({
                    filleul: false
                })
            }

        }
    }
    else {
        return NextResponse.json({
            filleul: false
        })
    }






}