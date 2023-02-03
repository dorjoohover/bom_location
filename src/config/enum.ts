import { getFilter } from "src/resource/category/interface/categoryEnum";



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

export enum AdType {
  sell = 'sell',
  rent = 'rent',
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
  orgazation = 'orgazation',
  admin = 'admin',
  system = 'system'
}
export enum UserStatus {
  pending = 'pending',
  active = 'active',
  banned = 'banned'
}

export function getStep(step: CreateAdSteps, filters: any ):any {
  switch(step){
    case CreateAdSteps.type:
      return filters.map((f) => {
        if(f == 'AdType') {
          return 
            // id: 'AdType',
            // name: 'Борлуулах төрөл',
            // values: [
            //   AdType.rent,
            //   AdType.sell
            // ],
            // value: '',
            // type: 'check',
          
        }
        if(f == 'AdTypes') {
          return {
            id: 'AdTypes',
            name: 'Зарын төрөл',
            values: [
              AdTypes.default,
              AdTypes.poster,
              AdTypes.special,
            ],
            value: '',
            type: 'dropdown',
          };
        }
      })
    case CreateAdSteps.location:
      return filters.map((f) => getFilter(f))
    case CreateAdSteps.general:
      return filters.map((f) => getFilter(f))
    case CreateAdSteps.detail:
      return filters.map((f) => getFilter(f))
  }
}

