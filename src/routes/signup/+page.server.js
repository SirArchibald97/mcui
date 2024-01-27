import { redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import db from '../../lib/db';

/** @type {import('./types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const user = await db.collection("users").findOne({ $or: [{ email: data.get('email') }, { username: data.get('username') }] });
        console.log(data.get('email'), data.get('password'), data.get('confirm'));

        if (user) return { success: false, message: "Email or username already exists!" };
        if (data.get('password') !== data.get('confirm')) return { success: false, message: "Passwords do not match!" };

        const hash = await bcrypt.hash(data.get('password'), 10);
        await db.collection("users").insertOne({ username: data.get('username'), email: data.get('email'), password: hash, projects: [] });
        
        const new_user = await db.collection("users").findOne({ email: data.get('email') });
        cookies.set("user", JSON.stringify(new_user), { path: "/", "max-age": (data.get("remember") === "on" ? 60 * 60 * 24 * 30 : 0) });
        throw redirect(301, "/create");
    }
}