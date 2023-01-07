export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
};

export type TIngredientOrder = TIngredient
    & { readonly key: string };

export type TIngredientOrderCount = {
    [id in string]: number;
};

export type TUser = {
    name: string;
    email: string;
    password?: string;
    isAuthNeed?: boolean;
};

export type TDicListStatus = 'done' | 'created' | 'pending';

export type TOrder = {
    _id: string;
    ingredients: ReadonlyArray<string>;
    status: TDicListStatus;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
};

export type TCreatedOrder = TRequestStatus & {
    readonly name: string;
    readonly order: TOrder;
}

export type TOrderList = {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
};

export type TIngrDetailedCount = {
    image: string;
    price: number;
    type: string;
    name: string;
    count: number;
};

export type TRequestStatus = {
    readonly success: boolean;
}

export type TFormLogin = {
    readonly email: string;
    readonly password: string;
};

export type TFormRegister = {
    readonly name: string;
    readonly email: string;
    readonly password: string;
};

export type TFormForgotPassword = {
    readonly email: string;
};

export type TFormConfirmResetPassword = {
    readonly password: string;
    readonly token: string;
}

export type TRefreshToken = {
    readonly accessToken: string;
    readonly refreshToken: string;
}

export type TToken = {
    readonly token: string;
}

export type TLogout = TRequestStatus & {
    readonly message: string;
}

export type TUserTokenResponse = TRefreshToken & {
    readonly user: TUser;
}

export type TResponseMenu = TRefreshToken & {
    readonly data: ReadonlyArray<TIngredient>;
}