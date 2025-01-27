export const MAX_LOCATIONS_PER_DAY = 3;
export const MAX_RESTAURANTS_PER_DAY = 2;
export const TIME_SLOTS = [
  "10:00-11:30 AM",
  "12:00-1:30 PM",
  "2:00-3:30 PM",
  "4:00-5:30 PM",
  "6:00-7:30 PM",
];
export interface Item {
  id?: string | number;
  name: string;
  significance?: string;
  airportWithin50kmRadius?: boolean;
  city?: string;
  state?: string;
  type?: string; // e.g., 'temple', 'fort', 'beach'
  distance?: number; // Distance in km (for restaurants)
}
export const updateItemIds = (dayItems: Item[]) => {
  return dayItems.map((item) => {
    if (item.id) {
      return {
        ...item,
        id: item.id, // Ensure unique id
      };
    } else {
      return {
        ...item,
      };
    }
  });
};

export const sortItems = (items: Item[]) => {
  const withId = items.filter((item) => item.id);
  const withoutId = items.filter((item) => !item.id);

  const firstTwoWithId = withId.slice(0, 2);
  const remainingWithId = withId.slice(2);
  const firstRemainingWithOutId = withoutId.slice(0, 1);
  const secondRemainingWithOutId = withoutId.slice(1, 2);

  return [
    ...firstTwoWithId,
    firstRemainingWithOutId,
    ...remainingWithId,
    secondRemainingWithOutId,
  ];
};
