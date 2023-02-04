# backend-components

## tabla de contenido

- [sobre el proyecto](#)
- [iniciar](#iniciar)
  - [lista de comandos](#lista-de-comandos)
- [Estructura de archivos](#estructura-de-archivos)

## iniciar

### lista de comandos

#### clonar repo

```
  git clone https://github.com/larnu-bootcamp/backend-components.git
```

#### instalar dependencias

```
  npm install
```

#### iniciar proyecto

```
  npm run dev
```

#### correr proyecto en producción

```
npm start
```

#### correr test

```
  npm test
```

#### formatear codigo

```
  npm run format
```

#### ver malas practicas
```
  npm eun lint
```

#### transpilar
```
 npm run build
```


## Estructura de archivos

```
  .
  └→ docs
  |  └→ docs.yaml
  |
  └→ img
  |  └→ dbDiagram.jpg
  |
  └→ src
  |  └→ config
  |  |
  |  └→ controllers
  |  |  └→ auth.controllers.ts
  |  |  └→ notification.controllers.ts
  |  |
  |  └→ entity
  |  |  └→ Notification.ts
  |  |  └→ User.ts
  |  |
  |  └→ middleware
  |  |  └→ notification.ts
  |  |  |  └→ notificationProgrammer.ts
  |  |  |  └→ sendNotification.ts
  |  |  |
  |  |  └→ errorHandle.ts
  |  |  └→ token.ts
  |  |
  |  └→ routers
  |  |  └→ auth.ts
  |  |  └→ notification.ts
  |  |
  |  └→ services
  |  |  └→ firebase
  |  |     └→ keys
  |  |     └→ firebase.config.ts
  |  |     └→ message.ts
  |  |
  |  └→ app.ts
  |  └→ data-source.ts
  |  └→ index.ts
  |
  └→ thunder-test
  |  └→ thunder-collection.json
  |  └→ thunderActivity.json
  |  └→ thunderclient.json
  |  └→ thunderCollection-.json
  |  └→ thunderEnvironment-.json
  |
  └→ .env_sample
  └→ .eslintignore
  └→ .eslintrc.js
  └→ .gitignore
  └→ .prettierignore
  └→ .prettierrc
  └→ package.json
  └→ README.md
  └→ tsconfig.md

```
