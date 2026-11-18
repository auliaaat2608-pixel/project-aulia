
import { createClient } from "@supabase/supabase-js";

// ======================================
// KONFIGURASI SUPABASE
// ======================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// ======================================
// MEMERIKSA KONEKSI SUPABASE
// ======================================

function getClient() {
  if (!supabase) {
    throw new Error(
      "Konfigurasi Supabase belum lengkap. Periksa file .env.local."
    );
  }

  return supabase;
}

// ======================================
// LOGIN SISWA SECARA ANONIM
// ======================================

export async function signInStudentAnonymously() {
  const client = getClient();

  const { data: sessionData, error: sessionError } =
    await client.auth.getSession();

  if (sessionError) throw sessionError;

  // Jika siswa sudah memiliki sesi, gunakan sesi tersebut.
  if (sessionData.session) {
    return sessionData.session.user.id;
  }

  // Jika belum, buat sesi anonim.
  const { data, error } =
    await client.auth.signInAnonymously();

  if (error) throw error;

  if (!data.user) {
    throw new Error("Akun siswa gagal dibuat.");
  }

  return data.user.id;
}

// ======================================
// MENGAMBIL DATA PROFIL SISWA
// ======================================

export async function getStudentProfile() {
  const client = getClient();

  const { data: sessionData, error: sessionError } =
    await client.auth.getSession();

  if (sessionError) throw sessionError;

  if (!sessionData.session) {
    return null;
  }

  const userId = sessionData.session.user.id;

  const { data, error } = await client
    .from("progres_belajar")
    .select(`
      user_id,
      nama_siswa,
      nilai_pretest,
      nilai_posttest,
      point_game,
      level_game
    `)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

// ======================================
// MENYIMPAN DATA PROFIL DAN HASIL BELAJAR
// ======================================

export async function saveStudentProfile(
  nickname = "",
  scores = {}
) {
  const client = getClient();

  const { data: sessionData, error: sessionError } =
    await client.auth.getSession();

  if (sessionError) throw sessionError;

  if (!sessionData.session) {
    throw new Error(
      "Sesi siswa tidak ditemukan. Silakan masuk kembali."
    );
  }

  const userId = sessionData.session.user.id;

  // Periksa apakah data siswa sudah tersedia.
  const { data: existing, error: readError } = await client
    .from("progres_belajar")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (readError) throw readError;

  // Siapkan data yang akan disimpan.
  const profile = {
    updated_at: new Date().toISOString()
  };

  // Nama hanya diperbarui jika diberikan.
  if (nickname && nickname.trim()) {
    profile.nama_siswa = nickname.trim();
  }

  // Nilai pretest.
  if (scores.pretest_score !== undefined) {
    profile.nilai_pretest = scores.pretest_score;
  }

  // Nilai posttest.
  if (scores.posttest_score !== undefined) {
    profile.nilai_posttest = scores.posttest_score;
  }

  // Poin permainan.
  if (scores.point_game !== undefined) {
    profile.point_game = scores.point_game;
  }

  // Level permainan.
  if (scores.level_game !== undefined) {
    profile.level_game = scores.level_game;
  }

  let result;

  if (existing) {
    // Perbarui hanya data yang dikirim.
    result = await client
      .from("progres_belajar")
      .update(profile)
      .eq("user_id", userId);
  } else {
    // Buat data baru untuk siswa.
    result = await client
      .from("progres_belajar")
      .insert({
        user_id: userId,
        nama_siswa: nickname.trim() || "Siswa",
        ...profile
      });
  }

  if (result.error) {
    throw result.error;
  }

  return true;
}
