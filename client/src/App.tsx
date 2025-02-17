import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import Layout from "./components/layout";
import Home from "./pages/home";
import Validation from "./pages/validation";
import Confirmation from "./pages/confirmation";
import Success from "./pages/success";
import NotFound from "./pages/not-found";
import { useEffect } from "react";
import { initEmailJS } from "./lib/emailService";
import React from 'react';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/validation" component={Validation} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/success" component={Success} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    try {
      initEmailJS();
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  // Prevent navigation to external domains
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && !link.href.startsWith(window.location.origin)) {
        e.preventDefault();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;