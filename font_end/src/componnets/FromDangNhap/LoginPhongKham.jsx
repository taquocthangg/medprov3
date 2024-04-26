import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb"
import './LoginPhongKham.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPhongKham = () => {
  const history = useNavigate()
  const schema = yup.object().shape({
    taiKhoan: yup.string().required("Vui lòng nhập tên đăng nhập").min(5, 'Vui lòng nhập nhiều hơn 5 kí tự'),
    matKhau: yup.string().required("Nhập mật khẩu")
      .min(6, 'Mật khẩu nhiều hơn 6 kí tự.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    notify()
  };
  const notify = () => toast.success('🦄 Đăng nhập thành công!!!', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });;
  return (
    <div class="dangnhap">
      <div onClick={() => { history(-1) }} className="dangnhap-back">
        <Link><TbArrowBackUp />Về trang chủ</Link>
      </div>
      <div className="login__wrapper">
        <div className="wrapper-logo">
          <img src="https://clinic.medpro.vn/javax.faces.resource/medpro-logo.svg.xhtml?ln=images" alt="" />
        </div>
        <form className="from__dangnhap" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            <p>Họ và tên :</p>
            <input type="text" placeholder="Vui lòng nhập tên đăng nhập" {...register("taiKhoan")} />
            <p className="err">{errors.taiKhoan?.message}</p>
          </label>
          <label htmlFor="">
            <p>Nhập mật khẩu: </p>
            <input
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              {...register("matKhau")}
            />
            <p className="err">{errors.matKhau?.message}</p>
          </label>
          <button className='btn' type="submit">Đăng Nhập</button>
          <div className="forget">
            <p>Chưa có tài khoản? </p> <p onClick={() => { history("/dang-ky") }}>
              <Link to=''>Đăng ký ngay</Link>
            </p>
          </div>
        </form>

      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default LoginPhongKham