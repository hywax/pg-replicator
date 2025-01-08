import { resolve } from 'node:path'
import process from 'node:process'

export default eventHandler(async () => {
  logger.start('Replicating database...')

  try {
    const { dbMasterConnection, dbStageConnection } = useRuntimeConfig()
    const masterDB = parseDBConnection(dbMasterConnection)
    const stageDB = parseDBConnection(dbStageConnection)
    const dumpFilePath = resolve(process.cwd(), 'master.dump')

    logger.info('Creating dump from master database')

    await createDumpDBCommand(masterDB, dumpFilePath)

    logger.info('Dropping and recreating stage database')

    await dropDBCommand(stageDB)
    await createDBCommand(stageDB)

    logger.info('Restoring dump to stage database')

    await restoreDBCommand(stageDB, dumpFilePath)

    logger.success('Replication complete')

    return {
      message: 'Replication complete',
    }
  } catch (error) {
    logger.error(error)
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'Replication failed',
  })
})
