import { NextResponse } from "next/server"



export async function Esign(nom_societe, forme_juridique, ville, siret, adresse, contact_signataire, prestation_courtage_elec, prestation_courtage_gaz, prestation_turpe, cspe, presta_eco_energie, presta_decret_tertiare, presta_decret_bacs, fonction) {

    const values = {
        "Nom societe": nom_societe,
        "SOCIETE ANONYME": forme_juridique,
        "VILLE": ville,
        "SIREN": siret,
        "ADRESSE": adresse,
        "CONTACT SIGNATAIRE": contact_signataire,
        "Analyse 1": prestation_courtage_gaz,
        "Analyse 2": prestation_courtage_elec,
        "Analyse 3": prestation_courtage_elec,
        "Analyse 4": prestation_courtage_gaz,
        "OP TAXE 1": prestation_turpe,
        "OP TAXE 2": prestation_turpe,
        "OP TAXE 3": cspe,
        "ECO ENERGIE 1": presta_eco_energie,
        "REGLEMENTAIRE 1": presta_decret_tertiare,
        "REGLEMENTAIRE 2": presta_decret_bacs,
        "PRENOM ET NOM CLIENT": contact_signataire,
        "LIEU": ville,
        "FONCTION": fonction,

    }

    try {
        const response = await fetch('https://e-sign.accessenergies.fr/api/submissions', {
            method: 'POST',
            headers: {
                'X-Auth-Token': process.env.ESIGN_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template_id: 9,
                send_email: true,
                submitters: [{ role: 'First Party', email: 'rayanilyes75@gmail.com', values }],

            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data
    } catch (error) {
        return error
    }


}