import "./style.css";
import { tampilkanGame } from "./game.js";

import {
  getStudentProfile,
  saveStudentProfile,
  signInStudentAnonymously,
  supabase
} from "./supabase.js";

// ======================================
// PENGATURAN MATHLEARN
// ======================================

const app = document.getElementById("app");

const KEY_NAMA = "mathlearnNickname";
const KEY_PRETEST = "mathlearnPretestScore";
const KEY_POSTTEST = "mathlearnPosttestScore";
const KEY_GAME = "mathlearnGameProgress";

// ======================================
// DATA SOAL PRETEST
// ======================================

const soalPretest = [
  {
    pertanyaan: "Bentuk baku dari 3.000 adalah ....",
    pilihan: ["3 × 10²", "3 × 10³", "3 × 10⁴", "30 × 10³"],
    jawaban: 1
  },
  {
    pertanyaan: "Bentuk baku dari 45.000 adalah ....",
    pilihan: ["4,5 × 10²", "4,5 × 10³", "4,5 × 10⁴", "45 × 10⁴"],
    jawaban: 2
  },
  {
    pertanyaan: "Bilangan 2,5 × 10³ sama dengan ....",
    pilihan: ["250", "2.500", "25.000", "250.000"],
    jawaban: 1
  },
  {
    pertanyaan: "Bentuk baku dari 0,0006 adalah ....",
    pilihan: ["6 × 10⁻²", "6 × 10⁻³", "6 × 10⁻⁴", "6 × 10⁴"],
    jawaban: 2
  },
  {
    pertanyaan: "Pada bentuk baku 7,2 × 10⁵, angka 5 disebut ....",
    pilihan: [
      "Bilangan pokok",
      "Koefisien",
      "Pangkat atau eksponen",
      "Hasil perkalian"
    ],
    jawaban: 2
  }
];

// ======================================
// DATA SOAL LATIHAN
// ======================================

const soalLatihan = [
  {
    pertanyaan: "Bentuk baku dari 6.000 adalah ....",
    pilihan: ["6 × 10²", "6 × 10³", "6 × 10⁴", "60 × 10³"],
    jawaban: 1,
    pembahasan:
      "6.000 menjadi 6 dengan menggeser tanda desimal 3 tempat ke kiri. Jadi, bentuk bakunya adalah 6 × 10³."
  },
  {
    pertanyaan: "Bentuk baku dari 72.000 adalah ....",
    pilihan: ["7,2 × 10³", "7,2 × 10⁴", "7,2 × 10⁵", "72 × 10⁴"],
    jawaban: 1,
    pembahasan:
      "72.000 menjadi 7,2. Tanda desimal bergeser 4 tempat ke kiri, sehingga hasilnya 7,2 × 10⁴."
  },
  {
    pertanyaan: "Bentuk baku dari 0,00045 adalah ....",
    pilihan: ["4,5 × 10⁻²", "4,5 × 10⁻³", "4,5 × 10⁻⁴", "4,5 × 10⁴"],
    jawaban: 2,
    pembahasan:
      "0,00045 menjadi 4,5 dengan menggeser tanda desimal 4 tempat ke kanan. Pangkatnya menjadi −4."
  },
  {
    pertanyaan: "Bilangan 3,5 × 10⁴ sama dengan ....",
    pilihan: ["350", "3.500", "35.000", "350.000"],
    jawaban: 2,
    pembahasan:
      "Pangkat 4 berarti tanda desimal digeser 4 tempat ke kanan. Hasilnya 35.000."
  },
  {
    pertanyaan: "Bilangan 8,2 × 10⁻³ sama dengan ....",
    pilihan: ["0,082", "0,0082", "0,00082", "8.200"],
    jawaban: 1,
    pembahasan:
      "Pangkat −3 berarti tanda desimal digeser 3 tempat ke kiri. Hasilnya 0,0082."
  }
];

// ======================================
// DATA SOAL POSTTEST
// ======================================

