import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
//import { appConfig } from './configuration/app.config';
// import getLogLevels from './providers/logger/getLogLevels';
import { ConfigurationType } from './configuration/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    // logger: getLogLevels(false), // true - for production
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore

  const configService = app.get(ConfigService<ConfigurationType, true>);
  const apiSettings = configService.get('apiSettings', { infer: true });
  const environmentSettings = configService.get('environmentSettings', {
    infer: true,
  });
  const PORT = apiSettings.PORT;

  app.setGlobalPrefix('api');
  // const createdApp = appConfig(app);
  // swaggerConfig(createdApp);

  await app.listen(PORT || 5001).then(async () => {
    console.log('ENV', environmentSettings.currentEnv);
    console.log(`Server is listening on ${PORT}`);
  });
  //connect to ngrok for development
  // await connectToNgrok(createdApp);
}
bootstrap();
