export function formatDate(date: string | Date | null): string {
  if (!date) return 'Present'
  try {
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(date as string))
  } catch {
    return String(date)
  }
}

export function formatDateForInput(dateString: string | Date | null): string {
  if (!dateString) return ''
  try {
    return new Date(dateString as string).toISOString().split('T')[0]
  } catch {
    return ''
  }
}
