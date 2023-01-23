export const formatDate = (postDate) => {
  const daysPassed = Math.round(
    Math.abs((new Date() - postDate) / (1000 * 24 * 3600))
  );
  const hourPassed = Math.round(
    Math.abs((new Date() - postDate) / (1000 * 3600))
  );
  const minsPassed = Math.round(
    Math.abs((new Date() - postDate) / (1000 * 60))
  );

  if (minsPassed === 0) return "Just now";
  if (minsPassed < 60) return `${minsPassed} mins ago`;
  if (hourPassed < 24) return `${hourPassed} hr ago`;
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  const day = `${postDate.getDate()}`.padStart(2, 0);
  const month = `${postDate.getMonth()}`.padStart(2, 0);
  const year = postDate.getFullYear();
  return `${day}/${month}/${year}`;
};
