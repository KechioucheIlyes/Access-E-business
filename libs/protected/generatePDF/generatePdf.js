
const path = require('path');
const { config } = require("process");
require('dotenv').config()
const fs = require('fs');
const puppeteer = require("puppeteer")

async function GenerateContratPDF(nom_societe, forme_juridique, ville, siren, adresse, contact_signataire, contract_elec, contract_gaz, turpe, cspe, economie_energie, decret_ter, decret_bacs, test) {
    const browser = await puppeteer.launch({
        headless: "new",
        // executablePath: '/usr/bin/chromium' 
    });
    const page = await browser.newPage();

    await page.goto(`${process.env.HOST_LINK}/contrat`);

    if (nom_societe !== "") {
        await page.evaluate((nom_societe_value) => {
            const element = document.getElementById("nom_societe")
            element.innerHTML = nom_societe_value
        }, nom_societe)
    }

    if (forme_juridique !== "") {
        await page.evaluate((forme_juridique_value) => {
            const element = document.getElementById("forme_juridique")
            element.innerHTML = forme_juridique_value
        }, forme_juridique)
    }


    if (ville !== "") {
        await page.evaluate((ville_value) => {
            const element = document.getElementById("ville")
            element.innerHTML = ville_value
        }, ville)
    }
    if (siren !== "") {
        await page.evaluate((siren_value) => {
            const element = document.getElementById("siren")
            element.innerHTML = siren_value
        }, siren)
    }
    if (adresse !== "") {
        await page.evaluate((adresse_value) => {
            const element = document.getElementById("adresse")
            element.innerHTML = adresse_value
        }, adresse)
    }
    if (contact_signataire !== "") {
        await page.evaluate((contact_signataire_value) => {
            const element = document.getElementById("contact_signataire")
            element.innerHTML = contact_signataire_value
        }, contact_signataire)
    }


    if (contract_elec) {
        await page.evaluate(() => {
            const element = document.getElementById("courtage_contractuelle_elec")
            element.classList.add("test")
            element.innerHTML = `
            <div class='title-prestations'>Prestation courtage contractuelle électricité </div>
            1.  &checkmark; La réalisation d’une Consultation permettant de choisir un contrat de fourniture de gaz naturel auprès de fournisseur partenaire.<br>
            2.  &checkmark; La gestion du contrat de fourniture d’électricité du Client et en particulier le suivi des marchés énergétiques en vue d’opérations d’achats partiels ou total des consommations prévisionnelles du Client.<br>
            <div class="info-access">ACCESS ENERGIES sera rémunéré par les fournisseurs d’électricité</div><br>
            `
        })
    }
    if (contract_gaz) {
        await page.evaluate(() => {
            const element = document.getElementById("courtage_contractuelle_gaz")
            element.classList.add("test")
            element.innerHTML = `
            <div class='title-prestations'>Prestation courtage contractuelle gaz</div>
            3.  &checkmark; La réalisation d’une Consultation permettant de choisir un contrat de fourniture d’électricité auprès de fournisseur partenaire.<br>
            4.  &checkmark; La gestion du contrat de fourniture de gaz naturel du Client et en particulier le suivi des marchés énergétiques en vue d’opérations d’achats partiels ou total des consommations prévisionnelles du Client. <br>
            <div class="info-access">ACCESS ENERGIES sera rémunéré par les fournisseurs de gaz naturel </div>
            
            `
        })
    }
    if (turpe) {
        await page.evaluate(() => {
            const element = document.getElementById("acheminement_turpe")
            element.classList.add("test")
            element.innerHTML = `
            <div class='title-prestations'>Prestation acheminement TURPE</div>
            5.  &checkmark; L’identification des Economies liées aux coûts d’acheminement de l’énergie -transport et distribution- auxquels le Client peut prétendre du fait de l’optimisation. <br>
            6.  &checkmark; L’identification des Economies liées aux taxes sur l’énergie auxquelles le Client peut prétendre. La mise en œuvre est conditionnée à l’acceptation par le Client du montant d’Economies qui sera réalisé.<br>
            <div class="info-access">ACCESS ENERGIES sera rémunéré par le client au succès, uniquement dans le cas d’économie constaté à hauteur de 30 % des économies de la première année. Facturation au plus tard le 15 du mois suivant le mois civil.</div>
            `
        })
    }
    if (cspe) {
        await page.evaluate(() => {
            const element = document.getElementById("cspe")
            element.classList.add("test")
            element.innerHTML = `
            <div class='title-prestations'>Prestation CSPE / TICGN :</div>
            7.  &checkmark; L’identification et la mise en œuvre des Remboursements liés à aux taxes sur l’énergie auxquelles le Client peut prétendre, et présentes sur les factures de fourniture déjà réglées par le Client.<br>
            <div class="info-access">ACCESS ENERGIES sera rémunéré par le client, uniquement dans le cas d’éligibilité à hauteur de 10 à 30 % selon la consommation annuelle. Facturation au plus tard le 15 du mois après le remboursement des impôts.</div>
            
            `
        })
    }
    if (economie_energie) {
        await page.evaluate(() => {
            const element = document.getElementById("economie_energie")
            element.classList.add("test")
            element.innerHTML = `
            <div class='title-prestations'>Prestation économies d’énergies</div>
            8.  &checkmark; Le chiffrage de primes et la valorisation des Opérations d’Economie d’Energie du Client pour les opérations éligibles (via appel d’offre) et l’assistance dans le montage des dossiers.<br>
            <div class="info-access">ACCESS ENERGIES sera rémunéré par les pollueurs.</div>
            `
        })
    }
    if (decret_ter) {
        await page.evaluate(() => {
            const element = document.getElementById("decret_tertiaire")
            element.classList.add("test")
            element.innerHTML = `
            <div class='title-prestations'>Prestation règlementaire décret TERTIAIRE</div>
            9.  &checkmark;La mise à disposition d’un logiciel de management et de gestion énergétique.<br>
            <div class="info-access">ACCESS ENERGIES sera rémunéré selon le montant et les conditions de paiement d’un devis validé par le client.</div>
            `
        })
    }
    if (decret_bacs) {
        await page.evaluate(() => {
            const element = document.getElementById("decret_bacs")
            element.classList.add("test")
            element.innerHTML = `
            <div class='title-prestations'>Prestation règlementaire décret BACS</div>
            10.&checkmark; L’optimisation de la performance d’une GTB et/ou l’upgrade de sa classe de performance  <br>
            <div class="info-access"> ACCESS ENERGIES sera rémunéré selon le montant et les conditions de paiement d’un devis validé par le client.  </div>           
            `
        })
    }

    const pdfBuffer = await page.pdf()


    await browser.close()

    return pdfBuffer

}

module.exports = GenerateContratPDF;