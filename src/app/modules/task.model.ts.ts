export const FILTER_MODE = {
  all: 'all',
  active: 'active',
  done: 'done',
} as const;

export const SORT_MODE = {
  none: 'none',
  priority: 'priority',
  name: 'name',
} as const;

export const PRIORITY = {
  low: 'low',
  medium: 'medium',
  high: 'high',
} as const;

export type TFilterMode = (typeof FILTER_MODE)[keyof typeof FILTER_MODE];
export type TSortMode = (typeof SORT_MODE)[keyof typeof SORT_MODE];
export type TPriority = (typeof PRIORITY)[keyof typeof PRIORITY];

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  priority: TPriority;
  userId?: number;
}

export interface ITodoApiResponse {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
