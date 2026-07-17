import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CameraShutter from '../../components/CameraShutter';

describe('CameraShutter Component', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('renders nothing but attaches click listeners that spawn sparkles', () => {
    const { container } = render(<CameraShutter />);
    expect(container).toBeEmptyDOMElement();

    // Fire click on body
    fireEvent.click(document.body, { clientX: 100, clientY: 100 });
    
    // It should append a sparkle div to the body
    const sparkle = document.querySelector('.camera-shutter-sparkle');
    expect(sparkle).toBeInTheDocument();
    expect(sparkle.style.left).toBe('100px');
    expect(sparkle.style.top).toBe('100px');
  });
});
