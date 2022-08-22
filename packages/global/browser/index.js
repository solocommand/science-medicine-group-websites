
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';

const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');

export default (Browser) => {
  MonoRail(Browser, { enableOmedaIdentityX: false });
  Browser.register('ContentMeterTrack', ContentMeterTrack);
};
