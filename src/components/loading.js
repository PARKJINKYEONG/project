import React from 'react';
import loading from '../assets/loading/LoadingDoubleRing.svg'

export const Loading = ({width,height}) => {
    return <div><img src={loading} alt="loading..." style={{textAlign:'center',verticalAlign:'middle',width:`${width}px`,height:`${height}px`}}/></div>;
};

export default Loading;