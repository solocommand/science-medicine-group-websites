const PreferenceCenter = () => import(/* webpackChunkName: "braze-preference-center" */ './preference-center.vue');
const P1EventsIdentify = () => import(/* webpackChunkName: "braze-p1-events-identify" */ './p1-events-identify.vue');

export default (Browser) => {
  Browser.register('BrazePreferenceCenter', PreferenceCenter);
  Browser.register('BrazeP1EventsIdentify', P1EventsIdentify);
};
