const BASE_URL = "https://reststop.randomhouse.com";

const searchItems = async (searchQuery, signal) => {
  return fetch(`${BASE_URL}/resources/titles?search=${searchQuery}`, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });
};

const mapItem = ({
  isbn,
  titleweb: title,
  authorweb: author,
  subjectcategorydescription1: subject,
  priceusa: price,
}) => ({
  isbn,
  title,
  author,
  subject,
  price,
  image: `${BASE_URL}/resources/titles/${isbn}`,
});

const mapItems = (data) => {
  const { title: queriedSearchItems } = data;

  if (!queriedSearchItems) {
    return [];
  }

  if (Array.isArray(queriedSearchItems)) {
    return queriedSearchItems.map(mapItem);
  } else {
    return [mapItem(queriedSearchItems)];
  }
};

export { searchItems, mapItems };
