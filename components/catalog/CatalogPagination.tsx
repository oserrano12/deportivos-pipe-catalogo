'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CatalogPaginationProps {
  currentPage: number
  totalPages: number
}

export function CatalogPagination({ currentPage, totalPages }: CatalogPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/?${params.toString()}#catalogo`)
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="text-sm font-medium text-muted-foreground">
        Página <strong className="text-foreground">{currentPage}</strong> de {totalPages}
      </span>

      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
