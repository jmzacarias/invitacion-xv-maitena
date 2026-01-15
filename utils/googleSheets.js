export const G_SCRIPT_URL = process.env.NEXT_PUBLIC_G_SCRIPT_URL;
export const saveToSheet = async (data, action = "create") => {
  try {
    // Si es delete, enviamos la data como viene. 
    // Si es create, la envolvemos en "rows" para que el Google Script la reconozca.
    const body = action === "delete" ? data : { rows: data }; 
    
    await fetch(G_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return true;
  } catch (error) {
    console.error("Error en saveToSheet:", error);
    return false;
  }
};