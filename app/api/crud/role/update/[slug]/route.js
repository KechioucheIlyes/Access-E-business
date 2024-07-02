import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

/**
 * @swagger
 * /api/crud/role/update/{slug}:
 *   post:
 *     summary: Mettre à jour le rôle d'un utilisateur par ID
 *     description: Met à jour le rôle d'un utilisateur en fonction de son ID.
 *     tags: [Rôles]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: L'ID de l'utilisateur dont vous voulez mettre à jour le rôle.
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: body
 *         name: role
 *         required: true
 *         description: Le nouveau rôle de l'utilisateur (admin, user, guest).
 *         schema:
 *           type: string
 *         example: "admin"
 *     responses:
 *       200:
 *         description: Rôle de l'utilisateur mis à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: "Utilisateur mis à jour avec succès."
 *       400:
 *         description: Rôle non autorisé ou données manquantes.
 *         content:
 *           application/json:
 *             example:
 *               error: "Rôle non autorisé ou nom du rôle manquant."
 *       404:
 *         description: Aucun utilisateur trouvé pour cet ID.
 *         content:
 *           application/json:
 *             example:
 *               error: "L'utilisateur n'existe pas."
 *       500:
 *         description: Erreur inattendue lors de la mise à jour du rôle.
 *         content:
 *           application/json:
 *             example:
 *               error: "Une erreur inattendue s'est produite."
*     security:
 *       - BearerAuth: []
 */

export async function POST(req, { params }) {
    const id = parseInt(params.slug)
    const prisma = new PrismaClient();
    const { role } = await req.json();

    try {
        if (!role) {
            return NextResponse.json({ error: "Le nom du rôle est requis." });
        }


        if (role !== "admin" && role !== "user" && role !== "guest") {
            return NextResponse.json({ error: "Rôle non autorisé !" }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });

        if (!user) {
            return NextResponse.json({ error: "L'utilisateur n'existe pas !" }, { status: 404 });
        } else {
            const updatedRole = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    role: role
                }
            });

            if (user.role === role) {
                return NextResponse.json({ error: `${user.name} est déja ${role}` }, { status: 500 });
            }

            if (updatedRole) {
                return NextResponse.json({ message: `${user.name} ${user.prenom} est passé de ${user.role} à ${role} avec Succes !` }, { status: 200 });
            } else {
                return NextResponse.json({ error: "Erreur lors de la modification du rôle !" }, { status: 500 });
            }
        }
    } catch (error) {

        return NextResponse.json({ error: "Une erreur inattendue s'est produite." }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}
