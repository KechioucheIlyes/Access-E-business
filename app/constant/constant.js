export const contractPage = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrat</title>
    <style>
        img {
            height: 100px;
        }
        
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
        }
        
        .title {
            text-align: center;
        }
        
        h1 {
            color: #257a00;
        }
        
        .particuliere {
            color: #01a038;
        }
        
        .block {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
        }
        
        
        .action-child-1 {
            background-color: #01a038;
            margin: 10px;
            padding: 15px;
        }
        
        .action-child-1-1 {
            background-color: #01a038;
            margin: 10px;
            padding: 15px;
        }
        
        .action-child {
            list-style: decimal-leading-zero;
        }
        
        
        
        h2 {
            text-align: center;
            background-color: #01a038;
            padding: 15px;
        }
        
        h3 {
        
            background-color: #03772c;
            padding: 10px;
        
        }
        
        .block-mission-etc {
            margin: 20px;
        }
        
        .signature {
        
            display: flex;
        
        
        }
        
        .signature img {
            height: 50px;
        }
        
        .block-signature {
            display: flex;
            justify-content: space-around;
        
            font-size: 12px;
            height: 250px;
        
        }
        
        .text-signature {
            border: 1px solid red;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        
        
        .compte {
            text-decoration: solid;
            color: #01a038;
        }
        
        .generale {
            color: #00948f;
        }
        
        .title-2 {
            color: black !important;
        }
        
        .generale-block {
            display: flex;
        
            justify-content: space-between;
        }
        
        .generale-block-child {
            width: 48%;
        }
        
        .cpp-anexe {
        
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .block-child-1 {
            width: 50% !important;
        
        }
        
        .block-child-2 {
            width: 50% !important;
        
        }
        
        #nom_societe {
            font-weight: bold;
        }
        
        #forme_juridique {
            font-weight: bold;
        }
        
        #ville {
            font-weight: bold;
        }
        
        #siren {
            font-weight: bold;
        }
        
        #adresse {
            font-weight: bold;
        }
        
        #contact_signataire {
            font-weight: bold;
        }
        
        .test {
        
            margin: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        
        }
        
        .info-access {
        
            text-align: center;
            color: #03772c;
            font-weight: bold;
        
        }
        
        .title-prestations {
            font-weight: bold;
            color: #257a00;
            font-size: 15px;
            text-decoration: underline;
            padding: 10px;
        
        }
        
        .mark {
            color: #66dd33;
        }
    </style>
</head>

<body>
    <img src="./logo.webp"/>
    
    <div class="title">
        <h1>CONDITIONS <span class="particuliere">PARTICULIERES</span> DE PRESTATION </h1>
    </div>

    Le présent contrat de prestation (ci-après le « Contrat ») est conclu entre : 

    <div class="block">
        <div class="block-child-1">
                    
            <span id="nom_societe"></span> <br>
                <span id="forme_juridique"></span> au RCS de <span id="ville"></span> sous le numéro <span id="siren"></span> dont le siège social est situé <span id="adresse"></span>.
                Représentée par <span id="contact_signataire"></span>, dûment habilité aux présentes. 
                Ci-après désignée le «<strong>Client</strong>  »
                        
        </div>

        <div class="block-child-2">
            <p>
            Société à Responsabilité Limitée immatriculée au RCS de Rouen sous le numéro 851 987 198 et dont le siège social est situé 240 chemin de l’ouraille 76940 la mailleraye sur seine.
            Représentée par Mr DIAKITE Hamidou, dûment habilité aux fins des présentes.
            Ci-après désignée «<strong>ACCESS ENERGIES</strong> » 
            </p>
        </div>
    </div>
    ACCESS ENERGIES et le Client seront ci-après désignés ensemble les « Parties » et individuellement par une « Partie ».
