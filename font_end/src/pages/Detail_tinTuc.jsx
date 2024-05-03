import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addComment, getCurentNews } from '../api'
import parse from 'html-react-parser';
import { Button, Flex, Input, message } from 'antd';
import './css.css'
import { formatDate } from '../Common/dataFortmat';
import { MdOutlineDateRange } from 'react-icons/md';
import TextArea from 'antd/es/input/TextArea';
import noComents from '../img/noComents.jpg'
import { IoArrowBack } from 'react-icons/io5';
export default function Detail_tinTuc() {
    const { id_tinTuc } = useParams()
    const [data, setData] = useState("")
    const [commit, setCommit] = useState([])
    const fetchData = async () => {
        try {
            const response = await getCurentNews(id_tinTuc);
            console.log(response.response)
            setData(response.response)
            setCommit(response.response.comments)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {

        fetchData()
    }, [])
    const navigate = useNavigate()
    const [comment, setComment] = useState('');

    const handleChange = e => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (comment !== "") {
            const data = {
                newsId: id_tinTuc,
                userID: localStorage.getItem('idUser'),
                content: comment
            };
            console.log(data);
            try {
                const response = await addComment(data);
                if (response.err == 0) {
                    message.success('Gửi bình luận thành công !')
                    fetchData()
                }
            } catch (error) {
                console.error("Đã xảy ra lỗi khi thêm bình luận:", error);
            }
        }
        setComment('');
    };


    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <div className='detail_news'>
            <div className="detail_back" onClick={() => navigate(-1)}>
                <IoArrowBack /> Quay lại
            </div>
            <h1>
                {data?.title}
            </h1>
            <div className="info_user">
                <MdOutlineDateRange /> <span>{formatDate(data?.createdAt)} - {data?.authors?.name}</span>
            </div>
            <div className="detail_des">
                {data?.description}
            </div>
            <div className="format_news_parse">
                {data?.htmlContent ? parse(data?.htmlContent) : null}
            </div>
            <h4 style={{
                marginTop: '50px',
                marginBottom: '30px',
                fontSize: '22px'
            }}>
                Bình luận :
            </h4>
            <TextArea
                placeholder='Bình luận của bạn'
                value={comment}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <Flex style={{ marginTop: '20px' }} justify='flex-end'>
                <Button type="primary" onClick={handleSubmit}>Góp ý</Button>

            </Flex>
            <div>
                {commit.length > 0 ? (
                    <>
                        {commit?.map(comment => (
                            <div className="box_coments" key={comment.id}>
                                <img src={comment.user.avatar} alt={comment.user.name} />
                                <div className='coments_content'>
                                    <h3>{comment.user.name}</h3>
                                    <p className='coments_content_text'>{comment.content}</p>
                                    <p className='ngaycmt'>{formatDate(comment.createdAt)}</p>

                                </div>
                            </div>
                        ))}</>
                ) :
                    (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginTop: '30px'
                        }} className="" >
                            <img style={{ width: '200px', height: '200px' }} src={noComents} alt="" />
                            <p style={{ fontSize: '20px' }}>Chưa có góp ý nào</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
