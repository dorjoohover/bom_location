export function enumToArray(enumType: any) {
    return Object.keys(enumType).filter(key => isNaN(Number(key)));
  }