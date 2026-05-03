import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'pemasukan',
    loadChildren: () =>
      import('./pemasukan/pemasukan.module').then(m => m.PemasukanPageModule)
  },

  {
    path: 'pengeluaran',
    loadChildren: () =>
      import('./pengeluaran/pengeluaran.module').then(m => m.PengeluaranPageModule)
  },

  {
    path: 'transaksi',
    loadChildren: () =>
      import('./transaksi/transaksi.module').then(m => m.TransaksiPageModule)
  },

  {
    path: 'pengaturan',
    loadChildren: () =>
      import('./pengaturan/pengaturan.module').then(m => m.PengaturanPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}