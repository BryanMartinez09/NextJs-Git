import { GitHubUserProfile } from "../types/users.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchGitHubUser(username: string): Promise<GitHubUserProfile> {
  const trimmedUsername = username.trim();
  if (!trimmedUsername) {
    throw new Error("El nombre de usuario no puede estar vacío.");
  }

  const res = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(trimmedUsername)}`);

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`El usuario "${trimmedUsername}" no existe en GitHub.`);
    }
    const errData = await res.json().catch(() => null);
    throw new Error(
      errData?.message ||
        `No se pudo conectar con el servidor NestJS (asegúrate de que esté corriendo en ${API_BASE_URL})`,
    );
  }

  return res.json();
}
