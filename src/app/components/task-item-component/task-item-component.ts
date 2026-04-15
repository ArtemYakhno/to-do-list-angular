import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../modules/task.model.ts';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item-component.html',
  styleUrl: './task-item-component.scss',
})
export class TaskItemComponent {
  task = input.required<ITask>();
  toggle = output<number>();
  delete = output<number>();
  edit = output<{ id: number; title: string }>();

  editing = false;
  editTitle = '';

  startEdit() {
    this.editTitle = this.task().title;
    this.editing = true;
  }

  saveEdit() {
    if (this.editTitle.trim()) {
      this.edit.emit({ id: this.task().id, title: this.editTitle.trim() });
    }
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }
}
