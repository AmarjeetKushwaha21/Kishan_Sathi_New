/**
 * Restrict access to specific roles (e.g. 'farmer', 'company')
 * Returns 403 Forbidden when role does not match
 */
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required before accessing this resource',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to [${allowedRoles.join(', ')}]. Your role is '${req.user.role}'.`,
      });
    }

    next();
  };
}

export const restrictTo = authorizeRoles;
export const farmerOnly = authorizeRoles('farmer');
export const companyOnly = authorizeRoles('company');

export default { authorizeRoles, restrictTo, farmerOnly, companyOnly };

