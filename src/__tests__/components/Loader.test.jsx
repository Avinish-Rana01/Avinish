import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../../components/Loader';

describe('Loader Component', () => {
  it('renders standard loader correctly', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('.domino-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner.children.length).toBe(8); // 8 spans inside domino-spinner
    
    // Check non-fullscreen wrapper
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'w-full', 'items-center', 'justify-center', 'p-12');
  });

  it('renders fullscreen loader correctly', () => {
    const { container } = render(<Loader fullScreen={true} />);
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('fixed', 'inset-0', 'z-50', 'bg-bg-primary');
    
    const spinner = container.querySelector('.domino-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
