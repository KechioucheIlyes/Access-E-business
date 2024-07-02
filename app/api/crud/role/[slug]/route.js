import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

/**
 * @swagger
 * tags:
 *   name: Rôles
 *   description: Opérations liées aux Rôles
 */

/**
 * @swagger
 * /api/crud/role/{slug}:
 *   get:
 *     summary: Récupérer le rôle d'un utilisateur par ID
 *     description: Récupère le rôle d'un utilisateur en fonction de son ID.
 *     tags: [Rôles]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: L'ID de l'utilisateur dont vous voulez récupérer le rôle.
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Rôle de l'utilisateur récupéré avec succès.
 *         content:
 *           application/json:
 *             example:
 *               userRole: "Administrateur"
 *       404:
 *         description: Aucun utilisateur trouvé pour cet ID.
 *         content:
 *           application/json:
 *             example:
 *               message: "Aucun utilisateur trouvé"
*     security:
 *       - BearerAuth: []
 */

export async function GET(req, { params }) {
    const id = parseInt(params.slug)

    const prisma = new PrismaClient()


    const user = await prisma.user.findFirst({
        where: {
            id
        }
    })

    if (user) {
        return NextResponse.json({ userRole: user.role })
    }
    else {
        return NextResponse.json({ message: "pas d'utilisateur trouvé " })
    }
}