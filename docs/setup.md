Get the required Node and PNPM versions via ASDF:

```bash
asdf install nodejs 24.4.1
corepack enable pnpm
asdf reshim nodejs
```

Create the database locally:

```bash
psql postgres
CREATE DATABASE ts-monorepo;
```

Install dependencies and run codegen:

```bash
pnpm install
pnpm codegen
```
