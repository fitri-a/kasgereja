import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PemasukanPageRoutingModule } from './pemasukan-routing.module';
import { PemasukanPage } from './pemasukan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PemasukanPageRoutingModule
  ],
  declarations: [PemasukanPage]
})
export class PemasukanPageModule {}