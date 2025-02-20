import { Routes } from '@angular/router';
import { CategoryInsertComponent } from './page/category/insert/category-insert.component';
import { CategoryGetAllComponent } from './page/category/getall/category-get-all.component';
import { UpdateComponent } from './page/category/update/update.component';
import { GetallComponent } from './page/client/getall/getall.component';
import { InsertComponent } from './page/client/insert/insert.component';
import { ClientUpdateComponent } from './page/client/update/client-update.component';
import { LoginComponent } from './page/client/login/login.component';
import { LoginuserComponent } from './page/user/loginuser/loginuser.component';
import { UserGetAllComponent } from './page/user/user-get-all/user-get-all.component';
import { UserInsertComponent } from './page/user/user-insert/user-insert.component';
import { UserUpdateComponent } from './page/user/user-update/user-update.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdateActividadComponent } from './page/actividad/update-actividad/update-actividad.component';
import { GetallActividadComponent } from './page/actividad/getall-actividad/getall-actividad.component';
import { InsertActividadComponent } from './page/actividad/insert-actividad/insert-actividad.component';
import { PlatziGetallComponent } from './page/platzi/platzi-getall/platzi-getall.component';
import { PlatziInsertComponent } from './page/platzi/platzi-insert/platzi-insert.component';
import { PlatziUpdateComponent } from './page/platzi/platzi-update/platzi-update.component';
import { PokeGetComponent } from './page/pokeapi/poke-get/poke-get.component';
import { LoginComponentFk } from './page/auth/login/login.component';
import { GetAllProductsFkComponent } from './page/auth/get-all-products-fk/get-all-products-fk.component';
import { GetallProductComponent } from './page/product/getall-product/getall-product.component';
import { InsertProductComponent } from './page/product/insert-product/insert-product.component';
import { UpdateProductComponent } from './page/product/update-product/update-product.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'user/getall', pathMatch: 'full' },
	{ path: 'product/insert', component: InsertProductComponent, canActivate: [AuthGuard] },
	{ path: 'product/getall', component: GetallProductComponent, canActivate: [AuthGuard] },
	{ path: 'product/update/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
	{ path: 'category/insert', component: CategoryInsertComponent, canActivate: [AuthGuard] },
	{ path: 'category/getall', component: CategoryGetAllComponent, canActivate: [AuthGuard] },
	{ path: 'category/update/:id', component: UpdateComponent, canActivate: [AuthGuard] },
	{ path: 'client/getall', component: GetallComponent, canActivate: [AuthGuard] },
	{ path: 'client/insert', component: InsertComponent, canActivate: [AuthGuard] },
	{ path: 'client/update/:id', component: ClientUpdateComponent, canActivate: [AuthGuard] },
	{ path: 'client/login', component: LoginComponent },
	{ path: 'user/login', component: LoginuserComponent },
	{ path: 'user/getall', component: UserGetAllComponent, canActivate: [AuthGuard] },
	{ path: 'user/insert', component: UserInsertComponent, canActivate: [AuthGuard] },
	{ path: 'user/update/:id', component: UserUpdateComponent, canActivate: [AuthGuard] },
	{ path: 'actividad/getall', component: GetallActividadComponent, canActivate: [AuthGuard] },
	{ path: 'actividad/insert', component: InsertActividadComponent, canActivate: [AuthGuard]},
	{ path: 'actividad/update/:id', component: UpdateActividadComponent, canActivate: [AuthGuard]},
	{ path: 'platzi/update/:id', component: PlatziUpdateComponent, canActivate: [AuthGuard]},
	{ path: 'platzi/getall', component: PlatziGetallComponent, canActivate: [AuthGuard]},
	{ path: 'platzi/insert', component: PlatziInsertComponent, canActivate: [AuthGuard]},
	{ path: 'pokeapi/get', component: PokeGetComponent, canActivate: [AuthGuard]},
	{ path: 'auth/login', component: LoginComponentFk},
	{ path: 'auth/getall', component: GetAllProductsFkComponent, canActivate: [AuthGuard]},


];
