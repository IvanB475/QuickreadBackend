exports.getTotalPages = async (totalItems, items_per_page) => {
  const checkIfRemaining = totalItems % items_per_page;
  let totalPages;
  if (checkIfRemaining) {
    totalPages = (totalItems - checkIfRemaining) / items_per_page;
  } else {
    totalPages = totalItems / items_per_page;
  }

  return totalPages;
};
