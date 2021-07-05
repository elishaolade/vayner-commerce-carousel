import React, {useEffect, useRef, useState} from 'react';
import prevIcon from '.././assets/arrow-left.svg';
import nextIcon from '.././assets/arrow-right.svg';
import './Carousel.scss';
import Slide from './Slide';

const Carousel = (props) => {
    const [isMobile, setMobile] = useState(true);
    const [slides, setSlides] = useState([]);
    const [index, setIndex] = useState(0);
    const [transition, setTransition] = useState(false);
    const [direction, setDirection] = useState('');
    const elementRef = useRef();

    useEffect(()=>{
        const media = window.matchMedia('(max-width: 600px)');
        setSlides(props.data);
        const _slides = props.data;
        setSlides(_slides);
        // if(media.matches){
        //     setMobile(isMobile);
        // }
        // else {
        //     setMobile(!isMobile);
        // }
        // function checkScreen(e) {
        //     if(e.matches) {
        //         setMobile(isMobile)
        //     }
        //     else {
        //         setMobile(!isMobile)
        //     }
        // }
        // media.addEventListener('change', checkScreen);
        console.log(elementRef);
        console.log('useEffect');
    }, [props])



    const next = () => {
        setDirection('next');
        setIndex(index => index + 1);
        setTransition(true);
    };
    
    const prev = () => {
        setDirection('prev');
        setIndex(index => index - 1);
        setTransition(true);
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

    const handlePrev = () => {
        
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
            default:
                break;
        }
    }


    return(
        <div className="Carousel">
            <div className="Carousel__inner">
                <div className="Carousel__slides" style={ translateStyle() } onTransitionEnd={ handleTrack } ref={elementRef}>
                    {slides.map((slide,index) => {
                        const background = { backgroundImage: isMobile ? `url(${slide.media.mobile})` : `url(${slide.media.desktop})` }
                        return <Slide key={index} slide={slide} background={background} isMobile={isMobile}/>
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