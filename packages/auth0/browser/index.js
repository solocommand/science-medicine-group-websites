const SendVerificationEmail = () => import(/* webpackChunkName: "auth0-send-verification-email" */ './send-verification-email.vue');

export default (Browser) => {
  Browser.register('Auth0SendVerificationEmail', SendVerificationEmail);
};
