const dino = document.getElementById("dino");
const gameContainer = document.getElementById("game-container");
const skorElement = document.getElementById("skor");
let skor = 0;
let isGameOver = false;

// 1. FUNGSI LOMPAT
function lompat() {
    if (!dino.classList.contains("lompat")) {
        dino.classList.add("lompat");
        setTimeout(function() {
            dino.classList.remove("lompat");
        }, 500);
    }
}

// 2. INPUT KEYBOARD
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        lompat();
    }
});

// 3. FUNGSI BUAT KAKTUS (Dibuat otomatis setiap 2 detik)
function buatKaktus() {
    const kaktus = document.createElement("div");
    kaktus.classList.add("kaktus");
    gameContainer.appendChild(kaktus);

    // Hapus elemen kaktus dari HTML setelah animasinya selesai (2 detik)
    // Agar komputer tidak lemot karena kebanyakan elemen
    setTimeout(() => {
        kaktus.remove();
    }, 2000);
}

// Jalankan pembuat kaktus setiap 1.5 detik
setInterval(buatKaktus, 1500);

// 4. CEK TABRAKAN SETIAP 10 MILIDETIK
setInterval(function() {
    if (isGameOver) return; // Kalau game over, stop cek tabrakan

    const kaktusAktif = document.querySelector(".kaktus");
    
    if (kaktusAktif) {
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
        let kaktusLeft = parseInt(window.getComputedStyle(kaktusAktif).getPropertyValue("left"));

        // LOGIKA TABRAKAN
        if (kaktusLeft > 0 && kaktusLeft < 40 && dinoBottom < 30) {
            isGameOver = true; // Set game over
            alert("DUARRR! Game Over. Skor Akhir: " + Math.floor(skor));
            location.reload(); // Ulang game
        } else {
            // 3. TAMBAH SKOR DI SINI
            skor += 0.05; // Tambah skor sedikit demi sedikit
            skorElement.innerText = "Skor: " + Math.floor(skor); // Update teks di HTML
        }
    }
}, 10);