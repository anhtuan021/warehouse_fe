import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./ReportEII.module.css";
import { reportExportImportInventory } from "@/api/reportApi/Report";
import TableReport from "@/components/tableReport/TableReport";
import Layout from "@/components/layout/Layout";

const ReportEII = () => {
  const chartRef = useRef(null);
  let stackedBarChart = useRef(null);

  const [labels, setLabels] = useState([]);
  const [dataExports, setDataExports] = useState([]);
  const [dataInventorys, setDataInventorys] = useState([]);
  const [time, setTime] = useState({
    timeStart: "",
    timeEnd: "",
  });

  const [list, setList] = useState([]);
  const [type, setType] = useState("chart");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await reportExportImportInventory(
          time.timeStart,
          time.timeEnd
        );
        const filterData = res.filter(
          (item) =>
            item.exportQuantity >= 0 &&
            item.inventoryQuantity >= 0 &&
            item.importQuantity >= 0
        );
        setList(filterData);
        setLabels(filterData.map((item) => item.productName));
        setDataExports(filterData.map((item) => item.exportQuantity));
        setDataInventorys(filterData.map((item) => item.inventoryQuantity));
        if (!filterData.length) {
          setError("Không có dữ liệu phù hợp với khoảng thời gian đã chọn.");
        }
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu từ máy chủ.");
      } finally {
        setLoading(false);
      }
    };
    if (time.timeStart && time.timeEnd) {
      getData();
    }
  }, [time.timeEnd, time.timeStart]);

  useEffect(() => {
    if (
      type === "chart" &&
      labels.length > 0 &&
      dataExports.length > 0 &&
      dataInventorys.length > 0 &&
      chartRef.current
    ) {
      const ctx = chartRef.current.getContext("2d");
      if (stackedBarChart.current) {
        stackedBarChart.current.destroy();
      }
      const maxDataValue = Math.max(...dataExports, ...dataInventorys, 0);
      const suggestedMax =
        maxDataValue < 100 ? maxDataValue + 100 : Math.ceil(maxDataValue * 1.2);

      stackedBarChart.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Xuất kho",
              data: dataExports,
              backgroundColor: "#30a032",
              borderColor: "#30a032",
              borderWidth: 1,
            },
            {
              label: "Tồn kho",
              data: dataInventorys,
              backgroundColor: "#fdbe10",
              borderColor: "#fed871",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "black",
                font: { size: 11 },
              },
            },
            tooltip: {
              enabled: true,
              bodyFont: { size: 11 },
              titleFont: { size: 11 },
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                color: "black",
                font: { size: 11 },
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
              suggestedMax: suggestedMax,
              ticks: {
                stepSize: 20,
                color: "black",
                font: { size: 14 },
              },
            },
          },
        },
      });
    }
    return () => {
      if (stackedBarChart.current) {
        stackedBarChart.current.destroy();
        stackedBarChart.current = null;
      }
    };
  }, [type, labels, dataExports, dataInventorys]);

  const handleChangeTime = (e) => {
    const { name, value } = e.target;
    setTime((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  return (
    <Layout>
      <div className={styles["rcbody"]}>
        <div className={styles["rcframe"]}>
          <div className={styles["rctitle"]}>
            BIỂU ĐỒ BÁO CÁO XUẤT NHẬP TỒN
          </div>
          <div className={styles["rcSearch"]}>
            <div className={styles["rcInput"]}>
              <div className={styles["rcbox1"]}>
                <div className={styles["rcbox2"]}>
                  <span className={styles["rcfrom"]}>Từ ngày</span>
                </div>
                <div className={styles["rcbox3"]}>
                  <input
                    type="date"
                    className={styles["rcdate"]}
                    name="timeStart"
                    value={time.timeStart}
                    onChange={handleChangeTime}
                  />
                </div>
                <div className={styles["rcbox2"]}>
                  <span className={styles["rcto"]}>Đến ngày</span>
                </div>
                <div className={styles["rcbox3"]}>
                  <input
                    type="date"
                    className={styles["rcdate"]}
                    name="timeEnd"
                    value={time.timeEnd}
                    onChange={handleChangeTime}
                  />
                </div>
              </div>
            </div>
            <div className={styles["rcbbox"]}>
              <select
                name="rcoption"
                id="rcoption"
                value={type}
                onChange={handleChangeType}
              >
                <option value="chart">Xem biểu đồ</option>
                <option value="table">Xem bảng</option>
              </select>
            </div>
          </div>
          {error && (
            <div style={{ color: "red", marginTop: 10 }}>{error}</div>
          )}
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <div className={styles["rcChart"]}>
              {type === "chart" ? (
                <canvas
                  ref={chartRef}
                  style={{
                    minHeight: 350,
                    height: 350,
                    width: "100%",
                    display: "block",
                  }}
                ></canvas>
              ) : (
                <TableReport list={list} />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ReportEII;
