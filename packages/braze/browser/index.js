const PreferenceCenter = () => import(/* webpackChunkName: "braze-preference-center" */ './preference-center.vue');

export default (Browser) => {
  Browser.register('BrazePreferenceCenter', PreferenceCenter);
};
