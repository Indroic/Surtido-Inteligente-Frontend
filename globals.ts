const env = process.env;

export const BACKEND_URL = env.API_URL || "http://localhost:3000";
export const BACKEND_API_URL = `${BACKEND_URL}/api`;
export const BACKEND_OAUTH_CLIENT_SECRET = env.API_OAUTH_CLIENT_SECRET || "";
export const BACKEND_OAUTH_CLIENT_ID = env.API_OAUTH_CLIENT_ID || "";
