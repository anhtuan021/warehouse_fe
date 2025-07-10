import React from 'react';
import styles from './Header.module.css';
import { logout } from '@/api/userAPI/user';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

const Header = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
      toast.success('Đăng xuất thành công');
      router.push('/login');
    } catch (error) {
      toast.error('Đăng xuất thất bại');
    }
  };

  // Toggle NavBar khi bấm menu
  const handleMenuClick = () => {
    if (typeof setIsOpen === "function") setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.headercontaint}>
      <span
        className={styles.menuToggle}
        onClick={handleMenuClick}
        title={isOpen ? "Ẩn menu" : "Hiện menu"}
        tabIndex={0}
        role="button"
        style={{ marginLeft: "20px", display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <i className={`fa-solid fa-bars ${styles.icon}`}></i>
        <span className={styles.iconText}>Menu</span>
      </span>
      <p className={styles.tenheader}>
        <i className={`fa-solid fa-star-half-stroke ${styles.icon}`}></i>
        Công Ty ABC
      </p>
      <div className={styles.iconheader}>
        <span className={styles.iconGroup}>
          <i className={`fa-solid fa-bell ${styles.icon}`}></i>
          <span className={styles.iconText}>Thông báo</span>
        </span>
        <span
          className={styles.logout}
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 6 }}
        >
          <i className={`fa-solid fa-right-to-bracket ${styles.icon}`}></i>
          Đăng xuất
        </span>
      </div>
    </div>
  );
};

export default Header;
