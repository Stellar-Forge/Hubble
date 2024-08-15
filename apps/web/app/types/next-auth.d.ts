import "next-auth";

declare module "next-auth" {
    // eslint-disable-next-line no-unused-vars
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
