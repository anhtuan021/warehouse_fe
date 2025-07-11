import React from "react";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const NavBar = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const handleClickProfile = () => {
    const userId = user._id;
    router.push(`/auth/information/${userId}`);
  };

  const isActive = (path) => router.pathname === path ? styles.active : "";

  return (
    <div className={styles.main} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.navBar}>
        <div className={styles.navBarUser}>
          <div className={styles.userAvt}>
            <img src={user.avatar} alt="" onClick={handleClickProfile} />
          </div>
          <div className={styles.userName} onClick={handleClickProfile}>
            {user.userName}
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.navBarMenu}>
          <div className={styles.navBarMenuItem}>
            <p
              onClick={() => router.push("/")}
              className={isActive("/")}
            >
              <i className="fa-solid fa-chart-pie" /> Tổng quan
            </p>
          </div>

          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p>
                <i className="fa-solid fa-clipboard" /> Xuất - nhập với NCC
              </p>
              <div className={styles.subMenu}>
                <div className={styles.subMenuItem}>
                  <p>
                    <i className="fa-solid fa-chevron-right" /> Xuất kho
                  </p>
                </div>
                <p
                  className={`${styles.subMenuItem} ${isActive("/exportSlip/listExportSlip/Provider")}`}
                  onClick={() => router.push("/exportSlip/listExportSlip/Provider")}
                >
                  <i className="fa-solid fa-chevron-right" /> Phiếu xuất kho
                </p>
              </div>
              <div className={styles.subMenu}>
                <div className={styles.subMenuItem}>
                  <p>
                    <i className="fa-solid fa-chevron-right" /> Nhập kho
                  </p>
                </div>
                <p
                  className={`${styles.subMenuItem} ${isActive("/importSlip/listImportSlip/Provider")}`}
                  onClick={() => router.push(`/importSlip/listImportSlip/Provider`)}
                >
                  <i className="fa-solid fa-chevron-right" /> Phiếu nhập kho
                </p>
              </div>
            </div>
          </div>

          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p>
                <i className="fa-solid fa-clipboard" /> Xuất - nhập với nội bộ
              </p>
              <div className={styles.subMenu}>
                <div className={styles.subMenuItem}>
                  <p>
                    <i className="fa-solid fa-chevron-right" /> Xuất kho
                  </p>
                </div>
                <p
                  className={`${styles.subMenuItem} ${isActive("/exportSlip/listExportSlip/Agency")}`}
                  onClick={() => router.push(`/exportSlip/listExportSlip/Agency`)}
                >
                  <i className="fa-solid fa-chevron-right" /> Phiếu xuất kho
                </p>
              </div>
              <div className={styles.subMenu}>
                <div className={styles.subMenuItem}>
                  <p>
                    <i className="fa-solid fa-chevron-right" /> Nhập kho
                  </p>
                </div>
                <p
                  className={`${styles.subMenuItem} ${isActive("/importSlip/listImportSlip/Agency")}`}
                  onClick={() => router.push(`/importSlip/listImportSlip/Agency`)}
                >
                  <i className="fa-solid fa-chevron-right" /> Phiếu nhập kho
                </p>
              </div>
            </div>
          </div>

          <div className={styles.navBarMenuItem}>
            <p
              onClick={() => router.push("/inventory/listInventory")}
              className={isActive("/inventory/listInventory")}
            >
              <i className="fa-solid fa-chart-simple" /> Quản lý kiểm kê
            </p>
          </div>
          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p>
                <i className="fa-solid fa-chart-simple" /> Báo cáo thống kê
              </p>
              <div className={styles.subMenu}>
                <div className={styles.subMenuItem}>
                  <p
                    onClick={() => router.push("/report/reportImport")}
                    className={isActive("/report/reportImport")}
                  >
                    <i className="fa-solid fa-chevron-right" /> Báo cáo nhập kho
                  </p>
                  <p
                    onClick={() => router.push("/report/reportInventory")}
                    className={isActive("/report/reportInventory")}
                  >
                    <i className="fa-solid fa-chevron-right" /> Báo cáo tồn kho
                  </p>
                  <p
                    onClick={() => router.push("/report/reportEII")}
                    className={isActive("/report/reportEII")}
                  >
                    <i className="fa-solid fa-chevron-right" /> Báo cáo xuất nhập tồn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.navBarMenuItem}>
            <div className={styles.menuItemTitle}>
              <p>
                <i className="fa-solid fa-bars-staggered" /> Danh mục
              </p>
              <div className={styles.subMenu}>
                <div className={styles.subMenuItem}>
                  <p
                    onClick={() => router.push("/agency/listAgency")}
                    className={isActive("/agency/listAgency")}
                  >
                    <i className="fa-solid fa-chevron-right" /> Nguồn hàng xuất/nhập
                  </p>
                  <p
                    onClick={() => router.push("/product/listProduct")}
                    className={isActive("/product/listProduct")}
                  >
                    <i className="fa-solid fa-chevron-right" /> Danh mục hàng hóa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
