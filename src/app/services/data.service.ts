import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Transaksi {
  id: number;
  tipe: 'masuk' | 'keluar';
  nominal: number;
  kategori: string;
  tanggal: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly STORAGE_KEY = 'transaksi';
  
  private transaksiSubject = new BehaviorSubject<Transaksi[]>([]);
  transaksi$ = this.transaksiSubject.asObservable();

  private totalsSubject = new BehaviorSubject<{masuk: number, keluar: number, saldo: number}>({masuk: 0, keluar: 0, saldo: 0});
  totals$ = this.totalsSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    // Delay sedikit agar proses startup aplikasi tidak terhambat
    setTimeout(() => {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          this.transaksiSubject.next(parsed);
          this.updateTotals(parsed);
        } catch (e) {
          console.error('Error parsing localStorage data', e);
          this.transaksiSubject.next([]);
          this.updateTotals([]);
        }
      }
    }, 100);
  }

  getTransaksi() {
    return this.transaksiSubject.value;
  }

  addTransaksi(item: Transaksi) {
    const current = this.transaksiSubject.value;
    const updated = [item, ...current];
    this.saveData(updated);
  }

  deleteTransaksi(id: number) {
    const current = this.transaksiSubject.value;
    const updated = current.filter(t => t.id !== id);
    this.saveData(updated);
  }

  clearAllData() {
    this.saveData([]);
  }

  importData(data: Transaksi[]) {
    this.saveData(data);
  }

  private saveData(data: Transaksi[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      this.transaksiSubject.next(data);
      this.updateTotals(data);
    } catch (e) {
      console.error('Gagal menyimpan data ke LocalStorage', e);
      alert('⚠️ Memori penyimpanan hampir penuh!');
    }
  }

  private updateTotals(data: Transaksi[]) {
    let masuk = 0;
    let keluar = 0;
    data.forEach(item => {
      if (item.tipe === 'masuk') masuk += item.nominal;
      else keluar += item.nominal;
    });
    this.totalsSubject.next({
      masuk,
      keluar,
      saldo: masuk - keluar
    });
  }

  // Method lama untuk kompatibilitas jika masih ada yang pakai
  getTotals() {
    return this.totalsSubject.value;
  }
}
