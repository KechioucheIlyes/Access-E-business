import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import fs from "fs"
// Mettre à jour le données le fournisseur 


/**
 * @swagger
 * /api/crud/fournisseurs/update/{slug}:
 *   put:
 *     summary: Mettre à jour un fournisseur
 *     description: Met à jour les données d'un fournisseur en fonction de l'ID spécifié.
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du fournisseur à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom_fournisseur:
 *                 type: string
 *                 description: Nom du fournisseur.
 *               image:
 *                 type: string (file)
 *                 description: Logo du fournisseur (fichier image).
 *               type_energie:
 *                 type: string
 *                 description: Type d'énergie fourni par le fournisseur.
 *     responses:
 *       200:
 *         description: Fournisseur mis à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Fournisseur mis à jour avec succès.
 *       400:
 *         description: Données de mise à jour de fournisseur non valides.
 *         content:
 *           application/json:
 *             example:
 *               message: Données de mise à jour de fournisseur non valides.
 *       404:
 *         description: Fournisseur non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Fournisseur non trouvé.
 *       500:
 *         description: Erreur serveur lors de la mise à jour du fournisseur.
 *         content:
 *           application/json:
 *             example:
 *               message: Erreur serveur lors de la mise à jour du fournisseur.
*     security:
 *       - BearerAuth: []
 */

const saveFile = async (file) => {
    if (!file) {
        console.error('File is undefined');
        return;
    }


    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const fileExtension = file.name.split('.').pop(); // Obtenez l'extension du fichier
    const uniqueFileName = `${timestamp}.${fileExtension}`;

    const publicPath = `./public/logo-fournisseurs/${uniqueFileName}`;

    try {

        const fileBuffer = await file.arrayBuffer();
        await fs.promises.writeFile(publicPath, Buffer.from(fileBuffer));
        return publicPath
    } catch (error) {
        console.error(`Error saving file: ${error.message}`);
        return null
    }
};

export async function PUT(req, { params }) {

    const formData = await req.formData()

    const nom_fournisseur = formData.get('nom_fournisseur')
    const logo = formData.get('image')
    const type_energie = formData.get('type_energie')

    const id = parseInt(params.slug)

    const prisma = new PrismaClient()

    const publicPath = await saveFile(logo)



    const updatedFournisseur = await prisma.fournisseurs.update({
        where: {
            id
        },
        data: {
            logo: publicPath,
            nom_fournisseur,
            type_energie
        }
    })

    if (updatedFournisseur) {
        return NextResponse.json({
            message: "Fournisseur mis à jour avec succès !"
        })
    }
    else {
        return NextResponse.json({
            message: "Mise à jours échouée !"
        })
    }






}