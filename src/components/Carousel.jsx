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
    const [isMobile, setIsMobile] = useState(null);
    const [delay, setDelay] = useState(4000);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(()=>{
        handleResize();
        const middle = Math.floor(slides.length / 2) + 1;
        const _slides = props.data;
        /* Places first item in data into the middle */
        setSlides(slides => [..._slides.slice(-middle), ..._slides.slice(0), ..._slides.slice(middle)].slice(0, _slides.length));
        setIndex(Math.floor(middle));
        window.addEventListener('resize', handleResize);
        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        }
    }, [props]);

    useInterval(()=> {
        next()
    }, isRunning ? delay: null);

    const handleResize = () => {
        var mql = window.matchMedia('(max-width: 600px)');
        var _isMobile = checkScreen(mql) ? true : false;
        var _bgType = _isMobile ? 'mobile':'desktop';
        setIsMobile(_isMobile);
        setBackgroundType(_bgType);
        
    }

    const next = () => {
        setDirection('next');
        setTimeout(setIndex(index => index + 1), 1000);
        setTransition(true);
    };
    
    const prev = () => {
        setDirection('prev');
        setTimeout(setIndex(index => index - 1), 1000);
        setTransition(true);
    };

    const translateIndex = () => {
        return -(index * 100);
    }

    const translateStyle = () => {
        if(transition) {
            return {
                transform: `translateX(${ translateIndex() }%)`,
                transition: 'transform .3s ease-in-out'
            }
        }
        else {
            return {
                transform: `translateX(${ translateIndex() }%)`
            }
        }
    }

    const handleTrack = (event) => {
        const correctSource = event.target.classList.contains('Carousel__slides');
        if(correctSource) {
            switch (direction) {
                case 'next': 
                    setTransition(false);
                    setSlides(slides => [...slides, ...slides.slice(0, 1)].slice(-slides.length));
                    setIndex(index => index - 1);
                    break;
                case 'prev':
                    setTransition(false);
                    setSlides(slides => [...slides.slice(-1), ...slides].slice(0, slides.length));
                    setIndex(index => Math.ceil(slides.length / 2) -1);
                    break;
                default:
                    setTransition(false);
                    break;
            }
        }
        else {
            event.preventDefault();
        }
    }

    return(
        <div className="Carousel">
            <div className="Carousel__inner">
                <div className="Carousel__slides" style={ translateStyle() } onTransitionEnd={ (event) => handleTrack(event) }>
                    {slides.map((slide,index) => {
                        let background = backgroundType === 'mobile' ? slide.media.mobile : slide.media.desktop;
                        return <Slide key={index} slide={slide} isMobile={isMobile} background={background} setIsRunning={setIsRunning}/>
                    })}
                </div>
                <div className="Carousel__controls">
                    <button type="button" className="Carousel__prev Carousel__btn" onClick={ prev }><img src={ prevIcon } alt="previous"/></button>
                    <button type="button" className="Carousel__next Carousel__btn" onClick={ next }><img src={ nextIcon } alt="previous"/></button>
                </div>
            </div>
        </div>
    );
}

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(()=> {
        function tick() {
            savedCallback.current();
        }
        if(delay != null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay])
}

export default Carousel;