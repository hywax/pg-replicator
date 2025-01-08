export default eventHandler(async (event) => {
  if (event.method === 'GET') {
    return
  }

  const { apiKey } = useRuntimeConfig()
  const { apiKey: requestApiKey } = await readBody<{ apiKey: string }>(event)

  if (!requestApiKey || requestApiKey !== apiKey) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
})
