// Temporary type shims to reduce TypeScript/VSCode errors
// Remove this file after running `npm install` to get proper types.
declare module 'react';
declare module 'react/jsx-runtime';
declare module 'react-router-dom';
declare module 'react-i18next';
declare module 'i18next';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface ElementClass {}
    interface Element {}
    interface ElementAttributesProperty { props: any }
  }
}

export {};