const soalPosttest = [
  {
    pertanyaan:
      "Jarak rata-rata Bumi ke Matahari sekitar 150.000.000 km. Seorang siswa ingin menuliskan jarak tersebut dalam bentuk baku untuk laporan astronomi. Bentuk baku yang tepat adalah ....",
    pilihan: [
      "1,5 × 10⁶ km",
      "1,5 × 10⁷ km",
      "1,5 × 10⁸ km",
      "1,5 × 10⁹ km"
    ],
    jawaban: 2,
    pembahasan:
      "150.000.000 diubah menjadi 1,5 dengan menggeser tanda desimal 8 tempat ke kiri. Jadi, bentuk bakunya adalah 1,5 × 10⁸ km."
  },
  {
    pertanyaan:
      "Sebuah bakteri memiliki panjang sekitar 0,000004 meter. Peneliti ingin menuliskan ukuran bakteri tersebut dalam bentuk baku. Hasil yang benar adalah ....",
    pilihan: [
      "4 × 10⁻⁴ m",
      "4 × 10⁻⁵ m",
      "4 × 10⁻⁶ m",
      "4 × 10⁻⁷ m"
    ],
    jawaban: 2,
    pembahasan:
      "0,000004 menjadi 4 setelah tanda desimal digeser 6 tempat ke kanan. Karena bilangan awal kurang dari 1, pangkatnya negatif. Hasilnya 4 × 10⁻⁶ m."
  },
  {
    pertanyaan:
      "Kota A memiliki jumlah penduduk 2.500.000 jiwa, sedangkan Kota B memiliki 3.200.000 jiwa. Jika kedua jumlah penduduk digabungkan, bentuk baku dari jumlah seluruh penduduk adalah ....",
    pilihan: [
      "5,7 × 10⁵ jiwa",
      "5,7 × 10⁶ jiwa",
      "5,7 × 10⁷ jiwa",
      "5,7 × 10⁸ jiwa"
    ],
    jawaban: 1,
    pembahasan:
      "Jumlah penduduk = 2.500.000 + 3.200.000 = 5.700.000. Dalam bentuk baku, 5.700.000 = 5,7 × 10⁶ jiwa."
  },
  {
    pertanyaan:
      "Sebuah pusat data menyimpan 4,5 × 10⁶ file. Pusat data lain menyimpan 2,5 × 10⁵ file. Jika seluruh file digabungkan, jumlah file dalam bilangan biasa adalah ....",
    pilihan: [
      "475.000 file",
      "2.950.000 file",
      "4.750.000 file",
      "7.000.000 file"
    ],
    jawaban: 2,
    pembahasan:
      "4,5 × 10⁶ = 4.500.000 dan 2,5 × 10⁵ = 250.000. Jumlahnya adalah 4.750.000 file."
  },
  {
    pertanyaan:
      "Sebuah alat mengukur ketebalan benda sebesar 0,000008 meter. Seorang siswa menuliskan hasilnya sebagai 8 × 10⁻⁵ meter. Guru meminta siswa memeriksa kembali jawabannya. Pernyataan yang tepat adalah ....",
    pilihan: [
      "Benar, karena tanda desimal bergeser 5 tempat.",
      "Salah, seharusnya 8 × 10⁻⁶ meter.",
      "Salah, seharusnya 8 × 10⁶ meter.",
      "Benar, karena pangkatnya negatif."
    ],
    jawaban: 1,
    pembahasan:
      "0,000008 = 8 × 10⁻⁶. Tanda desimal bergeser 6 tempat ke kanan, sehingga pangkat yang tepat adalah −6, bukan −5."
  }
];

// ======================================
// FUNGSI BANTU
// ======================================

function getSavedScore(key) {
  const nilai = localStorage.getItem(key);

  return nilai === null ? null : Number(nilai);
}

function getStudentName() {
  return localStorage.getItem(KEY_NAMA) || "";
}

function ambilProgresGame() {
  const progresAwal = {
    poin: 0,
    levelTerbuka: 1,
    selesai: []
  };

  try {
    const data = JSON.parse(
      localStorage.getItem(KEY_GAME) || "{}"
    );

    return {
      poin: Number(data.poin) || 0,
      levelTerbuka: Number(data.levelTerbuka) || 1,
      selesai: Array.isArray(data.selesai)
        ? data.selesai
        : []
    };
  } catch (error) {
    console.error("Gagal membaca progres game:", error);
    return progresAwal;
  }
}

// ======================================
// SUARA BINTANG MATHLEARN
// ======================================

function suaraSambutan(nama) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const sapaan = new SpeechSynthesisUtterance(
    `Selamat datang di MathLearn, ${nama}! ` +
    "Halo! Aku Bintang MathLearn. " +
    "Yuk, kita mulai petualangan matematika yang seru!"
  );

  sapaan.lang = "id-ID";
  sapaan.rate = 0.9;
  sapaan.pitch = 1.2;

  window.speechSynthesis.speak(sapaan);
}

// ======================================
// LOGIN
// ======================================

