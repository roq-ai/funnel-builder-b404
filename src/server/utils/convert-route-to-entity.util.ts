const mapping: Record<string, string> = {
  blocks: 'block',
  'funnel-builders': 'funnel_builder',
  integrations: 'integration',
  'pricing-plans': 'pricing_plan',
  users: 'user',
  'user-pricing-plans': 'user_pricing_plan',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
