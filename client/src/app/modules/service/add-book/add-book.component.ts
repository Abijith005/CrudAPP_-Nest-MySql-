import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { ServiceService } from '../service.service';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit, OnDestroy {
  // variable declarations
  private debounceTimeOut: any;
  addForm!: FormGroup;
  isSubmitted: boolean = false;
  uploadedImgae: any;

  private _ngUnsubscribe$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _matDialogRef: MatDialogRef<HomeComponent>,
    private _service: ServiceService,
    private _toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.addForm = this._fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d{1,9}(,\d{3})*(\.\d+)?$/),
        ],
      ],
      bookType: ['', [Validators.required]],
      language: ['', [Validators.required]],
      shortDescription: ['', Validators.required],
      coverPhoto: [null, [Validators.required]],
    });
  }

  get formControls() {
    return this.addForm.controls;
  }

  limitWords(event: Event) {
    clearTimeout(this.debounceTimeOut);
    this.debounceTimeOut = setTimeout(() => {
      const textArea = event.target as HTMLInputElement;
      const value = textArea.value;
      if (value.split(/\s+/).length >= 143 || value.split('').length >= 243) {
        this.formControls['shortDescription'].setErrors({ limit: true });
      }
    }, 300);
  }

  uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      this.uploadedImgae = target.files[0];
    }
  }

  onSubmit() {
    const coverPhoto = this.formControls['coverPhoto'].value;

    if (!/\.(jpg|png|jpg|gif)$/i.test(coverPhoto)) {
      this.formControls['coverPhoto'].setErrors({ type: true });
    }

    if (this.formControls['bookType'].value == 'Select Type') {
      this.formControls['bookType'].setErrors({ valid: true });
    }
    if (this.formControls['language'].value == 'Select Language') {
      this.formControls['language'].setErrors({ valid: true });
    }
    this.isSubmitted = true;
    if (!this.addForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.uploadedImgae);
    formData.append('name', this.formControls['name'].value);
    formData.append('author', this.formControls['author'].value);
    formData.append('price', this.formControls['price'].value);
    formData.append('bookType', this.formControls['bookType'].value);
    formData.append('language', this.formControls['language'].value);
    formData.append(
      'shortDescription',
      this.formControls['shortDescription'].value
    );

    this._service
      .addBook(formData)
      .pipe(takeUntil(this._ngUnsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          this._matDialogRef.close()
          this._toast.success({
            detail: 'SUCCESS',
            summary: 'Book added successfully',
            duration: 3000,
          });
        }
      });
  }

  close() {
    this._matDialogRef.close();
  }

  ngOnDestroy(): void {
    this._matDialogRef.close()
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
