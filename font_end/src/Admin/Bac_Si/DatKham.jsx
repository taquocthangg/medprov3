import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfDay } from 'date-fns';
import "./BacSi.css";
import axios from "axios";
import { logout } from '../../pages/auth';

const DatKham = () => {
  const data = [
    {
      id: "1",
      timeSlot: "7:00 - 8:00 AM"
    },
    {
      id: "2",
      timeSlot: "8:00 - 9:00 AM"
    },
    {
      id: "3",
      timeSlot: "10:00 - 11:00 AM"
    },
    {
      id: "4",
      timeSlot: "12:00 - 13:00 AM"
    },
    {
      id: "5",
      timeSlot: "14:00 - 15:00 AM"
    },
    {
      id: "6",
      timeSlot: "16:00 - 17:00 AM"
    },
  ];

  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [scheduleData, setScheduleData] = useState({
    err: 0,
    mess: '',
    count: '0',
    schedule: [],
  });
  const handleDateChange = async (date) => {
    setSelectedDate(startOfDay(date));

    if (date) {
      try {
        const doctorId = "3";
        const specialtyId = "1";
        const timeSlot = ["9:00 - 10:00 AM"];

        const activateDay = date.toISOString();

        const response = await axios.post('http://localhost:5000/api/v1/auth/lichkham/' + doctorId, { activateDay });
        setScheduleData(response.data)
        console.log('Response from API:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleSlotClick = (timeSlot) => {
    const isSlotSelected = selectedSlots.includes(timeSlot);

    if (isSlotSelected) {
      setSelectedSlots(selectedSlots.filter(selectedSlot => selectedSlot !== timeSlot));
    } else {
      setSelectedSlots([...selectedSlots, timeSlot]);
    }
  };

  const handleThemLichKham = async () => {
    const doctorId = "3";
    const specialtyId = '1'
    const activateDay = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    const timeSlot = selectedSlots
    const response = await axios.post('http://localhost:5000/api/v1/auth/themlichkham/', { doctorId, specialtyId, timeSlot, activateDay });
    setScheduleData(response.data)
    console.log('Selected time slots:', selectedSlots);
    console.log(response.data)
    handleDateChange(selectedDate)
  };



  //
  ///
  //
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  const handleScheduleClick = (scheduleId) => {
    if (selectedScheduleId === scheduleId) {
      setSelectedScheduleId(null);
    } else {
      setSelectedScheduleId(scheduleId);
    }
  };

  const handleDeleteSchedule = async () => {
    if (selectedScheduleId) {
      const confirmDelete = window.confirm('Bạn có muốn xóa lịch khám này không?');

      if (confirmDelete) {
        try {
          // Gọi API để xóa lịch khám
          const response = await axios.delete(`http://localhost:5000/api/v1/auth/xoalich/` + selectedScheduleId);
          console.log('Response from API:', response.data);
          handleDateChange(selectedDate)

        } catch (error) {
          console.error('Error deleting schedule:', error);
        }
      }
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div>
      <div className="bacsi_container">
        <div className="bacsi__header">
          <h2 className="bacsi_header-h2">BÁC SĨ</h2>
          <ul className="bacsi__header-list">
            <li className="bacsi_header-item">
              <Link to="/BacSi" className="bacsi_header-link">
              ĐƠN KHÁM
              </Link>
            </li>
            <li className="bacsi_header-item">
              <Link to="/DatKham" className="bacsi_header-link">
                THÊM LỊCH KHÁM
              </Link>
            </li>
            <li className="bacsi_header-item">
              <Link to="/BenhAn" className="bacsi_header-link">
                BỆNH ÁN
              </Link>
            </li>
          </ul>
        </div>

        <div className="bacsi_body">
          <div className="bacsi_body-out" onClick={handleLogout}>

            LOG OUT
          </div>
          <div className="bacsi_body_container">
            <div className="bacsi_body_container_fisrt">
              <h2> THÊM LỊCH KHÁM</h2>
              <div className="basi_body_add">
                <label htmlFor="username">Chọn ngày : </label>
                <DatePicker selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy" />
                <p>Thông tin lịch khám:</p>
                <div className="bacsi_body_div">

                  {(Array.isArray(scheduleData.schedule) && scheduleData.schedule.length > 0) ? (
                    scheduleData.schedule.map(item => (
                      <div key={item.id} onClick={() => handleScheduleClick(item.id)}  >
                        <button className={`basi_body_time-btn ${selectedScheduleId === item.id ? 'selected' : ''}`}>
                          {item.timeSlot}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>Không có lịch khám.</p>
                  )}
                </div>
                <button className="basi_body_time-btn basi_body_time-btn-add" onClick={handleDeleteSchedule} disabled={!selectedScheduleId}>
                  Xóa lịch khám
                </button>
                <div className="basi_body_time">
                  <h3>Chọn các khung giờ:</h3>
                  {data.map(slot => (
                    <button
                      className="basi_body_time-btn"
                      key={slot.id}
                      onClick={() => handleSlotClick(slot.timeSlot)}
                      style={{ backgroundColor: selectedSlots.includes(slot.timeSlot) ? 'lightblue' : 'white' }}
                    >
                      {slot.timeSlot}
                    </button>
                  ))}
                  <br />
                </div>




                <button onClick={handleThemLichKham} className="basi_body_time-btn basi_body_time-btn-add">THÊM LỊCH</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatKham;
