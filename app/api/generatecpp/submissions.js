

export async function SubmissionEsign(pdfID) {
    try {
        const res = await fetch(`https://e-sign.accessenergies.fr/api/submissions/${pdfID}`,
            {
                method: "GET",
                headers: {
                    'X-Auth-Token': process.env.ESIGN_TOKEN,
                    "Content-Type": "application/json"
                }
            })

        if (res.ok) {
            const data = await res.json()
            return data
        }
    } catch (error) {
        console.log('error:', error)
    }

}