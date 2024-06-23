import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'boomStoreClient';

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.toastr.success("Working", "Title")
  }


}
