## Aula 1 - #rumoaoproximonivel

```
yarn init -y
yarn add express
yarn add @types/express -D
yarn add typescript -D
yarn tsc --init
```

em ./tsconfig.json mudar para "strict": false

```
yarn add ts-node-dev -D
```

em ./package.json abaixo de "license":
```json
  "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  },
```

para rodar: 
```
yarn dev
```



## Aula 2 - Banco de Dados - #jornadainfinita

```
yarn add typeorm reflect-metadata
yarn add sqlite3
```

```
touch ormconfig.json
```

Em ./ormconfig.json:
```json
{
  "type": "sqlite",
  "database": "./src/database/database.sqlite",
  "logging": true,
  "migrations":["./src/database/migrations/**.ts"],
  "entities": ["./src/models/**.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}

```

```
cd ./src
mkdir database
cd ./database
touch index.ts
mkdir migrations
touch
```

Em ./src/database/index.ts
```ts
import { createConnection } from 'typeorm';

createConnection();
```

```
yarn add uuid
yarn add @types/uuid -D
```
