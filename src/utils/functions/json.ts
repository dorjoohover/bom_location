export const getJson = (data) => {
  let apartmentJson = [];
  let officeJson = [];
  let houseJson = [];
  let serviceJson = [];
  let factoryJson = [];
  let landJson = [];
  let garageJson = [];
  data.map((d) => {
    if (d.subCategory.name == 'Орон сууц') {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == 'area')['input'],
        balcony: d.filters.find((f) => f.type == 'balconyUnit')['input'],
        barter: d.filters.find((f) => f.type == 'barter')['input'],
        bathroom: d.filters.find((f) => f.type == 'bathroom')['input'],
        bedroom: d.filters.find((f) => f.type == 'masterBedroom')['input'],
        buildingFloor: d.filters.find((f) => f.type == 'buildingFloor')[
          'input'
        ],
        committee: d.filters.find((f) => f.type == 'committee')['input'],
        district: d.filters.find((f) => f.type == 'district')['input'],
        door: d.filters.find((f) => f.type == 'door')['input'],
        floor: d.filters.find((f) => f.type == 'floor')['input'],
        garage: d.filters.find((f) => f.type == 'garage')['input'],
        howFloor: d.filters.find((f) => f.type == 'howFloor')['input'],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == 'operation')['input'],
        payment: d.filters.find((f) => f.type == 'paymentMethod')['input'],
        position: d.filters.find((f) => f.type == 'location')['input'],
        price: d.filters.find((f) => f.type == 'price')['input'],
        process: d.filters.find((f) => f.type == 'buildingProcess')['input'],
        room: d.filters.find((f) => f.type == 'room')['input'],
        town: d.filters.find((f) => f.type == 'town')['input'],
        unitPrice: d.filters.find((f) => f.type == 'unitPrice')['input'],
        window: d.filters.find((f) => f.type == 'window')['input'],
        windowUnit: d.filters.find((f) => f.type == 'windowUnit')['input'],
      };
      apartmentJson.push(json);
    }
    if (d.subCategory.name == 'Оффис') {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == 'area')['input'],
        officeName: d.filters.find((f) => f.type == 'officeName')['input'],
        barter: d.filters.find((f) => f.type == 'barter')['input'],
        buildingFloor: d.filters.find((f) => f.type == 'buildingFloor')[
          'input'
        ],
        committee: d.filters.find((f) => f.type == 'committee')['input'],
        district: d.filters.find((f) => f.type == 'district')['input'],

        howFloor: d.filters.find((f) => f.type == 'howFloor')['input'],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == 'operation')['input'],
        payment: d.filters.find((f) => f.type == 'paymentMethod')['input'],
        position: d.filters.find((f) => f.type == 'location')['input'],
        price: d.filters.find((f) => f.type == 'price')['input'],
        unitPrice: d.filters.find((f) => f.type == 'unitPrice')['input'],
      };
      officeJson.push(json);
    }
    if (d.subCategory.name == 'Худалдаа, үйлчилгээний талбай') {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == 'area')['input'],
        tradeService: d.filters.find((f) => f.type == 'tradeService')['input'],
        barter: d.filters.find((f) => f.type == 'barter')['input'],
        buildingFloor: d.filters.find((f) => f.type == 'buildingFloor')[
          'input'
        ],
        committee: d.filters.find((f) => f.type == 'committee')['input'],
        serviceType: d.filters.find((f) => f.type == 'serviceType')['input'],
        district: d.filters.find((f) => f.type == 'district')['input'],
        howFloor: d.filters.find((f) => f.type == 'howFloor')['input'],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == 'operation')['input'],
        payment: d.filters.find((f) => f.type == 'paymentMethod')['input'],
        position: d.filters.find((f) => f.type == 'location')['input'],
        price: d.filters.find((f) => f.type == 'price')['input'],
        unitPrice: d.filters.find((f) => f.type == 'unitPrice')['input'],
      };
      serviceJson.push(json);
    }
    if (d.subCategory.name == 'Газар') {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == 'area')['input'],
        barter: d.filters.find((f) => f.type == 'barter')['input'],
        committee: d.filters.find((f) => f.type == 'committee')['input'],
        landUsage: d.filters.find((f) => f.type == 'landUsage')['input'],
        landLicense: d.filters.find((f) => f.type == 'landLicense')['input'],
        district: d.filters.find((f) => f.type == 'district')['input'],
        number: `${d.num}`,
        licenseOperation: d.filters.find((f) => f.type == 'licenseOperation')[
          'input'
        ],
        validDate: d.filters.find((f) => f.type == 'validDate')['input'],
        payment: d.filters.find((f) => f.type == 'paymentMethod')['input'],
        position: d.filters.find((f) => f.type == 'location')['input'],
        price: d.filters.find((f) => f.type == 'price')['input'],
        unitPrice: d.filters.find((f) => f.type == 'unitPrice')['input'],
      };
      landJson.push(json);
    }
    if (d.subCategory.name == 'Үйлдвэр агуулах объект') {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == 'area')['input'],
        objectType: d.filters.find((f) => f.type == 'objectType')['input'],
        barter: d.filters.find((f) => f.type == 'barter')['input'],
        buildingFloor: d.filters.find((f) => f.type == 'buildingFloor')[
          'input'
        ],
        committee: d.filters.find((f) => f.type == 'committee')['input'],
        district: d.filters.find((f) => f.type == 'district')['input'],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == 'operation')['input'],
        payment: d.filters.find((f) => f.type == 'paymentMethod')['input'],
        position: d.filters.find((f) => f.type == 'location')['input'],
        price: d.filters.find((f) => f.type == 'price')['input'],
        unitPrice: d.filters.find((f) => f.type == 'unitPrice')['input'],
      };
      factoryJson.push(json);
    }
    if (d.subCategory.name == 'Гараж, контейнер, зөөврийн сууц') {
      let json = {
        adType: d.adType,
        type: d.types[0],
        area: d.filters.find((f) => f.type == 'area')['input'],
        barter: d.filters.find((f) => f.type == 'barter')['input'],
        committee: d.filters.find((f) => f.type == 'committee')['input'],
        district: d.filters.find((f) => f.type == 'district')['input'],
        number: `${d.num}`,
        operation: d.filters.find((f) => f.type == 'operation')['input'],
        payment: d.filters.find((f) => f.type == 'paymentMethod')['input'],
        position: d.filters.find((f) => f.type == 'location')['input'],
        price: d.filters.find((f) => f.type == 'price')['input'],
        unitPrice: d.filters.find((f) => f.type == 'unitPrice')['input'],
      };
      garageJson.push(json);
    }
  });
  return {
    apartmentJson,
    officeJson,
    garageJson,
    serviceJson,
    landJson,
    factoryJson,
  };
};
