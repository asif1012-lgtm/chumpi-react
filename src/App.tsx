// This file is deprecated. Please use client/src/App.tsx instead.
// This file will be removed in a future update.

import { useEffect } from "react";
import { Switch, Route } from "wouter";
import React from 'react';

// Redirect to the new App location
export default function App() {
  useEffect(() => {
    console.warn('Using deprecated App.tsx. Please update your imports to use client/src/App.tsx');
  }, []);

  return null;
}