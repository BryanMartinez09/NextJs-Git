"use client";

import { useState, useEffect, FormEvent } from "react";
import { GitHubUserProfile } from "../types/users.types";
import { fetchGitHubUser } from "../services/user.service";

const PRESET_USERS = ["BryanMartinez09"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("BryanMartinez09");
  const [profile, setProfile] = useState<GitHubUserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (username: string) => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubUser(username);
      setProfile(data);
    } catch (err: unknown) {
      setProfile(null);
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser("BryanMartinez09");
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchUser(searchQuery);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-gray-800/80 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">GitSearchProfile</span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">NestJS + HeroUI</span>
            </div>
          </div>

          {/* <div className="flex items-center gap-2"> */}
            {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API: localhost:3000
            </span> */}
          {/* </div> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 flex flex-col gap-8 relative z-10">

        {/* Hero & Search Section */}
        <section className="text-center max-w-2xl mx-auto w-full flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Busca Perfiles de <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">GitHub</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Consulta métricas, detalles y repositorios en tiempo real usando esta API creada en NestJS y NextJs.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full mt-2 relative">
            <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-[#161b22] border border-gray-700/60 focus-within:border-blue-500/80 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
              <div className="pl-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Escribe un usuario de GitHub (ej: BryanMartinez09, octocat)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 px-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base"
              />

              <button
                type="submit"
                disabled={loading}
                className="mr-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-blue-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Buscando...
                  </>
                ) : (
                  "Buscar"
                )}
              </button>
            </div>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1 text-xs text-gray-400">
            <span className="text-gray-500">Búsquedas rápidas:</span>
            {PRESET_USERS.map((user) => (
              <button
                key={user}
                onClick={() => {
                  setSearchQuery(user);
                  fetchUser(user);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#161b22] hover:bg-gray-800 border border-gray-700/50 text-gray-300 hover:text-white transition-colors"
              >
                @{user}
              </button>
            ))}
          </div>
        </section>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={() => fetchUser(searchQuery)}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs font-semibold transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 animate-pulse">
            <div className="p-8 rounded-3xl bg-[#161b22]/70 border border-gray-800 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-28 h-28 rounded-full bg-gray-800" />
              <div className="flex-1 flex flex-col gap-3 w-full sm:w-auto">
                <div className="h-6 bg-gray-800 rounded-md w-1/3" />
                <div className="h-4 bg-gray-800 rounded-md w-1/4" />
                <div className="h-4 bg-gray-800 rounded-md w-2/3 mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#161b22]/50 border border-gray-800 h-24" />
              ))}
            </div>
          </div>
        )}

        {/* Profile Details Card */}
        {!loading && profile && (
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 animate-fadeIn">

            {/* Main Header Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-gray-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="w-28 h-28 rounded-full ring-4 ring-blue-500/20 border-2 border-gray-700 object-cover shadow-xl"
                  />
                  {profile.hireable && (
                    <span className="absolute bottom-0 right-0 bg-emerald-500 text-black font-bold text-[10px] uppercase px-2 py-0.5 rounded-full ring-2 ring-[#0d1117]" title="Disponible para contratar">
                      Hireable
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {profile.name || profile.login}
                      </h2>
                      <p className="text-blue-400 font-medium text-sm sm:text-base">
                        @{profile.login}
                      </p>
                    </div>

                    <a
                      href={profile.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                      Ver en GitHub
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  {profile.bio && (
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed max-w-2xl">
                      {profile.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Unido el {formatDate(profile.created_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      ID: {profile.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Bento Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#161b22]/70 border border-gray-800 hover:border-blue-500/40 transition-all flex flex-col gap-1 group">
                <span className="text-xs font-semibold text-gray-400 group-hover:text-blue-400 transition-colors">Repositorios</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{profile.public_repos}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#161b22]/70 border border-gray-800 hover:border-indigo-500/40 transition-all flex flex-col gap-1 group">
                <span className="text-xs font-semibold text-gray-400 group-hover:text-indigo-400 transition-colors">Seguidores</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{profile.followers}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#161b22]/70 border border-gray-800 hover:border-purple-500/40 transition-all flex flex-col gap-1 group">
                <span className="text-xs font-semibold text-gray-400 group-hover:text-purple-400 transition-colors">Siguiendo</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{profile.following}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#161b22]/70 border border-gray-800 hover:border-pink-500/40 transition-all flex flex-col gap-1 group">
                <span className="text-xs font-semibold text-gray-400 group-hover:text-pink-400 transition-colors">Gists Públicos</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{profile.public_gists}</span>
              </div>
            </div>

            {/* Additional Meta Details Grid */}
            <div className="p-6 rounded-2xl bg-[#161b22]/50 border border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Compañía</span>
                  <span className="font-medium">{profile.company || "No disponible"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Ubicación</span>
                  <span className="font-medium">{profile.location || "No especificada"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Sitio Web / Blog</span>
                  {profile.blog ? (
                    <a
                      href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-400 hover:underline truncate block max-w-xs"
                    >
                      {profile.blog}
                    </a>
                  ) : (
                    <span className="font-medium text-gray-500">No disponible</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">X / Twitter</span>
                  {profile.twitter_username ? (
                    <a
                      href={`https://twitter.com/${profile.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-400 hover:underline"
                    >
                      @{profile.twitter_username}
                    </a>
                  ) : (
                    <span className="font-medium text-gray-500">No especificado</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      <footer className="flex flex-col items-center justify-center py-6 mt-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-medium shadow-lg shadow-purple-500/20 border border-purple-400/20">
          <span className="font-semibold">Powered by:</span>
          <span className="font-semibold">Bryan Martinez</span>
        </div>
      </footer>
    </div>
  );
}
