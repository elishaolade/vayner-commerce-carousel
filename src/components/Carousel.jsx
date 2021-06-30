import React, {useEffect} from 'react';
import prevIcon from '.././assets/arrow-left.svg';
import nextIcon from '.././assets/arrow-right.svg';
import './Carousel.scss';
import Slide from './Slide';

const Carousel = (props) => {
    const [isMobile, setMobile] = React.useState(true);
    const [index, setIndex] = React.useState(0);
    const limit = props.data.length;
    useEffect(()=>{
        const media = window.matchMedia('(max-width: 600px)');

        if(media.matches){
            setMobile(isMobile);
        }
        else {
            setMobile(!isMobile);
        }
        function checkScreen(e) {
            if(e.matches) {
                setMobile(isMobile)
            }
            else {
                setMobile(!isMobile)
            }
        }
        media.addEventListener('change', checkScreen);
    }, [])
    const next = () => {
        setIndex(index < limit - 1 ? index + 1 : 0);
    };
    const prev = () => {
        setIndex(index > 0 ? index - 1 : limit - 1)
    };


    return(
        <div className="Carousel">
            <div className="Carousel__inner">
                <div className="Carousel__slides" style={{ transform: `translateX(${index * -100}%)`}}>
                    {props.data.map((slide,index) => {
                        const background = { backgroundImage: isMobile ? `url(${slide.media.mobile})` : `url(${slide.media.desktop})` }
                        return <Slide key={props.index} index={index} slide={slide} background={background} isMobile={isMobile}/>
                    })}
                </div>
                <div className="Carousel__controls">
                    <button type="button" className="Carousel__prev Carousel__btn" onClick={prev}><img src={prevIcon} alt="previous"/></button>
                    <button type="button" className="Carousel__next Carousel__btn" onClick={next}><img src={nextIcon} alt="previous"/></button>
                </div>
            </div>
        </div>
    );
}

export default Carousel;