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

  // 🔥 LIFE CYCLE
  ionViewWillEnter() {
    this.loadData();
    this.filterData();
  }
}