import { FILTER_MODE, SORT_MODE, PRIORITY } from '../modules/task.model.ts';
import type { TFilterMode, TSortMode, TPriority } from '../modules/task.model.ts';

export const DEFAULT_FILTER: TFilterMode = FILTER_MODE.all;
export const DEFAULT_SORT: TSortMode = SORT_MODE.none;
export const DEFAULT_PRIORITY: TPriority = PRIORITY.medium;

export const PRIORITIES = Object.values(PRIORITY);

export const PRIORITY_ORDER: Record<TPriority, number> = {
  [PRIORITY.high]: 0,
  [PRIORITY.medium]: 1,
  [PRIORITY.low]: 2,
};

export const FILTER_OPTIONS: { value: TFilterMode; label: string }[] = [
  { value: FILTER_MODE.all, label: 'Всі' },
  { value: FILTER_MODE.active, label: 'Активні' },
  { value: FILTER_MODE.done, label: 'Виконані' },
];

export const SORT_OPTIONS: { value: TSortMode; label: string }[] = [
  { value: SORT_MODE.none, label: 'За замовч.' },
  { value: SORT_MODE.priority, label: 'За пріоритетом' },
  { value: SORT_MODE.name, label: 'За назвою' },
];

export const PRIORITY_OPTIONS: { value: TPriority; label: string }[] = [
  { value: PRIORITY.low, label: 'Низький' },
  { value: PRIORITY.medium, label: 'Середній' },
  { value: PRIORITY.high, label: 'Високий' },
];