Dans le cadre du présent Contrat, les Parties ont convenu ce qui suit :
    
    <div class="action-title">
        
            <h2>1.  MISSIONS</h2>
            
            <div class="block-mission-etc">
                <h3>1.1 - DESCRIPTION DES PRESTATIONS</h3>
                <p>La mission confiée par le Client à ACCESS ENERGIES portera sur les prestations d’accompagnement d’assistance et de conseil suivantes (ci-après les « Prestations ») :</p>
    
                <div id="courtage_contractuelle_elec"></div>
    
                <div id="courtage_contractuelle_gaz"></div>
    
                <div id="acheminement_turpe"></div>
    
                <div id="cspe"></div>
    
                <div id="economie_energie"></div>
    
                <div id="decret_tertiaire"></div>
    
                <div id="decret_bacs"></div>
                
                    <h3>1.2 – MODALITES D’EXECUTION</h3>
                
                
                
                <p><span>1ERE ETAPE :</span> Définition d’un planning d’actions avec le Client, incluant la liste des éléments nécessaires qui doivent être communiqués par le Client à ACCESS ENERGIES, notamment : les contrats de fourniture, les factures, l’Autorisation d’Accès aux Données signé par le Client, les Données Techniques, les Données Energétiques, les contacts chez le Client, etc.</p><br> 
                <p><span>2EME ETAPE :</span> Réalisation par ACCESS ENERGIES des Prestations sur la base des informations et documents remis par le Client</p> <br>
                <p><span>3EME ETAPE :</span> Envoi au Client d’une analyse écrite comprenant le cas échéant, un ou des Conseils</p><br>
                <p><span>4EME ETAPE :</span>  Après accord écrit du Client, assistance à la préparation du dossier de demande auprès des Tiers mettant en œuvre le Conseil</p><br>
                <p><span>5EME ETAPE :</span> Assistance raisonnable du Client dans le suivi de la mise en œuvre du Conseil</p><br>

                
                
            </div>
        
            <h2>2. DUREE</h2>
            <div class="block-mission-etc">
                <p>Le présent Contrat entre en vigueur à compter de sa date de signature pour une durée d’un An, renouvelable tacitement par périodes d’un an, sauf renonciation écrite de l’une des Parties, avec un préavis d’un mois. </p>
            </div>

            <h2>3.	ENGAGEMENT DU CLIENT</h2>
            <div class="block-mission-etc">
        
                <p>Pendant la durée du présent contrat et en particulier dans le cadre d’une Consultation pour un nouveau contrat de fourniture d’électricité ou de gaz naturel, le Client s’interdit de traiter, directement ou par l’intermédiaire d’un autre mandataire, avec un Fournisseur de gaz naturel ou d’électricité interrogé par ACCESS ENERGIES. En cas de non-respect par le Client de cet engagement, ACCESS ENERGIES aura droit à une indemnité forfaitaire à la charge du Client d’un montant égal à la rémunération qu’ACCESS ENERGIES aurait dû percevoir du Fournisseur au titre du contrat de fourniture conclu tel que précisé à l’article 1.1</p>
            </div>

            <h2>4.	LIBRE ENGAGEMENT </h2>
            <div class="block-mission-etc">
                <p>
                    Les point de comptage d’électricité et de gaz naturel confié à ACCESS ENERGIES pour une reconduction de contrat de fourniture. Doivent être libres de tout contrat à l’égard de tous fournisseurs d’énergies en date communiqué par le client.
