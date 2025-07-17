import * as dotenv from 'dotenv';
import { plainToInstance } from 'class-transformer';
import { IsString, IsNumber, validateSync } from 'class-validator';

dotenv.config();

class EnvironmentVariables {
  @IsString()
  DB_HOST!: string;

  @IsNumber()
  DB_PORT!: number;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  DB_NAME!: string;

  @IsString()
  DB_ROOT_PASSWORD!: string;

  @IsNumber()
  PORT!: number;
}

// Transforma y valida
const validatedConfig = plainToInstance(EnvironmentVariables, process.env, {
  enableImplicitConversion: true, // convierte automáticamente strings a números
});

const errors = validateSync(validatedConfig, { whitelist: true });
if (errors.length > 0) {
  throw new Error(
    `❌ Error en variables de entorno:\n${errors
      .map((e) => Object.values(e.constraints || {}).join(', '))
      .join('\n')}`,
  );
}

export default validatedConfig;
