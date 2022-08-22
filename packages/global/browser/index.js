
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';

const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');
const CompanySearch = () => import(/* webpackChunkName: "global-company-search" */ './company-search.vue');
const SectionSearch = () => import(/* webpackChunkName: "global-section-search" */ './section-search.vue');

export default (Browser) => {
  const { EventBus } = Browser;

  MonoRail(Browser, { enableOmedaIdentityX: false });

  Browser.register('GlobalCompanySearch', CompanySearch, {
    provide: { EventBus },
  });
  Browser.register('GlobalSectionSearch', SectionSearch, {
    provide: { EventBus },
  });
  Browser.register('ContentMeterTrack', ContentMeterTrack);
};
