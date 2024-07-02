import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


/**
 * @swagger
 * /api/crud/fournisseurs/get-all:
 *   get:
 *     summary: Récupérer tous les fournisseurs
 *     description: Récupère la liste de tous les fournisseurs.
 *     tags: [Fournisseurs]
 *     responses:
 *       200:
 *         description: Liste de tous les fournisseurs récupérée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   id: 1,
 *                   nom_fournisseur: "Nom Fournisseur 1",
 *                   logo: "URL/logo-fournisseur-1.png",
 *                   type_energie: "Type d'énergie 1"
 *                 },
 *                 {
 *                   id: 2,
 *                   nom_fournisseur: "Nom Fournisseur 2",
 *                   logo: "URL/logo-fournisseur-2.png",
 *                   type_energie: "Type d'énergie 2"
 *                 }
 *               ]
 *       404:
 *         description: Aucun fournisseur trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Aucun fournisseur trouvé.
 *       500:
 *         description: Erreur serveur lors de la récupération des fournisseurs.
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur serveur lors de la récupération des fournisseurs.
*     security:
 *       - BearerAuth: []
 */
// Récuper tous les fournisseurs
const prisma = new PrismaClient()
export async function GET(req) {



    const findAllFournisseur = await prisma.fournisseurs.findMany()


    return NextResponse.json(findAllFournisseur)

}
