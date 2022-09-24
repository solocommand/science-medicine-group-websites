
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';
import FormLogin from './form-login.vue';

const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');

export default (Browser) => {
  MonoRail(Browser, {
    enableOmedaIdentityX: false,
    idxArgs: {
      CustomLoginComponent: FormLogin,
    },
  });
  Browser.register('ContentMeterTrack', ContentMeterTrack);
};
