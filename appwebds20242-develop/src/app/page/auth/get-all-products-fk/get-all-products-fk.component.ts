import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from '../../../api/fakestore.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-all-products-fk',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './get-all-products-fk.component.html',
  styleUrl: './get-all-products-fk.component.css'
})
export class GetAllProductsFkComponent implements OnInit  {
  categories: string[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = 'Todos';
  searchQuery: string = '';
  selectedProduct: any = null;
  newProduct: any = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  };
  
  constructor(private fakeStoreService: FakeStoreService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getAllProducts();
  }

  getCategories(): void {
    this.fakeStoreService.getCategories().subscribe({
      next: (data) => {
        this.categories = ['Todos', ...data];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAllProducts(): void {
    this.fakeStoreService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'Todos' || product.category === this.selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  getProductDetails(productId: number): void {
    this.fakeStoreService.getProductById(productId).subscribe({
      next: (data) => {
        this.selectedProduct = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editProduct(): void {
    this.fakeStoreService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
      next: (data) => {
        this.getAllProducts();
        console.log('Producto actualizado:', data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteProduct(productId: number): void {
    this.fakeStoreService.deleteProduct(productId).subscribe({
      next: () => {
        this.getAllProducts();
        console.log('Producto eliminado:', productId);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addProduct(): void {
    this.fakeStoreService.addProduct(this.newProduct).subscribe({
      next: (data) => {
        this.getAllProducts();
        console.log('Producto agregado:', data);
        this.newProduct = {
          title: '',
          price: 0,
          description: '',
          image: '',
          category: ''
        };
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