Cet acte entraîne la résiliation de l’actuel contrat ;
Le client déclare être pleinement conscient que si la Société demandait à ACCESS ENERGIES de « basculer » ce(s) RAE à une date à laquelle le(s) RAE se trouvait sous contrat avec un autre fournisseur, soit parce que la date était antérieure à celle de l’échéance du contrat soit parce que le délai du préavis n’était pas respecté, ce fournisseur pourra imputer à la Société des pénalités et des frais de résiliation.<br><br>
Dans ce cas le montant de ces pénalités et frais resteront à la seule charge de la Société ce que la Société reconnait et accepte.

                </p>
            </div>

            <h2>5.	SIGNATURES</h2>
            <div class="block-mission-etc">
                <p>
                    En signant les présentes Conditions Particulières de Prestation, le Client :
                    Certifie que son signataire est dûment habilité pour signer le Contrat et engager le Client ;
                    <div class="block-signature">
                        <div class="block-child-1">
                            
                                <span class="compte"><strong>POUR LE COMPTE DU CLIENT</strong></span> <br><br>

                            
                            <div class="text-signature-client">

                                <strong>Prénom et NOM :</strong> <br><br>
                                <strong>Titre :</strong>  <br><br>
                                <strong>Fait à :</strong><br><br>
                                <strong>Le :</strong> <br><br>
                                <strong>Signature du Client :</strong> <br> <br> 
                            </div>
                            

                        </div>
                        <div class="block-child-1">
                            <div class="text-signature-prestataire">
                                <strong><span class="compte">POUR LE COMPTE D’ACCESS ENERGIES</span> </strong><br><br>
                                <strong>Prénom et NOM :</strong> Hamidou DIAKITE<p></p>
                                <strong>Titre : </strong>Président Fondateur <br><br>
                                <strong>Fait à : </strong> Arelaune En Seine<br><br>
                                <strong> Le :</strong> <br><br>
                                <strong>Signature d’ACCESS ENERGIES :</strong> <br><br>
                                <div class="signature">
                                    <img src="./Sans_titre-2.png"/>
                                    <img src="./Sans_titre.png"/>
                                </div>
                            </div>
                        </div>



                    </div>
                </p>
            </div>

            <div class="title">
                <h1>CONDITIONS <span class="generale">GENERALES</span> DE PRESTATION </h1>
            </div>
            <div class="generale-block">

                <div class="generale-block-child">
                    <h2>1.	DEFINITIONS </h2>
                    <div class="block-mission-etc">
                        Conseil : toute(s) explication(s), justification(s), préconisation(s) et calcul(s) fournis par ACCESS ENERGIES dans le cadre des Prestations, concernant notamment la manière et la façon dont le Client peut optimiser/couvrir/améliorer la gestion de son contrat de fourniture d’énergie.<br><br>
                        Consultation : appel d’offre réalisé par ACCESS ENERGIES en vue de la signature par le Client d’un contrat de fourniture de gaz naturel ou d’électricité.<br><br>
                        Contrat : l’ensemble contractuel constitué des documents suivants :<br>
                        •	Conditions Particulières de Prestation (CPP)<br>
                        •	Conditions Générales de Prestation (CGP)<br>
                        •	Annexes le cas échéant,<br>
                        •	Autorisation d’Accès aux Données<br>
                        <br>
                        Données Energétiques : désigne l’ensemble des données de production et/ou de consommation énergétiques indiquées en kWh ou kW pour une période donnée. <br><br>
                        Données Techniques : désigne l’ensemble des données contractuelles entre le Fournisseur et le Gestionnaire de Réseau pour un point de livraison donné (exemples : options tarifaires, PCE, profil et courbe de charge, CAR, puissances souscrites, capacités…).<br><br>
                        Economie : montant financier économisé ou qui sera économisé par le Client grâce à la mise en œuvre d’un Conseil.<br><br>
                        Fournisseur : désigne une entité commerciale opérant sur les marchés énergétiques et disposant d’une autorisation de fourniture délivrée par l’autorité administrative compétente au titre des articles L.443-1 et L.333-1 du Code de l’énergie pour vendre des produits énergétiques à un utilisateur final. <br><br>
                        Gestionnaire de Réseau : opérateur régulé selon les dispositions du code de l’énergie en charge, notamment, de l’acheminement de l’électricité ou du gaz naturel jusqu’au point de livraison, le point de raccordement ou le ou les points de consommation du Client. <br><br>

                    </div>

                    <h2>3.	CONDITIONS FINANCIERES</h2>
                    <div class="block-mission-etc">
                        3.1 Le Client s’engage à régler à ACCESS ENERGIES, pendant toute la durée du Contrat, la rémunération prévue aux Conditions Particulières de Prestation.<br><br>
                        Le Client restera redevable envers ACCESS ENERGIES de la rémunération variable prévue aux Conditions Particulières de Prestation, sur les Economies et Remboursements réalisés pendant les trois (3) ans suivant la cessation du Contrat pour quelle que raison que ce soit. Le Client s’engage ainsi à informer ACCESS ENERGIES de la mise en œuvre du Conseil permettant l’Economie et/ou le Remboursement, et à régler la facture émise par ACCESS ENERGIES à ce titre.<br><br>
                        3.2 Les délais de paiement sont de 30 jours à la date d’émission de facture. <br><br>
                        3.3 Le Client est redevable de la TVA applicable aux services facturés par ACCESS ENERGIES. Les factures seront émises toutes taxes comprises. <br><br>
                        3.4 En cas de retard ou défaut de paiement, des intérêts de retard seront appliqués automatiquement – sans aucune formalité préalable – et calculés, depuis la date d’échéance jusqu’au jour du paiement effectif, sur toute rémunération TTC non payée par le Client à un taux égal au taux directeur semestriel de la Banque Centrale Européenne (BCE) majoré de 10 points. Le Client devra rembourser, outre l’indemnité légale forfaitaire de plein droit pour frais de recouvrement d’un montant de 40 Euros conformément à l’article L.441-10 du Code de commerce, tous les frais occasionnés par le défaut de paiement à l'échéance.<br><br>
                        
                    </div>
                    <h2>4.	COLLABORATION DU CLIENT </h2>
                    <div class="block-mission-etc">
                        A défaut d’accord entre les Parties dans un délai de six (6) mois à compter de la demande de renégociation, chacune des Parties pourra résilier le présent Contrat, de plein droit, moyennant un préavis de trois (3) mois. La rémunération convenue initialement continuera à s’appliquer pendant toute la durée du préavis. <br><br>
                        5.2 Une Partie ne sera pas considérée comme ayant manqué à ses obligations au titre du Contrat dans la mesure où il est possible de justifier que le manquement à ses obligations a été provoqué par un événement indépendant de sa volonté et que la Partie concernée ne pouvait raisonnablement pas prévoir, éviter ou en surmonter les conséquences au moment de la signature du Contrat (ci-après « Force Majeure »). La Force Majeure comprend, sans limitation, les événements suivants : catastrophes naturelles, guerre, explosions, incendie, inondation, tempête, tremblement de terre, panne d’électricité ou des télécommunications, insurrection, émeute, troubles de l’ordre public, révolte, grève, fermeture de l’entreprise ou conflit du travail, à l’exception de grève, fermeture d’entreprises ou conflit du travail impliquant la Partie soumise à la présente clause. <br><br>
                        5.3 Si l’une des Parties est entravée par un cas de Force Majeure, l’autre Partie devra en être informée immédiatement. La Partie entravée mettra tous les moyens en œuvre pour remédier à la situation le plus rapidement possible. Dans la mesure où l’exécution des obligations d’une Partie est entravée par un événement de Force Majeure, l’autre Partie sera en contrepartie dispensée d’exécuter ses propres obligations au titre du Contrat<br><br>
                    </div>
                    <h2>6.	MANQUEMENTS AU CONTRAT </h2>
                    <div class="block-mission-etc">
                        6.1 En cas de manquement ou d’inexécution par une des Parties de l’une de ses obligations mises à sa charge par le Contrat, l’autre Partie pourra lui adresser une mise en demeure, par lettre recommandée avec avis de réception, d’avoir à exécuter son obligation ou cesser son comportement prohibé par le Contrat.<br><br>
                        Dans une telle hypothèse, si la mise en demeure reste sans effet à l’expiration d’un délai de 30 jours à compter de sa réception, la Partie victime de l’inexécution pourra si bon lui semble, résilier de plein droit le Contrat par un simple avis adressé à l'autre Partie.<br><br>
                        6.2 Lors de la cessation anticipée du Contrat, quelle qu’en soit la cause, les Prestations seront facturées au prorata de leur réalisation et exigibles immédiatement du Client.<br><br>

                    </div>
                    <h2>7.	RESPONSABILITES  </h2>
                    <div class="block-mission-etc">
                        l’Energie (CRE) ou une autre autorité administrative indépendante, ou d’une décision administrative rendue en dernier ressort, et ce, même si la Partie concernée n’a pas obtenu l’autorisation écrite de l’autre Partie. <br>
                    </div>
                    <h2>9.	CESSION DU CONTRAT  </h2>
                    <div class="block-mission-etc">
                        
                        Aucune Partie n’est en droit de céder tout ou partie du présent Contrat à un tiers sans en avoir obtenu l’autorisation écrite de l’autre Partie. 

                    </div>
                    <h2>10.	SOUS-TRAITANCE </h2>
                    <div class="block-mission-etc">
                        
                        ACCESS ENERGIES peut sous-traiter les Prestations et devra en informer le Client le cas échéant.  ACCESS ENERGIES reste tenue vis-à-vis du Client dans les termes du Contrat, pour l'ensemble des Prestations, y compris celles réalisées par son éventuel sous-traitant.   

                    </div>
                    <h2>11.	PUBLICITE</h2>
                    <div class="block-mission-etc">
                        
                        ACCESS ENERGIES se réserve le droit de mentionner, à titre de référence, le nom du Client, l’existence et l’objet du Contrat dans le cadre de ses documents commerciaux diffusés notamment auprès de sa clientèle et de ses prospects, sauf stipulation contraire expresse et préalable de la part du Client.
                    </div>
                    <h2>12.	AUTRES DISPOSITIONS </h2>
                    <div class="block-mission-etc">
                        
                        12.1 Toute commande de Prestation emporte acceptation par le Client des présentes Conditions Générales de prestation Elles ne peuvent être amendées ou complétées que dans le cadre de conditions particulières signées entre les Parties.  Tout autre document ou conditions émanant du Client, notamment ses conditions générales d’achat, ne sera pas opposable aux parties.<br><br>
                        12.2 ACCESS ENERGIES pourra apporter des modifications aux présentes Conditions Générales de prestation ; elle informera le Client par tout moyen des modifications apportées. En l’absence de contestation écrite dans le délai de 30 jours à compter de l’entrée en vigueur des nouvelles Conditions Générales, celles-ci seront alors applicables de plein droit et se substitueront aux présentes.<br><br>
                        12.4 Si le présent Contrat ou une annexe a été rédigée en plusieurs langues ou a été traduite, la version française prévaudra. <br><br>
                        Autorisation d’Accès aux Données : document contractuel autorisant ACCESS ENERGIES à demander et obtenir les Données Techniques et Energétiques des Sites dont le Client est titulaire (ou pour lesquels le Client détient un mandat) auprès du(es) Gestionnaire(s) de Réseau(x).<br><br>
                        Opération d’Economie d’Energie : investissement en travaux ou matériels permettant de réaliser des économies d’énergie et relevant du dispositif des CEE. Une liste des Opérations éligibles est publiée par arrêtés.<br><br>
                        Prestation : l’ensemble des prestations confiées par le Client à ACCESS ENERGIES et décrites aux Conditions Particulières de Prestation. <br><br>
                        Remboursement : montant financier perçu par le Client d’une Tierce Partie grâce à la mise en œuvre d’un Conseil. <br><br>
                        Site : désigne un point de livraison alimentant l’installation de consommation du Client à laquelle est destinée l’énergie électrique fournie au titre d’un contrat de fourniture et tel que visé par l’article L.331-2 du Code de l’énergie, ou le gaz naturel au titre d’un contrat de fourniture et tel que visé par l’article L.441-2 du Code de l’énergie<br><br>
                        Tierce Partie : toute entité, autorité ou organisation (Fournisseur, administration fiscale, Gestionnaire de Réseau, etc.) autre que l’une ou l’autre des Parties.<br><br>

                    
                    
                    </div>
                </div>
                <div class="generale-block-child">
                    <h2>2.	EXECUTION DE LA MISSION </h2>
                    <div class="block-mission-etc">
                        <h3>2.1 – MODALITES GENERALES</h3>
                        <div class="block-mission-etc">

                            ACCESS ENERGIES s'engage à réaliser au profit du Client les Prestations, grâce à ses connaissances et expériences.<br><br>
                            ACCESS ENERGIES apportera tous ses soins à la réalisation des Prestations, qu’elle s’efforcera d’exécuter en respectant les délais prévus, étant entendu que le Client devra transmettre en temps opportun, toutes directives et informations ainsi que tous documents nécessaires à la réalisation de l’assistance demandée.<br><br>
                            ACCESS ENERGIES s'engage à rendre régulièrement compte au Client de l’exécution des Prestations dans les conditions prévues aux Conditions Particulières de Prestation.<br><br>
                            L’exécution des Prestations, et notamment le respect de délais éventuels, nécessite la collaboration active du Client. <br><br>
                            Le Client s’engage notamment à fournir à ACCESS ENERGIES dans les délais convenus, l’ensemble des informations, documents, données ou éléments utiles à l’exécution du Contrat. <br><br>
                            En particulier, le Client s’engage à : <br><br>
                            (i) fournir à ACCESS ENERGIES toutes les informations qui lui sont nécessaires dans le cadre de la réalisation de son(es) Conseil(s). Cela peut comprendre, sans s’y limiter, les informations relatives aux contacts, aux contrats conclus avec les Fournisseurs, aux Données Energétiques et Techniques concernées par le Contrat ; <br><br>
                            (ii) délivrer toutes les autorisations nécessaires à ACCESS ENERGIES pour l’exécution des Prestations, en particulier pour obtenir des offres de la part des Fournisseurs au nom du Client ; <br><br>
                            (iii) répondre aux demandes d’ ACCESS ENERGIES ; <br><br>
                            (iv) communiquer les éléments nécessaires à la (aux) Tierce(s) Partie(s) le cas échéant ; <br><br>
                            (v) transmettre à ACCESS ENERGIES la copie des communications avec la(es) Tierce(s) Partie(s) relative(s) à la bonne réalisation ou mise en œuvre d’un ou plusieurs Conseil(s) ;<br><br>
                            (vi) pendant toute la durée du Contrat, à ne pas traiter directement ou indirectement avec un ou plusieurs Fournisseurs ayant répondu à une Consultation et/ou relevant de la Prestation fournie par ACCESS ENERGIES.<br><br>
                            Le Client s’engage à communiquer spontanément et en temps utile à ACCESS ENERGIES tous les événements et/ou informations et/ou difficultés qui pourraient avoir une incidence ou seraient utiles à la bonne exécution du Contrat. <br><br>
                            Le Client est seul responsable de l’exactitude et l’exhaustivité des informations transmises. <br><br>
                            
                        </div>
                    </div>

                    <h2>5.	IMPREVISION –FORCE MAJEURE</h2>
                        <div class="block-mission-etc">
                            5.1 Dans le cas d’un bouleversement de l’économie du Contrat dù à des modifications substantielles apportées à la réglementation et ayant une incidence sur les Prestations fournies par ACCESS ENERGIES, ACCESS ENERGIES pourra demander à ce que le Contrat soit renégocié. Les demandes de renégociation devront être soumises dans les trois (3) semaines suivant la survenance du bouleversement de l’économie du Contrat. <br><br>
                            7.1 ACCESS ENERGIES fera ses meilleurs efforts pour exécuter ses obligations au titre du présent Contrat, et est à ce titre tenue à une obligation de moyens.  <br><br>
                            7.2 ACCESS ENERGIES ne pourra pas être tenue responsable de l’inexactitude ou du caractère incomplet des informations qui lui sont transmises par le Client, qu’il a collectées auprès de tiers ou qu’il a reçues des Sociétés gestionnaires de réseau ou des Fournisseurs. Le Client s’engage à conserver une copie des documents et informations transmis à ACCESS ENERGIES, qui ne pourra être tenue responsable en cas de perte ou de détérioration desdits documents et/ou informations. <br><br>
                            7.3 ACCESS ENERGIES décline toute responsabilité pour toute perte et/ou tout dommage subit par le Client, incluant sans limitation la perte de gains, l’atteinte à la réputation (perte de clientèle, etc.) lorsque le Gestionnaire de Réseau, le Fournisseur ou tout autre Tierce Partie n’est pas en mesure de remplir ses obligations contractuelles ou légales.  <br><br>
                            7.4 Dans l'hypothèse où sa responsabilité serait engagée, ACCESS ENERGIES ne répondra en aucun cas des dommages immatériels et/ou indirects tels que notamment les manques à gagner, les préjudices financiers et/ou les préjudices commerciaux consécutifs (atteinte à la réputation, perte de clientèle, etc.) subis par le Client ou tout tiers. <br><br>
                            7.5 En tout état de cause, la responsabilité d’ ACCESS ENERGIES quel que soit le fondement, et de manière générale toute indemnisation du Client, ne pourra excéder le montant des Prestations payées par le Client au titre du Contrat. <br><br>
                        </div>
                    <h2>8.	CONFIDENTIALITE ET PROPRIETE </h2>
                        <div class="block-mission-etc">
                            8.1 Tous rapports, livrables, bulletins de marché, analyses ou informations relatifs au marché énergétique préparés par ACCESS ENERGIES pour le Client demeureront la propriété d’ ACCESS ENERGIES et ne devront pas être communiqués par le Client à des tiers sans l’accord préalable écrit d’ ACCESS ENERGIES. <br><br>
                            8.2 Chaque Partie s’engage à respecter, pendant toute la durée du Contrat ainsi qu'après sa cessation, la confidentialité des informations et documents concernant l’autre Partie et/ou ses activités, et mentionnés comme confidentiels. <br><br>
                            8.3 L’obligation de confidentialité ne constitue pas un obstacle à la divulgation d’informations lorsque ces informations doivent être révélées en vertu d’une loi ou d’un règlement, d’une décision de justice, d’une délibération rendue par la Commission de Régulation de <br><br>
                            12.5 En cas de contradiction, les dispositions contenues dans les documents suivants s’appliqueront dans l’ordre décroissant de priorité suivant :<br><br>
                            <div class="cpp-anexe">
                                1.	CPP<br>
                                2.	Annexe<br>
                                3.	CGP<br>
                            </div>
                        

                        </div>
                    <h2>13.	LOI APPLICABLE ET JURIDICTION COMPETENTE</h2>
                        <div class="block-mission-etc">
                            13.1 Le Contrat est régi par le droit français. <br><br>
                            13.2 En cas de contestation ou de litige, les Parties s’efforceront de trouver une solution à l’amiable. <br><br>
                            13.3 Si le désaccord persiste, les tribunaux de Paris seront seuls compétents, même en cas de référé, d'appel en garantie, de demande incidente ou de pluralité de défendeurs.<br><br>                       
                        </div>
                    <h2>14.	DONNEES A CARACTERE PERSONNEL</h2>
                        <div class="block-mission-etc">
                            ACCESS ENERGIES veille au respect des dispositions règlementaires et légales relatives à la protection des données personnelles.   ACCESS ENERGIES est susceptible de collecter et traiter les données à caractère personnel de ses interlocuteurs, dans le cadre du Contrat. Ces données sont collectées pour les seuls besoins de l’exécution du Contrat. Conformément à cette loi, il est rappelé que chaque individu dispose d’un droit d’accès, d’interrogation, de rectification, d’opposition, d’effacement, de limitation de traitement et de récupération sur toute donnée personnelle le concernant. Ces droits peuvent être exercés à tout moment en contactant ACCESS ENERGIES.
                        </div>
                </div>
            </div>
        </ul>
    </div>
    
</body>
</html>`