function pagination(page: number, size: number) {
  if (!page || page < 1) {
    page = 1;
  }
  if (!size || size < 1) {
    size = 5;
  }
  const skip = (page - 1) * size;
  const take = size;
  return {
    skip,
    take,
  };
}

function returnablePaginated(
  data: any,
  total: number,
  page: number,
  size: number,
) {
  if (!page || page < 1) {
    page = 1;
  }
  if (!size || size < 1) {
    size = 5;
  }

  const hasPrevious = page > 1;
  const hasNext = page * size < total;
  const totalPages = Math.ceil(total / size);
  const isLast = page === totalPages;
  const isFirst = page === 1;
  return {
    data,
    hasPrevious,
    hasNext,
    totalPages,
    isLast,
    isFirst,
  };
}

export { pagination, returnablePaginated };
