const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');
const { typeDefs, resolvers } = require('./mutations'); // Importa tanto typeDefs como resolvers

const app = express();
const port = 5000;

// Crear el servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Función asíncrona para iniciar Apollo Server y aplicar middleware
async function startServer() {
  try {
    await server.start(); // Asegúrate de que Apollo Server haya iniciado
    server.applyMiddleware({ app }); // Aplica Apollo Server a Express

    // Servir archivos estáticos (HTML y CSS)
    app.use(express.static(path.join(__dirname, 'public')));

    // Iniciar el servidor Express
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

// Llamar a la función asíncrona para iniciar el servidor
startServer();
