export function normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function moveToThursday(date: Date) {
    const d = normalizeDate(date);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    return d;
}

export function getISOYear(date: Date): number {
    const d = moveToThursday(date);
    return d.getFullYear();
}

export function getISOWeek(date: Date): number {
    const d = moveToThursday(date);

    const firstThursday = moveToThursday(new Date(d.getFullYear(), 0, 4));
    const diff = (d.getTime() - firstThursday.getTime());
    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}