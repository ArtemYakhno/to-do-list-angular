import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { TaskItemComponent } from './components/task-item-component/task-item-component';
import {
  DEFAULT_PRIORITY,
  FILTER_OPTIONS,
  SORT_OPTIONS,
  PRIORITY_OPTIONS,
} from './constants/task.constants';
import { TPriority, TSortMode } from './modules/task.model.ts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, TaskItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit {
  taskService = inject(TaskService);

  newTitle = '';
  newPriority: TPriority = DEFAULT_PRIORITY;

  readonly filterOptions = FILTER_OPTIONS;
  readonly sortOptions = SORT_OPTIONS;
  readonly priorityOptions = PRIORITY_OPTIONS;

  ngOnInit() {
    this.taskService.loadTasks();
  }

  add() {
    if (!this.newTitle.trim()) return;
    this.taskService.addTask(this.newTitle.trim(), this.newPriority);
    this.newTitle = '';
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as TSortMode;
    this.taskService.setSort(value);
  }
}
