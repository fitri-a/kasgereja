import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

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

    const data = JSON.parse(localStorage.getItem('transaksi') || '[]');

    data.push({
      id: Date.now() + Math.random(),
      tipe: 'keluar',
      nominal: nominalNumber,
      kategori: this.kategori,
      tanggal: this.tanggal
    });

    localStorage.setItem('transaksi', JSON.stringify(data));

    this.resetForm();
    this.router.navigate(['/transaksi']);
  }

  resetForm() {
    this.nominal = 0;
    this.kategori = '';
    this.tanggal = '';
  }
}