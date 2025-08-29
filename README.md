This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

npx prisma init                      # create prisma/ and .env
npx prisma migrate dev --name <name> # create+apply migration (dev)
npx prisma migrate dev --create-only --name <name>  # create but don't apply
npx prisma migrate deploy            # apply pending migrations (CI/prod)
npx prisma migrate status            # check migration status
npx prisma generate
npx prisma db push                   # push schema (no migration files) - prototyping
npx prisma db pull                   # introspect DB into schema.prisma
npx prisma db seed                   # run seed script
npx prisma format
npx prisma studio                    # open visual DB explorer

DATABASE_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

KEYCLOAK_CLIENT_ID=
KEYCLOAK_CLIENT_SECRET=
KEYCLOAK_ISSUER=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

NEXT_PUBLIC_SWIFT_LOANS_API=

OBJECT_HOST=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=

REDIS_URL=
REDIS_CACHE_TIME=