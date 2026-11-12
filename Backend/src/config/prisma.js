import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.ts'
import { env } from './env.js'

// The Postgres schema comes from `?schema=` in DATABASE_URL (default: public), so the
// app can share a database with other projects without its tables clashing.
const schema = new URL(env.databaseUrl).searchParams.get('schema') || 'public'

// One client (and connection pool) per process.
const adapter = new PrismaPg({ connectionString: env.databaseUrl }, { schema })

export const prisma = new PrismaClient({ adapter })
