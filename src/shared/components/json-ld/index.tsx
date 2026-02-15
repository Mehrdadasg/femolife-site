'use client';

import React from 'react';

interface JsonLdProps {
  json?: string ;
}

const JsonLd: React.FC<JsonLdProps> = ({ json }) => {
  if (!json) return null;

  try {
    const parsed =
      typeof json === 'string' ? JSON.parse(json) : json;

    const jsonString = JSON.stringify(parsed).replace(/</g, '\\u003c');

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonString }}
      />
    );
  } catch (error) {
    console.warn('JSON-LD parse or stringify failed:', error);
    return null;
  }
};

export default JsonLd;
