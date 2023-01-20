let datas, err;
const invalidFeedback = document.getElementById("invalid-feedback");
const pelanggan = document.getElementById("pelanggan");
const member = document.getElementById("member");
const layanan = document.getElementById("layanan");
const statusLayanan = document.getElementById("status");
const gambar = document.getElementById("gambar");
const footerModal = document.getElementById("footerModal");

const cari = () => {
	invalidFeedback.classList.add("invisible");
	invalidFeedback.classList.remove("visible");
	pelanggan.innerHTML = "";
	member.innerHTML = "";
	layanan.innerHTML = "";
	statusLayanan.innerHTML = "";
	gambar.innerHTML = "";
	const resi = document.getElementById("search").value;

	if (resi == "") {
		invalidFeedback.classList.toggle("invisible");
		invalidFeedback.classList.toggle("visible");
		return;
	}

	document.getElementById("spinner").classList.remove("hidden");
	document.getElementById("searchButton").classList.add("hidden");

	const url =
		"(( YOUR APP SCRIPT DEPLOYMENT URL ))" + "?action=read&resi=" + resi;

	fetch(url)
		.then((response) => response.json())
		.then((response) => {
			datas = response.records;
			console.log(response);

			if (!datas) {
				document.getElementById("spinner").classList.add("hidden");
				invalidFeedback.classList.toggle("invisible");
				invalidFeedback.classList.toggle("visible");
				return;
			}

			pelanggan.innerHTML = datas.Nama_Pelanggan;
			member.innerHTML = datas.Nomer_Membership;
			layanan.innerHTML = datas.Layanan;
			statusLayanan.innerHTML = datas.Status_Layanan;
			if (datas.Link_After_Before != "") {
				gambar.innerHTML = `<a href="${datas.Link_After_Before}" target="_blank">Klik disini</a>`;
			} else {
				gambar.innerHTML = "Foto belum ada";
			}
			footerModal.innerHTML = "TERIMA KASIH TELAH MEMPERCAYAI TOKO KAMI ;)";
			document.getElementById("spinner").classList.add("hidden");
			document.getElementById("searchButton").classList.remove("hidden");
		})
		.catch((error) => {
			footerModal.innerHTML = error.message;
			return;
		});
};
