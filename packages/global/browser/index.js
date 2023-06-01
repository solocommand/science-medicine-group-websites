import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';
import PhotoSwipe from '@parameter1/base-cms-marko-web-photoswipe/browser';
import Auth0 from '@science-medicine-group/package-auth0/browser';
import Braze from '@science-medicine-group/package-braze/browser';
import FormLogin from './form-login.vue';
import Rudderstack from './rudderstack.vue';
import Auth0Authenticated from './auth0-authenticated.vue';

const GlobalNewsletterMenu = () => import(/* webpackChunkName: "global-newsletter-menu" */ './newsletter-menu.vue');

export default (Browser) => {
  const { EventBus } = Browser;
  MonoRail(Browser, {
    enableOmedaIdentityX: false,
    idxArgs: {
      CustomLoginComponent: FormLogin,
    },
  });
  Browser.register('Auth0Authenticated', Auth0Authenticated, {
    provide: { EventBus },
  });
  Browser.register('GlobalNewsletterMenu', GlobalNewsletterMenu, {
    provide: { EventBus },
  });
  PhotoSwipe(Browser);
  Auth0(Browser);
  Braze(Browser);

  // Rudderstack identification
  Browser.register('Rudderstack', Rudderstack, { provide: { EventBus } });

  EventBus.$on('identity-x-change-email-link-sent', () => {
    // "reload" the page to update user state
    window.location.search = 'sent=true';
  });
};
