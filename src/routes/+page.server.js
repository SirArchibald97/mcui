export function load({ cookies }) {
    const user = cookies.get("user");
    if (user) return { user: JSON.parse(user) };
}