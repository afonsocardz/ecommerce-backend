import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  redirectToSwagger() {
    return { url: 'http://localhost:4001/api' };
  }
}
