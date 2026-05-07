import React from 'react';
import { useLocalized, type LocalizedString } from '../utils/cn';

interface LocalizedTextProps {
  text: string | LocalizedString | undefined;
  as?: React.ElementType;
  className?: string;
}

/**
 * A component that renders localized text.
 * It uses the useLocalized hook to handle dynamic translation if the translation is missing.
 */
export default function LocalizedText({ text, as: Component = 'span', className }: LocalizedTextProps) {
  const localized = useLocalized(text);
  
  if (!text) return null;

  return <Component className={className}>{localized}</Component>;
}
