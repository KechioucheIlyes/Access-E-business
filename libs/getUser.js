export async function getUser() {
    try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
            const data = await response.json();

            return data;
        } else {

            return null;
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}
