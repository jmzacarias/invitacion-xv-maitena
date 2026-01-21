export const G_SCRIPT_URL = process.env.NEXT_PUBLIC_G_SCRIPT_URL;
export const saveToSheet = async (data, action = "create") => {
  try {
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