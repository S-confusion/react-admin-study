export const isPhone = (phone) => {
  return /^1[3456789]\d{9}$/.test(phone);
};
