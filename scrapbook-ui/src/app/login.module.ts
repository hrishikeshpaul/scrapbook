import { SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';

export const LoginProviders = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '134493171333-u42k36hpdfnjc96kjuav4fpm000sf4g0.apps.googleusercontent.com'
        )
      },
    ]
  } as SocialAuthServiceConfig,
};
