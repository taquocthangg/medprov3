import React, { useState, useEffect } from 'react';
// import { choosehopital } from '../../data'
import { DatePicker, message } from "antd";
import '../../src/componnets/ChonBenhVien/Choose.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from './../pages/api'
import io from 'socket.io-client';
import moment from 'moment';
import { getCurentUser } from '../api';
const Select_day = () => {
  const socket = io('http://localhost:5000');
  const [query, setQuery] = useState("");
  const history = useNavigate()
  const [data_BV, setData_BV] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const { getId } = useParams();
  const hospital = params.get('hospital');
  const specialist = params.get('specialist');
  console.log('getId = ' + getId + " hospital = " + hospital + " specialist= " + specialist)

  const [infoDatKham, setInfoDatKham] = useState(null);

  useEffect(() => {

    socket.on('getLichKham', (data) => {
      console.log('getLichKham :', data);
      // Xử lý dữ liệu từ server nếu cần
    });
    const activateDay = '2024-05-02'
    const userId = localStorage.getItem('idUser');
    const doctorId = getId; // Thay doctorId bằng dữ liệu thích hợp
    socket.emit('joinGroupAndGetSchedule', { userId, doctorId, activateDay });
  })
  useEffect(() => {
    const fetchData = async () => {
      const inforDotor = await getCurentUser(getId);
      const inforHospital = await getCurentUser(hospital);
      const inforSpecialist = await (specialist);
      console.log(inforSpecialist)
      const data_Kham = {
        "Tên bác sĩ": inforDotor.user.name,
        "Tên bệnh viện": inforHospital.user.name,
        "Chuyên khoa": inforSpecialist.user.name,
        "Giá Khám": inforSpecialist.user.price,
      };
      setInfoDatKham(data_Kham)
    };

    fetchData();
  }, []);
  console.log(infoDatKham)
  const handleScheduleClick = async (scheduleId) => {
    if (scheduleId) {
      const confirmDelete = window.confirm('Bạn có muốn đặt lịch khám này không?');

      if (confirmDelete) {
        const userId = localStorage.getItem('idUser'); // Lấy userId từ localStorage hoặc từ nơi lưu trữ khác
        const doctorId = 8;
        socket.emit('selectSchedule', { userId, doctorId, scheduleId });
      }
    }

    setSelectedScheduleId(scheduleId);
    console.log(scheduleId);
  };

  // Đăng ký listener cho sự kiện 'scheduleSelected' từ server
  socket.on('scheduleSelected', (data) => {
    console.log(data)
    if (data.success == true) {
      message.success('Đã chọn lịch khám thành công vui lòng thanh toán')

    }
    else {
      message.error('Lịch khám này đã được đặt')
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    err: 0,
    mess: '',
    count: '0',
    schedule: [],
  });

  // Lấy thông tin lịch khám và hiện thị
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    if (date) {
      try {
        const doctorId = getId;

        const activateDay = date.toISOString();
        const response = await api.post('/auth/lichkham/' + doctorId, { activateDay });
        setScheduleData(response.data)
        console.log('Response from API:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  // Tắt không cho người dùng chọn ngày trước ngày hiện tại
  const disabledDate = current => {
    // So sánh ngày hiện tại với ngày được chọn
    return current && current < moment().startOf('day');
  };
  return (

    <main>
      <div className="format__header">
        <p onClick={() => { history(-1) }}>Trang Chủ </p> {'>'}  <p onClick={() => { history(-1) }}>Chọn Bệnh Viện</p> {'>'} <p onClick={() => { history(-1) }} >Chọn chuyên khoa</p> {'>'}<p onClick={() => { history(-1) }}>Chọn bác sĩ</p> {'>'} <p>Đặt lịch</p>
      </div>
      <div className="select__hopital">
        <ul className="select__hopital-list">
          <div className="basi_body_add">
            <label htmlFor="username">Chọn ngày : </label>
            <DatePicker
              selected={selectedDate}
              minDate={moment().startOf('day')}
              onChange={handleDateChange}
              disabledDate={disabledDate} />
            <div className="bacsi_body_div">

              <p>Thông tin lịch khám:</p>
              {(Array.isArray(scheduleData.schedule) && scheduleData.schedule.length > 0) ? (

                scheduleData.schedule.map(item => (
                  <div key={item.id} onClick={() => handleScheduleClick(item.id)}  >
                    <button className="basi_body_time-btn">
                      {item.timeSlot}
                    </button>
                  </div>
                ))
              ) : (
                <p>Không có lịch khám.</p>
              )}
            </div>

          </div>
        </ul>
      </div>
    </main>

  )
}

export default Select_day