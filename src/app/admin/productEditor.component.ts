import {Component} from '@angular/core';
import {Product} from '../model/product.model';
import {ProductRepository} from '../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent {
  editing: boolean = false;
  product: Product = new Product();

  constructor(private repository: ProductRepository,
              private router: Router,
              activateRoute: ActivatedRoute) {

    this.editing = activateRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      Object.assign((this.product, repository.getProduct(activateRoute.snapshot.params["id"])));
    }
  }

  save(form: NgForm) {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl("/admin/mai/products");
  }
}
