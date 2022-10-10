export const ingredientFilter = (list) => list.reduce((acc,ingredient)=>{
    if(acc[ingredient.type]===undefined){
        acc[ingredient.type]=[];
    }
    return {...acc,[ingredient.type]:[...acc[ingredient.type],ingredient] }
},{})

export const moveElementInArray = (arr, dragIndex, hoverIndex) => {
    console.log('arr',arr);
    console.log('dragIndex',dragIndex);
    console.log('hoverIndex',hoverIndex);
    var element = arr[dragIndex];
    arr.splice(dragIndex, 1);
    arr.splice(hoverIndex, 0, element);
}