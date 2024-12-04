export interface BookingDetails {
  days: number;
  totalPersons: number;
  ageCategories: { [key: string]: number };
  totalPrice: number;
}

export interface CartItem extends SkiDestination {
  bookingDetails?: BookingDetails;
}

export interface AgeCategory {
  name: string;
  minAge: number;
  maxAge: number;
  price: number;
}

export interface BookingOptions {
  totalDays: number;
  totalPersons: number;
  ageCategories: {
    [key: string]: number;
  };
}

export interface SkiPackage {
  name: string;
  days: number;
  includes: string[];
  maxPersons: number;
  availableDates: string[];
}

export interface SkiDestination {
  id: number;
  name: string;
  location: string;
  description: string;
  difficulty: string[];
  pricePerPerson: number;
  imageUrl: string;
  packages: SkiPackage[];
  ageCategories: AgeCategory[];
  bookingDetails?: {
    days: number;
    totalPersons: number;
    ageCategories: { [key: string]: number };
    totalPrice: number;
  };
}

export interface Article {
  title: string;
  description: string;
}
