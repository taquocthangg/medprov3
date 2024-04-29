import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { addNews, uploadImage } from '../../pages/api';
import io from 'socket.io-client';
import '../../css/admin/Insert_admin.css'
import { Flex, Button } from 'antd';
// Khởi tạo parser Markdown
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Hàm xử lý khi nội dung thay đổi
const MarkDown = ({ dataIntroduce, setIntroduce }) => {
    const [message, setMessage] = useState('');
    useEffect(() => {
        const socket = io('http://localhost:5000'); // Điều chỉnh URL máy chủ nếu cần thiết

        // Xử lý sự kiện khi kết nối thành công
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        // Xử lý sự kiện khi nhận được thông báo mới từ máy chủ
        socket.on('newNewsAdded', (data) => {
            console.log('New comment notification:', data);
            // Thực hiện các thao tác cần thiết khi nhận được thông báo mới
        });

        // Đảm bảo rằng bạn ngừng lắng nghe khi component unmount
        return () => {
            socket.disconnect();
        };
    }, []);
    function handleEditorChange({ html, text }) {
        sethtmlContent(html)
        setmarkDownContent(text)
        console.log('html', html);
        console.log('text', text);
    }
    const [htmlContent, sethtmlContent] = useState('');
    const [markDownContent, setmarkDownContent] = useState('');
    // Hàm xử lý tải ảnh lên và nhận về link
    const handleImageUpload = async (file, callback) => {
        try {
            console.log('first')
            console.log(file)
            const imageUrl = await uploadImage(file);
            callback(imageUrl);
            console.log(imageUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    const postToApi = async () => {
        const postData = {
            htmlContent: htmlContent,
            markDownContent: markDownContent,
            image: dataIntroduce?.imageNews,
            title: dataIntroduce?.titleNews,
            description: dataIntroduce?.description
        };
        console.log(postData)

        try {
            setIntroduce({
                titleNews: "",
                imageNews: "",
                description: ""
            })
            sethtmlContent("")
            setmarkDownContent("")
            addNews(postData)
           

        } catch (error) {
            console.error('Error posting to API:', error);
        }
    };

    return (
        <>
            <div style={{ boxShadow: '2px 5px 15px rgba(0, 0, 0, 0.2)', border: '0.5px solid #ccc', borderRadius: '15px' }}>
                <MdEditor
                    style={{ height: '500px', borderRadius: '15px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    onImageUpload={handleImageUpload}
                    value={markDownContent}
                />
            </div>
            <Flex style={{ marginTop: '20px' }} justify='center'>
                <Button onClick={postToApi} type='primary' style={{ minWidth: '120px', background: 'rgb(62, 168, 255)' }}>
                    Đăng bài
                </Button>
            </Flex>
            {message && <p>{message}</p>}

        </>
    );
};

export default MarkDown;
