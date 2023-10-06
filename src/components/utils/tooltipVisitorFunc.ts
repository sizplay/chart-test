interface TooltipVisitorFunc {
  visitor1: number;
  visitor2: number;
  visitorDate1: string;
  visitorDate2: string;
}

export const tooltipVisitorFunc = ({ visitor1, visitor2, visitorDate1, visitorDate2 }: TooltipVisitorFunc) => {
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date1 = new Date(visitorDate1);
  const date2 = new Date(visitorDate2);

  const day1 = weekday[date1.getDay()];
  const day2 = weekday[date2.getDay()];

  const month1 = month[date1.getMonth() + 1];
  const month2 = month[date2.getMonth() + 1];

  const dateDay1 = date1.getDate();
  const dateDay2 = date2.getDate();

  const firstDate = `${day1}, ${dateDay1} ${month1}`;
  const secondDate = `${day2}, ${dateDay2} ${month2}`;

  const visitorPercentage = Math.floor((visitor1 / visitor2) * 100 - 100);

  return {
    firstDate,
    secondDate,
    visitorPercentage,
  };
};

export const tooltipLinesFunc = (visitorDate: string) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = new Date(visitorDate);
  const day = weekdays[date.getDay()];
  const month = months[date.getMonth() + 1];
  const dateDay = date.getDate();
  const firstDate = `${day}, ${dateDay} ${month}`;

  return {
    firstDate,
  };
};
