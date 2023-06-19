import * as yup from 'yup';

export const pricingPlanValidationSchema = yup.object().shape({
  name: yup.string().required(),
  funnels_limit: yup.number().integer().required(),
  monthly_visitors_limit: yup.number().integer().required(),
  domains_limit: yup.number().integer().required(),
});
