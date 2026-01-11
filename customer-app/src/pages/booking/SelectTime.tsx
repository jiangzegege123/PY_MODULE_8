import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Header, Button } from '@/components/common'
import { useBookingStore } from '@/store'
import { generateTimeSlots } from '@/mocks'
import { getBookableDates, cn } from '@/utils'

export default function SelectTime() {
  const navigate = useNavigate()
  const { doctorId, selectedDate, selectedTimeSlot, setSelectedDate, setSelectedTimeSlot } = useBookingStore()

  const bookableDates = useMemo(() => getBookableDates(14), [])
  const [weekOffset, setWeekOffset] = useState(0)

  const visibleDates = bookableDates.slice(weekOffset * 7, (weekOffset + 1) * 7)

  const timeSlots = selectedDate
    ? generateTimeSlots(selectedDate, doctorId || '1')
    : []

  const handleDateSelect = (date: Date) => {
    setSelectedDate(format(date, 'yyyy-MM-dd'))
  }

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      navigate('/booking/confirm')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Select Date & Time" />

      <div className="flex-1 px-6 py-6">
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
            disabled={weekOffset === 0}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-medium text-gray-800">
            {format(visibleDates[0], 'MMM yyyy')}
          </span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            disabled={(weekOffset + 1) * 7 >= bookableDates.length}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Date Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {visibleDates.map((date) => {
            const dateStr = format(date, 'yyyy-MM-dd')
            const isSelected = selectedDate === dateStr
            return (
              <button
                key={dateStr}
                onClick={() => handleDateSelect(date)}
                className={cn(
                  'flex flex-col items-center py-3 rounded-xl transition-colors',
                  isSelected
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                )}
              >
                <span className="text-xs opacity-70">{format(date, 'EEE')}</span>
                <span className="text-lg font-semibold">{format(date, 'd')}</span>
              </button>
            )
          })}
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <>
            <h3 className="font-semibold text-gray-800 mb-4">Available Times</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot?.id === slot.id
                return (
                  <button
                    key={slot.id}
                    onClick={() => slot.isAvailable && setSelectedTimeSlot(slot)}
                    disabled={!slot.isAvailable}
                    className={cn(
                      'py-3 rounded-xl text-sm font-medium transition-colors',
                      isSelected
                        ? 'bg-primary-500 text-white'
                        : slot.isAvailable
                        ? 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    )}
                  >
                    {slot.startTime}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100">
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTimeSlot}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
