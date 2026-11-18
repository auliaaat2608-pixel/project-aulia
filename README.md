# MathLearn

## Menghubungkan ke Supabase

1. Buat project di Supabase dan salin **Project URL** serta **anon/public key**.
2. Buat file `.env.local` di root proyek dengan isi berikut:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

   Jangan gunakan atau menaruh `service_role` key di aplikasi browser.
3. Aktifkan **Anonymous Sign-Ins** di pengaturan Authentication project Supabase.
4. Jalankan SQL pada `supabase/migrations/20261116123900_create_student_progress.sql` melalui SQL Editor Supabase.
5. Jalankan aplikasi:

   ```sh
   npm run start
   ```

Akun anonim menyimpan progres secara privat per browser. Nama siswa dan nilai
pretest/posttest disimpan di `student_progress`; progres game tetap tersimpan
di browser. Nilai lokal yang sudah ada akan dikirim saat siswa masuk pertama kali.
