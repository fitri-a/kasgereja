import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage {

  constructor(private router: Router) {}

  async backupData() {
    try {
      const data = JSON.parse(localStorage.getItem('transaksi') || '[]');

      const doc = new jsPDF();

      // Judul
      doc.setFontSize(16);
      doc.text('Laporan Kas Gereja', 10, 10);

      let y = 20;

      // Jika kosong
      if (data.length === 0) {
        doc.text('Tidak ada data transaksi', 10, y);
      } else {
        data.forEach((item: any, i: number) => {
          doc.setFontSize(10);

          doc.text(
            `${i + 1}. ${item.kategori} | ${item.tanggal} | Rp ${item.nominal}`,
            10,
            y
          );

          y += 8;

          // pindah halaman jika penuh
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
        });
      }

      // 🔥 DOWNLOAD LANGSUNG
      doc.save(`backup-kas-${Date.now()}.pdf`);

      alert('✅ PDF berhasil didownload');

    } catch (e) {
      console.error(e);
      alert('❌ Backup gagal');
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}