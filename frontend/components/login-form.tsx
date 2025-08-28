import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card className="overflow-hidden p-0 " {...props}>
        <CardContent className="grid p-0 md:grid-cols-2 h-screen">
          <form className="p-6 md:p-8 flex items-center justify-center">
            <div className="flex flex-col gap-6 w-full md:w-full xl:max-w-md sm:w-full xs:w-full">
              <div className="flex flex-col text-left">
                <h1 className="text-2xl font-bold font-mona-sans">Bienvenido</h1>
                <p className="text-muted-foreground text-balance font-mona-sans mt-3">
                  Por favor ingresa tus credenciales
                </p>
              </div>
              <div className="grid gap-3 mt-10">
                <Label htmlFor="email">Correo electr&oacute;nico</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12"
                  placeholder="Digita tu correo"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                 
                </div>
                <Input id="password" type="password" placeholder="Digita el NIT del comercio" className="h-12" required />
              </div>
              <Button type="submit" className="w-full h-12 mt-15 font-mona-sans font-bold">
                Iniciar sesi&oacute;n
              </Button>

              <div className="text-center text-sm">
                Necesitas una cuenta? &nbsp;
                <a href="#" className="hover:underline hover:underline-offset-4 font-bold font-mona-sans">
                  Reg&iacute;strate aqu&iacute;
                </a>
              </div>
            </div>
          </form>
          <div className="bg-[#EDEDED] relative hidden md:block">
           
          </div>
        </CardContent>
      </Card>
  )
}
