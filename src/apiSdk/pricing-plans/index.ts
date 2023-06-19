import axios from 'axios';
import queryString from 'query-string';
import { PricingPlanInterface, PricingPlanGetQueryInterface } from 'interfaces/pricing-plan';
import { GetQueryInterface } from '../../interfaces';

export const getPricingPlans = async (query?: PricingPlanGetQueryInterface) => {
  const response = await axios.get(`/api/pricing-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPricingPlan = async (pricingPlan: PricingPlanInterface) => {
  const response = await axios.post('/api/pricing-plans', pricingPlan);
  return response.data;
};

export const updatePricingPlanById = async (id: string, pricingPlan: PricingPlanInterface) => {
  const response = await axios.put(`/api/pricing-plans/${id}`, pricingPlan);
  return response.data;
};

export const getPricingPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pricing-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePricingPlanById = async (id: string) => {
  const response = await axios.delete(`/api/pricing-plans/${id}`);
  return response.data;
};
