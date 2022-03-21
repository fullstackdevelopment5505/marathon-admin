
export interface AssetTypeData {
  id: string;
  name: string;
  unit?: string;
  slug: string;
}

export class AssetType {
  public id: string;
  public name: string;
  public unit?: string;
  public slug: string;

  constructor(type: AssetTypeData | AssetType) {
    if (!type) {
      throw new Error('AssetType must be instantiated with a base object');
    }

    Object.assign(this, type);
  }

  public toJSON() {
    return { ...this };
  }
}
