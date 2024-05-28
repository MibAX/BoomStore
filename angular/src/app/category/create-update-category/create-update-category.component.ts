import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageMode } from '../../enums/pageMode.enum';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from '../../models/categories/category.model';

@Component({
  selector: 'app-create-update-category',
  templateUrl: './create-update-category.component.html',
  styleUrl: './create-update-category.component.scss'
})
export class CreateUpdateCategoryComponent implements OnInit {

  categoryId!: number;
  category?: Category;
  form!: FormGroup;
  pageMode: PageMode = PageMode.Create;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private categorySvc: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.setCategoryId();
    this.buildForm();

    if (this.pageMode == PageMode.Update) {

      this.loadCategory();
    }

  }

  submit(): void {

    if (this.form.valid) {

      if (this.pageMode == PageMode.Create) {

        this.createCategory();
      }
      else {
        this.updateCategory();
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

  private setCategoryId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      this.pageMode = PageMode.Update;
    }

    // USE this activated route observable when you update the URL
    // BUT you do not leave the component and return to it
    // this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap: ParamMap) => {

    //     this.categoryId = Number(paramMap.get('id'));
    //   }
    // });

  }

  private buildForm(): void {

    this.form = this.fb.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      description: ['', Validators.maxLength(300)],
    });
  }

  private loadCategory(): void {

    this.spinner.show();

    this.categorySvc.getCategory(this.categoryId).subscribe({
      next: (categoryFromApi: Category) => {

        this.form.patchValue(categoryFromApi);
        this.category = categoryFromApi;
      },
      error: (err: HttpErrorResponse) => {

        this.toastr.error(err.message);
      },
      complete: () => {

        this.spinner.hide();
      }

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

  private updateCategory(): void {

    this.spinner.show();

    this.categorySvc.updateCategory(this.form.value).subscribe({
      next: () => {

        this.toastr.success(`Category has been updated successfully.`);
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


