export enum CategorySuggestionTypes {
  'room',
  'location',
  'floor',
  'usage',
  'buildingFloor'
}

export enum Filters {
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
  
}

export function getFilter(filter: Filters): any {
  switch (filter) {
    case Filters.buildingFloor:
      return {
        id: Filters.buildingFloor,
        name: 'Барилгын давхар',
        values: [
          'B1',
          'B2',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
        ],
        value: ''
      };
      case Filters.room:
        return {
          id: Filters.room,
          name: 'Өрөөний тоо',
          values: ['1', '2', '3', '4', '5', '5+'],
        value: ''
      };
    case Filters.bathroom:
      return {
        id: Filters.bathroom,
        name: 'Угаалгын өрөөний тоо',
        values: ['1', '2', '2+'],
        value: ''
      };
      case Filters.masterBedroom:
        return {
        id: Filters.masterBedroom,
        name: 'Мастер өрөөний тоо',
        values: ['Байхгүй', '1', '2', '2+'],
        value: ''
      };
      case Filters.window:
        return {
        id: Filters.window,
        name: 'Цонх',
        values: ['Вакум', 'Модон', 'Төмөр вакум', 'Модон вакум'],
        value: ''
      };
      case Filters.windowUnit:
        return {
        id: Filters.windowUnit,
        name: 'Цонхны тоо',
        values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+'],
        value: ''
      };
      case Filters.door:
        return {
        id: Filters.door,
        name: 'Хаалга',
        values: ['Бүргэд', 'Төмөр', 'Мод'],
        value: ''
      };
      case Filters.balconyUnit:
        return {
        id: Filters.balconyUnit,
        name: 'Тагтны тоо',
        values: ['1', '2', '3', '4', '5', '5+'],
        value: ''
      };
      
      case Filters.floor:
        return {
          id: Filters.floor,
          name: 'Шал',
          values: [
            'Паркет',
            'Ламинат',
            'Плита',
            'Мод',
            'Чулуу',
            'Бетон',
            'Цемент',
          ],
          value: ''
        };
        case Filters.garage:
          return {
        id: Filters.garage,
        name: 'Гараж',
        values: ['Байхгүй', 'Байгаа'],
        value: ''
      };
      
      case Filters.paymentMethod:
        return {
        id: Filters.paymentMethod,
        name: 'Төлбөрийн нөхцөл',
        values: ['Банкны лизингтэй', 'Хувь лизингтэй', 'Бэлэн'],
        value: ''
      };
      case Filters.barter:
        return {
        id: Filters.barter,
        name: 'Бартер',
        values: ['Байгаа', 'Байхгүй'],
        value: ''
      };
      case Filters.district:
        return {
        id: Filters.district,
        name: 'Дүүрэг',
        values: [],
        value: ''
      };
      case Filters.committee:
        return {
        id: Filters.committee,
        name: 'Хороо',
        values: [],
        value: ''
      };
      case Filters.location:
        return {
        id: Filters.location,
        name: 'Байршил',
        values: [],
        value: ''
      };
      case Filters.town:
        return {
        id: Filters.town,
        name: 'Хотхон',
        values: [],
        value: ''
      };
      case Filters.howFloor:
        return {
        id: Filters.howFloor,
        name: 'Хэдэн давхар',
        values: [],
        value: '',
        maxValue: '',
      };
      case Filters.serviceType:
        return {
        id: Filters.serviceType,
        name: 'Үйлчилгээний төрөл',
        values: [
          'Зоогийн газар',
          'Лангуу, павилон, ТҮЦ',
          'Ресторан, бар, караоке',
          'Супермаркет',
          'Үйлчилгээний талбай',
          'Үсчин гоо, сайхан',
          'Хүнсний дэлгүүр',
          'Бусад',
        ],
        value: ''
      };
    case Filters.objectType:
      return {
        id: Filters.objectType,
        name: 'Объектын төрөл',
        values: [
          'Агуулах',
          'Авто засварын газар',
          'Авто угаалгын газар',
          'Үйлдвэр',
          'Зоорь',
          'Бие даасан объект',
          'Зочид буудал',
          'Бусад',
        ],
        value: ''
      };
      case Filters.landLicense:
        return {
          id: Filters.landLicense,
          name: 'Газар эзэмшлийн хэлбэр',
          values: ['Өмчлөх', 'Эзэмших', 'Ашиглах'],
          value: ''
        };
        case Filters.phone:
          return {
        id: Filters.phone,
        name: 'Утас',
        values: [],
        value: '',
       
        
      };
      case Filters.area:
        return {
          id: Filters.area,
          name: 'Талбай',
          values: [],
          value: '',
          maxValue: '',
        };
      case Filters.officeName:
        return {
          id: Filters.officeName,
          name: 'Оффисын нэр',
          values: [],
          value: '',
          maxValue: '',
        };
      case Filters.buildingName:
        return {
          id: Filters.buildingName,
          name: 'Барилгын нэр',
          values: [],
          value: '',
          maxValue: '',
        };
        case Filters.price:
          return {
        id: Filters.price,
        name: 'Үнэ',
        values: [],
        value: '',
        maxValue: '',
      };
      case Filters.unitPrice:
        return {
        id: Filters.unitPrice,
        name: 'Нэгж талбайн үнэ',
        values: [],
        value: ''
      };
      case Filters.operation:
        return {
        id: Filters.operation,
        name: 'Ашиглалтанд орсон он',
        values: [],
        value: '',
        maxValue: '',
      };
      case Filters.licenseOperation:
        return {
        id: Filters.licenseOperation,
        name: 'Гэрчилгээ олгосон он',
        values: [],
        value: '',
        maxValue: '',
      };
      case Filters.validDate:
        return {
        id: Filters.validDate,
        name: 'Хүчинтэй хугацаа',
        values: [],
        value: '',
        maxValue: '',
      };
      case Filters.landUsage:
        return {
        id: Filters.landUsage,
        name: 'Газрын зориулалт',
        values: [
          '4 ба түүнээс доош давхар нийтийн орон сууц',
          '5-8 давхар нийтийн орон сууц',
          '9 ба түүнээс дээш давхар нийтийн орон сууц',
          'Авто замын барилга, байгууламж',
          'Авто тээврийн хэрэгслийн зогсоолын талбай',
          'Автомашины гараж',
          'Автомашины засвар, үйлчилгээний газар',
          'Автотээврийн үйлчилгээний зориулалтын барилга, байгууламж',
          'Аж ахуйн',
          'Амины орон сууц',
          'Амралтын газар',
          'Гэр бүлийн хэрэгцээний зуслангийн газар',
          'Гэр, орон сууцны хашааны газар',
          'Жимс, жимсгэний усалгаагүй тариалан',
          'Зочид буудлын цогцолбор',
          'Морин уралдааны бариа, автоспортын уралдааны газар',
          'Нийтийн эзэмшлийн бусад газар',
          'Оршуулгын газар',
          'Өвөлжөө, хаваржаа',
          'Рашаан, сувиллын газар',
          'Техникийн ургамлын усалгаагүй тариалан',
          'Тоглоомын талбай',
          'Ус түгээх цэг',
          'Усан оргилуур',
          'Уул уурхайн үйлдвэрлэлийн барилга, байгууламж',
          'Үйлдвэрийн албан контор',
          'Үйлдвэрлэлийн барилга, байгууламж, бусад газар',
          'Худалдаа, нийтийн үйлчилгээний газар, төв, цогцолбор',
          'Хүүхдийн зуслан',
          'Цэнгэлдэх хүрээлэн, наадмын талбай',
          'Шатах, тослох материал түгээгүүрийн газар, агуулах, ШТС',
          'Эмийн болон гоёлын ургамлын усалгаагүй тариалан',
          'Бусад',
        ],
        value: ''
      };
  }
}
