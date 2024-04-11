export const getTimeDifference = (timeString: string) => {
  // Parse the provided time string to a Date object
  const time = new Date(timeString).getTime();

  // Get the current time
  const currentTime = new Date().getTime();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - time;

  // Convert milliseconds to minutes, hours, and days
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Return appropriate string based on the time difference
  if (minutesDifference < 1) {
    return '방금';
  } else if (minutesDifference < 60) {
    return `${minutesDifference}분 전`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}시간 전`;
  } else {
    return `${daysDifference}일 전`;
  }
};
