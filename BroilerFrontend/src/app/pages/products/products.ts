import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { createEmptyProduct, Product } from '../../model/products.type';
import { map, Observable, startWith } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SnackbarService } from '../../services/components/snackbar-service';
import { EditProduct } from './edit-product/edit-product';

@Component({
  selector: 'app-products',
  imports: [
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    EditProduct,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  productService = inject(ProductService);
  snackbarService = inject(SnackbarService);

  products = Array<Product>();

  readonly dialog = inject(MatDialog);

  createdAtControl = new FormControl<Date | null>(null);
  type = new FormControl<string | null>(null);
  price = signal<number | null>(null);

  productsList: string[] = [];
  productsOptions!: Observable<string[]>;

  currentlyEditingId: string | null = null;
  currentlyEditingDate: string | null = null;
  rowBeingEdited: Product | null = null;

  emptyProduct = createEmptyProduct();

  ngOnInit(): void {
    this.initializeProducts();

    this.productService.getUniqueProductsFromBackend().subscribe((productsFromBackend) => {
      this.productsList = productsFromBackend.map((product) => product.type);
      this.sortData({ active: 'startDate', direction: 'asc' });

      this.productsOptions = this.type.valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || ''))
      );
    });
  }

  initializeProducts() {
    this.productService
      .getAllProductsFromBackend()
      .subscribe((productsFromBackend) => {
        this.products = productsFromBackend;
        this.sortData({ active: 'startDate', direction: 'asc' });
      });
  }

  filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productsList.filter((option) => option.toLowerCase().includes(filterValue));
  }


  onEdit(newCurrentlyEditedProduct: Product) {
    this.currentlyEditingId = newCurrentlyEditedProduct.productId!;
    this.currentlyEditingDate = newCurrentlyEditedProduct.startDate;
  }

  onCancelEdit() {
    this.currentlyEditingDate = null;
    this.currentlyEditingId = null;
  }

  formatDateToString = (date: Date) => new Date(date).toDateString();

  sortData(sort: Sort) {
    if (!sort.active || sort.direction == '') {
      return;
    }

    this.products = this.products.sort((a, b) => {
      const isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'startDate':
          return compare(a.startDate, b.startDate, isAsc);
        case 'type':
          return compare(a.type, b.type, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}
