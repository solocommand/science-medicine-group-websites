
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';
import Auth0 from '@science-medicine-group/package-auth0/browser';
import Braze from '@science-medicine-group/package-braze/browser';
import FormLogin from './form-login.vue';
import Rudderstack from './rudderstack.vue';

const GlobalNewsletterMenu = () => import(/* webpackChunkName: "global-newsletter-menu" */ './newsletter-menu.vue');
const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');

export default (Browser) => {
  const { EventBus } = Browser;
  MonoRail(Browser, {
    enableOmedaIdentityX: false,
    idxArgs: {
      CustomLoginComponent: FormLogin,
    },
  });
  Browser.register('ContentMeterTrack', ContentMeterTrack);
  Browser.register('GlobalNewsletterMenu', GlobalNewsletterMenu, {
    provide: { EventBus },
  });
  Auth0(Browser);
  Braze(Browser);

  // Rudderstack identification
  Browser.register('Rudderstack', Rudderstack, { provide: { EventBus } });
};