function tampilkanLogin(pesanError = "") {
  app.innerHTML = `
    <main class="login-page">
      <section class="login-card">

        <div class="login-illustration">
          <div class="mascot-star">⭐</div>
          <h2>Bintang MathLearn</h2>
          <p>
            Hai, teman belajar!
            Yuk, jelajahi dunia matematika
            dengan cara yang menyenangkan!
          </p>
        </div>

        <div class="login-content">
          <span class="welcome-label">
            ✨ PETUALANGAN MATEMATIKA DIMULAI!
          </span>

          <h1>Selamat Datang!</h1>

          <p class="login-description">
            Masukkan namamu untuk memulai
            petualangan belajar bersama MathLearn.
          </p>

          <form id="loginForm">
            <label for="studentName">Nama siswa</label>

            <input
              type="text"
              id="studentName"
              class="login-input"
              placeholder="Masukkan nama kamu..."
              maxlength="30"
              required
            >

            <button type="submit" class="start-button">
              Mulai Belajar 🚀
            </button>
          </form>

          <p id="loginError" role="alert" style="color: #c43d3d;"></p>

          <p class="login-footer">
            Belajar Matematika Jadi Lebih Seru!
          </p>
        </div>

      </section>
    </main>
  `;

  document.getElementById("loginError").textContent =
    pesanError;

  document.getElementById("loginForm")
    .addEventListener("submit", async function(event) {
      event.preventDefault();

      const nama = document
        .getElementById("studentName")
        .value.trim();

      if (!nama) return;

      const tombol = event.currentTarget.querySelector(
        "button[type='submit']"
      );

      const pesan = document.getElementById("loginError");

      tombol.disabled = true;
      tombol.textContent = "Menghubungkan...";
      pesan.textContent = "";

      try {
        await signInStudentAnonymously();

        // Simpan nama siswa di browser.
        localStorage.setItem(KEY_NAMA, nama);

        // Simpan nama dan nilai yang sudah tersedia.
        await saveStudentProfile(nama, {
          pretest_score: getSavedScore(KEY_PRETEST),
          posttest_score: getSavedScore(KEY_POSTTEST)
        });

        suaraSambutan(nama);
        tampilkanDashboard(nama);

      } catch (error) {
        pesan.textContent =
          `Gagal menghubungkan ke Supabase: ${error.message}`;

        tombol.disabled = false;
        tombol.textContent = "Mulai Belajar 🚀";
      }
    });
}

// ======================================
// MENYIMPAN NILAI KE SUPABASE
// ======================================

async function sinkronkanNilai() {
  return saveStudentProfile(getStudentName(), {
    pretest_score: getSavedScore(KEY_PRETEST),
    posttest_score: getSavedScore(KEY_POSTTEST)
  });
}

// ======================================
// DASHBOARD
// ======================================

function tampilkanDashboard(nama) {
  const progresGame = ambilProgresGame();

  app.innerHTML = `
    <main class="dashboard-page">

      <header class="dashboard-header">
        <div class="dashboard-logo">⭐ MathLearn</div>

        <div class="student-profile">
          👤 <span id="profileName"></span>
        </div>
      </header>

      <section class="dashboard-welcome">
        <div>
          <h1 id="welcomeName"></h1>
          <p>
            Siap belajar matematika hari ini?
            Ayo kumpulkan bintang dan XP
            bersama Bintang MathLearn!
          </p>
        </div>

        <div class="dashboard-mascot">⭐</div>
      </section>

      <section class="xp-card">
        <h3>🏆 Perjalanan Belajarmu</h3>

        <p>
          Level ${progresGame.levelTerbuka}
          - Penjelajah Matematika
        </p>

        <div class="xp-bar">
          <div class="xp-progress"></div>
        </div>

        <p>
          ⭐ ${progresGame.poin} Bintang
          &nbsp; | &nbsp;
          ⚡ ${progresGame.poin} XP
        </p>
      </section>

      <h2 class="dashboard-title">
        ✨ Menu Petualangan MathLearn
      </h2>

      <section class="menu-grid">

        <article class="menu-card" id="menuMateri">
          <div class="menu-icon">📚</div>
          <h3>Materi</h3>
          <p>Pelajari penulisan bentuk baku dengan mudah.</p>
        </article>

        <article class="menu-card" id="menuPretest">
          <div class="menu-icon">📝</div>
          <h3>Pretest</h3>
          <p>Uji pengetahuan awal sebelum belajar.</p>
        </article>

        <article class="menu-card" id="menuLatihan">
          <div class="menu-icon">✏️</div>
          <h3>Latihan Soal</h3>
          <p>Asah kemampuan melalui berbagai soal.</p>
        </article>

        <article class="menu-card" id="menuGame">
          <div class="menu-icon">🎮</div>
          <h3>Game Matematika</h3>
          <p>Belajar sambil bermain bersama Bintang.</p>
        </article>

        <article class="menu-card" id="menuPosttest">
          <div class="menu-icon">🎓</div>
          <h3>Posttest</h3>
          <p>Ukur pemahaman setelah belajar.</p>
        </article>

        <article class="menu-card" id="menuProgres">
          <div class="menu-icon">📊</div>
          <h3>Progres Belajar</h3>
          <p>Lihat perkembangan hasil belajarmu.</p>
        </article>

      </section>
    </main>
  `;

  document.getElementById("profileName").textContent = nama;

  document.getElementById("welcomeName").textContent =
    `Halo, ${nama}! 👋`;

  document.getElementById("menuMateri")
    .addEventListener("click", tampilkanMateri);

  document.getElementById("menuPretest")
    .addEventListener("click", tampilkanPretest);

  document.getElementById("menuLatihan")
    .addEventListener("click", tampilkanLatihan);

  document.getElementById("menuGame")
    .addEventListener("click", function() {
      tampilkanGame(app, kembaliKeDashboard);
    });

  document.getElementById("menuPosttest")
    .addEventListener("click", tampilkanPosttest);

  document.getElementById("menuProgres")
    .addEventListener("click", tampilkanProgres);
}

