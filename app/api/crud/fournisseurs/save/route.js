
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

/**
 * @swagger
 * /api/crud/fournisseurs/save:
 *   post:
 *     summary: Enregistrer un fournisseur
 *     description: Enregistré un nouveau fournisseur en utilisant les données fournies.
 *     tags: [Fournisseurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 description: URL du logo du fournisseur.
 *               nom_fournisseur:
 *                 type: string
 *                 description: Nom du fournisseur.
 *               type_energie:
 *                 type: string
 *                 description: Type d'énergie fourni par le fournisseur.
 *           example:
 *             logo: "URL/logo-fournisseur.png"
 *             nom_fournisseur: "Nom du Fournisseur"
 *             type_energie: "Type d'énergie"
 *     responses:
 *       201:
 *         description: Fournisseur enregistré avec succès.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               logo: "URL/logo-fournisseur.png"
 *               nom_fournisseur: "Nom du Fournisseur"
 *               type_energie: "Type d'énergie"
 *       400:
 *         description: Données de l'enregistrement de fournisseur non valides.
 *         content:
 *           application/json:
 *             example:
 *               message: Données de l'enregistrement de fournisseur non valides.
 *       500:
 *         description: Erreur serveur lors de l'enregistrement du fournisseur.
 *         content:
 *           application/json:
 *             example:
 *               message: Erreur serveur lors de l'enregistrement du fournisseur.
*     security:
 *       - BearerAuth: []
 */

// Sauvgarder le fournisseur 
export async function POST(req) {
    const { logo, nom_fournisseur, type_energie } = await req.json()

    const saveFournisseur = await prisma.fournisseurs.create({
        data: {
            logo,
            nom_fournisseur,
            type_energie
        }
    })

    if (saveFournisseur) {
        return NextResponse.json(saveFournisseur)

    } else {
        return NextResponse.json({ message: "sauvegarde non aboutit !" })
    }

}