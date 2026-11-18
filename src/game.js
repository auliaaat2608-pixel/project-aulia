
const KEY_GAME = "mathlearnGameProgress";

// ==========================================
// DATA PERMAINAN MATHLEARN
// ==========================================

const levelGame = [
  {
    nama: "Level 1 — Mudah",
    deskripsi: "Kenali dan susun bentuk baku sederhana.",
    soal: [
      {
        angka: "4.500",
        koefisien: "4,5",
        pangkat: "3",
        pilihanKoefisien: ["4,5", "45", "0,45"],
        pilihanPangkat: ["2", "3", "4"],
        petunjuk: "Geser tanda desimal sampai angka di depan koma berada antara 1 dan 10.",
        pembahasan: "4.500 = 4,5 × 10³ karena tanda desimal bergeser 3 tempat ke kiri."
      },
      {
        angka: "32.000",
        koefisien: "3,2",
        pangkat: "4",
        pilihanKoefisien: ["3,2", "32", "0,32"],
        pilihanPangkat: ["3", "4", "5"],
        petunjuk: "Ubahlah 32.000 menjadi bilangan antara 1 dan 10.",
        pembahasan: "32.000 = 3,2 × 10⁴ karena tanda desimal bergeser 4 tempat ke kiri."
      },
      {
        angka: "0,006",
        koefisien: "6",
        pangkat: "-3",
        pilihanKoefisien: ["0,6", "6", "60"],
        pilihanPangkat: ["-2", "-3", "-4"],
        petunjuk: "Bilangan kurang dari 1 menggunakan pangkat negatif.",
        pembahasan: "0,006 = 6 × 10⁻³ karena tanda desimal bergeser 3 tempat ke kanan."
      }
    ]
  },
  {
    nama: "Level 2 — Sedang",
    deskripsi: "Tantangan bilangan besar dan kecil.",
    soal: [
      {
        angka: "725.000",
        koefisien: "7,25",
        pangkat: "5",
        pilihanKoefisien: ["7,25", "72,5", "0,725"],
        pilihanPangkat: ["4", "5", "6"],
        petunjuk: "Hitung berapa tempat tanda desimal bergeser ke kiri.",
        pembahasan: "725.000 = 7,25 × 10⁵."
      },
      {
        angka: "0,00048",
        koefisien: "4,8",
        pangkat: "-4",
        pilihanKoefisien: ["4,8", "48", "0,48"],
        pilihanPangkat: ["-3", "-4", "-5"],
        petunjuk: "Bilangan kecil menggunakan pangkat negatif.",
        pembahasan: "0,00048 = 4,8 × 10⁻⁴."
      },
      {
        angka: "6.300.000",
        koefisien: "6,3",
        pangkat: "6",
        pilihanKoefisien: ["6,3", "63", "0,63"],
        pilihanPangkat: ["5", "6", "7"],
        petunjuk: "Buat angka di depan koma menjadi 6,3.",
        pembahasan: "6.300.000 = 6,3 × 10⁶."
      }
    ]
  },
  {
    nama: "Level 3 — Sulit",
    deskripsi: "Selesaikan tantangan bentuk baku yang lebih kompleks.",
    soal: [
      {
        angka: "0,0000072",
        koefisien: "7,2",
        pangkat: "-6",
        pilihanKoefisien: ["7,2", "72", "0,72"],
        pilihanPangkat: ["-5", "-6", "-7"],
        petunjuk: "Hitung jumlah pergeseran desimal sampai menjadi 7,2.",
        pembahasan: "0,0000072 = 7,2 × 10⁻⁶."
      },
      {
        angka: "84.500.000",
        koefisien: "8,45",
        pangkat: "7",
        pilihanKoefisien: ["8,45", "84,5", "0,845"],
        pilihanPangkat: ["6", "7", "8"],
        petunjuk: "Koefisien harus lebih dari atau sama dengan 1 dan kurang dari 10.",
        pembahasan: "84.500.000 = 8,45 × 10⁷."
      },
      {
        angka: "0,00000039",
        koefisien: "3,9",
        pangkat: "-7",
        pilihanKoefisien: ["3,9", "39", "0,39"],
        pilihanPangkat: ["-6", "-7", "-8"],
        petunjuk: "Perhatikan banyaknya angka nol sebelum angka 3.",
        pembahasan: "0,00000039 = 3,9 × 10⁻⁷."
      }
    ]
  }
];

