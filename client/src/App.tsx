import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/home";
import Validation from "./pages/validation";
import Confirmation from "./pages/confirmation";
import Success from "./pages/success";
import NotFound from "./pages/not-found";
import { useEffect } from "react";
import { initEmailJS } from "./lib/emailService";

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

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;