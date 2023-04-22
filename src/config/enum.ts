

// user
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
export enum UserType {
  default = 'default',
  agent = 'agent',
  organization = 'organization',
  admin = 'admin',
  system = 'system'
}
export enum UserStatus {
  pending = 'pending',
  active = 'active',
  banned = 'banned',
  returned = 'returned'
}

export enum Socials {
  facebook,
  instagram,
  telegram
}
// ad 
export enum AdTypes {
  special = 'special',
  sharing = 'sharing',
  default = 'default',
  poster = 'poster'
}

export enum AdView {
  show = 'show',
  hide = 'hide',
  end = 'end'
}

export enum AdStatus {
  sold = 'sold',
  pending = 'pending',
  checking = 'checking',
  timed = 'timed',
  created = 'created',
  deleted = 'deleted',
  returned = 'returned'
}
export enum AdSellType {
  sell = 'sell',
  sold = 'sold',
  rent = 'rent',
  rented = 'rented',
  sellRent = 'sellRent'
}

export enum ItemPosition {
  default = 'default',
  top = 'top',
  side = 'side',
}
// item
export enum ItemTypes {
  dropdown, 
  text, 
  date, 
  year, 
  committee, 
}
// point
export enum PointSendType {
  sender = 'sender',
  receiver = 'receiver'
}

export enum PointTitle {
  bonus = 'bonus',
  default = "default"

}

export enum CreateAdSteps {
  type = 'type',
  adType = 'adType',
  location = 'location',
  general = 'general',
  detail = 'detail'
}