// ==========================================
// APLIKASI GAME MATHLEARN
// ==========================================

export function tampilkanGame(app, kembaliKeDashboard) {
  let progres = {};

  try {
    progres = JSON.parse(localStorage.getItem(KEY_GAME)) || {};
  } catch {
    progres = {};
  }

  if (!Number.isInteger(progres.levelTerbuka)) {
    progres.levelTerbuka = 1;
  }

  if (!Number.isInteger(progres.poin)) {
    progres.poin = 0;
  }

  if (!Array.isArray(progres.selesai)) {
    progres.selesai = [];
  }

  function simpanProgres() {
    localStorage.setItem(KEY_GAME, JSON.stringify(progres));
  }

  // ==========================================
  // SISTEM SUARA MATHLEARN
  // ==========================================

  let konteksAudio = null;

  function mainkanSuara(benar) {
    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) {
        console.log("Browser belum mendukung efek suara.");
        return;
      }

      if (!konteksAudio) {
        konteksAudio = new AudioContext();
      }

      const mulaiSuara = () => {
        if (!konteksAudio) return;

        const nada = benar
          ? [523.25, 659.25, 783.99]
          : [392, 329.63];

        nada.forEach((frekuensi, index) => {
          const oscillator = konteksAudio.createOscillator();
          const volume = konteksAudio.createGain();

          const waktuMulai =
            konteksAudio.currentTime + index * 0.16;

          oscillator.type = "sine";

          oscillator.frequency.setValueAtTime(
            frekuensi,
            waktuMulai
          );

          volume.gain.setValueAtTime(0.0001, waktuMulai);

          volume.gain.exponentialRampToValueAtTime(
            0.18,
            waktuMulai + 0.04
          );

          volume.gain.exponentialRampToValueAtTime(
            0.0001,
            waktuMulai + 0.25
          );

          oscillator.connect(volume);
          volume.connect(konteksAudio.destination);

          oscillator.start(waktuMulai);
          oscillator.stop(waktuMulai + 0.27);

          oscillator.onended = () => {
            oscillator.disconnect();
            volume.disconnect();
          };
        });
      };

      if (konteksAudio.state === "suspended") {
        konteksAudio.resume()
          .then(() => {
            mulaiSuara();
          })
          .catch(error => {
            console.log("Audio belum dapat diaktifkan:", error);
          });
      } else {
        mulaiSuara();
      }

    } catch (error) {
      console.log("Efek suara tidak dapat diputar:", error);
    }
  }

  // ==========================================
  // MEMBUAT TOMBOL
  // ==========================================

  function buatTombol(teks, aksi, warna = "#7654D6") {
    const tombol = document.createElement("button");

    tombol.textContent = teks;

    tombol.style.cssText = `
      background: ${warna};
      color: white;
      border: none;
      border-radius: 12px;
      padding: 12px 18px;
      font-weight: bold;
      cursor: pointer;
      margin: 5px;
    `;

    tombol.addEventListener("click", aksi);

    return tombol;
  }

  // ==========================================
  // MENU GAME
  // ==========================================

  function tampilkanMenuGame() {
    app.innerHTML = `
      <main class="dashboard-page">

        <header class="dashboard-header">
          <div class="dashboard-logo">⭐ MathLearn</div>
          <button id="kembaliGame" class="start-button">
            ← Kembali
          </button>
        </header>

        <section class="dashboard-welcome">
          <div>
            <h1>🎮 Puzzle Bentuk Baku</h1>
            <p>
              Tarik atau sentuh angka dan pangkat
              untuk menyusun jawaban!
            </p>
          </div>

          <div class="dashboard-mascot">⭐</div>
        </section>

        <section class="materi-container">

          <div class="materi-card" style="text-align:center">
            <h2>🏆 Poin Kamu</h2>

            <div class="rumus-box">
              ${progres.poin} ⭐
            </div>

            <p>
              Level terbuka: ${progres.levelTerbuka} dari 3
            </p>
          </div>

          <div class="materi-card">
            <h2>✨ Pilih Level</h2>
            <div id="daftarLevel"></div>
          </div>

        </section>
      </main>
    `;

    document.getElementById("kembaliGame")
      .addEventListener("click", kembaliKeDashboard);

    const daftar = document.getElementById("daftarLevel");

    levelGame.forEach((level, index) => {
      const nomor = index + 1;

      const terbuka = nomor <= progres.levelTerbuka;
      const selesai = progres.selesai.includes(nomor);

      const tombol = buatTombol(
        `${terbuka ? "🔓" : "🔒"} ${level.nama} ${selesai ? "✓" : ""}`,
        () => {
          if (terbuka) mulaiLevel(index);
        },
        terbuka ? "#7654D6" : "#999999"
      );

      tombol.disabled = !terbuka;
      tombol.style.display = "block";
      tombol.style.width = "100%";
      tombol.style.marginBottom = "12px";

      daftar.appendChild(tombol);

      const deskripsi = document.createElement("p");
      deskripsi.textContent = level.deskripsi;

      daftar.appendChild(deskripsi);
    });
  }

  // ==========================================
  // MEMULAI LEVEL
  // ==========================================

  function mulaiLevel(indexLevel) {
    let nomorSoal = 0;
    let poinLevel = 0;

    tampilkanSoal();

    function tampilkanSoal() {
      const level = levelGame[indexLevel];
      const soal = level.soal[nomorSoal];

      let sudahDiperiksa = false;
      let pilihanKoefisien = null;
      let pilihanPangkat = null;

      const persentase =
        ((nomorSoal + 1) / level.soal.length) * 100;

      app.innerHTML = `
        <main class="dashboard-page">

          <header class="dashboard-header">
            <div class="dashboard-logo">⭐ MathLearn</div>

            <button id="menuGame" class="start-button">
              Menu Game
            </button>
          </header>

          <section class="dashboard-welcome">
            <div>
              <h1>${level.nama}</h1>
              <p>Terus semangat menyelesaikan puzzle!</p>
            </div>

            <div class="dashboard-mascot">⭐</div>
          </section>

          <section style="
            background:white;
            padding:22px;
            border-radius:20px;
            margin-bottom:22px;
            box-shadow:0 8px 25px rgba(87,56,181,0.08);
          ">

            <div style="
              display:flex;
              justify-content:space-between;
              align-items:center;
              gap:12px;
              flex-wrap:wrap;
              margin-bottom:16px;
            ">

              <div>
                <p style="font-size:13px;color:#817A91">
                  PERKEMBANGAN SOAL
                </p>

                <h3 id="gameProgressText" style="color:#5738B5">
                  Soal ${nomorSoal + 1} dari ${level.soal.length}
                </h3>
              </div>

              <div style="
                background:#fff4cc;
                padding:12px 20px;
                border-radius:15px;
                text-align:center;
                min-width:115px;
              ">

                <p style="font-size:12px;color:#80651A">
                  POIN KAMU
                </p>

                <h2 id="gameScore" style="color:#7654D6">
                  ${progres.poin} ⭐
                </h2>

              </div>
            </div>

            <div style="
              width:100%;
              height:15px;
              background:#eee8ff;
              border-radius:20px;
              overflow:hidden;
            ">

              <div
                id="gameProgressFill"
                style="
                  width:${persentase}%;
                  height:100%;
                  background:linear-gradient(90deg,#7654D6,#FF9BCB);
                  border-radius:20px;
                  transition:width 0.4s ease;
                "
              ></div>

            </div>

            <p style="
              font-size:12px;
              color:#817A91;
              margin-top:9px;
              text-align:right;
            ">
              ${Math.round(persentase)}% selesai
            </p>

          </section>

          <section class="materi-container">

            <div class="materi-card">

              <h2>
                Ubah bilangan berikut menjadi bentuk baku!
              </h2>

              <div class="rumus-box" style="font-size:30px">
                ${soal.angka}
              </div>

              <p>
                Susun jawaban dengan memilih atau menarik
                pilihan ke kotak.
              </p>

              <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                gap:10px;
                flex-wrap:wrap;
                margin:25px 0;
              ">

                <div
                  id="kotakKoefisien"
                  data-target="koefisien"
                  style="
                    min-width:100px;
                    min-height:55px;
                    border:2px dashed #7654D6;
                    border-radius:12px;
                    padding:12px;
                    background:#f5f0ff;
                    font-size:22px;
                  "
                >
                  Koefisien
                </div>

                <strong>× 10</strong>

                <div
                  id="kotakPangkat"
                  data-target="pangkat"
                  style="
                    min-width:75px;
                    min-height:55px;
                    border:2px dashed #7654D6;
                    border-radius:12px;
                    padding:12px;
                    background:#f5f0ff;
                    font-size:22px;
                  "
                >
                  Pangkat
                </div>

              </div>

              <h3>Pilihan Koefisien</h3>

              <div
                id="pilihanKoefisien"
                style="display:flex;gap:10px;flex-wrap:wrap"
              ></div>

              <h3 style="margin-top:20px">
                Pilihan Pangkat
              </h3>

              <div
                id="pilihanPangkat"
                style="display:flex;gap:10px;flex-wrap:wrap"
              ></div>

              <p
                id="pesanGame"
                style="font-weight:bold;margin-top:18px"
              ></p>

              <div id="pembahasanGame"></div>

              <div id="aksiGame" style="margin-top:15px"></div>

            </div>
          </section>
        </main>
      `;

      document.getElementById("menuGame")
        .addEventListener("click", tampilkanMenuGame);

      // ==========================================
      // PILIHAN JAWABAN
      // ==========================================

      function buatPilihan(nilai, jenis) {
        const tombol = buatTombol(nilai, () => {
          if (sudahDiperiksa) return;

          if (jenis === "koefisien") {
            pilihanKoefisien = nilai;

            document.getElementById("kotakKoefisien")
              .textContent = nilai;

          } else {
            pilihanPangkat = nilai;

            document.getElementById("kotakPangkat")
              .textContent = nilai;
          }
        }, "#e8dcff");

        tombol.style.color = "#422477";
        tombol.style.border = "2px solid #7654D6";
        tombol.draggable = true;

        tombol.addEventListener("dragstart", event => {
          if (sudahDiperiksa) {
            event.preventDefault();
            return;
          }

          event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ nilai, jenis })
          );
        });

        return tombol;
      }

      const areaKoefisien =
        document.getElementById("pilihanKoefisien");

      const areaPangkat =
        document.getElementById("pilihanPangkat");

      soal.pilihanKoefisien.forEach(nilai => {
        areaKoefisien.appendChild(
          buatPilihan(nilai, "koefisien")
        );
      });

      soal.pilihanPangkat.forEach(nilai => {
        areaPangkat.appendChild(
          buatPilihan(nilai, "pangkat")
        );
      });

      // ==========================================
      // FITUR DRAG AND DROP
      // ==========================================

      ["kotakKoefisien", "kotakPangkat"].forEach(id => {
        const kotak = document.getElementById(id);

        kotak.addEventListener("dragover", event => {
          if (!sudahDiperiksa) {
            event.preventDefault();
          }
        });

        kotak.addEventListener("drop", event => {
          event.preventDefault();

          if (sudahDiperiksa) return;

          try {
            const data = JSON.parse(
              event.dataTransfer.getData("text/plain")
            );

            if (data.jenis === kotak.dataset.target) {
              if (data.jenis === "koefisien") {
                pilihanKoefisien = data.nilai;
              } else {
                pilihanPangkat = data.nilai;
              }

              kotak.textContent = data.nilai;
            }

          } catch {
            // Abaikan data drag yang tidak valid.
          }
        });
      });

      // ==========================================
      // TOMBOL PERIKSA JAWABAN
      // ==========================================

      const tombolPeriksa = buatTombol(
        "Periksa Jawaban ✓",
        periksaJawaban
      );

      document.getElementById("aksiGame")
        .appendChild(tombolPeriksa);

      function periksaJawaban() {
        if (sudahDiperiksa) return;

        if (!pilihanKoefisien || !pilihanPangkat) {
          document.getElementById("pesanGame").textContent =
            "Lengkapi kedua kotak jawaban terlebih dahulu!";

          return;
        }

        sudahDiperiksa = true;

        const benar =
          pilihanKoefisien === soal.koefisien &&
          pilihanPangkat === soal.pangkat;

        mainkanSuara(benar);

        tombolPeriksa.disabled = true;
        tombolPeriksa.style.opacity = "0.5";
        tombolPeriksa.style.cursor = "not-allowed";

        if (benar) {
          poinLevel += 10;
          progres.poin += 10;

          simpanProgres();

          document.getElementById("pesanGame").textContent =
            "🎉 Hebat! Jawaban kamu BENAR. Kamu mendapatkan 10 poin!";

          document.getElementById("pembahasanGame").innerHTML = `
            <div style="
              padding:15px;
              background:#e5fff2;
              border-radius:12px;
            ">
              <h3>📖 Pembahasan</h3>
              <p>${soal.pembahasan}</p>
            </div>
          `;

          document.getElementById("gameScore").textContent =
            `${progres.poin} ⭐`;

        } else {

          document.getElementById("pesanGame").textContent =
            "💡 Jawaban kamu BELUM TEPAT. Tidak apa-apa, tetap semangat belajar!";

          document.getElementById("pembahasanGame").innerHTML = `
            <div style="
              padding:15px;
              background:#fff5df;
              border-radius:12px;
            ">

              <h3>✨ Petunjuk Bintang</h3>

              <p>${soal.petunjuk}</p>

              <h3>📖 Jawaban dan Pembahasan</h3>

              <p>
                Koefisien yang benar:
                <strong>${soal.koefisien}</strong>
              </p>

              <p>
                Pangkat yang benar:
                <strong>${soal.pangkat}</strong>
              </p>

              <p>${soal.pembahasan}</p>

              <p>
                Jangan menyerah! Kamu tetap bisa melanjutkan
                ke soal berikutnya.
              </p>

            </div>
          `;
        }

        const tombolLanjut = buatTombol(
          nomorSoal === level.soal.length - 1
            ? "Selesaikan Level 🏆"
            : "Soal Berikutnya →",
          lanjutSoal
        );

        document.getElementById("aksiGame")
          .appendChild(tombolLanjut);
      }

      // ==========================================
      // SOAL BERIKUTNYA
      // ==========================================

      function lanjutSoal() {
        if (!sudahDiperiksa) return;

        if (nomorSoal < level.soal.length - 1) {
          nomorSoal++;
          tampilkanSoal();
        } else {
          selesaikanLevel();
        }
      }
    }

    // ==========================================
    // MENYELESAIKAN LEVEL
    // ==========================================

    function selesaikanLevel() {
      const nomorLevel = indexLevel + 1;

      if (!progres.selesai.includes(nomorLevel)) {
        progres.selesai.push(nomorLevel);
      }

      if (nomorLevel < 3) {
        progres.levelTerbuka = Math.max(
          progres.levelTerbuka,
          nomorLevel + 1
        );
      }

      simpanProgres();

      app.innerHTML = `
        <main class="dashboard-page">

          <section class="materi-container">

            <div class="materi-card" style="text-align:center">

              <div style="font-size:70px">🏆</div>

              <h1>Level ${nomorLevel} Selesai!</h1>

              <p>
                Hebat! Kamu berhasil menyelesaikan semua puzzle.
              </p>

              <div class="rumus-box">
                +${poinLevel} Poin ⭐
              </div>

              <p>Total poin: ${progres.poin}</p>

              <div id="tombolSelesaiLevel"></div>

            </div>
          </section>
        </main>
      `;

      const area = document.getElementById("tombolSelesaiLevel");

      if (nomorLevel < 3) {
        area.appendChild(buatTombol(
          "Buka Level Berikutnya 🚀",
          () => mulaiLevel(indexLevel + 1)
        ));

      } else {
        const selesai = document.createElement("p");

        selesai.textContent =
          "🌟 Luar biasa! Kamu telah menaklukkan semua level!";

        area.appendChild(selesai);
      }

      area.appendChild(buatTombol(
        "Kembali ke Menu Game",
        tampilkanMenuGame,
        "#e8dcff"
      ));

      area.lastChild.style.color = "#422477";
    }
  }

  tampilkanMenuGame();
}
