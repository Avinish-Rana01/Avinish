import { renderHook, act } from '@testing-library/react';
import useContactForm from '../hooks/useContactForm';
import { submitContactForm } from '../api/contactApi';
import { vi } from 'vitest';

// Mock the API
vi.mock('../api/contactApi', () => ({
  submitContactForm: vi.fn(),
}));

describe('useContactForm hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useContactForm());
    
    expect(result.current.selectedMode).toBeNull();
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.submitError).toBeNull();
  });

  it('should select mode correctly', () => {
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.selectMode('reply');
    });
    
    expect(result.current.selectedMode).toBe('reply');
  });

  it('should update field correctly and clear its error', () => {
    const { result } = renderHook(() => useContactForm());
    
    // Set an initial error artificially to test clearing
    act(() => {
      // simulate an error from a previous submit attempt
      // Since errors are internal state, we can't set them directly. We can trigger an error by submitting.
      result.current.selectMode('reply');
    });
    
    act(() => {
      result.current.handleSubmit();
    });
    
    expect(result.current.errors.name).toBeTruthy();
    
    act(() => {
      result.current.updateField('name', 'John Doe');
    });
    
    expect(result.current.formData.name).toBe('John Doe');
    expect(result.current.errors.name).toBeUndefined(); // error should be cleared for this field
  });

  it('should handle successful submission', async () => {
    submitContactForm.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.selectMode('anonymous');
      result.current.updateField('message', 'This is a test');
    });
    
    await act(async () => {
      await result.current.handleSubmit();
    });
    
    expect(submitContactForm).toHaveBeenCalledWith({
      type: 'anonymous',
      name: 'Anonymous',
      phone: 'Anonymous',
      email: 'Anonymous',
      message: 'This is a test',
    });
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(true);
  });

  it('should handle failed submission', async () => {
    submitContactForm.mockRejectedValueOnce(new Error('Network Error'));
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.selectMode('anonymous');
      result.current.updateField('message', 'This is a test');
    });
    
    await act(async () => {
      await result.current.handleSubmit();
    });
    
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.submitError).toBe('Network Error');
  });

  it('should go back and clear state', () => {
    const { result } = renderHook(() => useContactForm());
    
    act(() => {
      result.current.selectMode('reply');
      result.current.updateField('name', 'John Doe');
      result.current.goBack();
    });
    
    expect(result.current.selectedMode).toBeNull();
    expect(result.current.formData.name).toBe('John Doe'); // Form data is intentionally preserved
  });
});
