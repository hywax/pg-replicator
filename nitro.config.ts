export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-01-08',
  runtimeConfig: {
    apiKey: '',
    dbMasterConnection: '',
    dbStageConnection: '',

    nitro: {
      envPrefix: 'APP_',
    },
  },
})
