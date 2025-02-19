import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secret: "Filmfusion12228",
    expiresIn: '1d',
}))