import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  rating: any;

  genres = ['Action' , 'Shooter'];
  features = ['Multiplayer' , 'Singleplayer' , 'Co-Op' , 'Controller Support'];

  constructor( 
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      this.product = data;
      this.rating = this.product.rating;
    }

  ngOnInit(): void {
  }

}
