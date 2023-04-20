import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//Import Component
import { HomeComponent } from './components/home/home.component';
import { ResultadoComponent } from "./components/resultado/resultado.component";

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'resultado',component:ResultadoComponent}
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);