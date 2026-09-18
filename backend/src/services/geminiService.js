// Google Gemini Agricultural AI Service

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const AGRONOMIST_SYSTEM_PROMPT = `You are "Sathi", an expert Indian agronomist, agricultural scientist, and personal farming companion for Kishan Sathi.

Your Mission:
Help Indian farmers maximize crop yield, minimize pest damage, save fertilizer/water costs, and understand market prices.

Key Guidelines:
1. Language & Tone:
   - Respond in the language used by the farmer (Hindi, Hinglish, Punjabi, Marathi, English, etc.).
   - Use warm, respectful, practical Indian farming terminology (e.g., Rabi, Kharif, Zaid, Desi, NPK, Boron, Zinc, quintal, bigha, acre).
   - If the user asks in Hinglish (e.g., "Wheat me kitna pani de?"), reply in clear, friendly Hinglish.

2. Agricultural Accuracy:
   - Follow ICAR (Indian Council of Agricultural Research), state agricultural universities (PAU, HAU, TNAU, etc.), and Krishi Vigyan Kendra (KVK) standards.
   - Provide exact dosages for fertilizers (e.g., Urea, DAP, MOP, SSP in kg/acre or kg/ha) and split application stages (basal, tillering, flowering).
   - For pests and diseases: Recommend Integrated Pest Management (IPM) — biological/cultural control first, then safe chemical fungicides/insecticides with exact dosages (ml/L or g/L) and safety waiting periods.
   - Advise safety precautions when applying chemical sprays.

3. Formatting:
   - Use bullet points, bold key numbers/dosages, and short paragraphs for readability on mobile screens.
   - Conclude with a helpful tip or encouraging word with friendly farming emojis (🌾, 🌱, 🚜, 💧, ☀️).`;

// Offline fallback engine for farming queries in case of network issue or quota limit
const OFFLINE_KNOWLEDGE = [
  {
    keywords: ['urea', 'fertilizer', 'khad', 'nitrogen', 'dap', 'npk'],
    reply: `For major cereal crops (Wheat, Paddy, Maize):\n\n• **Urea Application Schedule**:\n  - 50% as basal / first irrigation (21 days after sowing)\n  - 25% at active tillering stage (40-45 days)\n  - 25% at panicle/jointing stage (65-70 days)\n\n• **Pro Tip**: Avoid applying urea in standing flood water. Apply when soil is moist and incorporate. Total nitrogen should not exceed 120-130 kg/ha to avoid crop lodging and fungal blast! 🌾`
  },
  {
    keywords: ['wheat', 'gehu', 'gehun', 'sowing', 'beej', 'seed rate'],
    reply: `**Wheat Cultivation Best Practices**:\n\n• **Sowing Time**: 25 October to 15 November is optimal for North & Central India. Sowing after Nov 15 reduces yield by ~1.2% per day.\n• **Recommended Varieties**: PBW-725, HD-3086, HD-2967, DBW-187 (Karan Vandana).\n• **Seed Rate**: 100-110 kg/ha (approx 40-45 kg/acre) using a zero-till seed drill.\n• **Seed Treatment**: Treat seeds with Carboxin + Thiram @ 2g/kg or Trichoderma viride @ 5g/kg before sowing. 🌱`
  },
  {
    keywords: ['paddy', 'dhan', 'rice', 'blast', 'sheath'],
    reply: `**Paddy Care & Protection**:\n\n• **Blast & Sheath Blight Management**: If you see spindle-shaped spots on leaves, spray Tricyclazole 75% WP @ 0.6 g/L or Azoxystrobin + Difenoconazole @ 1 ml/L.\n• **Water Management**: Maintain 2-3 cm shallow water during tillering, but drain field for 2 days before fertilizer application.\n• **Stem Borer**: Install pheromone traps @ 8 traps/acre or broadcast Chlorantraniliprole 0.4% G @ 4 kg/acre. 🌾`
  },
  {
    keywords: ['pest', 'keeda', 'bollworm', 'insect', 'spray', 'dawa'],
    reply: `**Integrated Pest Management (IPM)**:\n\n• **Early Stage**: Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 1500 ppm @ 3-5 ml/L of water.\n• **Chewing Insects / Caterpillars**: Use Emamectin Benzoate 5% SG @ 0.5 g/L or Chlorantraniliprole 18.5% SC @ 0.3 ml/L.\n• **Sucking Pests (Aphids, Jassids, Whitefly)**: Spray Imidacloprid 17.8% SL @ 0.3 ml/L or Thiamethoxam 25% WG @ 0.5 g/L.\n• Always spray during calm weather (early morning or after 4 PM). 🚜`
  },
  {
    keywords: ['yellow', 'peela', 'leaves', 'patte', 'rust'],
    reply: `**Yellowing Leaves Diagnosis**:\n\n1. **Nitrogen Deficiency**: Older bottom leaves turn uniformly yellow from tip inward (V-shape). Remedy: Apply Urea top-dressing or 2% Urea foliar spray.\n2. **Zinc Deficiency**: Khaira disease or bronze/brown rusty spots on young leaves. Remedy: Spray Zinc Sulphate (21%) @ 5g/L + 2.5g slaked lime.\n3. **Fungal Rust**: Orange/yellow powdery pustules on leaves. Remedy: Spray Propiconazole 25% EC @ 1 ml/L within 48 hours. 🔬`
  }
];

