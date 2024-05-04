import { useEffect, useState } from 'react';
import '../css/TinTuc.css'
import { MdArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import { getNews } from '../api';
import { formatDate } from '../Common/dataFortmat';
import { Image } from 'antd';
import { Link } from 'react-router-dom';
const TinTuc = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNews({ page: page });
                setData(prevData => [...prevData, ...response.response.rows]);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    console.log(data)
    return (
        <main>
            <div className="container_tt">
                <div className="header_tt">
                    <div className="text_tt">TIN TỨC VÀ SỰ KIỆN </div>
                </div>
                <div className="contenr_tt">
                    <div className="sukien">
                        <div className="contenr_sukien">
                            <div className="left2">
                                <div className="left2_img">
                                    <img src="https://cms.medpro.com.vn/uploads/1678942071130_760084959d.png" alt="" />
                                    <div className="text_tt">
                                        <h1 class="tieude">TIÊM VACXIN TRƯỚC KHI SINH: NHỮNG MŨI TIÊM NÀO CẦN THIẾT CHO PHỤ NỮ?</h1>
                                        <p class="tacgia text_ttt">KHOÁI ĐẸP TRAI</p>
                                        <p class="noidung_tt text_ttt">Mang thai là thời điểm quan trọng, khi đó hệ thống miễn dịch của cơ thể hoạt động kém hơn so với bình thường. Vì vậy, nguy cơ nhiễm bệnh cao hơn, đặc biệt là nhiều bệnh thông thường có thể gây ra các biến chứng nghiêm trọng và ảnh hưởng đến sức khỏe của cả mẹ và bé yêu. Vì thế,..., Medpro khuyên bạn nên tiêm đầy đủ các loại vắc xin trước khi mang thai để bảo vệ sức khỏe của mình và con yêu.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right2">
                                <div className="right2_top">
                                    <h1 class="tieude">CHÍNH THỨC ĐẶT LỊCH TẠI BỆNH VIỆN ĐẠI HỌC Y TÂN TẠO TRÊN ỨNG DỤNG MEDPRO</h1>
                                    <p class="tacgia text_ttt">KHOÁI ĐẸP TRAI</p>
                                    <p class="noidung_tt text_ttt">Bệnh viện Đại học Y Tân Tạo đã áp dụng hệ thống đặt lịch khám bệnh trực tuyến thông qua ứng dụng Medpro, giúp cho khách hàng có thể dễ dàng đặt lịch khám bệnh một cách tiện lợi và nhanh chóng.</p>
                                </div>
                                <div className="right2_bootom">
                                    <h1 class="tieude">TỔNG HỢP CÁC BỆNH VIỆN VÀ PHÒNG KHÁM ĐÃ CÓ THỂ ĐẶT LỊCH KHÁM BỆNH TRƯỚC</h1>
                                    <p class="tacgia text_ttt">KHOÁI ĐẸP TRAI</p>
                                    <p class="noidung_tt text_ttt">Medpro là một ứng dụng đặt lịch cho người Việt Nam khi muốn đặt lịch khám bệnh. Kết nối với hơn 30 bệnh viện và phòng khám hàng đầu, người dùng có thể chọn địa điểm
                                        và lịch khám phù hợp với thời gian của mình, tiết kiệm thời gian và công sức mỗi khi đi khám bệnh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container_sukien2">
                        <div className="sukien2">
                            {data?.slice(1).map((item) => (
                                <div className="content_sukien" key={item.id}>
                                    <Link to={"/tin-tuc/" + item.id} >
                                        <div className="sukien_img">
                                            <img src={item.image} alt="" srcSet="" />
                                        </div>
                                        <div className="sukien_text">
                                            <p className="tieude_sukien2">{item.title}</p>
                                            <p className="sukien_mota">{item.description}</p>
                                            <p className="sukien_time">{formatDate(item.createdAt)}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default TinTuc