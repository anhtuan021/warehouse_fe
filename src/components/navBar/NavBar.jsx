/* eslint-disable */
import React from "react";

import "./NavBar.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const NavBar = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.user);

  const router = useRouter();

  const handleClickProfile = () => {
    const userId = user._id;
    router.push(`/information/${userId}`);
  };

  return (
    <div className="main" style={{display: isOpen ? "block" : "none"}}>
      <div className="navBar">
        <div className="navBar-user">
          <div className="user-avt">
            <img src={user.avatar} alt="" onClick={handleClickProfile} />
          </div>
          <div className="user-name" onClick={handleClickProfile}>
            {user.userName}
          </div>
        </div>

        <hr />

        <div className="navBar-menu">
          <div className="navBar-menu-item">
            <p
              onClick={() => router.push("/")}
              className={`${router.pathname === "/" ? "active" : ""}`}
            >
              <i className="fa-solid fa-chart-pie icon-navbar"></i>Tổng quan
            </p>
          </div>

          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                {" "}
                <i className="fa-solid fa-clipboard icon-navbar"></i>Xuất - nhập
                với NCC
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Xuất kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    router.pathname === "/listExportSlip/Provider"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => router.push("/listExportSlip/Provider")}
                >
                  Phiếu xuất kho
                </p>
              </div>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Nhập kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    router.pathname === "/listImportSlip/Provider"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => router.push(`/listImportSlip/Provider`)}
                >
                  Phiếu nhập kho
                </p>
              </div>
            </div>
          </div>

          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                <i className="fa-solid fa-clipboard icon-navbar"></i>Xuất - nhập
                với nội bộ
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Xuất kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    router.pathname === "/listExportSlip/Agency"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => router.push(`/listExportSlip/Agency`)}
                >
                  Phiếu xuất kho
                </p>
              </div>

              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Nhập kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    router.pathname === "/listImportSlip/Agency"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => router.push(`/listImportSlip/Agency`)}
                >
                  Phiếu nhập kho
                </p>
              </div>
            </div>
          </div>

          <div className="navBar-menu-item">
            <p
              onClick={() => router.push("/listInventory")}
              className={`${
                router.pathname === "/listInventory" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-chart-simple icon-navbar"></i>Quản lý
              kiểm kê
            </p>
          </div>
          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                <i className="fa-solid fa-chart-simple icon-navbar"></i>Báo cáo
                thống kê
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p
                    onClick={() => router.push("/report-import")}
                    className={`${
                      router.pathname === "/report-import" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>Báo
                    cáo nhập kho
                  </p>
                  <p
                    onClick={() => router.push("/report-inventory")}
                    className={`${
                      router.pathname === "/report-inventory" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>Báo
                    cáo tồn kho
                  </p>
                  <p
                    onClick={() => router.push("/report-export-import-inventory")}
                    className={`${
                      router.pathname === "/report-export-import-inventory"
                        ? "active"
                        : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>Báo
                    cáo xuất nhập tồn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                <i className="fa-solid fa-bars-staggered icon-navbar"></i>Danh
                mục
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p
                    onClick={() => router.push("/listAgency")}
                    className={`${
                      router.pathname === "/listAgency" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Nguồn hàng xuất/nhập
                  </p>
                  <p
                    onClick={() => router.push("/listProduct")}
                    className={`${
                      router.pathname === "/listProduct" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Danh mục hàng hóa
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
