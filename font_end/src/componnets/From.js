import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './FromDangKy.css'
export const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên"),
    tenPhongKham: yup.string().required("Vui lòng nhập tên phòng khám"),
    chuyenKhoa: yup.string().required("Vui lòng nhập tên chuyên khoa"),
    giayPhep: yup.string().required("Vui lòng nhập giấy phép"),
    donVi: yup.string().required("Vui lòng nhập đơn vị công tác!"),
    chucVu: yup.string().required("Vui lòng nhập học hàm/học vị!"),
    email: yup.string().email().required("Vui lòng nhập email"),
    soDienThoai: yup.number().typeError('Nhập số điện thoại'),
    password: yup.string().required("Nhập mật khẩu").typeError('you must specify a number')
      .min(6, 'Mật khẩu nhiều hơn 6 kí tự.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Nhập vào đây cmm"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div class="dangky">
      <div className="name"> VUI LÒNG NHẬP THÔNG TIN LIÊN LẠC</div>
      <form className="from" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">
          <p>Họ và tên :</p>
          <input type="text" placeholder="Ví dụ: Tạ Quốc Thắng" {...register("fullName")} />
          <p className="err">{errors.fullName?.message}</p>
        </label>
        <label htmlFor="">
          <p>Tên Phòng Khám :</p>
          <input type="text" placeholder="Nhập tên phòng khám" {...register("tenPhongKham")} />
          <p className="err">{errors.tenPhongKham?.message}</p>
        </label>
        <label htmlFor="">
          <p>Email: </p>
          <input type="text" placeholder="Email..." {...register("email")} />
          <p className="err">{errors.email?.message}</p>
        </label>
        <label htmlFor="">
          <p>Chuyên Khoa :</p>
          <input type="text" placeholder="Nhập tên chuyên khoa" {...register("chuyenKhoa")} />
          <p className="err">{errors.chuyenKhoa?.message}</p>
        </label>
        <label htmlFor="">
          <p>Số điện thoại :</p>
          <input type="number" placeholder="Số Điện Thoại" {...register("soDienThoai")} />
          <p className="err">{errors.soDienThoai?.message}</p>
        </label>
        <label htmlFor="">
          <p>Giấy phép :</p>
          <input type="text" placeholder="Nhập tên giấy phép kinh doanh" {...register("giayPhep")} />
          <p className="err">{errors.giayPhep?.message}</p>
        </label>
        <label htmlFor="">
          <p>Nhập mật khẩu: </p>
          <input
            type="password"
            placeholder="Vui lòng nhập mật khẩu"
            {...register("password")}
          />
          <p className="err">{errors.password?.message}</p>
        </label>
        <label htmlFor="">
          <p>Đơn vị công tác :</p>
          <input type="text" placeholder="Nhập đơn vị công tác" {...register("donVi")} />
          <p className="err">{errors.donVi?.message}</p>
        </label>
        <label htmlFor="">
          <p>Nhập lại mật khẩu : </p>
          <input
            type="password"
            placeholder="Vui lòng nhập lại mật khẩu"
            {...register("confirmPassword")}
          />
          <p className="err">{errors.confirmPassword?.message}</p>
        </label>
        <label htmlFor="">
          <p>Học hàm/học vị* :</p>
          <input type="text" placeholder="Nhập học hàm/học vị" {...register("chucVu")} />
          <p className="err">{errors.chucVu?.message}</p>
        </label>
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};