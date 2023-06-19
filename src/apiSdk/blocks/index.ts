import axios from 'axios';
import queryString from 'query-string';
import { BlockInterface, BlockGetQueryInterface } from 'interfaces/block';
import { GetQueryInterface } from '../../interfaces';

export const getBlocks = async (query?: BlockGetQueryInterface) => {
  const response = await axios.get(`/api/blocks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBlock = async (block: BlockInterface) => {
  const response = await axios.post('/api/blocks', block);
  return response.data;
};

export const updateBlockById = async (id: string, block: BlockInterface) => {
  const response = await axios.put(`/api/blocks/${id}`, block);
  return response.data;
};

export const getBlockById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/blocks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBlockById = async (id: string) => {
  const response = await axios.delete(`/api/blocks/${id}`);
  return response.data;
};
