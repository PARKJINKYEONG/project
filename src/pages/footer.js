import React from 'react';
import '../styles/common.css';
import { FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Company Info Section */}
                <div className="footer-logo">
                    <h1>TravelJoy</h1>
                </div>

                {/* Links Section */}
                <div className="footer-links">
                    <a href="/announcement" className="text-body">공지사항</a>
                    <a href="/userQna" className="text-body">QnA</a>
                    <a href="/ReviewList" className="text-body">여행후기</a>
                </div>

                {/* Social Media Section */}
                <div className="footer-social">
                    <a href="https://youtube.com/yourchannel" className="text-body" aria-label="YouTube">
                        <FaYoutube size={20} />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} TravelJoy. All rights reserved.</p>
            </div>
        </footer>
    );
}
