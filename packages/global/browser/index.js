
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';
import Braze from '@science-medicine-group/package-braze/browser';
import FormLogin from './form-login.vue';

const GlobalSiteNewsletterMenu = () => import(/* webpackChunkName: "global-site-newsletter-menu" */ './site-newsletter-menu.vue');
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
  Browser.register('GlobalSiteNewsletterMenu', GlobalSiteNewsletterMenu, {
    provide: { EventBus },
  });
  Braze(Browser);

  // Rudderstack identification
  EventBus.$on('identity-x-login-link-sent', ({ email }) => {
    const fn = window.rudderanalytics ? window.rudderanalytics.identify : () => {};
    fn({ email });
  });
  EventBus.$on('identity-x-authenticated', ({ id, email }) => {
    const fn = window.rudderanalytics ? window.rudderanalytics.identify : () => {};
    fn(id, { email });
  });
};
