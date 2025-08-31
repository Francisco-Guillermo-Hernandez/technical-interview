'use client';

import { Button } from "@/components/ui/button";

export default function UnAuthorizedPage() {
  return (

    <div className="flex items-center justify-center min-h-[100dvh]">
      <div className="max-w-md space-y-8 p-4 text-center">
    
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          No estas autorizado para ver esta página
        </h1>
        <p className="text-base text-gray-500">
            Por favor inicia sesion
        </p>
        <Button onClick={() => window.location.href = '/auth/login'} className="custom-btn-primary">Llevame al login </Button>
        
      </div>
    </div>
  );
}