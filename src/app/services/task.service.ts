import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TFilterMode,
  TSortMode,
  TPriority,
  ITask,
  ITodoApiResponse,
  FILTER_MODE,
  SORT_MODE,
} from '../modules/task.model.ts';
import {
  DEFAULT_FILTER,
  DEFAULT_SORT,
  PRIORITIES,
  PRIORITY_ORDER,
} from '../constants/task.constants';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private tasks = signal<ITask[]>([]);
  readonly filterMode = signal<TFilterMode>(DEFAULT_FILTER);
  readonly sortMode = signal<TSortMode>(DEFAULT_SORT);

  filteredTasks = computed(() => {
    const f = this.filterMode();
    let list = this.tasks().filter((t) =>
      f === FILTER_MODE.all ? true : f === FILTER_MODE.done ? t.completed : !t.completed,
    );
    if (this.sortMode() === SORT_MODE.priority) {
      list = [...list].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    }
    if (this.sortMode() === SORT_MODE.name) {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'uk'));
    }
    return list;
  });

  loadTasks() {
    this.http.get<ITodoApiResponse[]>(`${this.apiUrl}?_limit=5`).subscribe((data) => {
      this.tasks.set(
        data.map((t) => ({
          id: t.id,
          title: t.title,
          completed: t.completed,
          priority: PRIORITIES[t.id % 3],
        })),
      );
    });
  }

  addTask(title: string, priority: TPriority) {
    this.http.post<void>(this.apiUrl, { title, completed: false, userId: 1 }).subscribe(() => {
      this.tasks.update((list) => [{ id: Date.now(), title, completed: false, priority }, ...list]);
    });
  }

  toggleTask(id: number) {
    this.tasks.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  updateTitle(id: number, title: string) {
    this.tasks.update((list) => list.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  deleteTask(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe();
    this.tasks.update((list) => list.filter((t) => t.id !== id));
  }

  setFilter(f: TFilterMode) {
    this.filterMode.set(f);
  }

  setSort(s: TSortMode) {
    this.sortMode.set(s);
  }
}
