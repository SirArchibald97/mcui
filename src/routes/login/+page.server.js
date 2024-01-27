import { redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import db from '../../lib/db';

/** @type {import('./types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const user = await db.collection("users").findOne({ $or: [{ email: data.get('email') }, { username: data.get('email')}] });
        if (!user) return { success: false, message: "Invalid email/username or password!" };
        
        const result = await bcrypt.compare(data.get('password'), user.password);
        if (!result) return { success: false, message: "Invalid email/username or password!" };

        cookies.set("user", JSON.stringify(user), { path: "/", "maxAge": (data.get("remember") === "on" ? 60 * 60 * 24 * 7 : 0) });
        throw redirect(301, "/projects");
    }
}