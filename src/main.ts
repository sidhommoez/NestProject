import { Logger } from '@nestjs/common';
import * as config from 'config';
var figlet = require('figlet');
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';

//Swagger
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const serverConfig = config.get('server');
  const servderConfig = config.get('stripe');

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);


  // if (process.env.NODE_ENV === 'development'){
  // }
  app.use(helmet());

  app.enableCors({ origin: serverConfig.origin });
  logger.log(`Accepting requests from origin "${serverConfig.origin}"`);

  const options = new DocumentBuilder()
    .setTitle('BID API')
    .setDescription('This Is a BID Management API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port).then(response => {
    // Initialization intro message
    figlet('BID Management V1', (_, data) => {
      console.log('\x1b[1m\x1b[32m%s\x1b[0m', data)
      if (process.env.NODE_ENV !== 'production') {
        figlet('Powered By REST API', { font: 'Small' }, (_, data) => console.log('\x1b[35m%s\x1b[0m', data))
      }
    })
  })
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
