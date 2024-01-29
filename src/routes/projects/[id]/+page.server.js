import { redirect } from '@sveltejs/kit';
import db from "../../../lib/db.js";
import { v4 as uuid } from 'uuid';

export async function load({ cookies, params }) {
    const user_cookie = cookies.get("user");
    if (!user_cookie) throw redirect(301, "/login");

    const user = JSON.parse(user_cookie);
    const new_user = await db.collection("users").findOne({ email: user.email });
    const project = new_user.projects.find((p) => p.id === params.id);
    return { user: JSON.parse(JSON.stringify(new_user)), project };
}

export const actions = {
    deleteproject: async({ cookies, params }) => {
        const user_cookie = cookies.get("user");
        if (!user_cookie) throw redirect(301, "/login");

        const user = JSON.parse(user_cookie);
        const new_user = await db.collection("users").findOne({ email: user.email });
        const project = new_user.projects.find((p) => p.id === params.id);

        new_user.projects.splice(new_user.projects.indexOf(project), 1);
        await db.collection("users").updateOne({ email: user.email }, { $set: { projects: new_user.projects } });
        throw redirect(301, "/projects");
    },

    addinv: async({ cookies, request, params }) => {
        const user_cookie = cookies.get("user");
        if (!user_cookie) throw redirect(301, "/login");

        const user = JSON.parse(user_cookie);
        const new_user = await db.collection("users").findOne({ email: user.email });
        const project = new_user.projects.find((p) => p.id === params.id);

        const data = await request.formData();
        if (!Number(data.get("size"))) return { success: false, err_type: "addinv", message: "Invalid size!" }
        if (![1, 2, 3, 4, 5, 6].includes(Number(data.get("size")))) return { success: false, err_type: "addinv", message: "Invalid size!" }

        project.inventories.push({ id: uuid(), title: data.get("title"), size: Number(data.get("size")) * 9, items: [] });
        await db.collection("users").updateOne({ email: user.email }, { $set: { projects: new_user.projects } });
        return { success: true };
    },

    removeinv: async({ cookies, request, params }) => {
        const user_cookie = cookies.get("user");
        if (!user_cookie) throw redirect(301, "/login");

        const user = JSON.parse(user_cookie);
        const new_user = await db.collection("users").findOne({ email: user.email });
        const project = new_user.projects.find((p) => p.id === params.id);

        const data = await request.formData();
        const inventory = project.inventories.find((i) => i.id === data.get("id"));
        if (!inventory) return { success: false, err_type: "removeinv", message: "Invalid inventory!" }

        project.inventories.splice(project.inventories.indexOf(inventory), 1);
        await db.collection("users").updateOne({ email: user.email }, { $set: { projects: new_user.projects } });
        return { success: true };
    }
}