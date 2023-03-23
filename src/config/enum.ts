


export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum AdTypes {
  special = 'special',
  default = 'default',
  poster = 'poster'
}



export enum AdStatus {
  sold = 'sold',
  pending = 'pending',
  timed = 'timed',
  created = 'created',
deleted = 'deleted'
}

export enum ItemTypes {
  dropdown, 
  text, 
  date, 
  year, 
  committee, 
}

export enum ItemType {
  floor = 'floor',
  room = 'room',
  bathroom = 'bathroom',
  masterBedroom = 'masterBedroom',
  window = 'window',
  windowUnit = 'windowUnit',
  door = 'door',
  balconyUnit = 'balconyUnit',
  buildingFloor = 'buildingFloor',
  garage = 'garage',
  paymentMethod = 'paymentMethod',
  barter = 'barter',
  landLicense = 'landLicense',
  landUsage = 'landUsage',
  objectType = 'objectType',
  serviceType = 'serviceType',
  phone = 'phone',
  price = 'price',
  unitPrice = 'unitPrice',
  area = 'area',
  operation = 'operation',
  licenseOperation = 'licenseOperation',
  validDate = 'validDate',
  district = 'district',
  committee = 'committee',
  location = 'location',
  town = 'town',
  howFloor = 'howFloor',
  officeName = 'officeName',
  buildingName = 'buildingName',
  tradeService = 'tradeService',
  buildingProcess = 'buildingProcess'
}

export enum PointSendType {
  sender = 'sender',
  receiver = 'receiver'
}

export enum AdType {
  sell = 'sell',
  rent = 'rent',
  sellRent = 'sellRent'
}
export enum CategorySuggestionTypes {
  'room',
  'location',
  'floor',
  'usage',
  'buildingFloor',
  'map'
}
export enum CreateAdSteps {
  type = 'type',
  adType = 'adType',
  location = 'location',
  general = 'general',
  detail = 'detail'
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
  banned = 'banned'
}

export enum Socials {
  facebook,
  instagram,
  telegram
}

// export function getStep(step: CreateAdSteps, filters: any ):any {
//   switch(step){
//     case CreateAdSteps.type:
//       return filters.map((f) => {
//         if(f == 'AdTypes') {
//           return {
//             id: 'AdTypes',
//             name: 'Зарын төрөл',
//             values: [
//               AdTypes.default,
//               AdTypes.poster,
//               AdTypes.special,
//             ],
//             value: '',
//             type: 'dropdown',
//           };
//         }
//       })
//     case CreateAdSteps.location:
//       return filters.map((f) => getFilter(f))
//     case CreateAdSteps.general:
//       return filters.map((f) => getFilter(f))
//     case CreateAdSteps.detail:
//       return filters.map((f) => getFilter(f))
//   }
// }

