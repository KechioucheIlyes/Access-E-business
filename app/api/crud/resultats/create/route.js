
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

//creation Resultat
/**
 * @swagger
 * /api/crud/resultat/create:
 *   post:
 *     summary: Créer un résultat d'étude
 *     description: Crée un résultat d'étude avec les données spécifiées.
 *     tags: [Résultats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courtage:
 *                 type: string
 *               TURPE:
 *                 type: string
 *               CSPE:
 *                 type: string
 *               logiciel:
 *                 type: string
 *               GTB:
 *                 type: string
 *               ctr_nb_compteur_gaz:
 *                 type: string
 *               ctr_nb_compteur_elec:
 *                 type: string
 *               ctr_fournisseurs_gaz:
 *                 type: string
 *               ctr_fournisseurs_elec:
 *                 type: string
 *               ctr_ARENH:
 *                 type: string
 *               ctr_renegociation:
 *                 type: string
 *               ctr_duree_engage_definit:
 *                 type: string
 *               ctr_est_accomp_tiers:
 *                 type: string
 *               tx_puissance_souscrite:
 *                 type: string
 *               tx_formule_tarifaire:
 *                 type: string
 *               tx_subis_penalites:
 *                 type: string
 *               tx_surfacturation:
 *                 type: string
 *               tx_coherence_puissance_1:
 *                 type: string
 *               tx_periodique_1_1:
 *                 type: string
 *               tx_code_naf_eligible:
 *                 type: string
 *               tx_cspe_eligible:
 *                 type: string
 *               ec_reduc_consom:
 *                 type: string
 *               ec_mesures_econom:
 *                 type: string
 *               ec_actions_econom:
 *                 type: string
 *               ec_outils_mesure_conso:
 *                 type: string
 *               rg_adheresion_tertiaire_1:
 *                 type: string
 *               rg_operate_tertiaire_oui_01:
 *                 type: string
 *               rg_oblig_obj_tertiaire_oui_01:
 *                 type: string
 *               rg_inconnu_tertiaire_non_01:
 *                 type: string
 *               rg_bis_1k_tertiaire_non_01:
 *                 type: string
 *               rg_bacs_oui_01:
 *                 type: string
 *               rg_bacs_outils_oui_01:
 *                 type: string
 *               rg_bacs_non_01:
 *                 type: string
 *               id_etudes:
 *                 type: integer
 *             required:
 *               - courtage
 *               - TURPE
 *               - CSPE
 *               - logiciel
 *               - GTB
 *               - ctr_nb_compteur_gaz
 *               - ctr_nb_compteur_elec
 *               - ctr_fournisseurs_gaz
 *               - ctr_fournisseurs_elec
 *               - ctr_ARENH
 *               - ctr_renegociation
 *               - ctr_duree_engage_definit
 *               - ctr_est_accomp_tiers
 *               - tx_puissance_souscrite
 *               - tx_formule_tarifaire
 *               - tx_subis_penalites
 *               - tx_surfacturation
 *               - tx_coherence_puissance_1
 *               - tx_periodique_1_1
 *               - tx_code_naf_eligible
 *               - tx_cspe_eligible
 *               - ec_reduc_consom
 *               - ec_mesures_econom
 *               - ec_actions_econom
 *               - ec_outils_mesure_conso
 *               - rg_adheresion_tertiaire_1
 *               - rg_operate_tertiaire_oui_01
 *               - rg_oblig_obj_tertiaire_oui_01
 *               - rg_inconnu_tertiaire_non_01
 *               - rg_bis_1k_tertiaire_non_01
 *               - rg_bacs_oui_01
 *               - rg_bacs_outils_oui_01
 *               - rg_bacs_non_01
 *               - id_etudes
 *     responses:
 *       201:
 *         description: Résultat d'étude créé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Résultat créé avec succès !
 *       404:
 *         description: Échec lors de la création du résultat d'étude.
 *         content:
 *           application/json:
 *             example:
 *               message: Echec lors de la création du Résultat.
*     security:
 *       - BearerAuth: []
 */

export async function POST(req) {

    


    const {
        courtage,
        TURPE,
        CSPE,
        logiciel,
        GTB,
        ctr_nb_compteur_gaz,
        ctr_nb_compteur_elec,
        ctr_fournisseurs_gaz,
        ctr_fournisseurs_elec,
        ctr_ARENH,
        ctr_renegociation,
        ctr_duree_engage_definit,
        ctr_est_accomp_tiers,
        tx_puissance_souscrite,
        tx_formule_tarifaire,
        tx_subis_penalites,
        tx_surfacturation,
        tx_coherence_puissance_1,
        tx_periodique_1_1,
        tx_code_naf_eligible,
        tx_cspe_eligible,
        ec_reduc_consom,
        ec_mesures_econom,
        ec_actions_econom,
        ec_outils_mesure_conso,
        rg_adheresion_tertiaire_1,
        rg_operate_tertiaire_oui_01,
        rg_oblig_obj_tertiaire_oui_01,
        rg_inconnu_tertiaire_non_01,
        rg_bis_1k_tertiaire_non_01,
        rg_bacs_oui_01,
        rg_bacs_outils_oui_01,
        rg_bacs_non_01,
        id_etudes
    } = await req.json()

    const prisma = new PrismaClient()


    const createResultat = await prisma.resultats.create({
        data: {
            courtage,
            TURPE,
            CSPE,
            logiciel,
            GTB,
            ctr_nb_compteur_gaz,
            ctr_nb_compteur_elec,
            ctr_fournisseurs_gaz,
            ctr_fournisseurs_elec,
            ctr_ARENH,
            ctr_renegociation,
            ctr_duree_engage_definit,
            ctr_est_accomp_tiers,
            tx_puissance_souscrite,
            tx_formule_tarifaire,
            tx_subis_penalites,
            tx_surfacturation,
            tx_coherence_puissance_1,
            tx_periodique_1_1,
            tx_code_naf_eligible,
            tx_cspe_eligible,
            ec_reduc_consom,
            ec_mesures_econom,
            ec_actions_econom,
            ec_outils_mesure_conso,
            rg_adheresion_tertiaire_1,
            rg_operate_tertiaire_oui_01,
            rg_oblig_obj_tertiaire_oui_01,
            rg_inconnu_tertiaire_non_01,
            rg_bis_1k_tertiaire_non_01,
            rg_bacs_oui_01,
            rg_bacs_outils_oui_01,
            rg_bacs_non_01,
            id_etudes
        }
    })
    if (createResultat) {
        return NextResponse.json({ message: "Résultat créé avec succès !" }, { status: 201 })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la creation du Résultat" }, { status: 404 })
    }

}