import React, { useState } from 'react';
import { Route, Routes} from "react-router-dom";
import BookmarkHome from './bookmarkHome';
import BookmarkRecentlyViewed from './bookmarkRecentlyViewed';
import BookmarkDetails from './bookmarkDetails';




const BookmarkRoutes = () => {
    const [bookmarks, setBookmarks]=useState([]);

    const handleAddBookmark =(item)=>{
        setBookmarks(prevBookmarks =>[...prevBookmarks,item]);
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<BookmarkHome bookmarks={bookmarks} onAddBookmark={handleAddBookmark}/>}/>
                <Route path="/recently-viewed" element={<BookmarkRecentlyViewed onAddBookmark={handleAddBookmark}/>}/>
                <Route path="/details/*" element={<BookmarkDetails/>}  />

            </Routes>
        </>
    );
};

export default BookmarkRoutes;
