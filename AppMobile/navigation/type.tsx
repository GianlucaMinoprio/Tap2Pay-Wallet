import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Intro: undefined;
  Term: undefined;
  Onbroading: NavigatorScreenParams<OnboardingParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Social: NavigatorScreenParams<SocialStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  FoodDelivery: NavigatorScreenParams<FoodDeliveryStackParamList>;
  Finance: NavigatorScreenParams<FinanceStackParamList>;
  ECommerce: NavigatorScreenParams<ECommerceStackParamList>;
  Reading: NavigatorScreenParams<ReadingStackParamList>;
  Fitness: NavigatorScreenParams<FitnessStackParamList>;
  Health: NavigatorScreenParams<HealthStackParamList>;
  Education: NavigatorScreenParams<EducationStackParamList>;
  Crypto: NavigatorScreenParams<CryptoStackParamList>;
  Delivery: NavigatorScreenParams<DeliveryStackParamList>;
};

export type OnboardingParamList = {
  Onboarding: undefined;
  Onboarding04: undefined;
};

export type AuthStackParamList = {
  Home: undefined;
  SignIn01: undefined;
  SignIn02: undefined;
  SignInDefi: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  Verify: undefined;
  Authenticate: undefined;
  CreateNewProfile: undefined;
};
export type HealthStackParamList = {
  Home: undefined;
  HomeHealth: undefined;
  UpdateWeight: undefined;
  WaterGoal: undefined;
  AddFoodLunch: undefined;
  FoodInformation: undefined;
  AddFoodBreakfast: undefined;
  Recipes: undefined;
  SetPlan: undefined;
  PlanDetails: undefined;
  Activity: undefined;
};

export type SocialStackParamList = {
  Home: undefined;
  NewFeed: undefined;
  ViewPhoto: undefined;
  SearchScr: undefined;
  HomeRaise: undefined;
  Story: undefined;
  FindFriend: undefined;
  Contact: undefined;
  Conversation: undefined;
  SendPhotoVoice: undefined;
  VideoCall: undefined;
};

export type ProfileStackParamList = {
  Home: undefined;
  Profile01: undefined;
  Profile02: undefined;
  Profile03: undefined;
  Profile04: undefined;
  Profile05: undefined;
  Profile06: undefined;
  Profile07: undefined;
  Profile08: undefined;
  Profile09: undefined;
  Profile10: undefined;
};
export type FitnessStackParamList = {
  Home: undefined;
  HomeFitness: undefined;
  SelectGender: undefined;
  WorkoutPlans: undefined;
  Running: undefined;
  ConditionHeatMap: undefined;
  WorkoutList: undefined;
  TrainingCount: undefined;
  SetPlan: undefined;
  Achievements: undefined;
  Activity: undefined;
};
export type ECommerceStackParamList = {
  Home: undefined;
  ECommerceHome: undefined;
  Category: undefined;
  GridProduct: undefined;
  ListProduct: undefined;
  ProductDetails: undefined;
  ShopReviews: undefined;
  AddToCart: undefined;
  Checkout: undefined;
  OrderTracking: undefined;
  ViewCart: undefined;
};
export type ReadingStackParamList = {
  Home: undefined;
  HomeReading: undefined;
  ListBook: undefined;
  BookDetails: undefined;
  Question: undefined;
  ListenBook: undefined;
  BookMarkCollection: undefined;
  BookMarkList: undefined;
  Checkout: undefined;
  HomeBook: undefined;
  OrderTracking: undefined;
};
export type FoodDeliveryStackParamList = {
  Home: undefined;
};

export type FinanceStackParamList = {
  Home: undefined;
  Transfer: undefined;
  TransferOld: undefined;
  Pay: undefined;
  Request: undefined;
  RemindBill: undefined;
};

export type EducationStackParamList = {
  Home: undefined;
  MyCourse: undefined;
  HomePage: undefined;
  CourseDetails: undefined;
  VideoCourse: undefined;
  PaymentEducation: undefined;
  CourseStatistic: undefined;
  StudentProfile: undefined;
  TeacherProfile: undefined;
};
export type CryptoStackParamList = {
  Home: undefined;
  HomePage: undefined;
  Market: undefined;
  CoinDetails: undefined;
  Activities: undefined;
  Exchange: undefined;
  Wallet: undefined;
  News: undefined;
  NewDetails: undefined;
  CryptoProfile: undefined;
  Menu: undefined;
};
export type DeliveryStackParamList = {
  Home: undefined;
  HomePage: undefined;
  FoodAndDrink: undefined;
  FoodDetails: undefined;
  Restaurant: undefined;
  RestaurantDetails: undefined;
  MyOrder: undefined;
  Payment: undefined;
  Success: undefined;
  TrackingOrder: undefined;
};
