import { atTracking, byTracking, logging } from '@k6-contrib/list-plugins';
import { ListConfig } from '@keystone-6/core';
import { BaseListTypeInfo, BaseFields } from '@keystone-6/core/types';

export type GenericListConfig = ListConfig<
  BaseListTypeInfo,
  BaseFields<BaseListTypeInfo>
>;

export const withAtTracking = atTracking({});
export const withByTracking = byTracking({
  ref: 'User',
});

export const withTracking = (listConfig: GenericListConfig) =>
  withAtTracking(withByTracking(listConfig));

export const withLogging = logging();
