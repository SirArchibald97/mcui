import { redirect } from '@sveltejs/kit';
import { v4 as uuid } from "uuid";
import db from "../../lib/db.js";

export async function load({ cookies }) {
    const user_cookie = cookies.get("user");
    if (!user_cookie) throw redirect(301, "/login");

    const user = JSON.parse(user_cookie);
    const new_user = await db.collection("users").findOne({ email: user.email });
    cookies.set("user", JSON.stringify(new_user), { path: "/" });
    return { user: JSON.parse(JSON.stringify(new_user)) };
}

export const actions = {
    new: async({ cookies }) => {
        const user_cookie = cookies.get("user");
        if (!user_cookie) throw redirect(301, "/login");

        const user = JSON.parse(user_cookie);
        const project_id = uuid();
        user.projects.push({ id: project_id, title: `New Project ${user.projects.length + 1}`, created: Date.now(), inventories: [], private: true });
        await db.collection("users").updateOne({ email: user.email }, { $set: { projects: user.projects } });
        throw redirect(301, `/projects/${project_id}`);
    }
}