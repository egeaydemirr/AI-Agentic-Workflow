/**
 * ProductListSkeleton Unit Tests
 */

import { render, screen } from '@testing-library/react-native';
import { ProductListSkeleton } from '../ProductListSkeleton';

describe('ProductListSkeleton', () => {
  it('renders with the accessible loading label', () => {
    render(<ProductListSkeleton />);
    expect(screen.getByLabelText('Ürünler yükleniyor...')).toBeTruthy();
  });

  it('renders exactly 4 skeleton items', () => {
    render(<ProductListSkeleton />);
    // The root View has 4 SkeletonItem children (each rendered as a View with card style)
    // We check via testID-less approach by querying the image placeholder views
    // Each SkeletonItem renders a View with styles.card → contains a row → contains imagePlaceholder
    // Since we can't use testIDs here, we verify via the parent container structure
    const container = screen.getByLabelText('Ürünler yükleniyor...');
    // Container should have 4 immediate children (one per SkeletonItem)
    expect(container.props.children).toHaveLength(4);
  });

  it('has accessibilityRole of "text" on the container', () => {
    render(<ProductListSkeleton />);
    const container = screen.getByLabelText('Ürünler yükleniyor...');
    expect(container.props.accessibilityRole).toBe('text');
  });
});