// ======================================
// KEMBALI KE DASHBOARD
// ======================================

function kembaliKeDashboard() {
  tampilkanDashboard(getStudentName());
}

// ======================================
// MATERI
// ======================================

function tampilkanMateri() {
  app.innerHTML = `
    <main class="dashboard-page">

      <header class="dashboard-header">
        <div class="dashboard-logo">⭐ MathLearn</div>

        <button class="start-button" id="kembaliDashboard">
          ← Kembali
        </button>
      </header>

      <section class="dashboard-welcome">
        <div>
          <h1>📚 Ayo Belajar Bentuk Baku!</h1>
          <p>
            Bersama Bintang MathLearn,
            kita menjelajahi dunia angka!
          </p>
        </div>

        <div class="dashboard-mascot">⭐</div>
      </section>

      <section class="materi-container">

        <div class="materi-card">
          <h2>1. Pengertian Bentuk Baku</h2>

          <p>
            Bentuk baku atau notasi ilmiah adalah
            cara menuliskan bilangan yang sangat besar
            atau sangat kecil menjadi lebih sederhana
            menggunakan perpangkatan 10.
          </p>

          <div class="contoh-box">
            <h3>Contoh:</h3>
            <p>3.000.000 dapat ditulis menjadi:</p>
            <h2>3 × 10⁶</h2>
          </div>
        </div>

        <div class="materi-card">
          <h2>2. Bentuk Umum Bentuk Baku</h2>

          <p>Bentuk umum notasi ilmiah adalah:</p>

          <div class="rumus-box">a × 10ⁿ</div>

          <p>Keterangan:</p>

          <ul>
            <li><b>a</b> adalah angka minimal 1 dan kurang dari 10.</li>
            <li><b>10</b> adalah bilangan pokok.</li>
            <li><b>n</b> adalah bilangan bulat sebagai pangkat.</li>
          </ul>
        </div>

        <div class="materi-card">
          <h2>3. Mengubah Bilangan Besar Menjadi Bentuk Baku</h2>

          <div class="contoh-box">
            <h3>Contoh: 45.000</h3>
            <p>Geser tanda desimal sehingga menjadi 4,5.</p>
            <p>Tanda desimal bergeser 4 tempat ke kiri.</p>
            <h3>Hasil: 4,5 × 10⁴</h3>
          </div>
        </div>

        <div class="materi-card">
          <h2>4. Mengubah Bilangan Kecil Menjadi Bentuk Baku</h2>

          <div class="contoh-box">
            <h3>Contoh: 0,00032</h3>
            <p>Geser tanda desimal sehingga menjadi 3,2.</p>
            <p>Tanda desimal bergeser 4 tempat ke kanan.</p>
            <h3>Hasil: 3,2 × 10⁻⁴</h3>
          </div>
        </div>

        <div class="materi-card">
          <h2>🌟 Hebat! Kamu Sudah Belajar</h2>

          <p>
            Kamu sudah mengenal pengertian,
            bentuk umum, dan cara menuliskan bilangan
            dalam bentuk baku.
          </p>

          <button class="start-button" id="tombolSelesaiMateri">
            Selesai Belajar ✨
          </button>
        </div>

      </section>
    </main>
  `;

  document.getElementById("kembaliDashboard")
    .addEventListener("click", kembaliKeDashboard);

  document.getElementById("tombolSelesaiMateri")
    .addEventListener("click", kembaliKeDashboard);
}

// ======================================
// PRETEST DAN POSTTEST
// ======================================

function tampilkanPretest() {
  mulaiKuis("Pretest", soalPretest, "pretest");
}

function tampilkanPosttest() {
  mulaiKuis("Posttest", soalPosttest, "posttest");
}

// ======================================
// SISTEM KUIS
// ======================================

