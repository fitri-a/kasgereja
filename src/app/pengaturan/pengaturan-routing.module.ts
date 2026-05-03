import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengaturanPage } from './pengaturan.page';

const routes: Routes = [
  {
    path: '',
    component: PengaturanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengaturanPageRoutingModule {}