const { gql } = require('apollo-server-express');
const { MailtrapClient } = require('mailtrap');

// Configuración de Mailtrap
const TOKEN = "3447d7c8efd3aac922d5b51f5b538941"; // Cambia esto por tu token real si es necesario
const client = new MailtrapClient({ token: TOKEN });

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

// Esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    sendEmail(to: String!): String
  }
`;

// Resolver de la mutación `sendEmail`
const resolvers = {
  Query: {
    hello: () => "Hola, mundo!",
  },
  Mutation: {
    sendEmail: async (_, { to }) => {
      try {
        // Definir el contenido del email directamente como una cadena
        const htmlTemplate = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imágenes Responsivas</title>
    <style>
        /* Estilos generales para el contenedor de imágenes */
        .image-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        /* Haciendo las imágenes responsivas */
        .image-container img {
            width: 100%;
            height: auto;
        }

        /* Media query para pantallas más pequeñas (por ejemplo, teléfonos) */
        @media (max-width: 768px) {
            .image-container {
                grid-template-columns: 1fr 1fr; /* 2 columnas en pantallas más pequeñas */
            }
        }

        @media (max-width: 480px) {
            .image-container {
                grid-template-columns: 1fr; /* 1 columna en pantallas muy pequeñas */
            }
        }
    </style>
</head>
<body>
    <h1>Compra exitosa</h1>
    <h2>Su compra de $1500.00 se a realizado con exito</h2>
    <div class="image-container">
        <img src="https://content.emarket.pe/common/collections/products/8c/56/8c563cdc-f0df-4e69-bb51-a97df5d4e0a7.jpg" alt="Imagen 1">
        <img src="https://lego.juguetron.mx/media/catalog/product/7/5/75389_boxprod_v39_sha.jpg?optimize=high&fit=bounds&height=560&width=560" alt="Imagen 2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTivlGfauxKcCsNsoq8tMiCdNaW5gTFUgGK8Q&s" alt="Imagen 3">
    </div>

</body>
</html>


        `;

        // Configuración del correo
        const recipients = [{ email: to }];
        await client.send({
          from: sender,
          to: recipients,
          subject: "You are awesome!",
          html: htmlTemplate,
          category: "Integration Test",
        });

        return "Correo enviado con éxito";
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        return "Hubo un error al enviar el correo";
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
