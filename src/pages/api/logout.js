// src/pages/api/logout.js
import pb from "../../utils/pb";

export const POST = async ({ cookies }) => {
    // Supprime le cookie d'authentification
    cookies.delete("pb_auth", { path: "/" });
    
    // Nettoie l'authStore de PocketBase
    pb.authStore.clear();
    
    // Redirige vers la page d'accueil
    return new Response(null, { 
        status: 303, 
        headers: { Location: '/' } 
    });
};