import React, { useRef } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from './burger-constructor-element.module.css';
import { useDrag, useDrop } from "react-dnd";
import { TIngredientOrder } from "../../services/types/data";

type Props = {
  ingredient: TIngredientOrder,
  bunPositionName?: string,
  isLocked: boolean,
  index?: number,
  moveIngr: (dragIndex?:number, hoverIndex?:number) => void,
  handleClose?: (key: string) => void,
  type?: "top" | "bottom"
};


const BurgerConstructorElement = ({
  ingredient,
  bunPositionName = '',
  isLocked,
  type,
  index,
  moveIngr,
  handleClose = (key)=>{}
}:Props) => {

  const { _id: id, key, name, price, image: thumbnail } = ingredient;

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'sort_ingr',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop: (item: {id:string,index?:number}) => {

      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      moveIngr(dragIndex, hoverIndex)

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

  const handleDelete = () => {
    handleClose(key);
  }

  return (
    <div ref={ref} className={style.Container}>
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

export default BurgerConstructorElement;