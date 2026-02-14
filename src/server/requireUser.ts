import { auth } from '@/server/auth';

export async function requireUser(headers: Headers) {
    const session = await auth.api.getSession({ headers});

    if (!session) {
        throw new Error("Unauthorized");
    }

    return session.user.id;
}