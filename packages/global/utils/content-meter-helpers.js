const { get } = require('@parameter1/base-cms-object-path');

const cmShowOverlay = (contentMeterState) => {
  if (!contentMeterState) return false;
  if (!contentMeterState.displayOverlay) return false;
  if (!contentMeterState.isLoggedIn && !contentMeterState.displayGate) return false;
  if (contentMeterState.isLoggedIn) return false;
  return true;
};

const cmRestrictContentByReg = (contentMeterState, content) => {
  if (!contentMeterState) return false;

  // If content is gated by reg return true all the time
  const contentReg = get(content, 'userRegistration.isCurrentlyRequired');
  if (contentReg === true) return true;

  const { isLoggedIn, requiresUserInput } = contentMeterState;
  const displayOverlay = cmShowOverlay(contentMeterState);
  // if the overlay is displayed require reg
  if (displayOverlay) return true;
  // if the user is logged in but doesnt have the required fields display gate
  if (isLoggedIn && requiresUserInput) return true;

  return false;
};

const cmTruncateBody = (contentMeterState) => {
  if (!contentMeterState) return false;

  const { isLoggedIn, requiresUserInput } = contentMeterState;
  const displayOverlay = cmShowOverlay(contentMeterState);
  if (!displayOverlay) return false;
  if (isLoggedIn && !requiresUserInput) return false;
  return true;
};

module.exports = {
  cmShowOverlay,
  cmRestrictContentByReg,
  cmTruncateBody,
};
