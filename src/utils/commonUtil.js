export function hasExternalSystemIntegration(user, externalSystemId) {
  const curTenantContext = getTenantContext(user);
  return (
    curTenantContext?.externalSystemsSupport && curTenantContext?.externalSystemsSupport.includes(externalSystemId)
  );
}

export function getTenantContext(user) {
  return user?.impersonatedTenant ? user?.impersonatedTenant : user?.applicationTenant;
}

export function getExternalSystems(user) {
  const curTenantContext = getTenantContext(user);
  return curTenantContext?.externalSystemsSupport;
}
