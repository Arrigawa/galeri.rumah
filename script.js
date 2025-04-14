// Inisialisasi nilai total harga
let totalHarga = 0;

// Referensi elemen keranjang
const keranjangList = document.getElementById("keranjangList");

// Buat elemen tampilan total harga
const totalElement = document.createElement("p");
totalElement.style.marginTop = "10px";
totalElement.style.fontWeight = "bold";
keranjangList.parentElement.appendChild(totalElement);

// Buat tombol Checkout
const tombolCheckout = document.createElement("button");
tombolCheckout.innerText = "Checkout";
tombolCheckout.classList.add("checkout-button");
tombolCheckout.addEventListener("click", () => {
  if (totalHarga === 0) {
    alert("Keranjang masih kosong!");
  } else {
    alert(`Total belanja anda adalah Rp ${totalHarga.toLocaleString()}\nTerima kasih telah berbelanja!`);
    keranjangList.innerHTML = "";
    totalHarga = 0;
    updateTotal();
  }
});
keranjangList.parentElement.appendChild(tombolCheckout);

// Fungsi update total
function updateTotal() {
  totalElement.textContent = `Total: Rp ${totalHarga.toLocaleString()}`;
}

// Delegasi event ke tombol Order
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("order")) {
    const card = e.target.closest(".card");
    const nama = card.querySelector("h3").innerText;
    const hargaText = card.querySelector("p").innerText;
    const angkaArray = hargaText.match(/\d+/g);
    const harga = parseInt(angkaArray.join(""));

    totalHarga += harga;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-keranjang">
        <span class="nama">${nama}</span>
        <span class="harga">Rp ${harga.toLocaleString()}</span>
        <button class="hapus">❌</button>
      </div>
    `;

    li.querySelector(".hapus").addEventListener("click", () => {
      li.remove();
      totalHarga -= harga;
      updateTotal();
    });

    keranjangList.appendChild(li);
    updateTotal();
  }
});
