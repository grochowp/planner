export const User = () => {
  function getFormattedDate() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    function getDaySuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      const lastDigit = day % 10;
      switch (lastDigit) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const daySuffix = getDaySuffix(dayOfMonth);

    const formattedDate = `${dayOfWeek}, ${dayOfMonth}${daySuffix} ${month} ${year}`;

    return formattedDate;
  }

  const todayFormatted = getFormattedDate();

  return (
    <div className="user">
      <h3 className="today-date">{todayFormatted}</h3>
      <div className="user-info">
        <div className="user-photo"></div>
        <div className="user-data">
          <h5>Name Surname</h5>
          <h5>Email@example.com</h5>
        </div>
      </div>
    </div>
  );
};