function getOfflineAnswer(query) {
  const q = (query || '').toLowerCase();
  for (const item of OFFLINE_KNOWLEDGE) {
    if (item.keywords.some((k) => q.includes(k))) {
      return item.reply;
    }
  }
  return `Namaste! I am Sathi, your farming advisor.\n\nRegarding your question: For best results on your farm, consider:\n1. Check current soil moisture before applying chemicals or watering.\n2. In case of insect or fungal spots, inspect the underside of leaves during morning hours.\n3. Verify certified seed varieties and fertilizer doses recommended by your local KVK / Agriculture Department.\n\nFeel free to ask specifically about fertilizer doses, pest sprays, or sowing calendars! 🌾`;
}

/**
 * Ask Gemini API with agricultural system context & multi-turn history
 */
export async function askGemini(userMessage, conversationHistory = [], farmContext = {}) {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  // If no API key is provided, use intelligent offline agri-engine
  if (!apiKey || apiKey === 'your_copied_key_here') {
    console.log('[GeminiService] No API key configured. Using local agricultural engine.');
    return {
      reply: getOfflineAnswer(userMessage),
      provider: 'offline_engine',
    };
  }

  try {
    // Format conversation history for Gemini API
    const contents = [];

    // Append past messages (keep last 6 for context)
    const recentHistory = conversationHistory.slice(-6);
    for (const msg of recentHistory) {
      if (!msg.text) continue;
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      });
    }

    // Build context string if farmer details or location are available
    let contextualUserMessage = userMessage;
    if (farmContext.location || farmContext.crop) {
      const contextPrefix = `[Farmer Context: Location: ${farmContext.location || 'India'}, Crop: ${farmContext.crop || 'General'}, Temp: ${farmContext.temp || 'Normal'}]\n`;
      contextualUserMessage = contextPrefix + userMessage;
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: contextualUserMessage }],
    });

    const requestBody = {
      systemInstruction: {
        parts: [{ text: AGRONOMIST_SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.4,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.warn(`[GeminiService] Gemini API returned HTTP ${res.status}:`, errBody);
      // If quota exceeded or temporary issue, fallback gracefully
      return {
        reply: getOfflineAnswer(userMessage),
        provider: 'fallback',
        warning: `Gemini API response: ${res.status}`,
      };
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    const generatedText = candidate?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return {
        reply: getOfflineAnswer(userMessage),
        provider: 'fallback',
      };
    }

    return {
      reply: generatedText.trim(),
      provider: 'gemini',
    };
  } catch (err) {
    console.error('[GeminiService Error]:', err.message);
    return {
      reply: getOfflineAnswer(userMessage),
      provider: 'fallback_offline',
    };
  }
}

export default {
  askGemini,
};
