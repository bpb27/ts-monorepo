# Turborepo Configuration Guide

This document explains what our `turbo.json` file does and how it orchestrates tasks across our monorepo.

## What is Turborepo?

Turborepo is a build system that helps manage multiple packages/apps in a single repository (monorepo). It intelligently runs tasks across your workspace, caching results and running tasks in parallel when possible.

## Apps and packages

- Apps are deployable applications
- Packages are shared libraries
- Boundaries:
  - Apps can depend on packages
  - Apps cannot depend on other apps
  - Packages can depend on other packages (but use sparingly)
  - Packages cannot depend on apps

There is one case where the boundaries are strained - a client app relying on the API contract of a server app. In this case, we use code generation to take the server app's API contract and place it in a package. The client can then depend on that package rather than the server app directly.

## Our Current Configuration

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULTS", ".env*"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^test"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## Tasks

Each task corresponds to a script defined in `/apps/*/package.json` and `/packages/*/package.json`.

Example: `turbo run test` will run the `test` script defined in `apps/admin-web-service/package.json`, along with every app and package that has a `test` script defined.

When `dependsOn` is specified, it will run the specified task for dependencies first. So if `apps/admin-web-app` depends on `packages/ui`, it will test the `ui` package first before testing `admin-web-app`. This helps catch errors higher in the dependency chain.

If `dependsOn` is not specified, all matching tasks will be run in parallel.

Turbo will cache the results of tasks by default. The cache will hit if the source files haven't changed, or if anything specified via `inputs` hasn't changed.

#### Task: build

```json
"build": {
  "dependsOn": ["^build"],
  "inputs": ["$TURBO_DEFAULTS", ".env*"],
  "outputs": ["dist/**"]
}
```

**What it does:**

- `"dependsOn": ["^build"]`: Before building any package, first build all of its dependencies
  - The `^` means "dependencies of this package"
  - Example: If `admin-web-app` depends on `ui`, `ui` will build first
- `"inputs"`: Files that affect the build output
  - `"$TURBO_DEFAULTS"`: Standard files like `package.json`, `tsconfig.json`, and source files
  - `".env*"`: Any environment files (`.env`, `.env.local`, etc.)
- `"outputs": ["dist/**"]`: Where build artifacts are created
  - Turbo will cache these files to avoid rebuilding unchanged packages

#### Task: dev

```json
"dev": {
  "cache": false,
  "persistent": true
}
```

**What it does:**

- `"cache": false`: Never cache dev server results (since dev servers are always changing)
- `"persistent": true`: This task runs continuously (like a dev server) and won't exit
- No `dependsOn` means dev servers can start in parallel

## How to Use These Tasks

### Running Tasks

```bash
# Build all packages
pnpm turbo build

# Run dev servers for all apps
pnpm turbo dev

# Lint everything
pnpm turbo lint

# Run all tests
pnpm turbo test
```

### Running Tasks for Specific Packages

```bash
# Build only the user-service and its dependencies
pnpm turbo build --filter=user-service

# Run dev server for admin-web-app only
pnpm turbo dev --filter=admin-web-app
```

## Key Benefits

1. **Smart Dependency Management**: Tasks run in the correct order based on package dependencies
2. **Caching**: Turbo caches task results, so unchanged packages don't rebuild
3. **Parallelization**: Independent tasks run in parallel for faster execution
4. **Incremental Builds**: Only rebuilds what has changed

## Common Scenarios

### Adding a New Task

To add a new task (like `deploy`), add it to the `tasks` object:

```json
"deploy": {
  "dependsOn": ["build"],
  "inputs": ["dist/**", "package.json"]
}
```

### Debugging Cache Issues

If you suspect caching issues:

```bash
# Clear turbo cache
pnpm turbo build --force

# Or delete cache entirely
rm -rf .turbo
```

### Understanding Task Dependencies

The `^` symbol is crucial:

- `"dependsOn": ["^build"]` = "build my dependencies first"
- `"dependsOn": ["build"]` = "run my own build task first" (usually not what you want)
- `"dependsOn": ["^build", "codegen"]` = "build dependencies AND run my codegen task first"

## Related Files

- `package.json`: Contains the actual task scripts that turbo runs
- `.turbo/`: Cache directory (git-ignored)
- Individual package `package.json` files: Define the actual commands turbo executes
