import { useState, useCallback, useEffect, useRef } from 'react';
import { submitContactForm } from '../api/contactApi';
import { validate } from '../utils/validation';

const INITIAL_FORM_DATA = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function useContactForm() {
  const [selectedMode, setSelectedMode] = useState(null); // 'reply' | 'anonymous' | null
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const successTimerRef = useRef(null);

  // Auto-dismiss success overlay after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      successTimerRef.current = setTimeout(() => {
        resetForm();
      }, 5000);
    }
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, [isSuccess]);

  const selectMode = useCallback((mode) => {
    setSelectedMode(mode);
    setErrors({});
    setSubmitError(null);
    setShowWarning(false);
  }, []);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setShowWarning(false);
    // Clear error for this field as user types
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    const { isValid, errors: validationErrors } = validate(formData, selectedMode);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const hasPhone = formData.phone.trim().length > 0;
    const hasEmail = formData.email.trim().length > 0;

    if (selectedMode === 'reply' && !hasPhone && !hasEmail && !showWarning) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);
    setIsSubmitting(true);
    setSubmitError(null);

    const trimmedMessage = formData.message.trim();

    const payload =
      selectedMode === 'reply'
        ? {
            type: 'reply',
            name: formData.name.trim(),
            phone: formData.phone.trim() || 'Not provided',
            email: formData.email.trim() || 'Not provided',
            message: trimmedMessage,
          }
        : {
            type: 'anonymous',
            name: 'Anonymous',
            phone: 'Anonymous',
            email: 'Anonymous',
            message: trimmedMessage,
          };

    try {
      await submitContactForm(payload);
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, selectedMode, isSubmitting, showWarning]);

  const resetForm = useCallback(() => {
    setSelectedMode(null);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setIsSubmitting(false);
    setIsSuccess(false);
    setSubmitError(null);
    setShowWarning(false);
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
  }, []);

  const dismissSuccess = useCallback(() => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    resetForm();
  }, [resetForm]);

  const dismissError = useCallback(() => {
    setSubmitError(null);
  }, []);

  const goBack = useCallback(() => {
    setSelectedMode(null);
    setErrors({});
    setSubmitError(null);
    setShowWarning(false);
  }, []);

  return {
    selectedMode,
    formData,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    showWarning,
    selectMode,
    updateField,
    handleSubmit,
    resetForm,
    dismissSuccess,
    dismissError,
    goBack,
  };
}
