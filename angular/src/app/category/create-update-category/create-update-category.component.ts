import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageMode } from '../../enums/pageMode.enum';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-update-category',
  templateUrl: './create-update-category.component.html',
  styleUrl: './create-update-category.component.scss'
})
export class CreateUpdateCategoryComponent implements OnInit {

  form!: FormGroup;
  pageMode: PageMode = PageMode.Create;

  pageModeE = PageMode;

  constructor(
    private fb: FormBuilder,
    private categorySvc: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.buildForm();

  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode == PageMode.Create) {

        this.createCategory();
      }
      else {
        //this.updateCategory();
      }

    }
  }


  get nameControl() {

    return this.form.controls['name'];
  }

  get descriptionControl() {

    return this.form.controls['description'];
  }

  //#region Private Functions

  private buildForm(): void {

    this.form = this.fb.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      description: ['', Validators.maxLength(300)],
    });
  }

  private createCategory(): void {

    this.spinner.show();

    this.categorySvc.createCategory(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Category has been created successfully.`);
        this.router.navigate(['/category']);
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }
    });
  }

  //#endregion

}


