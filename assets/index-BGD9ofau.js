(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const d of e)if(d.type==="childList")for(const h of d.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function n(e){const d={};return e.integrity&&(d.integrity=e.integrity),e.referrerPolicy&&(d.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?d.credentials="include":e.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(e){if(e.ep)return;e.ep=!0;const d=n(e);fetch(e.href,d)}})();const K="mathlearnGameProgress",I=[{nama:"Level 1 — Mudah",deskripsi:"Kenali dan susun bentuk baku sederhana.",soal:[{angka:"4.500",koefisien:"4,5",pangkat:"3",pilihanKoefisien:["4,5","45","0,45"],pilihanPangkat:["2","3","4"],petunjuk:"Geser tanda desimal sampai angka di depan koma berada antara 1 dan 10.",pembahasan:"4.500 = 4,5 × 10³ karena tanda desimal bergeser 3 tempat ke kiri."},{angka:"32.000",koefisien:"3,2",pangkat:"4",pilihanKoefisien:["3,2","32","0,32"],pilihanPangkat:["3","4","5"],petunjuk:"Ubahlah 32.000 menjadi bilangan antara 1 dan 10.",pembahasan:"32.000 = 3,2 × 10⁴ karena tanda desimal bergeser 4 tempat ke kiri."},{angka:"0,006",koefisien:"6",pangkat:"-3",pilihanKoefisien:["0,6","6","60"],pilihanPangkat:["-2","-3","-4"],petunjuk:"Bilangan kurang dari 1 menggunakan pangkat negatif.",pembahasan:"0,006 = 6 × 10⁻³ karena tanda desimal bergeser 3 tempat ke kanan."}]},{nama:"Level 2 — Sedang",deskripsi:"Tantangan bilangan besar dan kecil.",soal:[{angka:"725.000",koefisien:"7,25",pangkat:"5",pilihanKoefisien:["7,25","72,5","0,725"],pilihanPangkat:["4","5","6"],petunjuk:"Hitung berapa tempat tanda desimal bergeser ke kiri.",pembahasan:"725.000 = 7,25 × 10⁵."},{angka:"0,00048",koefisien:"4,8",pangkat:"-4",pilihanKoefisien:["4,8","48","0,48"],pilihanPangkat:["-3","-4","-5"],petunjuk:"Bilangan kecil menggunakan pangkat negatif.",pembahasan:"0,00048 = 4,8 × 10⁻⁴."},{angka:"6.300.000",koefisien:"6,3",pangkat:"6",pilihanKoefisien:["6,3","63","0,63"],pilihanPangkat:["5","6","7"],petunjuk:"Buat angka di depan koma menjadi 6,3.",pembahasan:"6.300.000 = 6,3 × 10⁶."}]},{nama:"Level 3 — Sulit",deskripsi:"Selesaikan tantangan bentuk baku yang lebih kompleks.",soal:[{angka:"0,0000072",koefisien:"7,2",pangkat:"-6",pilihanKoefisien:["7,2","72","0,72"],pilihanPangkat:["-5","-6","-7"],petunjuk:"Hitung jumlah pergeseran desimal sampai menjadi 7,2.",pembahasan:"0,0000072 = 7,2 × 10⁻⁶."},{angka:"84.500.000",koefisien:"8,45",pangkat:"7",pilihanKoefisien:["8,45","84,5","0,845"],pilihanPangkat:["6","7","8"],petunjuk:"Koefisien harus lebih dari atau sama dengan 1 dan kurang dari 10.",pembahasan:"84.500.000 = 8,45 × 10⁷."},{angka:"0,00000039",koefisien:"3,9",pangkat:"-7",pilihanKoefisien:["3,9","39","0,39"],pilihanPangkat:["-6","-7","-8"],petunjuk:"Perhatikan banyaknya angka nol sebelum angka 3.",pembahasan:"0,00000039 = 3,9 × 10⁻⁷."}]}];function O(t,a){let n={};try{n=JSON.parse(localStorage.getItem(K))||{}}catch{n={}}Number.isInteger(n.levelTerbuka)||(n.levelTerbuka=1),Number.isInteger(n.poin)||(n.poin=0),Array.isArray(n.selesai)||(n.selesai=[]);function o(){localStorage.setItem(K,JSON.stringify(n))}let e=null;function d(r){try{const s=window.AudioContext||window.webkitAudioContext;if(!s){console.log("Browser belum mendukung efek suara.");return}e||(e=new s);const i=()=>{if(!e)return;(r?[523.25,659.25,783.99]:[392,329.63]).forEach((k,u)=>{const l=e.createOscillator(),c=e.createGain(),g=e.currentTime+u*.16;l.type="sine",l.frequency.setValueAtTime(k,g),c.gain.setValueAtTime(1e-4,g),c.gain.exponentialRampToValueAtTime(.18,g+.04),c.gain.exponentialRampToValueAtTime(1e-4,g+.25),l.connect(c),c.connect(e.destination),l.start(g),l.stop(g+.27),l.onended=()=>{l.disconnect(),c.disconnect()}})};e.state==="suspended"?e.resume().then(()=>{i()}).catch(p=>{console.log("Audio belum dapat diaktifkan:",p)}):i()}catch(s){console.log("Efek suara tidak dapat diputar:",s)}}function h(r,s,i="#7654D6"){const p=document.createElement("button");return p.textContent=r,p.style.cssText=`
      background: ${i};
      color: white;
      border: none;
      border-radius: 12px;
      padding: 12px 18px;
      font-weight: bold;
      cursor: pointer;
      margin: 5px;
    `,p.addEventListener("click",s),p}function w(){t.innerHTML=`
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
              ${n.poin} ⭐
            </div>

            <p>
              Level terbuka: ${n.levelTerbuka} dari 3
            </p>
          </div>

          <div class="materi-card">
            <h2>✨ Pilih Level</h2>
            <div id="daftarLevel"></div>
          </div>

        </section>
      </main>
    `,document.getElementById("kembaliGame").addEventListener("click",a);const r=document.getElementById("daftarLevel");I.forEach((s,i)=>{const p=i+1,k=p<=n.levelTerbuka,u=n.selesai.includes(p),l=h(`${k?"🔓":"🔒"} ${s.nama} ${u?"✓":""}`,()=>{k&&m(i)},k?"#7654D6":"#999999");l.disabled=!k,l.style.display="block",l.style.width="100%",l.style.marginBottom="12px",r.appendChild(l);const c=document.createElement("p");c.textContent=s.deskripsi,r.appendChild(c)})}function m(r){let s=0,i=0;p();function p(){const u=I[r],l=u.soal[s];let c=!1,g=null,L=null;const S=(s+1)/u.soal.length*100;t.innerHTML=`
        <main class="dashboard-page">

          <header class="dashboard-header">
            <div class="dashboard-logo">⭐ MathLearn</div>

            <button id="menuGame" class="start-button">
              Menu Game
            </button>
          </header>

          <section class="dashboard-welcome">
            <div>
              <h1>${u.nama}</h1>
              <p>Terus semangat menyelesaikan puzzle!</p>
            </div>

            <div class="dashboard-mascot">⭐</div>
          </section>

          <!-- INFORMASI PERMAINAN -->

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
                  Soal ${s+1} dari ${u.soal.length}
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
                  ${n.poin} ⭐
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
                  width:${S}%;
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
              ${Math.round(S)}% selesai
            </p>

          </section>

          <section class="materi-container">

            <div class="materi-card">

              <h2>
                Ubah bilangan berikut menjadi bentuk baku!
              </h2>

              <div class="rumus-box" style="font-size:30px">
                ${l.angka}
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
      `,document.getElementById("menuGame").addEventListener("click",w);function M(b,v){const f=h(b,()=>{c||(v==="koefisien"?(g=b,document.getElementById("kotakKoefisien").textContent=b):(L=b,document.getElementById("kotakPangkat").textContent=b))},"#e8dcff");return f.style.color="#422477",f.style.border="2px solid #7654D6",f.draggable=!0,f.addEventListener("dragstart",j=>{if(c){j.preventDefault();return}j.dataTransfer.setData("text/plain",JSON.stringify({nilai:b,jenis:v}))}),f}const D=document.getElementById("pilihanKoefisien"),G=document.getElementById("pilihanPangkat");l.pilihanKoefisien.forEach(b=>{D.appendChild(M(b,"koefisien"))}),l.pilihanPangkat.forEach(b=>{G.appendChild(M(b,"pangkat"))}),["kotakKoefisien","kotakPangkat"].forEach(b=>{const v=document.getElementById(b);v.addEventListener("dragover",f=>{c||f.preventDefault()}),v.addEventListener("drop",f=>{if(f.preventDefault(),!c)try{const j=JSON.parse(f.dataTransfer.getData("text/plain"));j.jenis===v.dataset.target&&(j.jenis==="koefisien"?g=j.nilai:L=j.nilai,v.textContent=j.nilai)}catch{}})});const P=h("Periksa Jawaban ✓",J);document.getElementById("aksiGame").appendChild(P);function J(){if(c)return;if(!g||!L){document.getElementById("pesanGame").textContent="Lengkapi kedua kotak jawaban terlebih dahulu!";return}c=!0;const b=g===l.koefisien&&L===l.pangkat;d(b),P.disabled=!0,P.style.opacity="0.5",P.style.cursor="not-allowed",b?(i+=10,n.poin+=10,o(),document.getElementById("pesanGame").textContent="🎉 Hebat! Jawaban kamu BENAR. Kamu mendapatkan 10 poin!",document.getElementById("pembahasanGame").innerHTML=`
            <div style="
              padding:15px;
              background:#e5fff2;
              border-radius:12px;
            ">
              <h3>📖 Pembahasan</h3>
              <p>${l.pembahasan}</p>
            </div>
          `,document.getElementById("gameScore").textContent=`${n.poin} ⭐`):(document.getElementById("pesanGame").textContent="💡 Jawaban kamu BELUM TEPAT. Tidak apa-apa, tetap semangat belajar!",document.getElementById("pembahasanGame").innerHTML=`
            <div style="
              padding:15px;
              background:#fff5df;
              border-radius:12px;
            ">

              <h3>✨ Petunjuk Bintang</h3>

              <p>${l.petunjuk}</p>

              <h3>📖 Jawaban dan Pembahasan</h3>

              <p>
                Koefisien yang benar:
                <strong>${l.koefisien}</strong>
              </p>

              <p>
                Pangkat yang benar:
                <strong>${l.pangkat}</strong>
              </p>

              <p>${l.pembahasan}</p>

              <p>
                Jangan menyerah! Kamu tetap bisa melanjutkan
                ke soal berikutnya.
              </p>

            </div>
          `);const v=h(s===u.soal.length-1?"Selesaikan Level 🏆":"Soal Berikutnya →",z);document.getElementById("aksiGame").appendChild(v)}function z(){c&&(s<u.soal.length-1?(s++,p()):k())}}function k(){const u=r+1;n.selesai.includes(u)||n.selesai.push(u),u<3&&(n.levelTerbuka=Math.max(n.levelTerbuka,u+1)),o(),t.innerHTML=`
        <main class="dashboard-page">

          <section class="materi-container">

            <div class="materi-card" style="text-align:center">

              <div style="font-size:70px">🏆</div>

              <h1>Level ${u} Selesai!</h1>

              <p>
                Hebat! Kamu berhasil menyelesaikan semua puzzle.
              </p>

              <div class="rumus-box">
                +${i} Poin ⭐
              </div>

              <p>Total poin: ${n.poin}</p>

              <div id="tombolSelesaiLevel"></div>

            </div>
          </section>
        </main>
      `;const l=document.getElementById("tombolSelesaiLevel");if(u<3)l.appendChild(h("Buka Level Berikutnya 🚀",()=>m(r+1)));else{const c=document.createElement("p");c.textContent="🌟 Luar biasa! Kamu telah menaklukkan semua level!",l.appendChild(c)}l.appendChild(h("Kembali ke Menu Game",w,"#e8dcff")),l.lastChild.style.color="#422477"}}w()}const B=document.getElementById("app"),E="mathlearnNickname",A="mathlearnPretestScore",C="mathlearnPosttestScore",U=[{pertanyaan:"Bentuk baku dari 3.000 adalah ....",pilihan:["3 × 10²","3 × 10³","3 × 10⁴","30 × 10³"],jawaban:1},{pertanyaan:"Bentuk baku dari 45.000 adalah ....",pilihan:["4,5 × 10²","4,5 × 10³","4,5 × 10⁴","45 × 10⁴"],jawaban:2},{pertanyaan:"Bilangan 2,5 × 10³ sama dengan ....",pilihan:["250","2.500","25.000","250.000"],jawaban:1},{pertanyaan:"Bentuk baku dari 0,0006 adalah ....",pilihan:["6 × 10⁻²","6 × 10⁻³","6 × 10⁻⁴","6 × 10⁴"],jawaban:2},{pertanyaan:"Pada bentuk baku 7,2 × 10⁵, angka 5 disebut ....",pilihan:["Bilangan pokok","Koefisien","Pangkat atau eksponen","Hasil perkalian"],jawaban:2}],y=[{pertanyaan:"Bentuk baku dari 6.000 adalah ....",pilihan:["6 × 10²","6 × 10³","6 × 10⁴","60 × 10³"],jawaban:1,pembahasan:"6.000 menjadi 6 dengan menggeser tanda desimal 3 tempat ke kiri. Jadi, bentuk bakunya adalah 6 × 10³."},{pertanyaan:"Bentuk baku dari 72.000 adalah ....",pilihan:["7,2 × 10³","7,2 × 10⁴","7,2 × 10⁵","72 × 10⁴"],jawaban:1,pembahasan:"72.000 menjadi 7,2. Tanda desimal bergeser 4 tempat ke kiri, sehingga hasilnya 7,2 × 10⁴."},{pertanyaan:"Bentuk baku dari 0,00045 adalah ....",pilihan:["4,5 × 10⁻²","4,5 × 10⁻³","4,5 × 10⁻⁴","4,5 × 10⁴"],jawaban:2,pembahasan:"0,00045 menjadi 4,5 dengan menggeser tanda desimal 4 tempat ke kanan. Pangkatnya menjadi −4."},{pertanyaan:"Bilangan 3,5 × 10⁴ sama dengan ....",pilihan:["350","3.500","35.000","350.000"],jawaban:2,pembahasan:"Pangkat 4 berarti tanda desimal digeser 4 tempat ke kanan. Hasilnya 35.000."},{pertanyaan:"Bilangan 8,2 × 10⁻³ sama dengan ....",pilihan:["0,082","0,0082","0,00082","8.200"],jawaban:1,pembahasan:"Pangkat −3 berarti tanda desimal digeser 3 tempat ke kiri. Hasilnya 0,0082."}],q=[{pertanyaan:"Jarak rata-rata Bumi ke Matahari sekitar 150.000.000 km. Seorang siswa ingin menuliskan jarak tersebut dalam bentuk baku untuk laporan astronomi. Bentuk baku yang tepat adalah ....",pilihan:["1,5 × 10⁶ km","1,5 × 10⁷ km","1,5 × 10⁸ km","1,5 × 10⁹ km"],jawaban:2,pembahasan:"150.000.000 diubah menjadi 1,5 dengan menggeser tanda desimal 8 tempat ke kiri. Jadi, bentuk bakunya adalah 1,5 × 10⁸ km."},{pertanyaan:"Sebuah bakteri memiliki panjang sekitar 0,000004 meter. Peneliti ingin menuliskan ukuran bakteri tersebut dalam bentuk baku. Hasil yang benar adalah ....",pilihan:["4 × 10⁻⁴ m","4 × 10⁻⁵ m","4 × 10⁻⁶ m","4 × 10⁻⁷ m"],jawaban:2,pembahasan:"0,000004 menjadi 4 setelah tanda desimal digeser 6 tempat ke kanan. Karena bilangan awal kurang dari 1, pangkatnya negatif. Hasilnya 4 × 10⁻⁶ m."},{pertanyaan:"Kota A memiliki jumlah penduduk 2.500.000 jiwa, sedangkan Kota B memiliki 3.200.000 jiwa. Jika kedua jumlah penduduk digabungkan, bentuk baku dari jumlah seluruh penduduk adalah ....",pilihan:["5,7 × 10⁵ jiwa","5,7 × 10⁶ jiwa","5,7 × 10⁷ jiwa","5,7 × 10⁸ jiwa"],jawaban:1,pembahasan:"Jumlah penduduk = 2.500.000 + 3.200.000 = 5.700.000. Dalam bentuk baku, 5.700.000 = 5,7 × 10⁶ jiwa."},{pertanyaan:"Sebuah pusat data menyimpan 4,5 × 10⁶ file. Pusat data lain menyimpan 2,5 × 10⁵ file. Jika seluruh file digabungkan, jumlah file dalam bilangan biasa adalah ....",pilihan:["475.000 file","2.950.000 file","4.750.000 file","7.000.000 file"],jawaban:2,pembahasan:"4,5 × 10⁶ = 4.500.000 dan 2,5 × 10⁵ = 250.000. Jumlahnya adalah 4.500.000 + 250.000 = 4.750.000 file."},{pertanyaan:"Sebuah alat mengukur ketebalan benda sebesar 0,000008 meter. Seorang siswa menuliskan hasilnya sebagai 8 × 10⁻⁵ meter. Guru meminta siswa memeriksa kembali jawabannya. Pernyataan yang tepat adalah ....",pilihan:["Benar, karena tanda desimal bergeser 5 tempat.","Salah, seharusnya 8 × 10⁻⁶ meter.","Salah, seharusnya 8 × 10⁶ meter.","Benar, karena pangkatnya negatif."],jawaban:1,pembahasan:"0,000008 = 8 × 10⁻⁶. Tanda desimal bergeser 6 tempat ke kanan, sehingga pangkat yang tepat adalah −6, bukan −5."}];function F(t){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const a=new SpeechSynthesisUtterance(`Selamat datang di MathLearn, ${t}! Halo! Aku Bintang MathLearn. Yuk, kita mulai petualangan matematika yang seru!`);a.lang="id-ID",a.rate=.9,a.pitch=1.2,window.speechSynthesis.speak(a)}function R(){B.innerHTML=`
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

          <p class="login-footer">
            Belajar Matematika Jadi Lebih Seru!
          </p>
        </div>

      </section>
    </main>
  `,document.getElementById("loginForm").addEventListener("submit",function(t){t.preventDefault();const a=document.getElementById("studentName").value.trim();a&&(localStorage.setItem(E,a),F(a),$(a))})}function $(t){B.innerHTML=`
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
        <p>Level 1 - Penjelajah Matematika</p>

        <div class="xp-bar">
          <div class="xp-progress"></div>
        </div>

        <p>⭐ 0 Bintang &nbsp; | &nbsp; ⚡ 0 XP</p>
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
  `,document.getElementById("profileName").textContent=t,document.getElementById("welcomeName").textContent=`Halo, ${t}! 👋`,document.getElementById("menuMateri").addEventListener("click",Y),document.getElementById("menuPretest").addEventListener("click",V),document.getElementById("menuLatihan").addEventListener("click",H),document.getElementById("menuGame").addEventListener("click",function(){O(B,x)}),document.getElementById("menuPosttest").addEventListener("click",_),document.getElementById("menuProgres").addEventListener("click",X)}function x(){$(localStorage.getItem(E)||"")}function Y(){B.innerHTML=`
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
  `,document.getElementById("kembaliDashboard").addEventListener("click",x),document.getElementById("tombolSelesaiMateri").addEventListener("click",x)}function V(){N("Pretest",U,"pretest")}function _(){N("Posttest",q,"posttest")}function N(t,a,n){let o=0;const e=Array(a.length).fill(null);B.innerHTML=`
    <main class="dashboard-page">

      <header class="dashboard-header">
        <div class="dashboard-logo">⭐ MathLearn</div>
        <button class="start-button" id="kembaliDashboard">
          ← Kembali
        </button>
      </header>

      <section class="dashboard-welcome">
        <div>
          <h1>📝 ${t} Bentuk Baku</h1>
          <p>
            ${n==="pretest"?"Kerjakan untuk mengetahui kemampuan awalmu.":"Kerjakan untuk mengetahui pemahamanmu setelah belajar."}
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
  `,document.getElementById("kembaliDashboard").addEventListener("click",x);function d(){const m=a[o],r=document.getElementById("areaKuis");r.innerHTML=`
      <h2>Soal ${o+1} dari ${a.length}</h2>

      <div class="xp-bar">
        <div class="xp-progress"
          style="width: ${(o+1)/a.length*100}%">
        </div>
      </div>

      <h3 style="margin-top: 25px;">${m.pertanyaan}</h3>

      <div style="margin-top: 20px;">
        ${m.pilihan.map(function(s,i){return`
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
                value="${i}"
                ${e[o]===i?"checked":""}
              >
              ${String.fromCharCode(65+i)}. ${s}
            </label>
          `}).join("")}
      </div>

      <p id="pesanKuis" style="color: #7654D6;"></p>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;">

        <button class="start-button" id="soalSebelumnya"
          ${o===0?"disabled":""}>
          ← Sebelumnya
        </button>

        <button class="start-button" id="soalBerikutnya">
          ${o===a.length-1?"Selesai ✨":"Berikutnya →"}
        </button>

      </div>
    `,document.getElementById("soalSebelumnya").addEventListener("click",function(){h(),o>0&&(o--,d())}),document.getElementById("soalBerikutnya").addEventListener("click",function(){if(!document.querySelector('input[name="jawabanKuis"]:checked')){document.getElementById("pesanKuis").textContent="Pilih salah satu jawaban terlebih dahulu! ⭐";return}h(),o<a.length-1?(o++,d()):w()})}function h(){const m=document.querySelector('input[name="jawabanKuis"]:checked');m&&(e[o]=Number(m.value))}function w(){let m=0;a.forEach(function(i,p){e[p]===i.jawaban&&m++});const r=m/a.length*100;n==="pretest"?localStorage.setItem(A,r):localStorage.setItem(C,r);const s=n==="posttest"?`
        <div style="text-align: left; margin-top: 25px;">
          <h2>📖 Pembahasan Posttest</h2>

          ${a.map(function(i,p){const k=e[p],u=k===i.jawaban;return`
              <div style="
                margin-top: 15px;
                padding: 16px;
                border-radius: 14px;
                background: ${u?"#e5fff2":"#fff0f0"};
                border: 1px solid ${u?"#55c995":"#ffaaaa"};
              ">
                <h3>Soal ${p+1} — ${u?"Benar ✓":"Belum tepat"}</h3>

                <p><b>${i.pertanyaan}</b></p>

                <p>
                  <b>Jawabanmu:</b>
                  ${String.fromCharCode(65+k)}.
                  ${i.pilihan[k]}
                </p>

                <p>
                  <b>Jawaban benar:</b>
                  ${String.fromCharCode(65+i.jawaban)}.
                  ${i.pilihan[i.jawaban]}
                </p>

                <p><b>Pembahasan:</b> ${i.pembahasan}</p>
              </div>
            `}).join("")}
        </div>
      `:"";B.innerHTML=`
      <main class="dashboard-page">

        <header class="dashboard-header">
          <div class="dashboard-logo">⭐ MathLearn</div>
        </header>

        <section class="materi-container">
          <div class="materi-card" style="text-align: center;">

            <div style="font-size: 65px;">
              ${r>=80?"🏆":r>=60?"⭐":"🌱"}
            </div>

            <h1>${t} Selesai!</h1>

            <p>
              Hebat! Kamu sudah menyelesaikan
              ${t} Bentuk Baku.
            </p>

            <div class="rumus-box">Nilai: ${r}</div>

            <h3>${m} dari ${a.length} soal benar</h3>

            <p>
              ${r>=80?"Luar biasa! Hasil belajarmu sangat baik.":r>=60?"Bagus! Terus tingkatkan pemahamanmu.":"Tetap semangat! Kamu bisa belajar dan mencoba lagi."}
            </p>

            ${s}

            <button class="start-button" id="kembaliDashboard" style="margin-top: 20px;">
              Kembali ke Dashboard 🏠
            </button>

          </div>
        </section>
      </main>
    `,document.getElementById("kembaliDashboard").addEventListener("click",x)}d()}function H(){let t=0,a=!1,n=0;const o=Array(y.length).fill(null);B.innerHTML=`
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
          <p>
            Pilih jawabanmu, lalu kirim untuk diperiksa.
          </p>
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
  `,document.getElementById("kembaliDashboard").addEventListener("click",x);function e(){const m=y[t],r=document.getElementById("areaLatihan");a=!1,r.innerHTML=`
      <h2>Soal ${t+1} dari ${y.length}</h2>

      <div class="xp-bar">
        <div class="xp-progress"
          style="width: ${(t+1)/y.length*100}%">
        </div>
      </div>

      <h3 style="margin-top: 25px;">${m.pertanyaan}</h3>

      <div style="margin-top: 20px;">
        ${m.pilihan.map(function(s,i){return`
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
                value="${i}"
              >
              ${String.fromCharCode(65+i)}. ${s}
            </label>
          `}).join("")}
      </div>

      <p id="pesanLatihan" style="color: #7654D6;"></p>
      <div id="hasilPemeriksaan"></div>

      <div style="margin-top: 20px;">
        <button class="start-button" id="kirimJawaban">
          Kirim Jawaban 📩
        </button>

        <button class="start-button" id="soalBerikutnya"
          style="display: none; margin-top: 10px;">
          Soal Berikutnya →
        </button>
      </div>
    `,document.getElementById("kirimJawaban").addEventListener("click",d),document.getElementById("soalBerikutnya").addEventListener("click",h)}function d(){if(a)return;const m=document.querySelector('input[name="jawabanLatihan"]:checked');if(!m){document.getElementById("pesanLatihan").textContent="Pilih jawaban terlebih dahulu sebelum mengirim! ⭐";return}o[t]=Number(m.value),a=!0;const r=y[t],s=o[t]===r.jawaban;s&&n++,document.querySelectorAll('input[name="jawabanLatihan"]').forEach(function(p){p.disabled=!0}),document.getElementById("hasilPemeriksaan").innerHTML=`
      <div style="
        margin-top: 20px;
        padding: 18px;
        border-radius: 15px;
        background: ${s?"#e5fff2":"#fff0f0"};
        border: 2px solid ${s?"#55c995":"#ffaaaa"};
      ">
        <h3 style="color: ${s?"#168653":"#c43d3d"};">
          ${s?"🎉 Jawaban Benar!":"🌱 Jawaban Belum Tepat"}
        </h3>

        <p>
          <b>Jawaban yang benar:</b>
          ${String.fromCharCode(65+r.jawaban)}.
          ${r.pilihan[r.jawaban]}
        </p>

        <p><b>Pembahasan:</b> ${r.pembahasan}</p>
      </div>
    `,document.getElementById("kirimJawaban").style.display="none";const i=document.getElementById("soalBerikutnya");i.style.display="inline-block",t===y.length-1&&(i.textContent="Lihat Hasil Latihan 🏆")}function h(){a&&(t<y.length-1?(t++,e()):w())}function w(){const m=n/y.length*100;B.innerHTML=`
      <main class="dashboard-page">
        <header class="dashboard-header">
          <div class="dashboard-logo">⭐ MathLearn</div>
        </header>

        <section class="materi-container">
          <div class="materi-card" style="text-align: center;">

            <div style="font-size: 65px;">
              ${m>=80?"🏆":m>=60?"⭐":"🌱"}
            </div>

            <h1>Latihan Selesai!</h1>
            <p>Kamu sudah menyelesaikan semua soal latihan.</p>

            <div class="rumus-box">Nilai: ${m}</div>

            <h3>${n} dari ${y.length} soal benar</h3>

            <button class="start-button" id="ulangLatihan">
              Ulangi Latihan 🔄
            </button>

            <button class="start-button" id="kembaliDashboard" style="margin-top: 10px;">
              Kembali ke Dashboard 🏠
            </button>

          </div>
        </section>
      </main>
    `,document.getElementById("ulangLatihan").addEventListener("click",H),document.getElementById("kembaliDashboard").addEventListener("click",x)}e()}function X(){const t=localStorage.getItem(A),a=localStorage.getItem(C);let n="";if(t===null||a===null)n=`
      <p>
        Selesaikan Pretest dan Posttest terlebih dahulu
        untuk melihat perbandingan hasil belajarmu.
      </p>
    `;else{const o=Number(t),e=Number(a),d=e-o;n=`
      <div class="rumus-box">
        ${o} → ${e}
      </div>

      <h3>Perubahan Nilai: ${d>0?"+":""}${d}</h3>

      <p>
        ${d>0?"🎉 Hebat! Nilaimu meningkat setelah belajar.":d===0?"Nilaimu tetap. Terus berlatih untuk meningkatkan pemahaman.":"Jangan menyerah! Pelajari kembali materi dan terus berlatih."}
      </p>
    `}B.innerHTML=`
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
            ${t===null?"Belum dikerjakan":t}
          </div>
          <p>Nilai sebelum mempelajari materi.</p>
        </div>

        <div class="materi-card">
          <h2>🎓 Nilai Posttest</h2>
          <div class="rumus-box">
            ${a===null?"Belum dikerjakan":a}
          </div>
          <p>Nilai setelah mempelajari materi.</p>
        </div>

        <div class="materi-card">
          <h2>🏆 Perbandingan Hasil Belajar</h2>
          ${n}
        </div>

      </section>
    </main>
  `,document.getElementById("kembaliDashboard").addEventListener("click",x)}const T=localStorage.getItem(E);T?$(T):R();
