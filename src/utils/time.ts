import { formatDistance, subDays } from 'date-fns';

export function formatDateDistance(date: string | Date, _default:string = '---'){
    const dt = new Date(date);

    if (!dt.getDate()) return _default;

    return formatDistance(dt, new Date(), { addSuffix: true })
}
