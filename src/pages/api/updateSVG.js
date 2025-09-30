import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request }) {
  try {
    const data = await request.json();
    console.log("Received data to update:", data);
    
    // Vérifier que l'ID est présent
    if (!data.id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID manquant" }), 
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Extraire l'ID et les données à mettre à jour
    const { id, ...updateData } = data;
    
    // S'assurer que les champs sont bien formatés
    const cleanData = {};
    if (updateData.code_svg !== undefined) {
      cleanData.code_svg = String(updateData.code_svg);
    }
    if (updateData.chat_history !== undefined) {
      cleanData.chat_history = String(updateData.chat_history);
    }
    if (updateData.name !== undefined) {
      cleanData.name = String(updateData.name);
    }
    
    console.log("Updating record with data:", cleanData);
    
    // Mettre à jour l'enregistrement dans PocketBase
    const record = await pb
      .collection(Collections.Save)
      .update(id, cleanData);
    
    console.log("SVG updated successfully with ID:", record.id);

    return new Response(
      JSON.stringify({ success: true, id: record.id, record }), 
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating SVG:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      data: error.data
    });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.data || "Aucun détail disponible"
      }), 
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}