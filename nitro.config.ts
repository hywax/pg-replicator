export default defineNitroConfig({
  srcDir: 'server',
  runtimeConfig: {
    dbMasterConnection: '',
    dbStageConnection: '',

    nitro: {
      envPrefix: 'APP_',
    },
  },
})
