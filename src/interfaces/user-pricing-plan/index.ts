import { UserInterface } from 'interfaces/user';
import { PricingPlanInterface } from 'interfaces/pricing-plan';
import { GetQueryInterface } from 'interfaces';

export interface UserPricingPlanInterface {
  id?: string;
  user_id?: string;
  pricing_plan_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  pricing_plan?: PricingPlanInterface;
  _count?: {};
}

export interface UserPricingPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  pricing_plan_id?: string;
}
