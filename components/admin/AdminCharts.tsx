'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"

export function AdminCharts({ products }: { products: any[] }) {
  // Data for Categories Bar Chart
  const categoriesMap: Record<string, number> = {}
  products.forEach(p => {
    const cat = p.category?.name || 'Sin Categoría'
    categoriesMap[cat] = (categoriesMap[cat] || 0) + 1
  })
  
  const categoryData = Object.entries(categoriesMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5 categories

  // Data for Brands Pie Chart
  const brandsMap: Record<string, number> = {}
  products.forEach(p => {
    const brand = p.brand?.name || 'Sin Marca'
    brandsMap[brand] = (brandsMap[brand] || 0) + 1
  })

  const brandData = Object.entries(brandsMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6) // Top 6 brands

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff7300']

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      
      {/* Bar Chart: Products by Category */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Top 5 Categorías</CardTitle>
          <CardDescription>
            Distribución del inventario por categoría
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`} 
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-primary, #000)" 
                  radius={[4, 4, 0, 0]} 
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart: Products by Brand */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Composición de Marcas</CardTitle>
          <CardDescription>
            Distribución del inventario por marca (Top 6)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            {brandData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={brandData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    className="text-xs font-medium fill-muted-foreground"
                  >
                    {brandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-muted-foreground">No hay datos suficientes</div>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
