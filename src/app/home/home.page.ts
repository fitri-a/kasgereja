import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {

  totalSaldo: number = 0;
  totalPemasukan: number = 0;
  totalPengeluaran: number = 0;
  private dataSub?: Subscription;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Berlangganan ke total saldo agar otomatis update
    this.dataSub = this.dataService.totals$.subscribe(totals => {
      this.totalPemasukan = totals.masuk;
      this.totalPengeluaran = totals.keluar;
      this.totalSaldo = totals.saldo;
    });
  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

  // 🔥 Method hitungData dihapus karena sudah otomatis via subscription totals$

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