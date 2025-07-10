import React from 'react'

import styles from "./DLFromExcel.module.css";
const DLFromExcel = () => {
  return (
    
    <div className={styles["Excelkien"]}>
        <div className={styles["filengoai"]}>THÊM DANH SÁCH HÀNG HÓA FILE NGOÀI</div>
        <div className={styles["upload-kien"]}>
          <i className="fas fa-cloud"></i>
          <p>Kéo thả file vào đây</p>
          <p>hoặc</p>
          <button className={styles["upload-buttonkien"]}>Chọn File</button>
          <input type="file" id="file-input" className={styles["hidden-input"]}/>
        </div>
        <button className={styles["cancel-buttonkien"]}>Hủy</button>
    </div>
  )
}

export default DLFromExcel;