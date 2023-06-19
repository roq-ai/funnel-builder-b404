import { FunnelBuilderInterface } from 'interfaces/funnel-builder';
import { GetQueryInterface } from 'interfaces';

export interface BlockInterface {
  id?: string;
  type: string;
  funnel_builder_id?: string;
  created_at?: any;
  updated_at?: any;

  funnel_builder?: FunnelBuilderInterface;
  _count?: {};
}

export interface BlockGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  funnel_builder_id?: string;
}
