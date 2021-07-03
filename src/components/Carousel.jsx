import React, {useEffect} from 'react';
import prevIcon from '.././assets/arrow-left.svg';
import nextIcon from '.././assets/arrow-right.svg';
import './Carousel.scss';
import Slide from './Slide';
import {checkScreen} from '../utils/carousel-utils'

const Carousel = (props) => {
    const [backgroundType, setBackgroundType] = React.useState('mobile');
    const [current, setCurrent] = React.useState(0);
    const [transition, setTransition] = React.useState(true);
    const [direction, setDirection] = React.useState('');
    const [slides, setSlides] = React.useState([]);

    useEffect(()=>{
        handleResize();
        setSlides(props.data);
        window.addEventListener('resize', handleResize)
    }, [props.data])

    const handleResize = () => {
        var mql = window.matchMedia('(max-width: 600px)');
        setBackgroundType(checkScreen(mql));
    }

    const handleTranslation = () => {
        switch(direction) {
            case 'next':
                validateNextSlides();
                break;
            case 'prev':
                validatePrevSlides();
                break;
            default:
                break;
        }
    }

    const validateNextSlides = () => {
        let _current = current;
        let length = slides.length;
        _current -= 1;
        const _slides = [...slides, ...slides.slice(0,1)].slice(-length);
        console.log(_slides);
        setTransition(false);
        setCurrent(_current);
        setSlides(_slides);
    }

    const validatePrevSlides = () => {
        let _current = current;
        let length = slides.length;
        _current += 1;
        const _slides = [...slides.slice(-1), ...slides].slice(0, length);
        setTransition(false);
        setCurrent(_current);
        setSlides(_slides);
    }

    const handleNext = () => {
        setTransition(true);
        setCurrent(current + 1);
        setDirection('next');
    };

    const handlePrev = () => {
        setTransition(true);
        setCurrent(current - 1);
        setDirection('prev');
    };

    const translateVal = () => {
        let value = -(current * 100)
        return value;
    }

    const carouselStyle = () => {
        console.log(`Move carousel ${ translateVal() }%`)
        if(transition) {
            return {
                transform: `translateX(${ translateVal() }%)`,
                transition: 'transform .3s ease-in-out'
            };
        }
        else {
            return {
                transform: `translateX(${translateVal()}%)`
            };
        }
    }

    return(
        <div className="Carousel">
            <div className="Carousel__inner">
                <div className="Carousel__slides" style={carouselStyle()} onTransitionEnd={handleTranslation}>
                    {slides.map((slide, index) => {
                        let background = backgroundType === 'mobile' ? slide.media.mobile:slide.media.desktop;
                        return <Slide key={index} slide={slide} background={background}/>
                    })}
                </div>
                <div className="Carousel__controls">
                    <button type="button" className="Carousel__prev Carousel__btn" onClick={handlePrev}><img src={prevIcon} alt="previous"/></button>
                    <button type="button" className="Carousel__next Carousel__btn" onClick={handleNext}><img src={nextIcon} alt="previous"/></button>
                </div>
            </div>
        </div>
    );
}

export default Carousel;