import OpenAI from 'openai';
import Conversation from '../models/Conversation.js';
import dotenv from 'dotenv'
// Configurar OpenAI con manejo de errores mejorado
let openai;
try {
  const apiKey = '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'
  if (!apiKey) {
    throw new Error('La variable de entorno OPENAI_API_KEY no está definida')
  }

  openai = new OpenAI({ apiKey })
  console.log('✅ OpenAI configurado correctamente con API key fija');
} catch (error) {
  console.error('Error al inicializar OpenAI:', error);
}

// Generar respuesta de ChatGPT
export const generateChatResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'El prompt es requerido' });
    }

    if (!openai) {
      return res.status(500).json({ 
        error: 'No se ha configurado correctamente la API de OpenAI',
        message: 'Error interno del servidor al configurar OpenAI'
      });
    }

    // Llamada a la API de OpenAI con modelo gpt-4o para respuestas más avanzadas
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Eres un asistente amigable y útil. Tus respuestas deben ser concisas (máximo 100 palabras), claras e incluir emojis relevantes. Usa párrafos cortos para mejor legibilidad." 
        },
        { role: "user", content: prompt }
      ],
      max_tokens: 300, // Limitar tokens para respuestas más cortas
      temperature: 0.7, // Mantener algo de creatividad
    });

    const response = completion.choices[0].message.content;

    // Guardar la conversación en la base de datos
    const conversation = new Conversation({
      prompt,
      response,
    });

    await conversation.save();

    res.json({ response });
  } catch (error) {
    console.error('Error al generar la respuesta:', error);
    res.status(500).json({ 
      error: 'Error al procesar la solicitud',
      details: error.message 
    });
  }
};

// Obtener historial de conversaciones
export const getConversationHistory = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ createdAt: -1 }).limit(10);
    res.json(conversations);
  } catch (error) {
    console.error('Error al obtener el historial:', error);
    res.status(500).json({ error: 'Error al obtener el historial de conversaciones' });
  }
};
