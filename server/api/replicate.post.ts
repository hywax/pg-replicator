export default eventHandler(async () => {
  logger.start('Replicating database...')

  try {
    const { dbMasterConnection, dbStageConnection } = useRuntimeConfig()
    const masterDB = parseDBConnection(dbMasterConnection)
    const stageDB = parseDBConnection(dbStageConnection)

    logger.info('Creating dump from master database')

    await createDumpDBCommand(masterDB, 'master.dump')

    logger.info('Dropping and recreating stage database')

    await dropDBCommand(stageDB)
    await createDBCommand(stageDB)

    logger.info('Restoring dump to stage database')

    await restoreDBCommand(stageDB, 'master.dump')

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
