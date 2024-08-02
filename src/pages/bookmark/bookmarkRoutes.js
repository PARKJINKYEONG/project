import React from 'react';
import { Route, Routes} from "react-router-dom";
import BookmarkHome from './bookmarkHome';
import BookmarkRecentlyViewed from './bookmarkRecentlyViewed';
import BookmarkDetails from './bookmarkDetails';


const BookmarkRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<BookmarkHome/>}/>
                <Route path="/recently-viewed" element={<BookmarkRecentlyViewed/>}/>
                <Route path="/details/*" element={<BookmarkDetails/>}  />

            </Routes>
        </>
    );
};

export default BookmarkRoutes;
