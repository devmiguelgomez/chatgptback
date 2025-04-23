# ChatGPT Backend

Este es el backend de la aplicación ChatGPT, desarrollado con Node.js, Express y MongoDB. Proporciona una API para interactuar con la API de OpenAI y almacenar el historial de conversaciones.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express**: Framework para construir APIs REST
- **MongoDB**: Base de datos NoSQL para almacenar conversaciones
- **OpenAI API**: Para generar respuestas basadas en inteligencia artificial
- **Mongoose**: ODM para interactuar con MongoDB
- **Cors**: Middleware para habilitar CORS
- **Dotenv**: Para manejar variables de entorno

## Estructura del proyecto

```
chatgptback/
├── controllers/
│   └── chatController.js    # Controladores para manejar solicitudes de chat
├── models/
│   └── Conversation.js      # Modelo de datos para las conversaciones
├── routes/
│   └── chatRoutes.js        # Definición de rutas de la API
├── .env                     # Variables de entorno (no incluido en  el repositorio)
├── .env.example             # Ejemplo de archivo de variables de entorno
├── .gitignore               # Archivos a ignorar por git
├── package.json             # Dependencias y scripts
├── README.md                # Este archivo
├── server.js                # Punto de entrada de la aplicación
└── vercel.json              # Configuración para despliegue en Vercel
```

## Requisitos previos

- Node.js (v14 o superior)
- MongoDB (local o en la nube)
- API Key de OpenAI

## Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/chat-gpt-app.git
   cd chat-gpt-app/chatgptback
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` basándote en `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edita el archivo `.env` y agrega tus credenciales:
   ```
   PORT=5000
   MONGODB_URI=tu-uri-de-mongodb
   OPENAI_API_KEY=tu-api-key-de-openai
   ```

## Ejecución

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000` (o el puerto que hayas configurado).

## API Endpoints

### Generar respuesta de ChatGPT
- **URL**: `/api/chat`
- **Método**: `POST`
- **Body**:
  ```json
  {
    "prompt": "Tu mensaje aquí"
  }
  ```
- **Respuesta**:
  ```json
  {
    "response": "Respuesta generada por ChatGPT"
  }
  ```

### Obtener historial de conversaciones
- **URL**: `/api/chat/history`
- **Método**: `GET`
- **Respuesta**:
  ```json
  [
    {
      "_id": "id-de-la-conversacion",
      "prompt": "Mensaje del usuario",
      "response": "Respuesta de ChatGPT",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```

## Despliegue

Este proyecto está configurado para desplegarse en Vercel mediante el archivo `vercel.json`. 
   ```

## Consideraciones de seguridad

- Nunca expongas tu API Key de OpenAI en el código fuente o en repositorios públicos
- Utiliza variables de entorno para manejar credenciales sensibles
- Implementa autenticación para proteger tus endpoints en un entorno de producción

## Modelo de OpenAI utilizado

El backend utiliza el modelo `gpt-4o-mini` de OpenAI, que ofrece un buen balance entre calidad de respuestas y velocidad. Las respuestas están configuradas para ser concisas (máximo 100 palabras) y utilizar emojis para mejorar la experiencia del usuario.
