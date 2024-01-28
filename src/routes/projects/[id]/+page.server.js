import { redirect } from '@sveltejs/kit';

export function load({ cookies, params }) {
    const user_cookie = cookies.get("user");
    if (!user_cookie) throw redirect(301, "/login");

    const user = JSON.parse(user_cookie);
    const project = user.projects.find((p) => p.id === params.id);
    return { user, project };
}