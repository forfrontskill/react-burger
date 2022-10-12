import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-constructor-element.module.css';
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorElement = ({ id, text, price, thumbnail, isLocked, type, index, moveIngr, handleClose }) => {
    const ref = useRef(null);
    
    const [, drop] = useDrop({
        accept: 'sort_ingr',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        drop(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index

          moveIngr(dragIndex, hoverIndex, id)

          item.index = hoverIndex
        },
      });

      const [, drag] = useDrag({
        type: 'sort_ingr',
        item: () => {
          return { id, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
      
      drag(drop(ref));

      const handleDelete = (e) => {
        handleClose(id);
      }

    return (
        <div  ref={ref} className={style.Container}>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
                handleClose={handleDelete}
            />
        </div>
    )
};

BurgerConstructorElement.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    index: PropTypes.number,
    moveIngr: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    type: PropTypes.string
}

export default BurgerConstructorElement;