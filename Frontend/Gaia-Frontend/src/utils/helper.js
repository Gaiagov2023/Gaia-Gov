export const getQueryStringFromObject = async (object) =>
  new URLSearchParams(object).toString();

export const roles = {
  ALL: "ALL",
  FED: "FED",
  STATE: "STATE",
  MUNI: "MUNI",
  SUB_POLITICIAN: "SUB_POLITICIAN",
};
export const fullRole = {
  FED: "Federal",
  STATE: "State",
  MUNI: "Municipal",
  SUB_POLITICIAN: "Sub politician",
};
