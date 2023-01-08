import { TIngrDetailedCount, TIngredient, TIngredientOrderCount } from "../services/types/data";

type TReturnFilteredIngr = {
    [type in string]: TIngredient[];
}

export const ingredientFilter = (list: TIngredient[]) => list.reduce<TReturnFilteredIngr>((acc, ingredient) => {
    if (acc[ingredient.type] === undefined) {
        acc[ingredient.type] = [];
    }
    return { ...acc, [ingredient.type]: [...acc[ingredient.type], ingredient] }
}, {})

export const moveElementInArray = <T>(arr: Array<T>, dragIndex: number, hoverIndex: number) => {
    var element = arr[dragIndex];
    arr.splice(dragIndex, 1);
    arr.splice(hoverIndex, 0, element);
}

export const uuidv4 = (): string => {
    //@ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        // eslint-disable-next-line
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const countIngredients = (arr: TIngredient[] ) => {
    return arr.reduce<TIngredientOrderCount>((acc, item: TIngredient) => {
        if (acc[item._id]) {
            acc[item._id] = acc[item._id] + 1;
        } else {
            acc[item._id] = 1;
        }
        return acc;
    }, {})
}

export const splitChunks = <T>(array: Array<T>, chunkSize: number, maxChunks: number):Array<T[]> => {
    let result:Array<T[]> =  new Array<T[]>();
    for (let i = 0; i < maxChunks * chunkSize; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    return result;
}

type TIngrCountList = {
    ingredients: {
        [id in string]: TIngrDetailedCount;
    },
    price: number
};

export const fillDetailedInformationOrder = (ingredients: readonly string[], descriptionIngr: TIngredient[]):TIngrCountList => {

    if (!Array.isArray(ingredients)) return { ingredients: {}, price: 0 };

    return ingredients.reduce((acc, ingr) => {
        const detIngr = descriptionIngr.find(descIngr => descIngr._id === ingr);

        if (detIngr) {
            if (acc.ingredients[ingr]) {
                return {
                    ingredients: {
                        ...acc.ingredients, [ingr]: {
                            ...acc.ingredients[ingr],
                            count: acc.ingredients[ingr].count + 1
                        }
                    },
                    price: acc.price + detIngr.price
                }
            } else {
                return {
                    ingredients: {
                        ...acc.ingredients, [ingr]: {
                            image: detIngr.image,
                            price: detIngr.price,
                            type: detIngr.type,
                            name: detIngr.name,
                            count: 1,
                        }
                    },
                    price: acc.price + detIngr.price
                }
            }

        } else {
            return acc;
        }

    }, { ingredients: {}, price: 0 });
}