function mulaiKuis(judul, daftarSoal, jenis) {
  let nomorSoal = 0;

  const jawabanSiswa = Array(
    daftarSoal.length
  ).fill(null);

  app.innerHTML = `
    <main class="dashboard-page">

      <header class="dashboard-header">
        <div class="dashboard-logo">⭐ MathLearn</div>

        <button class="start-button" id="kembaliDashboard">
          ← Kembali
        </button>
      </header>

      <section class="dashboard-welcome">
        <div>
          <h1>📝 ${judul} Bentuk Baku</h1>

          <p>
            ${jenis === "pretest"
              ? "Kerjakan untuk mengetahui kemampuan awalmu."
              : "Kerjakan untuk mengetahui pemahamanmu setelah belajar."}
          </p>
        </div>

        <div class="dashboard-mascot">⭐</div>
      </section>

      <section class="materi-container">

        <div class="materi-card">
          <h2>📌 Petunjuk Pengerjaan</h2>
          <p>1. Terdapat 5 soal pilihan ganda.</p>
          <p>2. Pilih satu jawaban yang paling tepat.</p>
          <p>3. Kerjakan semua soal sampai selesai.</p>
          <p>4. Nilai akan muncul setelah semua jawaban dikirim.</p>
        </div>

        <div class="materi-card" id="areaKuis"></div>

      </section>
    </main>
  `;

  document.getElementById("kembaliDashboard")
    .addEventListener("click", kembaliKeDashboard);

  function simpanJawaban() {
    const pilihan = document.querySelector(
      'input[name="jawabanKuis"]:checked'
    );

    if (pilihan) {
      jawabanSiswa[nomorSoal] = Number(pilihan.value);
    }
  }

  function tampilkanSoal() {
    const soal = daftarSoal[nomorSoal];
    const area = document.getElementById("areaKuis");

    area.innerHTML = `
      <h2>Soal ${nomorSoal + 1} dari ${daftarSoal.length}</h2>

      <div class="xp-bar">
        <div
          class="xp-progress"
          style="width: ${(nomorSoal + 1) / daftarSoal.length * 100}%"
        ></div>
      </div>

      <h3 style="margin-top: 25px;">
        ${soal.pertanyaan}
      </h3>

      <div style="margin-top: 20px;">
        ${soal.pilihan.map(function(pilihan, index) {
          return `
            <label style="
              display: block;
              padding: 13px;
              margin-bottom: 10px;
              background: #f5f0ff;
              border-radius: 12px;
              cursor: pointer;
            ">
              <input
                type="radio"
                name="jawabanKuis"
                value="${index}"
                ${jawabanSiswa[nomorSoal] === index ? "checked" : ""}
              >

              ${String.fromCharCode(65 + index)}. ${pilihan}
            </label>
          `;
        }).join("")}
      </div>

      <p id="pesanKuis" style="color: #7654D6;"></p>

      <div style="
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 20px;
      ">

        <button
          class="start-button"
          id="soalSebelumnya"
          ${nomorSoal === 0 ? "disabled" : ""}
        >
          ← Sebelumnya
        </button>

        <button class="start-button" id="soalBerikutnya">
          ${
            nomorSoal === daftarSoal.length - 1
              ? "Selesai ✨"
              : "Berikutnya →"
          }
        </button>

      </div>
    `;

    document.getElementById("soalSebelumnya")
      .addEventListener("click", function() {
        simpanJawaban();

        if (nomorSoal > 0) {
          nomorSoal--;
          tampilkanSoal();
        }
      });

    document.getElementById("soalBerikutnya")
      .addEventListener("click", function() {
        const pilihan = document.querySelector(
          'input[name="jawabanKuis"]:checked'
        );

        if (!pilihan) {
          document.getElementById("pesanKuis").textContent =
            "Pilih salah satu jawaban terlebih dahulu! ⭐";

          return;
        }

        simpanJawaban();

        if (nomorSoal < daftarSoal.length - 1) {
          nomorSoal++;
          tampilkanSoal();
        } else {
          tampilkanHasil();
        }
      });
  }

  async function tampilkanHasil() {
    let jumlahBenar = 0;

    daftarSoal.forEach(function(soal, index) {
      if (jawabanSiswa[index] === soal.jawaban) {
        jumlahBenar++;
      }
    });

    const nilai =
      jumlahBenar / daftarSoal.length * 100;

    if (jenis === "pretest") {
      localStorage.setItem(KEY_PRETEST, nilai);
    } else {
      localStorage.setItem(KEY_POSTTEST, nilai);
    }

    const ulasanPosttest = jenis === "posttest"
      ? `
        <div style="text-align: left; margin-top: 25px;">
          <h2>📖 Pembahasan Posttest</h2>

          ${daftarSoal.map(function(soal, index) {
            const jawabanDipilih = jawabanSiswa[index];
            const benar = jawabanDipilih === soal.jawaban;

            return `
              <div style="
                margin-top: 15px;
                padding: 16px;
                border-radius: 14px;
                background: ${benar ? "#e5fff2" : "#fff0f0"};
                border: 1px solid ${benar ? "#55c995" : "#ffaaaa"};
              ">
                <h3>
                  Soal ${index + 1} —
                  ${benar ? "Benar ✓" : "Belum tepat"}
                </h3>

                <p><b>${soal.pertanyaan}</b></p>

                <p>
                  <b>Jawabanmu:</b>
                  ${String.fromCharCode(65 + jawabanDipilih)}.
                  ${soal.pilihan[jawabanDipilih]}
                </p>

                <p>
                  <b>Jawaban benar:</b>
                  ${String.fromCharCode(65 + soal.jawaban)}.
                  ${soal.pilihan[soal.jawaban]}
                </p>

                <p>
                  <b>Pembahasan:</b>
                  ${soal.pembahasan}
                </p>
              </div>
            `;
          }).join("")}
        </div>
      `
      : "";

    app.innerHTML = `
      <main class="dashboard-page">

        <header class="dashboard-header">
          <div class="dashboard-logo">⭐ MathLearn</div>
        </header>

        <section class="materi-container">
          <div class="materi-card" style="text-align: center;">

            <div style="font-size: 65px;">
              ${nilai >= 80 ? "🏆" : nilai >= 60 ? "⭐" : "🌱"}
            </div>

            <h1>${judul} Selesai!</h1>

            <p>
              Hebat! Kamu sudah menyelesaikan
              ${judul} Bentuk Baku.
            </p>

            <div class="rumus-box">
              Nilai: ${nilai}
            </div>

            <h3>
              ${jumlahBenar} dari ${daftarSoal.length} soal benar
            </h3>

            <p id="scoreSyncStatus" role="status">
              Menyimpan nilai ke Supabase...
            </p>

            <p>
              ${nilai >= 80
                ? "Luar biasa! Hasil belajarmu sangat baik."
                : nilai >= 60
                  ? "Bagus! Terus tingkatkan pemahamanmu."
                  : "Tetap semangat! Kamu bisa belajar dan mencoba lagi."}
            </p>

            ${ulasanPosttest}

            <button
              class="start-button"
              id="kembaliDashboard"
              style="margin-top: 20px;"
            >
              Kembali ke Dashboard 🏠
            </button>

          </div>
        </section>
      </main>
    `;

    document.getElementById("kembaliDashboard")
      .addEventListener("click", kembaliKeDashboard);

    try {
      await sinkronkanNilai();

      const status = document.getElementById("scoreSyncStatus");

      if (status) {
        status.textContent =
          "Nilai berhasil disimpan ke Supabase.";
      }

    } catch (error) {
      const status = document.getElementById("scoreSyncStatus");

      if (status) {
        status.textContent =
          `Nilai tersimpan di perangkat, tetapi gagal disinkronkan: ${error.message}`;
      }
    }
  }

  tampilkanSoal();
}

