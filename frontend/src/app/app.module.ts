import { NgModule, signal } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IngresoProductosComponent } from './components/ingreso-productos/ingreso-productos.component';
import { FormsModule } from '@angular/forms';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { SingInComponent } from './components/sign-in/sign-in.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component'
import { RouterModule, Route } from '@angular/router';
import { VerProductosComponent } from './components/ver-productos/ver-productos.component';
import { FacturarComponent } from './components/facturar/facturar.component';
import { GestionProductoComponent } from './components/gestion-producto/gestion-producto.component';
import { RegistronComponent } from './components/registron/registron.component';
import { RoleGuard } from './services/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { IndexComponent } from './components/index/index.component';

const rutas:Route[]=[
  {path:'home', component:HomeComponent},
  {path:'ofertas', component:OfertasComponent},
  {path:'signIn', component:SingInComponent},
  {path:'gestionProducto', component:GestionProductoComponent, canActivate: [RoleGuard], data: {requiredRole: 'admin'}},
  {path:'ingresoProducto', component:IngresoProductosComponent, canActivate: [RoleGuard], data: {requiredRole: 'admin'}},
  {path:'verProducto', component:VerProductosComponent , canActivate: [RoleGuard], data: {requiredRole: 'admin'}},
  {path:'facturar', component:FacturarComponent, canActivate: [RoleGuard], data: {requiredRole: 'operador'}},
  {path:'registro', component:RegistronComponent, canActivate: [RoleGuard], data: {requiredRole: 'admin'}},
  {path:'listaUsuarios', component:ListaUsuariosComponent, canActivate: [RoleGuard], data: {requiredRole: 'admin'}},
  {path:'index', component:IndexComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    IngresoProductosComponent,
    MenuPrincipalComponent,
    SingInComponent,
    OfertasComponent,
    AdminComponent,
    GestionProductoComponent,
    HomeComponent,
    VerProductosComponent,
    FacturarComponent,
    RegistronComponent,
    ListaUsuariosComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(rutas),
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
