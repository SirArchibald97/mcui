import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const user = cookies.get("user");
    if (user) cookies.delete("user", { path: "/" });

    throw redirect(301, "/");
}