// ======================================
// LATIHAN SOAL
// ======================================

function tampilkanLatihan() {
  let nomorSoal = 0;
  let sudahDiperiksa = false;
  let jumlahBenar = 0;

  const jawabanSiswa = Array(
    soalLatihan.length
  ).fill(null);

  app.innerHTML = `
    <main class="dashboard-page">

      <header class="dashboard-header">
        <div class="dashboard-logo">⭐ MathLearn</div>

        <button class="start-button" id="kembaliDashboard">
          ← Kembali
        </button>
      </header>

      <section class="dashboard-welcome">
        <div>
          <h1>✏️ Latihan Soal Bentuk Baku</h1>
          <p>Pilih jawabanmu, lalu kirim untuk diperiksa.</p>
        </div>

        <div class="dashboard-mascot">⭐</div>
      </section>

      <section class="materi-container">

        <div class="materi-card">
          <h2>📌 Petunjuk Latihan</h2>
          <p>1. Latihan terdiri dari 5 soal.</p>
          <p>2. Pilih jawaban yang menurutmu benar.</p>
          <p>3. Tekan tombol Kirim Jawaban.</p>
          <p>4. Hasil dan pembahasan muncul setelah jawaban dikirim.</p>
        </div>

        <div class="materi-card" id="areaLatihan"></div>

      </section>
    </main>
  `;

  document.getElementById("kembaliDashboard")
    .addEventListener("click", kembaliKeDashboard);

  function tampilkanSoal() {
    const soal = soalLatihan[nomorSoal];
    const area = document.getElementById("areaLatihan");

    sudahDiperiksa = false;

    area.innerHTML = `
      <h2>Soal ${nomorSoal + 1} dari ${soalLatihan.length}</h2>

      <div class="xp-bar">
        <div
          class="xp-progress"
          style="width: ${(nomorSoal + 1) / soalLatihan.length * 100}%"
        ></div>
      </div>

      <h3 style="margin-top: 25px;">
        ${soal.pertanyaan}
      </h3>

      <div style="margin-top: 20px;">
        ${soal.pilihan.map(function(pilihan, index) {
          return `
            <label style="
              display: block;
              padding: 13px;
              margin-bottom: 10px;
              background: #f5f0ff;
              border-radius: 12px;
              cursor: pointer;
            ">
              <input
                type="radio"
                name="jawabanLatihan"
                value="${index}"
              >

              ${String.fromCharCode(65 + index)}. ${pilihan}
            </label>
          `;
        }).join("")}
      </div>

      <p id="pesanLatihan" style="color: #7654D6;"></p>

      <div id="hasilPemeriksaan"></div>

      <div style="margin-top: 20px;">
        <button class="start-button" id="kirimJawaban">
          Kirim Jawaban 📩
        </button>

        <button
          class="start-button"
          id="soalBerikutnya"
          style="display: none; margin-top: 10px;"
        >
          Soal Berikutnya →
        </button>
      </div>
    `;

    document.getElementById("kirimJawaban")
      .addEventListener("click", periksaJawaban);

    document.getElementById("soalBerikutnya")
      .addEventListener("click", lanjutSoal);
  }

  function periksaJawaban() {
    if (sudahDiperiksa) return;

    const pilihan = document.querySelector(
      'input[name="jawabanLatihan"]:checked'
    );

    if (!pilihan) {
      document.getElementById("pesanLatihan").textContent =
        "Pilih jawaban terlebih dahulu sebelum mengirim! ⭐";

      return;
    }

    jawabanSiswa[nomorSoal] = Number(pilihan.value);
    sudahDiperiksa = true;

    const soal = soalLatihan[nomorSoal];

    const benar =
      jawabanSiswa[nomorSoal] === soal.jawaban;

    if (benar) {
      jumlahBenar++;
    }

    document.querySelectorAll(
      'input[name="jawabanLatihan"]'
    ).forEach(function(input) {
      input.disabled = true;
    });

    document.getElementById("hasilPemeriksaan").innerHTML = `
      <div style="
        margin-top: 20px;
        padding: 18px;
        border-radius: 15px;
        background: ${benar ? "#e5fff2" : "#fff0f0"};
        border: 2px solid ${benar ? "#55c995" : "#ffaaaa"};
      ">
        <h3 style="color: ${benar ? "#168653" : "#c43d3d"};">
          ${benar ? "🎉 Jawaban Benar!" : "🌱 Jawaban Belum Tepat"}
        </h3>

        <p>
          <b>Jawaban yang benar:</b>
          ${String.fromCharCode(65 + soal.jawaban)}.
          ${soal.pilihan[soal.jawaban]}
        </p>

        <p>
          <b>Pembahasan:</b>
          ${soal.pembahasan}
        </p>
      </div>
    `;

    document.getElementById("kirimJawaban").style.display =
      "none";

    const tombol = document.getElementById("soalBerikutnya");

    tombol.style.display = "inline-block";

    if (nomorSoal === soalLatihan.length - 1) {
      tombol.textContent = "Lihat Hasil Latihan 🏆";
    }
  }

  function lanjutSoal() {
    if (!sudahDiperiksa) return;

    if (nomorSoal < soalLatihan.length - 1) {
      nomorSoal++;
      tampilkanSoal();
    } else {
      tampilkanHasil();
    }
  }

  function tampilkanHasil() {
    const nilai =
      jumlahBenar / soalLatihan.length * 100;

    app.innerHTML = `
      <main class="dashboard-page">

        <header class="dashboard-header">
          <div class="dashboard-logo">⭐ MathLearn</div>
        </header>

        <section class="materi-container">
          <div class="materi-card" style="text-align: center;">

            <div style="font-size: 65px;">
              ${nilai >= 80 ? "🏆" : nilai >= 60 ? "⭐" : "🌱"}
            </div>

            <h1>Latihan Selesai!</h1>

            <p>
              Kamu sudah menyelesaikan semua soal latihan.
            </p>

            <div class="rumus-box">
              Nilai: ${nilai}
            </div>

            <h3>
              ${jumlahBenar} dari ${soalLatihan.length} soal benar
            </h3>

            <button class="start-button" id="ulangLatihan">
              Ulangi Latihan 🔄
            </button>

            <button
              class="start-button"
              id="kembaliDashboard"
              style="margin-top: 10px;"
            >
              Kembali ke Dashboard 🏠
            </button>

          </div>
        </section>
      </main>
    `;

    document.getElementById("ulangLatihan")
      .addEventListener("click", tampilkanLatihan);

    document.getElementById("kembaliDashboard")
      .addEventListener("click", kembaliKeDashboard);
  }

  tampilkanSoal();
}

