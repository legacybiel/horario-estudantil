import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'openid-client';
import { UsuarioService } from '../../app/modules/usuario/usuario.service';
import { OPENID_CLIENT } from '../consts/OPENID_CLIENT.const';
import { IS_PRODUCTION_MODE } from '../consts/IS_PRODUCTION_MODE.const';
import { ResourceActionRequest } from './interfaces/ResourceActionRequest';
import { systemResourceActionRequest } from './SystemResourceActionRequest';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuarioService,
    @Inject(OPENID_CLIENT)
    private openIDClient: Client,
  ) {}

  async validateAccessToken(accessToken?: string | any) {
    try {
      if (typeof accessToken !== 'string' || accessToken?.length === 0) {
        throw new TypeError();
      }

      const userinfo = await this.openIDClient.userinfo(accessToken);

      const user = await this.userService.getUsuarioFromKeycloakId(
        systemResourceActionRequest,
        userinfo.sub,
      );

      return user;
    } catch (err) {
      if (!IS_PRODUCTION_MODE) {
        console.error('auth err:', { err });
      }

      throw err;
    }

    return false;
  }

  async getUsuarioResourceActionRequest(userId: number) {
    const regras = await this.userService.getUsuarioAutorizacaoRegras(
      systemResourceActionRequest,
      userId,
    );

    return ResourceActionRequest.forUser(userId, regras);
  }
}
