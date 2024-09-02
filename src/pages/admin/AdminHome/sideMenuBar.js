import React, { useState } from 'react';
import styles from '../../../styles/admin/sideMenuBar.module.css';
import { Link } from 'react-router-dom';

const menuItems = [
    {
        title: '회원 관리',
        num: 1,
        subMenu: [
            { sub: '회원정보 관리', to: 'userinfo' },
            { sub: '알림 관리', to: 'alarm' },
            { sub: '신고 관리', to: 'reports' },
        ],
    },
    {
        title: '게시글 관리',
        num: 2,
        subMenu: [
            { sub: '공지사항 관리', to: 'notice' },
            { sub: '후기 관리', to: 'review' },
            { sub: '댓글 관리', to: 'comments' },
        ],
    },
    {
        title: '문의 관리',
        num: 3,
        subMenu: [
            { sub: '문의 관리', to: 'questions' },
            { sub: 'FAQ 관리', to: 'faq' },
            { sub: '실시간 문의', to: 'chatting' },
        ],
    },
    {
        title: '콘텐츠 관리',
        num: 4,
        subMenu: [{ sub: '문의 관리', to: 'contents' }],
    },
    {
        title: '통계',
        num: 5,
        subMenu: [{ sub: '방문 현황', to: 'statistics' }],
    },
];

const SideMenuBar = ({ isSidebarOpen, toggleSidebar, onSubMenuSelect }) => {

    const [openMenus, setOpenMenus] = useState({});

    const toggleSubMenu = (index) => {
        setOpenMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };


    return (
        <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
            <div className={`${styles.sidebarHeader} ${!isSidebarOpen && styles.sidebarHeaderClosed}`}>
                <button className={styles.collapseButton} onClick={toggleSidebar}>
                    {isSidebarOpen ? (
                        <img src="/images/icons/left.svg" style={{ width: '16px', height: '16px', fill: '#69b2f8' }} alt="<<" />
                    ) : (
                        <img src="/images/icons/right.svg" style={{ width: '16px', height: '16px', fill: 'white' }} alt=">>" />
                    )}
                </button>
            </div>
            {isSidebarOpen && (
                <div>
                    <div className={styles.menu}>
                        {menuItems.map((item, index) => (
                        <div key={index}>
                            <div className={styles.menuItem} onClick={() => toggleSubMenu(index)} >
                                {item.title}
                            </div>
                            <div className={`${styles.subMenu} ${openMenus[index] ? styles.subMenuOpen : ''}`} >
                                {item.subMenu.map((subItem, subIndex) => (
                                    <Link to={'/admin2/'+subItem.to} className={styles.subMenuItemLink}>
                                    <div key={subIndex} className={styles.subMenuItem} onClick={() => onSubMenuSelect(item.title)} >
                                        - {subItem.sub} </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
};

export default SideMenuBar;