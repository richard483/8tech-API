function pagination(page: number, size: number) {
  if (page < 1) {
    page = 1;
  }
  if (size < 1) {
    size = 5;
  }
  const skip = (page - 1) * size;
  const take = size;
  return {
    skip,
    take,
  };
}

export { pagination };
