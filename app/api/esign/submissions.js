

export async function Submissions(id) {
    try {
        const submissionResponse = await fetch(`https://e-sign.accessenergies.fr/api/submissions/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": process.env.ESIGN_TOKEN
            }
        });

        const data = await submissionResponse.json()
        return data

    } catch (error) {
        console.log(error)
    }

}