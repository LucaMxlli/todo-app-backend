# Backend instructions

## Setup

```bash
npm install
npm i -g prisma
docker-compose up -d
```

### Create .env file

```dosini
NODE_ENV=development
PORT=8080
DATABASE_URL="postgresql://coustra:SomethingSecure!123@localhost:5900/coustra?schema=coustra"
```

### setup Prisma DB

```bash
prisma format
prisma db push
prisma db seed
prisma studio
```

## Run

```bash
npm run dev
```
