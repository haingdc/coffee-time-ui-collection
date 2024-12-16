import React from 'react';
import './carousel.css';
export interface CarouselParentsProps extends React.DetailsHTMLAttributes<HTMLElement>, React.PropsWithChildren {
    items: Array<{
        src: string;
    }>;
}
declare const Carousel: React.FC<CarouselParentsProps>;
export default Carousel;
