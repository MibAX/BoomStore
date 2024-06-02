import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  template: `
      @for (star of starArray; track $index) {
        <i class="fa-solid fa-star star me-1"></i>
      }
      ({{rating}}/5)
  `,
  styles: `
    .star {
	  color: #ffa41c;
    }`
})
export class StarComponent {

  @Input() rating: number = 0; // Example: 4
  starArray: number[] = [];    // Example: [1,2,3,4] 

  ngOnInit() {

    this.starArray = Array.from({ length: this.rating }, (_, index) => index + 1);
  }

}
