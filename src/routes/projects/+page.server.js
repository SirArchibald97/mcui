import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const user = cookies.get("user");
    if (!user) throw redirect(301, "/login");
    else return { user: JSON.parse(user) };
}