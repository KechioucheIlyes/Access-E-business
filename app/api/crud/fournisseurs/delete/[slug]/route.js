import { PrismaClient } from "@prisma/client"
import fs from "fs"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/fournisseurs/delete/{slug}:
 *   delete:
 *     summary: Supprimer un fournisseur
 *     description: Supprime un fournisseur en fonction de l'ID spécifié.
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du fournisseur à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fournisseur supprimé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Fournisseur supprimé avec succès !
 *       400:
 *         description: Erreur lors de la suppression du fournisseur.
 *         content:
 *           application/json:
 *             example:
 *               error: La suppression du fournisseur n'a pas abouti !
 *       500:
 *         description: Erreur serveur lors de la suppression du fournisseur.
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur serveur lors de la suppression du fournisseur.
*     security:
 *       - BearerAuth: []
 */
// Supprimer le fournisseur 
export async function DELETE(req, { params }) {

    const id = parseInt(params.slug)

    const prisma = new PrismaClient()

    const deletedFournisseur = await prisma.fournisseurs.delete({
        where: {
            id
        }
    })

    if (deletedFournisseur) {
        const imagePath = deletedFournisseur.logo

        if (imagePath) {
            try {
                fs.unlinkSync(imagePath);

            } catch (error) {
                console.error(`Erreur l'ors de la suppression de l'image ${error}`);
            }
        }
        return NextResponse.json({ message: "Fournisseur Supprimé avec succès !" })
    } else {
        return NextResponse.json({ message: "Erreur l'ors de la suppression du Fournisseur" })
    }
}