export const ingredientFilter = (list) => list.reduce((acc,ingredient)=>{
    if(acc[ingredient.type]===undefined){
        acc[ingredient.type]=[];
    }
    return {...acc,[ingredient.type]:[...acc[ingredient.type],ingredient] }
},{})