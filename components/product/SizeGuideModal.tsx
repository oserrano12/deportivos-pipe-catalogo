'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SizeGuideModal() {
  return (
    <Dialog>
      <DialogTrigger className="text-xs font-bold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
        ¿No conoces tu talla? Ver equivalencias
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Guía de Tallas (Equivalencias)</DialogTitle>
          <DialogDescription>
            En Colombia y Europa usamos la talla EUR. Encuentra tu equivalencia según la medida de tu pie o tu talla US.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="nike" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nike">Nike / Jordan</TabsTrigger>
            <TabsTrigger value="adidas">Adidas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nike" className="mt-4">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm text-center">
                <thead className="bg-muted font-bold text-xs uppercase">
                  <tr>
                    <th className="py-2 px-1 border-r">US (Hombre)</th>
                    <th className="py-2 px-1 border-r">US (Mujer)</th>
                    <th className="py-2 px-1 border-r text-primary">EUR</th>
                    <th className="py-2 px-1">CM (Largo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">-</td><td className="py-2 border-r">5</td><td className="py-2 border-r font-bold text-foreground">35.5</td><td className="py-2">22</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">-</td><td className="py-2 border-r">5.5</td><td className="py-2 border-r font-bold text-foreground">36</td><td className="py-2">22.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">-</td><td className="py-2 border-r">6.5</td><td className="py-2 border-r font-bold text-foreground">37.5</td><td className="py-2">23.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">6</td><td className="py-2 border-r">7.5</td><td className="py-2 border-r font-bold text-foreground">38.5</td><td className="py-2">24</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">7</td><td className="py-2 border-r">8.5</td><td className="py-2 border-r font-bold text-foreground">40</td><td className="py-2">25</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">8</td><td className="py-2 border-r">9.5</td><td className="py-2 border-r font-bold text-foreground">41</td><td className="py-2">26</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">9</td><td className="py-2 border-r">10.5</td><td className="py-2 border-r font-bold text-foreground">42.5</td><td className="py-2">27</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">10</td><td className="py-2 border-r">11.5</td><td className="py-2 border-r font-bold text-foreground">44</td><td className="py-2">28</td></tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="adidas" className="mt-4">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm text-center">
                <thead className="bg-muted font-bold text-xs uppercase">
                  <tr>
                    <th className="py-2 px-1 border-r">US (Hombre)</th>
                    <th className="py-2 px-1 border-r">US (Mujer)</th>
                    <th className="py-2 px-1 border-r text-primary">EUR</th>
                    <th className="py-2 px-1">CM (Largo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">-</td><td className="py-2 border-r">5</td><td className="py-2 border-r font-bold text-foreground">36</td><td className="py-2">22</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">-</td><td className="py-2 border-r">5.5</td><td className="py-2 border-r font-bold text-foreground">36 2/3</td><td className="py-2">22.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">-</td><td className="py-2 border-r">6.5</td><td className="py-2 border-r font-bold text-foreground">38</td><td className="py-2">23.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">6</td><td className="py-2 border-r">7</td><td className="py-2 border-r font-bold text-foreground">38 2/3</td><td className="py-2">24</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">7</td><td className="py-2 border-r">8</td><td className="py-2 border-r font-bold text-foreground">40</td><td className="py-2">25</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">8</td><td className="py-2 border-r">9</td><td className="py-2 border-r font-bold text-foreground">41 1/3</td><td className="py-2">26</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">9</td><td className="py-2 border-r">10</td><td className="py-2 border-r font-bold text-foreground">42 2/3</td><td className="py-2">27</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">10</td><td className="py-2 border-r">11</td><td className="py-2 border-r font-bold text-foreground">44</td><td className="py-2">28</td></tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-xs text-muted-foreground mt-2 bg-secondary p-3 rounded-lg flex items-start gap-2">
          <span className="text-base leading-none">💡</span>
          <p>Te recomendamos medir la plantilla interna de un zapato que te quede bien y compararlo con la columna <b>CM (Largo)</b> para mayor exactitud.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
