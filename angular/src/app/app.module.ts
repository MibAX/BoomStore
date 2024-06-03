import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { CreateUpdateCategoryComponent } from './category/create-update-category/create-update-category.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { DeleteCategoryDialogComponent } from './category/delete-category-dialog/delete-category-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CreateUpdateProductComponent } from './product/create-update-product/create-update-product.component';
import { DeleteProductDialogComponent } from './product/delete-product-dialog/delete-product-dialog.component';
import { StarComponent } from './shared/directives/star/star.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    CreateUpdateCategoryComponent,
    CategoryDetailsComponent,
    DeleteCategoryDialogComponent,
    ProductComponent,
    ProductDetailsComponent,
    CreateUpdateProductComponent,
    DeleteProductDialogComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
