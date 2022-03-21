export const checkScope = function(scopes, user) {
  if (!Array.isArray(scopes)) scopes = [scopes];
  if (!user) {
    return false;
  } else {
    const res = [];
    user.scope.forEach(s1 =>
      scopes.forEach(s2 => {
        if (s1 == s2) {
          res.push(s1);
        }
      })
    );
    return res.length > 0;
  }
};

export const MODEL_ADMIN = "models:customer";
export const ARUNDO_SUPPORT = "models:arundo";
export const SUPER_ADMIN = "superadmin:superadmin";
