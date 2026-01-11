import { Header, Card, Badge, EmptyState } from '@/components/common'
import { useAuthStore } from '@/store'
import { generateMockInvoices } from '@/mocks'
import { formatDate, formatCurrency } from '@/utils'
import type { InvoiceStatus } from '@/types'

function getInvoiceStatusVariant(status: InvoiceStatus) {
  switch (status) {
    case 'Paid':
      return 'success' as const
    case 'Processing':
      return 'warning' as const
    case 'Pending':
      return 'error' as const
    default:
      return 'default' as const
  }
}

export default function Invoices() {
  const user = useAuthStore((state) => state.user)
  const invoices = user ? generateMockInvoices(user.id) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Invoices" />

      <div className="px-6 py-6">
        {invoices.length === 0 ? (
          <EmptyState
            title="No invoices yet"
            message="Your billing history will appear here"
          />
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(invoice.createdAt, 'dd MMM yyyy')}
                    </p>
                  </div>
                  <Badge
                    text={invoice.status}
                    variant={getInvoiceStatusVariant(invoice.status)}
                  />
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2">
                  {invoice.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.description}</span>
                      <span className="text-gray-800">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 mt-3 pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Medicare Rebate</span>
                    <span className="text-green-600">-{formatCurrency(invoice.medicareRebate)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-800">You Pay</span>
                    <span className="text-gray-800">{formatCurrency(invoice.patientPayment)}</span>
                  </div>
                </div>

                {invoice.patientPayment === 0 && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 text-center font-medium">
                      Bulk Billed - No out of pocket cost
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