// ======================================
// PROGRES BELAJAR
// ======================================

function tampilkanProgres() {
  const nilaiPretest = localStorage.getItem(KEY_PRETEST);
  const nilaiPosttest = localStorage.getItem(KEY_POSTTEST);

  const progresGame = ambilProgresGame();

  let isiPerbandingan = "";

  if (
    nilaiPretest === null ||
    nilaiPosttest === null
  ) {
    isiPerbandingan = `
      <p>
        Selesaikan Pretest dan Posttest terlebih dahulu
        untuk melihat perbandingan hasil belajarmu.
      </p>
    `;
  } else {
    const pretest = Number(nilaiPretest);
    const posttest = Number(nilaiPosttest);
    const selisih = posttest - pretest;

    isiPerbandingan = `
      <div class="rumus-box">
        ${pretest} → ${posttest}
      </div>

      <h3>
        Perubahan Nilai:
        ${selisih > 0 ? "+" : ""}${selisih}
      </h3>

      <p>
        ${selisih > 0
          ? "🎉 Hebat! Nilaimu meningkat setelah belajar."
          : selisih === 0
            ? "Nilaimu tetap. Terus berlatih untuk meningkatkan pemahaman."
            : "Jangan menyerah! Pelajari kembali materi dan terus berlatih."}
      </p>
    `;
  }

  app.innerHTML = `
    <main class="dashboard-page">

      <header class="dashboard-header">
        <div class="dashboard-logo">⭐ MathLearn</div>

        <button class="start-button" id="kembaliDashboard">
          ← Kembali
        </button>
      </header>

      <section class="dashboard-welcome">
        <div>
          <h1>📊 Progres Belajarku</h1>

          <p>
            Lihat perkembangan hasil belajarmu
            bersama Bintang MathLearn.
          </p>
        </div>

        <div class="dashboard-mascot">⭐</div>
      </section>

      <section class="materi-container">

        <div class="materi-card">
          <h2>📝 Nilai Pretest</h2>

          <div class="rumus-box">
            ${
              nilaiPretest === null
                ? "Belum dikerjakan"
                : nilaiPretest
            }
          </div>

          <p>Nilai sebelum mempelajari materi.</p>
        </div>

        <div class="materi-card">
          <h2>🎓 Nilai Posttest</h2>

          <div class="rumus-box">
            ${
              nilaiPosttest === null
                ? "Belum dikerjakan"
                : nilaiPosttest
            }
          </div>

          <p>Nilai setelah mempelajari materi.</p>
        </div>

        <div class="materi-card">
          <h2>🏆 Perbandingan Hasil Belajar</h2>
          ${isiPerbandingan}
        </div>

        <div class="materi-card">
          <h2>🎮 Progres Game Matematika</h2>

          <div class="rumus-box">
            ⭐ ${progresGame.poin} Poin
          </div>

          <h3>
            Level Terbuka: ${progresGame.levelTerbuka}
          </h3>

          <p>
            Level yang telah diselesaikan:
            ${progresGame.selesai.length} dari 3 level.
          </p>
        </div>

      </section>
    </main>
  `;

  document.getElementById("kembaliDashboard")
    .addEventListener("click", kembaliKeDashboard);
}

