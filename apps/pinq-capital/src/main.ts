import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalExceptionsFilter } from "./filter/global-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>("PORT") || 8080;

  app.enableCors({
    allowedHeaders: ["content-type", "Authorization"],
    origin: "*",
    credentials: true,
  });

  app.setGlobalPrefix("v1/api");

  // Register the global exception filter
  app.useGlobalFilters(new GlobalExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle("PINQ Capital")
    .setDescription("Platform for unsecured loans")
    .setVersion("1.0")
    // .addTag('Bacancy') // Use the same tag as in @ApiTags
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(port, () => {
    console.log(`Server started at Port: ${port}`);
  });
}
bootstrap();
