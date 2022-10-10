import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-constructor-element.module.css';
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorElement = ({ id, text, price, thumbnail, isLocked, type, index, moveIngr }) => {
    const ref = useRef(null);
    
    const [{ handlerId }, drop] = useDrop({
        accept: 'sort_ingr',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index

          if (dragIndex === hoverIndex) {
            return
          }

          const hoverBoundingRect = ref.current?.getBoundingClientRect()

          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

          const clientOffset = monitor.getClientOffset()

          const hoverClientY = clientOffset.y - hoverBoundingRect.top

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }

          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }

          moveIngr(dragIndex, hoverIndex, id)

          item.index = hoverIndex
        },
      });

      const [{ isDragging }, drag] = useDrag({
        type: 'sort_ingr',
        item: () => {
          return { id, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
      const opacity = isDragging ? 0 : 1;
      drag(drop(ref));



    return (
        <div ref={ref} className={style.Container}>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </div>
    )
};

BurgerConstructorElement.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    type: PropTypes.string
}

export default BurgerConstructorElement;