// ======================================
// MEMERIKSA LOGIN DAN MEMUAT DATA SUPABASE
// ======================================

async function mulaiAplikasi() {
  if (!supabase) {
    tampilkanLogin(
      "Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env.local pada root proyek."
    );

    return;
  }

  try {
    // Periksa profil dari Supabase.
    const profil = await getStudentProfile();

    const namaTersimpan = getStudentName();

    if (profil) {
      const nama = profil.nama_siswa || namaTersimpan;

      if (nama) {
        localStorage.setItem(KEY_NAMA, nama);
      }

      // Ambil nilai pretest.
      if (profil.nilai_pretest !== null) {
        localStorage.setItem(
          KEY_PRETEST,
          profil.nilai_pretest
        );
      } else {
        localStorage.removeItem(KEY_PRETEST);
      }

      // Ambil nilai posttest.
      if (profil.nilai_posttest !== null) {
        localStorage.setItem(
          KEY_POSTTEST,
          profil.nilai_posttest
        );
      } else {
        localStorage.removeItem(KEY_POSTTEST);
      }

      // Ambil progres game dari Supabase.
      const progresLokal = ambilProgresGame();

      const progresGame = {
        poin: Math.max(
          Number(profil.point_game) || 0,
          progresLokal.poin
        ),

        levelTerbuka: Math.max(
          Number(profil.level_game) || 1,
          progresLokal.levelTerbuka
        ),

        selesai: progresLokal.selesai
      };

      // Simpan progres yang sudah dimuat ke browser.
      localStorage.setItem(
        KEY_GAME,
        JSON.stringify(progresGame)
      );

      // Sinkronkan kembali progres game.
      await saveStudentProfile(nama || "Siswa", {
        point_game: progresGame.poin,
        level_game: progresGame.levelTerbuka
      });

      tampilkanDashboard(nama || "Siswa");

    } else if (namaTersimpan) {
      // Jika belum ada profil, buat sesi siswa.
      await signInStudentAnonymously();

      await saveStudentProfile(namaTersimpan, {
        pretest_score: getSavedScore(KEY_PRETEST),
        posttest_score: getSavedScore(KEY_POSTTEST)
      });

      tampilkanDashboard(namaTersimpan);

    } else {
      // Jika belum pernah masuk, tampilkan login.
      tampilkanLogin();
    }

  } catch (error) {
    tampilkanLogin(
      `Gagal memuat data dari Supabase: ${error.message}`
    );
  }
}

// ======================================
// MENJALANKAN MATHLEARN
// ======================================

mulaiAplikasi();

