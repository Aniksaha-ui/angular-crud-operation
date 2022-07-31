import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { title } from 'process';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  todoForm!: FormGroup;
  actionButton: string = 'save';
  constructor(
    private formBuilder: FormBuilder,
    private Api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: Date.now,
      status: 'active',
    });

    //data edit chile eikhane aise oi row er value eikhane bosai dibe
    if (this.editData) {
      this.todoForm.controls['title'].setValue(this.editData.title);
      this.todoForm.controls['description'].setValue(this.editData.description);
      this.actionButton = 'update';
    }
  }

  addTodo() {
    if (!this.editData) {
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
    } else {
      this.updateTodo();
    }
  }

  updateTodo() {
    console.log('button clicked');
    this.Api.putTodo(this.todoForm.value, this.editData._id).subscribe({
      next: (res) => {
        console.log(res);
        this.todoForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Internal Server Error With Status Code 500');
      },
    });
  }
}
