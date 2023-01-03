export enum CategorySuggestionTypes {
  'room',
  'location',
  'floor',
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
  district = 'district',
  committee = 'committee',
  location = 'location',
  town = 'town',
  howFloor = 'howFloor',
}

export function getFilter(filter: Filters): any {
  switch (filter) {
    case Filters.buildingFloor:
      return {
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
        name: 'Өрөөний тоо',
        values: ['1', '2', '3', '4', '5', '5+'],
        value: ''
      };
    case Filters.bathroom:
      return {
        name: 'Угаалгын өрөөний тоо',
        values: ['1', '2', '2+'],
        value: ''
      };
    case Filters.masterBedroom:
      return {
        name: 'Мастер өрөөний тоо',
        values: ['Байхгүй', '1', '2', '2+'],
        value: ''
      };
    case Filters.window:
      return {
        name: 'Цонх',
        values: ['Вакум', 'Модон', 'Төмөр вакум', 'Модон вакум'],
        value: ''
      };
    case Filters.windowUnit:
      return {
        name: 'Цонхны тоо',
        values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+'],
        value: ''
      };
    case Filters.door:
      return {
        name: 'Хаалга',
        values: ['Бүргэд', 'Төмөр', 'Мод'],
        value: ''
      };
    case Filters.balconyUnit:
      return {
        name: 'Тагтны тоо',
        values: ['1', '2', '3', '4', '5', '5+'],
        value: ''
      };

    case Filters.floor:
      return {
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
        name: 'Гараж',
        values: ['Байхгүй', 'Байгаа'],
        value: ''
      };

    case Filters.paymentMethod:
      return {
        name: 'Төлбөрийн нөхцөл',
        values: ['Банкны лизингтэй', 'Хувь лизингтэй', 'Бэлэн'],
        value: ''
      };
    case Filters.barter:
      return {
        name: 'Бартер',
        values: ['Байгаа', 'Байхгүй'],
        value: ''
      };
    case Filters.district:
      return {
        name: 'Дүүрэг',
        values: [],
        value: ''
      };
    case Filters.committee:
      return {
        name: 'Хороо',
        values: [],
        value: ''
      };
    case Filters.location:
      return {
        name: 'Байршил',
        values: [],
        value: ''
      };
    case Filters.town:
      return {
        name: 'Хотхон',
        values: [],
        value: ''
      };
    case Filters.howFloor:
      return {
        name: 'Хэдэн давхар',
        values: [],
        value: ''
      };
    case Filters.serviceType:
      return {
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
        name: 'Газар эзэмшлийн хэлбэр',
        values: ['Өмчлөх', 'Эзэмших', 'Ашиглах'],
        value: ''
      };
    case Filters.phone:
      return {
        name: 'Утас',
        values: [],
        value: ''
      };
    case Filters.area:
      return {
        name: 'Талбай',
        values: [],
        value: ''
      };
    case Filters.price:
      return {
        name: 'Талбай',
        values: [],
        value: ''
      };
    case Filters.price:
      return {
        name: 'Үнэ',
        values: [],
        value: ''
      };
    case Filters.unitPrice:
      return {
        name: 'Нэгж талбайн үнэ',
        values: [],
        value: ''
      };
    case Filters.operation:
      return {
        name: 'Ашиглалтанд орсон он',
        values: [],
        value: ''
      };
    case Filters.landUsage:
      return {
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
