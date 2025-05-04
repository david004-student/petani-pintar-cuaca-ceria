
/**
 * WhatsApp notification utility using Fonnte API
 */

// Fonnte API token
export const FONNTE_TOKEN = "GQ17HB7RTRgthYaSXkDe";

interface WhatsAppMessageParams {
  phone: string;
  message: string;
  imageUrl?: string; // Optional parameter for sending images
}

/**
 * Sends a WhatsApp message using Fonnte API
 * @param params The message parameters (phone number, message text, optional image URL)
 * @returns Promise with the API response
 */
export const sendWhatsAppMessage = async (params: WhatsAppMessageParams): Promise<any> => {
  const { phone, message, imageUrl } = params;
  
  try {
    // Create the request body
    const requestBody: Record<string, string> = {
      phone: phone,
      message: message,
    };
    
    // Add image URL if provided
    if (imageUrl) {
      requestBody.url = imageUrl;
    }
    
    // Make the API call to Fonnte
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": FONNTE_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    const result = await response.json();
    console.log("WhatsApp notification sent:", result);
    return result;
    
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    throw error;
  }
}
