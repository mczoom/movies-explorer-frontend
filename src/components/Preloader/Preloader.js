import React from 'react'
import './Preloader.css'

const Preloader = ({isLoading}) => {

    const preloaderClassName = `preloader ${isLoading ? '' : 'preloader_off'}`;

    return (
        <div className={preloaderClassName}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
