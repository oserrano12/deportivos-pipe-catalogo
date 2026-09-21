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
      <DialogTrigger className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-background text-foreground px-4 py-2 border-2 border-border shadow-[4px_4px_0_0_oklch(var(--color-primary))] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all outline-none focus-visible:ring-2 ring-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>
        Guía de Tallas
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Guía de Tallas (Equivalencias)</DialogTitle>
          <DialogDescription>
            En Colombia y Europa usamos la talla EUR. Encuentra tu equivalencia según la medida de tu pie o tu talla US.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="mujer" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mujer">Mujer</TabsTrigger>
            <TabsTrigger value="hombre">Hombre</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mujer" className="mt-4 overflow-auto max-h-[60vh]">
            <div className="border rounded-md overflow-hidden min-w-[300px]">
              <table className="w-full text-sm text-center">
                <thead className="bg-muted font-bold text-xs uppercase">
                  <tr>
                    <th className="py-2 px-1 border-r">CO</th>
                    <th className="py-2 px-1 border-r text-primary">EURO</th>
                    <th className="py-2 px-1 border-r">USA</th>
                    <th className="py-2 px-1">CM</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">35</td><td className="py-2 border-r font-bold text-foreground">35</td><td className="py-2 border-r">5</td><td className="py-2">22</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">35.5</td><td className="py-2 border-r font-bold text-foreground">35.5</td><td className="py-2 border-r">5.5</td><td className="py-2">22.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">36</td><td className="py-2 border-r font-bold text-foreground">36</td><td className="py-2 border-r">6</td><td className="py-2">23</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">36.5</td><td className="py-2 border-r font-bold text-foreground">36.5</td><td className="py-2 border-r">6.5</td><td className="py-2">23.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">37</td><td className="py-2 border-r font-bold text-foreground">37</td><td className="py-2 border-r">7</td><td className="py-2">24</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">37.5</td><td className="py-2 border-r font-bold text-foreground">37.5</td><td className="py-2 border-r">7.5</td><td className="py-2">24.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">38</td><td className="py-2 border-r font-bold text-foreground">38</td><td className="py-2 border-r">8</td><td className="py-2">25</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">38.5</td><td className="py-2 border-r font-bold text-foreground">38.5</td><td className="py-2 border-r">8.5</td><td className="py-2">25.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">39</td><td className="py-2 border-r font-bold text-foreground">39</td><td className="py-2 border-r">9</td><td className="py-2">26</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">39.5</td><td className="py-2 border-r font-bold text-foreground">39.5</td><td className="py-2 border-r">9.5</td><td className="py-2">26.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">40</td><td className="py-2 border-r font-bold text-foreground">40</td><td className="py-2 border-r">10</td><td className="py-2">27</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">40.5</td><td className="py-2 border-r font-bold text-foreground">40.5</td><td className="py-2 border-r">10.5</td><td className="py-2">27.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">41</td><td className="py-2 border-r font-bold text-foreground">41</td><td className="py-2 border-r">11</td><td className="py-2">28</td></tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="hombre" className="mt-4 overflow-auto max-h-[60vh]">
            <div className="border rounded-md overflow-hidden min-w-[300px]">
              <table className="w-full text-sm text-center">
                <thead className="bg-muted font-bold text-xs uppercase">
                  <tr>
                    <th className="py-2 px-1 border-r">CO</th>
                    <th className="py-2 px-1 border-r text-primary">EURO</th>
                    <th className="py-2 px-1 border-r">USA</th>
                    <th className="py-2 px-1">CM</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">37</td><td className="py-2 border-r font-bold text-foreground">38.5</td><td className="py-2 border-r">6</td><td className="py-2">24</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">37.5</td><td className="py-2 border-r font-bold text-foreground">39</td><td className="py-2 border-r">6.5</td><td className="py-2">24.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">38</td><td className="py-2 border-r font-bold text-foreground">40</td><td className="py-2 border-r">7</td><td className="py-2">25</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">38.5</td><td className="py-2 border-r font-bold text-foreground">40.5</td><td className="py-2 border-r">7.5</td><td className="py-2">25.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">39</td><td className="py-2 border-r font-bold text-foreground">41</td><td className="py-2 border-r">8</td><td className="py-2">26</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">39.5</td><td className="py-2 border-r font-bold text-foreground">42</td><td className="py-2 border-r">8.5</td><td className="py-2">26.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">40</td><td className="py-2 border-r font-bold text-foreground">42.5</td><td className="py-2 border-r">9</td><td className="py-2">27</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">40.5</td><td className="py-2 border-r font-bold text-foreground">43</td><td className="py-2 border-r">9.5</td><td className="py-2">27.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">41</td><td className="py-2 border-r font-bold text-foreground">44</td><td className="py-2 border-r">10</td><td className="py-2">28</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">41.5</td><td className="py-2 border-r font-bold text-foreground">44.5</td><td className="py-2 border-r">10.5</td><td className="py-2">28.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">42</td><td className="py-2 border-r font-bold text-foreground">45</td><td className="py-2 border-r">11</td><td className="py-2">29</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">42.5</td><td className="py-2 border-r font-bold text-foreground">45.5</td><td className="py-2 border-r">11.5</td><td className="py-2">29.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">43</td><td className="py-2 border-r font-bold text-foreground">46</td><td className="py-2 border-r">12</td><td className="py-2">30</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">43.5</td><td className="py-2 border-r font-bold text-foreground">47</td><td className="py-2 border-r">12.5</td><td className="py-2">30.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">44</td><td className="py-2 border-r font-bold text-foreground">47.5</td><td className="py-2 border-r">13</td><td className="py-2">31</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">44.5</td><td className="py-2 border-r font-bold text-foreground">48</td><td className="py-2 border-r">13.5</td><td className="py-2">31.5</td></tr>
                  <tr className="hover:bg-muted/50"><td className="py-2 border-r">45</td><td className="py-2 border-r font-bold text-foreground">48.5</td><td className="py-2 border-r">14</td><td className="py-2">32</td></tr>
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
