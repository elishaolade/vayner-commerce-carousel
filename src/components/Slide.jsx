import React, { useEffect } from 'react';
import './Slide.scss';

export const Slide = (props) => {
    const [isMobile, setMobile] = React.useState(false);
    const [background, setBackground] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [heading, setHeading] = React.useState('');
    const [subhead, setSubhead] = React.useState('');
    const [ctaPosition, setCtaPosition] = React.useState('');
    const [cta, setCta] = React.useState([]);
    useEffect(()=> {
        const media = window.matchMedia('(max-width: 600px)');
        setTitle(props.slide.title)
        setHeading(props.slide.heading);
        setSubhead(props.slide.subhead);
        setCta(props.slide.cta);
        setCtaPosition(props.slide.ctaPosition);
        if(media.matches){
            setMobile(isMobile);
        }
        else {
            setMobile(!isMobile);
        }
    }, [props.slide]);
    return (
        <div className="Slide" style={{backgroundImage: `url(${props.background})` }}>
            {/* <div className={`${!isMobile? 'Slide__inner--' + ctaPosition : 'Slide__inner'}`}>
                <div className="Slide__content-wrapper">
                    <h1 className="Slide__title">{title}</h1>
                    { heading && <h6 className="Slide__heading">{heading}</h6> }
                    { subhead && <h6 className="Slide__subhead">{subhead}</h6> }
                    <div className={`Slide__cta-wrapper--${cta.length > 1 ? 'double':'single'}`}>
                    { cta.map(cta => {
                        return (
                            <div className="Slide__cta">
                                <h5 className="Slide__label"></h5>
                                <div className="Slide__btn-wrapper">
                                    <a href={cta.url} className="Slide__btn">{cta.label}</a>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Slide;