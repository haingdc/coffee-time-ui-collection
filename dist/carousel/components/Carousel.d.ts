import type React from 'react';
import './styles.css';
export interface CarouselParentsProps extends React.DetailsHTMLAttributes<HTMLElement>, React.PropsWithChildren {
    items: Array<{
        src: string;
    }>;
}
declare const Carousel: React.FC<CarouselParentsProps>;
export default Carousel;
