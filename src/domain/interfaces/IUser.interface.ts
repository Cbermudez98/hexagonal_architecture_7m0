// Contrato

export interface IUser {
    id: string;
    name: string;
    lastName: string;
    email: string;
};

// Tambien puede llamarse IUserDto

// Utility type
export interface IUserCreate extends Omit<IUser, "id"> {}