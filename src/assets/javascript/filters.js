// export function currency(num) {
//   const parts = num.toString().split('.');
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   return parts.join('.');
// }

export function currency(num) {
  const n = parseInt(num, 10);
  return `${n
    .toFixed(0)
    .replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0
      ? `, ${c}`.replace(/\s/g, '')
      : c))}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

export function datetime(time) {
  const dateTime = new Date(time * 1000);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const dateFull = `${year}-${month}-${day}`;
  return dateFull;
}
