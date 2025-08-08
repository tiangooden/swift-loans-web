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

npx prisma init
npx prisma db pull
npx prisma generate
npx prisma db push

KEYCLOAK_CLIENT_ID=swift-loans-web
KEYCLOAK_CLIENT_SECRET=
KEYCLOAK_ISSUER=http://localhost:8080/realms/swift-loans
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000