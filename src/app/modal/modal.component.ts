import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { title } from 'process';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  todoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private Api: ApiService,
    private dialogRef: MatDialogRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      this.Api.postTodo(this.todoForm.value).subscribe({
        next: (res) => {
          alert('product added successfully');
          this.todoForm.reset();
          this.dialogRef.close();
          location.reload();
        },
      });
    }
  }
}
