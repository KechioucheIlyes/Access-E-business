import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"


/**
 * @swagger
 * tags:
 *   name: Mail Confirmation
 *   description: Opérations de confirmation de l'e-mail
 */

/**
 * @swagger
 * /api/confirmation/{slug}:
 *   get:
 *     summary: Confirmer l'e-mail de l'utilisateur
 *     description: Vérifie le jeton d'authentification pour confirmer l'e-mail de l'utilisateur.
 *     tags: [Mail Confirmation]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: Jeton d'authentification à vérifier
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: E-mail confirmé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: E-mail confirmé avec succès.
 *               confirmedWithSuccess: true
 *       205:
 *         description: E-mail déjà confirmé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: E-mail déjà confirmé avec succès.
 *               alredyConfirmed: true
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: Erreur serveur !
 *     security:
 *       - BearerAuth: []
 */


export async function GET(req, { params }) {


    const token = params.slug

    const prisma = new PrismaClient();

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_TOKEN)

        if (decodedToken.userId) {
            const confirmed = await prisma.user.findUnique({
                where: {
                    id: decodedToken.userId,
                    confirmed: true
                }
            })

            if (confirmed) {
                return NextResponse.json({ message: 'E-mail Déja confirmé avec succès.', alredyConfirmed: true })
            } else {
                await prisma.user.update({
                    where: { id: decodedToken.userId },
                    data: { confirmed: true }
                });
                return NextResponse.json({ message: 'E-mail confirmé avec succès.', confirmedWithSuccess: true }, { status: 200 })
            }

        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Erreur Serveur !' }, { status: 500 })

    } finally {
        await prisma.$disconnect();
    }



}

