/**
 * useCatalog helper logic tests
 */

import { catalogProducts } from '../../__fixtures__/catalogData';
import { getVisibleCatalogProducts } from '../useCatalog';

describe('getVisibleCatalogProducts', () => {
  it('filters products by selected category', () => {
    const result = getVisibleCatalogProducts(
      catalogProducts,
      'phone',
      'recommended',
    );

    expect(result.length).toBeGreaterThan(0);
    expect(result.every(item => item.categoryId === 'phone')).toBe(true);
  });

  it('sorts by ascending price', () => {
    const result = getVisibleCatalogProducts(
      catalogProducts,
      'all',
      'price-asc',
    );

    for (let index = 1; index < result.length; index += 1) {
      expect(result[index - 1].price).toBeLessThanOrEqual(result[index].price);
    }
  });

  it('sorts by descending price', () => {
    const result = getVisibleCatalogProducts(
      catalogProducts,
      'all',
      'price-desc',
    );

    for (let index = 1; index < result.length; index += 1) {
      expect(result[index - 1].price).toBeGreaterThanOrEqual(
        result[index].price,
      );
    }
  });

  it('sorts by name for name-asc option', () => {
    const result = getVisibleCatalogProducts(
      catalogProducts,
      'all',
      'name-asc',
    );

    for (let index = 1; index < result.length; index += 1) {
      expect(
        result[index - 1].name.localeCompare(result[index].name, 'tr'),
      ).toBeLessThanOrEqual(0);
    }
  });
});
