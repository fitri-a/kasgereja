import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  totalSaldo: number = 0;
  totalPemasukan: number = 0;
  totalPengeluaran: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.hitungData();
  }

  ionViewWillEnter() {
    this.hitungData(); // refresh tiap masuk halaman
  }

  // 🔥 HITUNG SEMUA DATA
  hitungData() {
    const data = JSON.parse(localStorage.getItem('transaksi') || '[]');

    this.totalPemasukan = 0;
    this.totalPengeluaran = 0;

    data.forEach((item: any) => {
      if (item.tipe === 'masuk') {
        this.totalPemasukan += item.nominal;
      } else {
        this.totalPengeluaran += item.nominal;
      }
    });

    this.totalSaldo = this.totalPemasukan - this.totalPengeluaran;
  }

  // 🔁 NAVIGASI
  goToPemasukan() {
    this.router.navigate(['/pemasukan']);
  }

  goToPengeluaran() {
    this.router.navigate(['/pengeluaran']);
  }

  goToTransaksi() {
    this.router.navigate(['/transaksi']);
  }
}