import { UserPricingPlanInterface } from 'interfaces/user-pricing-plan';
import { GetQueryInterface } from 'interfaces';

export interface PricingPlanInterface {
  id?: string;
  name: string;
  funnels_limit: number;
  monthly_visitors_limit: number;
  domains_limit: number;
  created_at?: any;
  updated_at?: any;
  user_pricing_plan?: UserPricingPlanInterface[];

  _count?: {
    user_pricing_plan?: number;
  };
}

export interface PricingPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
