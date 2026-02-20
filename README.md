Atutenticacion-JWT (Work In Progress)

Proyecto en TypeScript cuyo objetivo es demostrar diferentes estrategias de autenticación en aplicaciones backend, incluyendo:

🔑 Autenticación con AWS Cognito
🪪 Autenticación basada en JSON Web Tokens (JWT)
--------------------------------

Comparación entre autenticación gestionada (Cognito) vs autenticación manual con JWT

Buenas prácticas de manejo de secretos y configuración

⚠️ Proyecto en desarrollo. Actualmente se encuentra implementada la integración básica con AWS Cognito.

🎯 Objetivo del Proyecto
--------------------------------

Este proyecto busca:

Comprender el flujo completo de autenticación con AWS Cognito.

Implementar validación de tokens JWT.

Comparar arquitecturas:

Identity Provider externo (Cognito)

Emisión y validación manual de JWT

Aplicar buenas prácticas de seguridad (uso de variables de entorno, separación de configuración, etc).

🧱 Stack Tecnológico
--------------------------------

TypeScript

AWS Cognito

jsonwebtoken

dotenv

AWS SDK v3

📌 Funcionalidades Implementadas Hasta Ahora
--------------------------------
# ✅ 1. Configuración de AWS Cognito

Creación de User Pool

Creación de App Client

Configuración de flujo de autenticación

Manejo de:

SignUp

ConfirmSignUp

SignIn

Manejo de SECRET_HASH cuando el client tiene secret configurado

Validación de errores comunes como:

USER_PASSWORD_AUTH flow not enabled

Client configured with secret but SECRET_HASH was not received

Atributos requeridos no enviados

# ✅ 2. Registro de Usuario (SignUp)

Se implementó:

Endpoint para registro

Envío de atributos requeridos

Generación de SECRET_HASH

Confirmación vía código recibido por email

# ✅ 3. Confirmación de Usuario

Endpoint para confirmar usuario

Recepción de código enviado por correo

Confirmación en Cognito

# ✅ 4. Login (SignIn)

Autenticación con flujo:

USER_PASSWORD_AUTH

Recepción de:

Access Token

ID Token

Refresh Token

# ✅ 5. Manejo de Variables de Entorno

Se implementó uso de:

COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
COGNITO_CLIENT_SECRET=
AWS_REGION=

Y uso de dotenv para evitar hardcodear secretos.

📂 Estructura General del Proyecto (Actual)
--------------------------------

src/
 ├── config/
 ├── controllers/
 ├── services/
 ├── utils/
 ├── routes/
 └── index.ts

Esta estructura puede evolucionar conforme se agreguen más métodos de autenticación.

🔄 En Progreso
--------------------------------

Pendiente por implementar:

🔲 Validación manual de JWT

🔲 Middleware de autorización

🔲 Ejemplo comparativo Cognito vs JWT manual

🔲 Refresh Token flow

🔲 Protección de rutas privadas

🔲 Manejo de roles y claims

🔲 Integración opcional con frontend

🔲 Tests

🧠 Conceptos Cubiertos Hasta Ahora
--------------------------------

Identity Provider (IdP)

User Pools

App Clients

Flujos de autenticación en Cognito

SECRET_HASH

Confirmación por código

Tokens JWT emitidos por Cognito

📌 Próxima Fase del Proyecto
--------------------------------

La siguiente etapa será:

Implementar autenticación manual usando la librería jsonwebtoken.

Crear comparación técnica:

Control

Seguridad

Escalabilidad

Complejidad operativa

Agregar middleware de protección de rutas.

📖 Motivación
--------------------------------

Este proyecto forma parte de un aprendizaje enfocado en:

Backend avanzado con TypeScript

Arquitecturas seguras

DevOps + AWS

Diseño de sistemas autenticados modernos

## License
This project is licensed under the MIT License.