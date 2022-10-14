import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-constructor-element.module.css';
import { useDrag, useDrop } from "react-dnd";
import { IngredientType } from "../../utils/objects";

const BurgerConstructorElement = ({ ingredient, bunPositionName = '',  isLocked, type, index, moveIngr, handleClose }) => {

    const {_id:id, key, name, price, image: thumbnail } = ingredient;

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
        handleClose(key);
      }

    return (
        <div  ref={ref} className={style.Container}>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={`${name} ${bunPositionName}`}
                price={price}
                thumbnail={thumbnail}
                handleClose={handleDelete}
            />
        </div>
    )
};

BurgerConstructorElement.propTypes = {
    ingredient: IngredientType.isRequired,
    bunPositionName: PropTypes.string,
    isLocked: PropTypes.bool.isRequired,
    index: PropTypes.number,
    moveIngr: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    type: PropTypes.string
}

export default BurgerConstructorElement;