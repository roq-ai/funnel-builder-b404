import axios from 'axios';
import queryString from 'query-string';
import { UserPricingPlanInterface, UserPricingPlanGetQueryInterface } from 'interfaces/user-pricing-plan';
import { GetQueryInterface } from '../../interfaces';

export const getUserPricingPlans = async (query?: UserPricingPlanGetQueryInterface) => {
  const response = await axios.get(`/api/user-pricing-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserPricingPlan = async (userPricingPlan: UserPricingPlanInterface) => {
  const response = await axios.post('/api/user-pricing-plans', userPricingPlan);
  return response.data;
};

export const updateUserPricingPlanById = async (id: string, userPricingPlan: UserPricingPlanInterface) => {
  const response = await axios.put(`/api/user-pricing-plans/${id}`, userPricingPlan);
  return response.data;
};

export const getUserPricingPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-pricing-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserPricingPlanById = async (id: string) => {
  const response = await axios.delete(`/api/user-pricing-plans/${id}`);
  return response.data;
};
