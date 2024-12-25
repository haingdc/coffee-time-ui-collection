import clsx from 'clsx/lite'
import type React from 'react'
import { useState } from 'react'
import './styles.css'

export interface CarouselParentsProps
  extends React.DetailsHTMLAttributes<HTMLElement>,
    React.PropsWithChildren {
  items: Array<{ src: string }>
}

const Carousel: React.FC<CarouselParentsProps> = ({
  className,
  items,
  ...props
}) => {
  const [current, setCurrent] = useState<number>(0)
  const [isAnimation, setIsAnimation] = useState<boolean>(false)
  const left = current === 0 ? items.length - 1 : current - 1
  const right = current === items.length - 1 ? 0 : current + 1
  // TODO: next và prev chỉ có khi count > 3, cần thêm điều kiện kiểm tra
  const next = right === items.length - 1 ? 0 : right + 1
  const prev = left === 0 ? items.length - 1 : left - 1

  const _getCoordinates = (position: string): React.CSSProperties => {
    switch (position) {
      case 'outleft':
        return {
          transform: 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
          opacity: 0,
          visibility: 'hidden',
        }
        break
      case 'outright':
        return {
          transform: 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
          opacity: 0,
          visibility: 'hidden',
        }
        break
      case 'left':
        return {
          transform: 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
          opacity: 1,
          visibility: 'visible',
        }
        break
      case 'right':
        return {
          transform: 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
          opacity: 1,
          visibility: 'visible',
        }
        break
      case 'center':
      default:
        return {
          transform: 'translateX(0px) translateZ(0px) rotateY(0deg)',
          opacity: 1,
          visibility: 'visible',
        }
        break
    }
  }

  const _navigate = (direction: string) => {
    if (isAnimation) return
    setIsAnimation(true)
    switch (direction) {
      case 'next':
        setCurrent((prev) => {
          return prev === items.length - 1 ? 0 : prev + 1
        })
        break
      case 'prev':
        setCurrent((prev) => {
          return prev === 0 ? items.length - 1 : prev - 1
        })
        break
    }
  }

  const handlePrev = () => {
    _navigate('prev')
  }
  const handleNext = () => {
    _navigate('next')
  }
  const onTransitionEnd = () => {
    setIsAnimation(false)
  }

  return (
    <div
      id='re-container'
      className='re-container re-carousel-parents'
      {...props}
    >
      <div className='re-wrapper' onTransitionEnd={onTransitionEnd}>
        {items.map((item, index) => {
          let style: React.CSSProperties
          switch (index) {
            case left:
              style = {
                transform:
                  'translateX(-350px) translateZ(-200px) rotateY(45deg)',
                opacity: 1,
                visibility: 'visible',
              }
              break
            case right:
              style = {
                transform:
                  'translateX(350px) translateZ(-200px) rotateY(-45deg)',
                opacity: 1,
                visibility: 'visible',
              }
              break
            case current:
              style = {
                opacity: 1,
                visibility: 'visible',
              }
              break
            case next:
              style = _getCoordinates('outright')
              break
            case prev:
              style = _getCoordinates('outleft')
              break
            default:
              style = { opacity: 0, visibility: 'hidden' }
          }
          return (
            <a
              href='#'
              className={clsx(
                're-carousel-item',
                current === index ? 're-center' : '',
                isAnimation &&
                  [current, left, right, next, prev].includes(index)
                  ? 're-transition'
                  : ''
              )}
              key={index}
              style={style}
            >
              <img
                src={item.src}
                alt={
                  index === current
                    ? 'current'
                    : index === left
                    ? 'left'
                    : index === right
                    ? 'right'
                    : index === next
                    ? 'next'
                    : index === prev
                    ? 'prev'
                    : ''
                }
              />
            </a>
          )
        })}
      </div>
      {items.length > 3 && (
        <nav>
          <span className='re-prev' onClick={handlePrev}>
            &lt;
          </span>
          <span className='re-next' onClick={handleNext}>
            &gt;
          </span>
        </nav>
      )}
    </div>
  )
}

export default Carousel
