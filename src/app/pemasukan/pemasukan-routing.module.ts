import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PemasukanPage } from './pemasukan.page';

const routes: Routes = [
  {
    path: '',
    component: PemasukanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PemasukanPageRoutingModule {}