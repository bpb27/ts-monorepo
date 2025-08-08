ASDF:

```bash
asdf install nodejs 24.4.1
corepack enable pnpm
asdf reshim nodejs
```

Create the databases locally:

```bash
psql postgres
CREATE DATABASE webplatformauth;
CREATE DATABASE webplatformadmin;
CREATE DATABASE webplatformuser;
```

Create .env files from the examples:

```bash
find . -type f -name ".env.example" | while read example_file; do
  env_file="${example_file%.example}" # Replace .env.example → .env
  if [ ! -f "$env_file" ]; then
    cp "$example_file" "$env_file"
    echo "Created $env_file"
  else
    echo "$env_file already exists, skipping"
  fi
done
```

Install dependencies:

```bash
pnpm install
```
