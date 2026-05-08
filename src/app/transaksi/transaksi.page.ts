import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService, Transaksi } from '../services/data.service';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll?: IonInfiniteScroll;

  allData: Transaksi[] = [];
  dataFilter: Transaksi[] = [];
  displayData: Transaksi[] = []; // Data yang tampil di layar
  filter: string = 'semua';
  private dataSub?: Subscription;
  
  // Paging
  private itemsPerPage = 20;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSub = this.dataService.transaksi$.subscribe(data => {
      this.allData = data;
      this.refreshList();
    });
  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
  }

  // 🔥 FILTER & REFRESH
  filterData() {
    this.refreshList();
  }

  refreshList() {
    // Reset infinite scroll jika ada
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }

    // 1. Filter data
    if (this.filter === 'semua') {
      this.dataFilter = this.allData;
    } else {
      this.dataFilter = this.allData.filter(t => t.tipe === this.filter);
    }

    // 2. Ambil halaman pertama
    this.displayData = this.dataFilter.slice(0, this.itemsPerPage);
  }

  // 🔥 LOAD MORE (INFINITE SCROLL)
  loadMore(ev: any) {
    setTimeout(() => {
      const nextItems = this.dataFilter.slice(
        this.displayData.length,
        this.displayData.length + this.itemsPerPage
      );
      
      this.displayData.push(...nextItems);
      (ev as InfiniteScrollCustomEvent).target.complete();

      // Disable jika sudah habis
      if (this.displayData.length >= this.dataFilter.length) {
        (ev as InfiniteScrollCustomEvent).target.disabled = true;
      }
    }, 500);
  }

  // 🔥 PERFORMANCE OPTIMIZATION
  trackByTransaksi(index: number, item: Transaksi) {
    return item.id;
  }
}