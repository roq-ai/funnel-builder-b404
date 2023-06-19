import axios from 'axios';
import queryString from 'query-string';
import { FunnelBuilderInterface, FunnelBuilderGetQueryInterface } from 'interfaces/funnel-builder';
import { GetQueryInterface } from '../../interfaces';

export const getFunnelBuilders = async (query?: FunnelBuilderGetQueryInterface) => {
  const response = await axios.get(`/api/funnel-builders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFunnelBuilder = async (funnelBuilder: FunnelBuilderInterface) => {
  const response = await axios.post('/api/funnel-builders', funnelBuilder);
  return response.data;
};

export const updateFunnelBuilderById = async (id: string, funnelBuilder: FunnelBuilderInterface) => {
  const response = await axios.put(`/api/funnel-builders/${id}`, funnelBuilder);
  return response.data;
};

export const getFunnelBuilderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/funnel-builders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFunnelBuilderById = async (id: string) => {
  const response = await axios.delete(`/api/funnel-builders/${id}`);
  return response.data;
};
