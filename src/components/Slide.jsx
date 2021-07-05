import React from 'react';
import './Slide.scss';

export const Slide = (props) => {
    return (
        <div className="Slide" style={props.background}>
            <div className={`${!props.isMobile? 'Slide__inner--' + props.slide.ctaPosition : 'Slide__inner'}`}>
            <div className="Slide__content-wrapper">
                <h1 className="Slide__title">{props.slide.title}</h1>
                { props.slide.heading && <h6 className="Slide__heading">{props.slide.heading}</h6> }
                { props.slide.subhead && <h6 className="Slide__subhead">{props.slide.subhead}</h6> }
                <div className={`Slide__cta-wrapper--${props.slide.cta.length > 1 ? 'double':'single'}`}>
                { props.slide.cta.map((cta, index) => {
                    return (
                        <div className="Slide__cta" key={index}>
                            <h5 className="Slide__label"></h5>
                            <div className="Slide__btn-wrapper">
                                <a href={cta.url} className="Slide__btn">{cta.label}</a>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Slide;