import * as yup from 'yup';

export const userPricingPlanValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  pricing_plan_id: yup.string().nullable(),
});
