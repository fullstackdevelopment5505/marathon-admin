
interface UserGroup {
  description: string;
  is: string;
  name: string;
}

interface ProductScope {}

export interface UserData {
  createdDate: Date;
  email: string;
  firstName: string;
  groups: Array<UserGroup>;
  id: string;
  insertedAt: Date;
  isFederated: boolean;
  lastInvitedDate: Date;
  lastName: string;
  lastSuccessfulLogin: Date;
  productScope: ProductScope;
  productScopeId: string;
  status: string;
  userId: string;
}

export class User {
  public email: string;
  public firstName: string;
  public groups: Array<UserGroup>;
  public insertedAt: Date;
  public isFederated: boolean;
  public lastInvitedDate: Date;
  public lastName: string;
  public lastSuccessfulLogin: Date;
  public productScope: ProductScope;
  public productScopeId: string;
  public status: string;
  public userId: string;

  constructor(user) {
    Object.assign(this, user);
  }
}
