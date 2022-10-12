export const ingredientFilter = (list) => list.reduce((acc, ingredient) => {
    if (acc[ingredient.type] === undefined) {
        acc[ingredient.type] = [];
    }
    return { ...acc, [ingredient.type]: [...acc[ingredient.type], ingredient] }
}, {})

export const moveElementInArray = (arr, dragIndex, hoverIndex) => {
    var element = arr[dragIndex];
    arr.splice(dragIndex, 1);
    arr.splice(hoverIndex, 0, element);
}

export const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }