export default defineNitroConfig({
  srcDir: 'server',
  runtimeConfig: {
    apiKey: '',
    dbMasterConnection: '',
    dbStageConnection: '',

    nitro: {
      envPrefix: 'APP_',
    },
  },
})
