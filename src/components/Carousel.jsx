import React, {useEffect} from 'react';
import './Carousel.scss';

const Carousel = (props) => {
    const [isMobile, setMobile] = React.useState(true);
    const [index, setIndex] = React.useState(0);
    const limit = props.data.length;
    useEffect(()=>{
        console.log(limit);
        const media = window.matchMedia('(max-width: 600px)');
        if(media.matches){
            setMobile(isMobile);
        }
        else {
            setMobile(!isMobile);
        }
    }, [])
    const next = () => {
        setIndex(index < limit - 1 ? index + 1 : 0);
        console.log(index)
    };
    const prev = () => {
        setIndex(index > 0 ? index - 1 : limit - 1)
        console.log(index)
    };

    return(
        <div className="Carousel">
            <div className="Carousel__inner">
                <div className="Carousel__slides" style={{ transform: `translateX(${index * -100}%)`}}>
                    {props.data.map((slide,index) => {
                        const background = { backgroundImage: isMobile ? `url(${slide.media.mobile})` : `url(${slide.media.desktop})` }
                        console.log(background.backgroundImage);
                        return (
                            <div className="Slide" key={index} style={background}>
                            <div className="Slide__inner">
                                <div className="Slide__content-wrapper">
                                    <h1 className="Slide__title">{slide.title}</h1>
                                    { slide.heading && <h6 className="Slide__heading">{slide.heading}</h6> }
                                    { slide.subhead && <h6 className="Slide__subhead">{slide.subhead}</h6> }
                                    <div className="Slide__cta-wrapper">
                                    { slide.cta.map(cta => {
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
                            </div>
                            </div>
                        )
                    })}
                </div>
                <div className="Carousel__controls">
                    <button type="button" className="Carousel__prev" onClick={prev}>prev</button>
                    <button type="button" className="Carousel__next" onClick={next}>next</button>
                </div>
            </div>
        </div>
    );
}

export default Carousel;