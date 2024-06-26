import {
  getPengirimanModel,
  getPengirimanByIdModel,
  createPengirimanModel,
  updatePengirimanModel,
  getProvinsiModel,
  getKabupatenKotaModel,
} from "../models/PengirimanModel.js";

export const getPengirimanController = async (req, res) => {
  try {
    let result = "";
    if (req.role === "Admin") {
      result = await getPengirimanModel().catch((messagePengiriman) => {
        throw new Error(messagePengiriman);
      });
    } else {
      result = await getPengirimanByIdModel(req.session.uuid_user).catch(
        (messagePengiriman) => {
          throw new Error(messagePengiriman);
        }
      );
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ errMessagePengiriman: err.message });
  }
};

export const getPengirimanByIdController = async (req, res) => {
  try {
    const { no_resi } = req.params;
    const result = await getPengirimanByIdModel(no_resi).catch(
      (messagePengiriman) => {
        throw new Error(messagePengiriman);
      }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ errMessagePengiriman: err.message });
  }
};

export const createPengirimanController = async (req, res) => {
  const data = {
    // Data pengirim
    no_resi: req.body.no_resi,
    uuid_user: req.body.uuid_user,
    id_kategori_barang: req.body.id_kategori_barang,
    nama_pengirim: req.body.nama_pengirim,
    id_provinsi_pengirim: req.body.id_provinsi_pengirim,
    id_kabupaten_kota_pengirim: req.body.id_kabupaten_kota_pengirim,
    kode_pos_pengirim: req.body.kode_pos_pengirim,
    no_tlp_pengirim: req.body.no_tlp_pengirim,
    // Data penerima
    nama_penerima: req.body.nama_penerima,
    id_provinsi_penerima: req.body.id_provinsi_penerima,
    id_kabupaten_kota_penerima: req.body.id_kabupaten_kota_penerima,
    kode_pos_penerima: req.body.kode_pos_penerima,
    no_tlp_penerima: req.body.no_tlp_penerima,
    // Data barang
    nama_barang: req.body.nama_barang,
    jumlah_barang: req.body.jumlah_barang,
    berat: req.body.berat,
    harga_pengiriman: req.body.harga_pengiriman,
    // Data pengiriman
    tanggal: req.body.tanggal,
    id_layanan: req.body.id_layanan,
    deskripsi: req.body.deskripsi,
  };

  try {
    const results = await createPengirimanModel(data).catch((message) => {
      throw new Error(message);
    });
    res
      .status(200)
      .json({ messagePengiriman: "Pengiriman telah berhasil dibuat!" });
  } catch (err) {
    res.status(500).json({ errMessagePengiriman: err.message });
  }
};

export const updatePengirimanController = async (req, res) => {
  const { no_resi } = req.params;

  const data = {
    // Data pengirim
    no_resi: no_resi,
    uuid_user: req.body.uuid_user,
    id_kategori_barang: req.body.id_kategori_barang,
    nama_pengirim: req.body.nama_pengirim,
    id_provinsi_pengirim: req.body.id_provinsi_pengirim,
    id_kabupaten_kota_pengirim: req.body.id_kabupaten_kota_pengirim,
    kode_pos_pengirim: req.body.kode_pos_pengirim,
    no_tlp_pengirim: req.body.no_tlp_pengirim,
    // Data penerima
    nama_penerima: req.body.nama_penerima,
    id_provinsi_penerima: req.body.id_provinsi_penerima,
    id_kabupaten_kota_penerima: req.body.id_kabupaten_kota_penerima,
    kode_pos_penerima: req.body.kode_pos_penerima,
    no_tlp_penerima: req.body.no_tlp_penerima,
    // Data barang
    nama_barang: req.body.nama_barang,
    jumlah_barang: req.body.jumlah_barang,
    berat: req.body.berat,
    harga_pengiriman: req.body.harga_pengiriman,
    // Data pengiriman
    tanggal: req.body.tanggal,
    id_layanan: req.body.id_layanan,
    deskripsi: req.body.deskripsi,
  };

  try {
    const results = await updatePengirimanModel(data).catch((message) => {
      throw new Error(message);
    });

    // Cek jika tidak ada data di dalam database
    if (Array.isArray(results) && results.length === 0) {
      return res
        .status(400)
        .json({ message: "Data pengiriman tidak ditemukan!" });
    }

    res
      .status(200)
      .json({ messagePengiriman: "Pengiriman berhasil diupdate!" });
  } catch (err) {
    res.status(500).json({ errMessagePengiriman: err.message });
  }
};

export const deletePengirimanController = async (req, res) => {
  const { no_resi } = req.params;
  try {
    const results = await deletePengirimanController(no_resi).catch(
      (message) => {
        throw new Error(message);
      }
    );

    // Cek jika tidak ada data di dalam database
    if (Array.isArray(results) && results.length === 0) {
      return res
        .status(400)
        .json({ message: "Data pengiriman tidak ditemukan!" });
    }

    res.status(200).json({ message: "Pengiriman berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ errMessagePengiriman: err.message });
  }
};

export const getProvinsiController = async (req, res) => {
  try {
    const results = await getProvinsiModel().catch((message) => {
      throw new Error(message);
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ errMessageLokasi: err.message });
  }
};

export const getKabupatenKotaController = async (req, res) => {
  try {
    const results = await getKabupatenKotaModel().catch((message) => {
      throw new Error(message);
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ errMessageLokasi: err.message });
  }
};

// export const getLayananController = async (req, res) => {
//   try {
//     const results = await getLayananModel().catch((message) => {
//       throw new Error(message);
//     });
//     res.status(200).json({ results });
//   } catch (err) {
//     res.status(500).json({ errMessageLokasi: err.message });
//   }
// };
