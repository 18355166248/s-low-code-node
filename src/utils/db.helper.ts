import { SelectQueryBuilder } from 'typeorm';

// 精确搜索
export const conditionUtils = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] });
    }
  });

  return queryBuilder;
};

// 模糊搜索
export const fuzzySearchUtils = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      if (key.indexOf('.') > -1) {
        const [, value] = key.split('.');
        queryBuilder.andWhere(`${key} LIKE :${value}`, {
          [value]: `%${obj[key]}%`,
        });
      }
    }
  });

  return queryBuilder;
};
