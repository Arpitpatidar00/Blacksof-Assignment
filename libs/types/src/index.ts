export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  heading: string;
  description: string;
  features: readonly string[];
  image: string;
  cta: string;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}
