import pool from "../config/Database.js";
import { uuidv7 } from "uuidv7";

export const getWarehouseModel = () => {
  const query = `
        SELECT 
            uuid_warehouse, nama_warehouse, p.nama_provinsi AS provinsi_warehouse, kk.nama_kabupaten_kota AS kabupaten_kota_warehouse, alamat_warehouse
        FROM warehouse
        INNER JOIN provinsi AS p ON p.id_provinsi = warehouse.id_provinsi_warehouse
        INNER JOIN kabupaten_kota AS kk ON kk.id_kabupaten_kota = warehouse.id_kabupaten_kota_warehouse
        WHERE warehouse.deleted_date IS NULL;
    `;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const getWarehouseByIdModel = (uuid_warehouse) => {
  const query = `
        SELECT 
            uuid_warehouse, nama_warehouse, p.nama_provinsi AS provinsi_warehouse, kk.nama_kabupaten_kota AS kabupaten_kota_warehouse, alamat_warehouse
        FROM warehouse
        INNER JOIN provinsi AS p ON p.id_provinsi = warehouse.id_provinsi_warehouse
        INNER JOIN kabupaten_kota AS kk ON kk.id_kabupaten_kota = warehouse.id_kabupaten_kota_warehouse
        WHERE uuid_warehouse=? AND warehouse.deleted_date IS NULL;
    `;

  return new Promise((resolve, reject) => {
    pool.query(query, [uuid_warehouse], (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const createWarehouseModel = (data) => {
  const query = `INSERT INTO warehouse(uuid_warehouse, nama_warehouse, id_provinsi_warehouse, id_kabupaten_kota_warehouse, alamat_warehouse, created_date, updated_date) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

  const uuidWarehouse = uuidv7();
  const values = [
    uuidWarehouse,
    data.namaWarehouse,
    data.idProvinsiWarehouse,
    data.idKabupatenKotaWarehouse,
    data.alamatWarehouse,
  ];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateWarehouseModel = (data) => {
  const query = `UPDATE warehouse SET nama_warehouse=?, id_provinsi_warehouse=?, id_kabupaten_kota_warehouse=?, alamat_warehouse=?, updated_date=CURRENT_TIMESTAMP WHERE uuid_warehouse=? AND deleted_date IS NULL;`;

  const values = [
    data.nama_warehouse,
    data.id_provinsi_warehouse,
    data.id_kabupaten_kota_warehouse,
    data.alamat_warehouse,
    data.uuid_warehouse,
  ];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteWarehouseModel = async (uuid_warehouse) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE warehouse SET deleted_date=CURRENT_TIMESTAMP WHERE uuid_warehouse=?",
      [uuid_warehouse],
      (err, result, fields) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      }
    );
  });
};
