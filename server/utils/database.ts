import { exec } from 'node:child_process'

interface DbConnectionParams {
  host: string
  port: number
  user: string
  password: string
  database: string
  ssl?: boolean
}

function execCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message)
      } else {
        resolve(stdout)
      }
    })
  })
}

export function createDumpDBCommand(params: DbConnectionParams, filePath: string): Promise<string> {
  return execCommand(
    `PGPASSWORD="${params.password}" pg_dump -h ${params.host} -p ${params.port} -U ${params.user} -F c -b -v -f ${filePath} ${params.database}`,
  )
}

export function dropDBCommand(params: DbConnectionParams): Promise<string> {
  return execCommand(
    `PGPASSWORD="${params.password}" psql -h ${params.host} -p ${params.port} -U ${params.user} -c "DROP DATABASE IF EXISTS ${params.database};"`,
  )
}

export function createDBCommand(params: DbConnectionParams): Promise<string> {
  return execCommand(
    `PGPASSWORD="${params.password}" psql -h ${params.host} -p ${params.port} -U ${params.user} -c "CREATE DATABASE ${params.database};"`,
  )
}

export function restoreDBCommand(params: DbConnectionParams, filePath: string): Promise<string> {
  return execCommand(
    `PGPASSWORD="${params.password}" pg_restore -h ${params.host} -p ${params.port} -U ${params.user} -d ${params.database} -v ${filePath}`,
  )
}

export function parseDBConnection(connectionString: string): DbConnectionParams {
  const url = new URL(connectionString)

  if (url.protocol !== 'postgres:' && url.protocol !== 'postgresql:') {
    throw createError('Invalid connection string: protocol must be \'postgres\' or \'postgresql\'.')
  }

  return {
    host: url.hostname,
    port: Number.parseInt(url.port || '5432', 10),
    user: url.username,
    password: decodeURIComponent(url.password || ''),
    database: url.pathname.replace(/^\//, ''),
    ssl: url.searchParams.get('ssl') === 'true',
  }
}
