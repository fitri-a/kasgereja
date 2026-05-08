import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dataService: DataService
  ) {}

  exportData() {
    try {
      const data = this.dataService.getTransaksi();
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kas-gereja-export-${new Date().getTime()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      alert('✅ Data berhasil diekspor ke JSON');
    } catch (e) {
      console.error(e);
      alert('❌ Ekspor gagal');
    }
  }

  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const content = e.target.result;
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            this.dataService.importData(parsed);
            alert('✅ Data berhasil diimpor');
          } else {
            alert('❌ Format file tidak valid (Harus array JSON)');
          }
        } catch (err) {
          console.error(err);
          alert('❌ Gagal membaca file atau format JSON salah');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  async confirmHapus() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Apakah Anda yakin ingin menghapus semua data transaksi? Tindakan ini tidak dapat dibatalkan.',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: () => {
            this.hapusData();
          }
        }
      ]
    });

    await alert.present();
  }

  hapusData() {
    try {
      this.dataService.clearAllData();
      alert('✅ Semua data berhasil dihapus');
    } catch (e) {
      console.error(e);
      alert('❌ Gagal menghapus data');
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}