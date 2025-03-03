export const USER_ROLES = {
  SUPERADMIN: "superadmin", // 1
  MERCHANT: "merchant", // 2
  CHARITY: "charity", // 3
  CORPORATION: "corporation", // 4
  CONSUMER: "consumer", // 5
};

export const userRoleDecoder = (role: 1 | 2 | 3 | 4 | 5) => {
  switch (role) {
    case 1:
      return USER_ROLES.SUPERADMIN;
    case 2:
      return USER_ROLES.MERCHANT;
    case 3:
      return USER_ROLES.CHARITY;
    case 4:
      return USER_ROLES.CORPORATION;
    case 5:
      return USER_ROLES.CONSUMER;
    default:
      return "";
  }
};
