// src/pages/api/signup.js
import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request }) => {
    const { name, email, password, passwordConfirm } = await request.json();
    
    try {
        // Création de l'utilisateur dans PocketBase
        const record = await pb.collection(Collections.Users).create({
            name,
            email,
            password,
            passwordConfirm,
            emailVisibility: true, // Permet de voir l'email (optionnel)
        });

        console.log("Utilisateur créé avec succès:", record.id);
        
        return new Response(
            JSON.stringify({ 
                success: true, 
                message: "Compte créé avec succès",
                userId: record.id 
            }), 
            { status: 201 }
        );
    } catch (err) {
        console.error("Erreur lors de la création du compte:", err);
        
        // Gestion des erreurs spécifiques
        let errorMessage = "Erreur lors de la création du compte";
        
        if (err.data?.data) {
            // Extraction des messages d'erreur de PocketBase
            const errors = err.data.data;
            if (errors.email) {
                errorMessage = "Cet email est déjà utilisé";
            } else if (errors.password) {
                errorMessage = "Le mot de passe ne respecte pas les critères requis";
            }
        }
        
        return new Response(
            JSON.stringify({ error: errorMessage }), 
            { status: 400 }
        );
    }
};