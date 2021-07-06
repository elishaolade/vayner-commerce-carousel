import React, {useEffect, useRef, useState} from 'react';
import prevIcon from '.././assets/arrow-left.svg';
import nextIcon from '.././assets/arrow-right.svg';
import './Carousel.scss';
import Slide from './Slide';
import { checkScreen } from '../utils/carousel-utils';

const Carousel = (props) => {
 
    const [backgroundType, setBackgroundType] = React.useState('mobile');
    const [slides, setSlides] = useState([]);
    const [index, setIndex] = useState(0);
    const [transition, setTransition] = useState(false);
    const [direction, setDirection] = useState(null);
    const elementRef = useRef();

    useEffect(()=>{
        handleResize();
        const middle = Math.floor(slides.length / 2) + 1;
        const _slides = props.data;
        setSlides(slides => [..._slides.slice(-middle), ..._slides.slice(0), ..._slides.slice(middle)].slice(0, _slides.length));
        setIndex(Math.floor(middle));
        window.addEventListener('resize', handleResize);
        console.log(elementRef);
        console.log('useEffect');
    }, [props]);

    const handleResize = () => {
        var mql = window.matchMedia('(max-width: 600px)');
        setBackgroundType(checkScreen(mql));
    }

    const next = () => {
        setDirection('next');
        setIndex(index => index + 1);
        setTransition(true);
    };
    
    const prev = () => {
        setDirection('prev');
        setIndex(index => index - 1);
        setTransition(true);
        console.log(slides)
    };

    const translateIndex = () => {
        return -(index * 100);
    }

    const translateStyle = () => {
        if(transition) {
            return {
                transform: `translateX(${translateIndex()}%)`,
                transition: 'transform .3s ease-in-out'
            }
        }
        else {
            return {
                transform: `translateX(${translateIndex()}%)`
            }
        }
    }

    const handleTrack = () => {
        switch (direction) {
            case 'next': 
                setTransition(false);
                setSlides(slides => [...slides, ...slides.slice(0, 1)].slice(-slides.length));
                setIndex(index => index - 1);
                break;
            case 'prev':
                setTransition(false);
                setSlides(slides => [...slides.slice(-1), ...slides].slice(0, slides.length));
                setIndex(index => Math.ceil(slides.length / 2) -1)
                console.log(slides);
                break;
            case '':
                setTransition(false);
                // const middle = Math.floor(slides.length / 2) + 1;
                // setSlides(slides => [...slides.slice(-middle), ...slides.slice(0), ...slides.slice(middle)].slice(0, slides.length));
                // console.log(slides);
                // setIndex(Math.floor(middle));
                break;
        }
    }

    return(
        <div className="Carousel">
            <div className="Carousel__inner">
                <div className="Carousel__slides" style={ translateStyle() } onTransitionEnd={ handleTrack } ref={elementRef}>
                    {slides.map((slide,index) => {
                        // const background = { backgroundImage: isMobile ? `url(${slide.media.mobile})` : `url(${slide.media.desktop})` }
                        let background = backgroundType === 'mobile' ? slide.media.mobile:slide.media.desktop;
                        return <Slide key={index} slide={slide} background={background}/>
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