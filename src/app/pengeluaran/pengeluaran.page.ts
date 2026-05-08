import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.page.html',
  styleUrls: ['./pengeluaran.page.scss'],
  standalone: false,
})
export class PengeluaranPage {

  nominal: number = 0;
  kategori: string = '';
  tanggal: string = '';

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  simpanPengeluaran() {
    const nominalNumber = Number(this.nominal);

    if (!nominalNumber || nominalNumber <= 0) {
      alert('Nominal harus diisi!');
      return;
    }

    if (!this.kategori) {
      alert('Kategori harus dipilih!');
      return;
    }

    if (!this.tanggal) {
      alert('Tanggal harus diisi!');
      return;
    }

    this.dataService.addTransaksi({
      id: Date.now() + Math.random(),
      tipe: 'keluar',
      nominal: nominalNumber,
      kategori: this.kategori,
      tanggal: this.tanggal
    });

    this.resetForm();
    this.router.navigate(['/transaksi']);
  }

  resetForm() {
    this.nominal = 0;
    this.kategori = '';
    this.tanggal = '';
  }
}