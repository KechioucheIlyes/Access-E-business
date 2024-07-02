//Suprimer un resultat
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/dirigeants/delete/{slug}:
 *   delete:
 *     summary: Supprimer un dirigeant
 *     description: Supprime un dirigeant en fonction de l'ID spécifié.
 *     tags: [Dirigeants]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du dirigeant à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dirigeant supprimé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Dirigeant supprimé avec succès !
 *       500:
 *         description: Erreur serveur lors de la suppression du dirigeant.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la suppression du dirigeant.
*     security:
 *       - BearerAuth: []
 */

export async function DELETE(req, { params }) {

    const id = parseInt(params.slug)
    const prisma = new PrismaClient()

    const deletedDirigeant = await prisma.dirigeants.delete({
        where: {
            id
        }
    })

    if (deletedDirigeant) {
        return NextResponse.json({ message: "Dirigeant supprimé avec succès !" })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la suppression du Dirigeant !" })
    }
}