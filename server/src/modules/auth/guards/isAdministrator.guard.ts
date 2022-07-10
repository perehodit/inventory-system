import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsAdministrator implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { isAdministrator } = request.user;

    return isAdministrator;
  }
}
