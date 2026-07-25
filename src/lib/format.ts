const monthYearFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const yearFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatMonthYear(value: string): string {
  return monthYearFormatter.format(new Date(value));
}

export function formatYear(value: string): string {
  return yearFormatter.format(new Date(value));
}
