import { Component } from '@angular/core';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage {

  data: any[] = [];
  dataFilter: any[] = [];
  filter: string = 'semua';

  constructor() {}

  // 🔥 LOAD DATA
  loadData() {
    const data = localStorage.getItem('transaksi');
    this.data = data ? JSON.parse(data) : [];
  }

  // 🔥 FILTER
  filterData() {
    if (this.filter === 'semua') {
      this.dataFilter = this.data;
    } else {
      this.dataFilter = this.data.filter(t => t.tipe === this.filter);
    }
  }

  // 🔥 AUTO HAPUS 27–29 HARI (TANPA ALERT)
  cekPengingatBackup() {
    const sekarang = new Date();

    this.data = this.data.filter((item: any) => {
      const tanggalData = new Date(item.tanggal);

      if (isNaN(tanggalData.getTime())) return true;

      const selisihHari =
        (sekarang.getTime() - tanggalData.getTime()) /
        (1000 * 60 * 60 * 24);

      // 🔥 HAPUS LANGSUNG JIKA 27–29 HARI
      if (selisihHari >= 27 && selisihHari < 30) {
        return false; // ❌ hapus
      }

      return true; // ✅ tetap
    });

    localStorage.setItem('transaksi', JSON.stringify(this.data));
    this.filterData();
  }

  // 🔥 LIFE CYCLE
  ionViewWillEnter() {
    this.loadData();
    this.filterData();
    this.cekPengingatBackup(); // 🔥 langsung hapus jika memenuhi
  }
}