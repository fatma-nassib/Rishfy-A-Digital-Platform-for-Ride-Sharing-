// import { MobileNavProvider, useMobileNav } from '../../hooks/use-mobile';
// import { PhoneFrame } from './PhoneFrame';
// import { BottomNav } from './BottomNav';
// import { SplashScreen } from '../../pages/mobile/SplashScreen';
// import { LoginScreen } from '../../pages/mobile/LoginScreen';
// import { SignUpScreen } from '../../pages/mobile/SignUpScreen';
// import { ForgotPasswordScreen } from '../../pages/mobile/ForgotPasswordScreen';
// import { OTPScreen } from '../../pages/mobile/OTPScreen';
// import { ResetPasswordScreen } from '../../pages/mobile/ResetPasswordScreen';
// import { PassengerHomeScreen } from '../../pages/mobile/PassengerHomeScreen';
// import { DriverHomeScreen } from '../../pages/mobile/DriverHomeScreen';
// import { SearchResultsScreen } from '../../pages/mobile/SearchResultsScreen';
// import { RouteSelectionScreen } from '../../pages/mobile/RouteSelectionScreen';
// import { RouteCreationScreen } from '../../pages/mobile/RouteCreationScreen';
// import { RouteDetailsScreen } from '../../pages/mobile/RouteDetailsScreen';
// import { BookingRequestsScreen } from '../../pages/mobile/BookingRequestsScreen';
// import { BookingConfirmScreen } from '../../pages/mobile/BookingConfirmScreen';
// import { ActiveTripScreen } from '../../pages/mobile/ActiveTripScreen';
// import { TripDetailsScreen } from '../../pages/mobile/TripDetailsScreen';
// import { RidesHistoryScreen } from '../../pages/mobile/RidesHistoryScreen';
// import { RatingScreen } from '../../pages/mobile/RatingScreen';
// import { ProfileScreen } from '../../pages/mobile/ProfileScreen';

// function ActiveScreen() {
//   const { screen } = useMobileNav();

//   switch (screen) {
//     case 'splash':
//       return <SplashScreen />;
//     case 'login':
//       return <LoginScreen />;
//     case 'signup':
//       return <SignUpScreen />;
//     case 'forgot-password':
//       return <ForgotPasswordScreen />;
//     case 'otp':
//       return <OTPScreen />;
//     case 'reset-password':
//       return <ResetPasswordScreen />;
//     case 'passenger-home':
//       return <PassengerHomeScreen />;
//     case 'driver-home':
//       return <DriverHomeScreen />;
//     case 'search-results':
//       return <SearchResultsScreen />;
//     case 'route-selection':
//       return <RouteSelectionScreen />;
//     case 'route-creation':
//       return <RouteCreationScreen />;
//     case 'route-details':
//       return <RouteDetailsScreen />;
//     case 'booking-requests':
//       return <BookingRequestsScreen />;
//     case 'booking-confirm':
//       return <BookingConfirmScreen />;
//     case 'active-trip':
//       return <ActiveTripScreen />;
//     case 'trip-details':
//       return <TripDetailsScreen />;
//     case 'rides-history':
//       return <RidesHistoryScreen />;
//     case 'rating':
//       return <RatingScreen />;
//     case 'profile':
//       return <ProfileScreen />;
//     default:
//       return <SplashScreen />;
//   }
// }

// export function MobileApp() {
//   return (
//     <MobileNavProvider>
//       <PhoneFrame>
//         <ActiveScreen />
//         <BottomNav />
//       </PhoneFrame>
//     </MobileNavProvider>
//   );
// }

import React, { useState } from "react";
import SplashScreen from "@/pages/mobile/SplashScreen";
import SignUpScreen from "@/pages/mobile/SignUpScreen";
import LoginScreen from "@/pages/mobile/LoginScreen";
import ForgotPasswordScreen from "@/pages/mobile/ForgotPasswordScreen";
import OTPScreen from "@/pages/mobile/OTPScreen";
import ResetPasswordScreen from "@/pages/mobile/ResetPasswordScreen";
import RoleSelectionScreen from "@/pages/mobile/RoleSelectionScreen";
import DriverHomeScreen from "@/pages/mobile/DriverHomeScreen";
import PassengerHomeScreen from "@/pages/mobile/PassengerHomeScreen";
import RouteCreationScreen from "@/pages/mobile/RouteCreationScreen";
import TripDetailsScreen from "@/pages/mobile/TripDetailsScreen";
import SearchResultsScreen from "@/pages/mobile/SearchResultsScreen";
import RouteDetailsScreen from "@/pages/mobile/RouteDetailsScreen";
import BookingConfirmScreen from "@/pages/mobile/BookingConfirmScreen";
import BookingRequestsScreen from "@/pages/mobile/BookingRequestsScreen";
import ActiveTripScreen from "@/pages/mobile/ActiveTripScreen";
import RatingScreen from "@/pages/mobile/RatingScreen";
import ProfileScreen from "@/pages/mobile/ProfileScreen";
import RidesHistoryScreen from "@/pages/mobile/RidesHistoryScreen";
import PaymentScreen from "@/pages/mobile/PaymentScreen";
import TripReceiptScreen from "@/pages/mobile/TripReceiptScreen";
import EmergencyContactsScreen from "@/pages/mobile/EmergencyContactsScreen";
import DriverEarningsScreen from "@/pages/mobile/DriverEarningsScreen";
import VehicleRegistrationScreen from "@/pages/mobile/VehicleRegistrationScreen";
import RideSearchingScreen from "@/pages/mobile/RideSearchingScreen";
import RideMatchedScreen from "@/pages/mobile/RideMatchedScreen";
import PassengerTrackingScreen from "@/pages/mobile/PassengerTrackingScreen";
import NotificationsScreen from "@/pages/mobile/NotificationsScreen";
import BottomNav from "./BottomNav";
import { TripProvider } from "@/context/trip";

export type Screen =
  | "splash"
  | "signup"
  | "login"
  | "forgot-password"
  | "otp"
  | "reset-password"
  | "role-selection"
  | "driver-home"
  | "passenger-home"
  | "route-creation"
  | "trip-details"
  | "search-results"
  | "route-details"
  | "booking-confirm"
  | "booking-requests"
  | "active-trip"
  | "rating"
  | "profile"
  | "rides-history"
  | "payment"
  | "receipt"
  | "emergency-contacts"
  | "driver-earnings"
  | "vehicle-registration"
  | "ride-searching"
  | "ride-matched"
  | "passenger-tracking"
  | "notifications";

const MobileApp: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<"driver" | "passenger">("passenger");
  const [bottomTab, setBottomTab] = useState<"home" | "rides" | "profile">("home");
  const [authIntent, setAuthIntent] = useState<"signup" | "login">("signup");

  const navigate = (s: Screen) => setScreen(s);

  const showBottomNav = [
    "driver-home", "passenger-home", "rides-history", "profile",
    "search-results", "booking-requests"
  ].includes(screen);

  const handleBottomNav = (tab: "home" | "rides" | "profile") => {
    setBottomTab(tab);
    if (tab === "home") navigate(role === "driver" ? "driver-home" : "passenger-home");
    if (tab === "rides") navigate(role === "driver" ? "booking-requests" : "rides-history");
    if (tab === "profile") navigate("profile");
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return (
          <SplashScreen
            onNavigate={navigate}
            onChoose={(intent) => {
              setAuthIntent(intent);
              navigate("role-selection");
            }}
          />
        );
      case "signup":
        return (
          <SignUpScreen
            onNavigate={navigate}
            onDone={() => navigate(role === "driver" ? "driver-home" : "passenger-home")}
          />
        );
      case "login":
        return (
          <LoginScreen
            onNavigate={navigate}
            onDone={() => navigate(role === "driver" ? "driver-home" : "passenger-home")}
          />
        );
      case "forgot-password": return <ForgotPasswordScreen onNavigate={navigate} />;
      case "otp": return <OTPScreen onNavigate={navigate} />;
      case "reset-password": return <ResetPasswordScreen onNavigate={navigate} />;
      case "role-selection":
        return (
          <RoleSelectionScreen
            onNavigate={navigate}
            intent={authIntent}
            onSelectRole={(r) => {
              setRole(r);
            }}
            onContinue={(r) => {
              setRole(r);
              navigate(authIntent);
            }}
          />
        );
      case "driver-home": return <DriverHomeScreen onNavigate={navigate} />;
      case "passenger-home": return <PassengerHomeScreen onNavigate={navigate} />;
      case "route-creation": return <RouteCreationScreen onNavigate={navigate} />;
      case "trip-details": return <TripDetailsScreen onNavigate={navigate} />;
      case "search-results": return <SearchResultsScreen onNavigate={navigate} />;
      case "route-details": return <RouteDetailsScreen onNavigate={navigate} />;
      case "booking-confirm": return <BookingConfirmScreen onNavigate={navigate} />;
      case "booking-requests": return <BookingRequestsScreen onNavigate={navigate} />;
      case "active-trip": return <ActiveTripScreen onNavigate={navigate} />;
      case "rating": return <RatingScreen onNavigate={navigate} onDone={() => navigate(role === "driver" ? "driver-home" : "passenger-home")} />;
      case "profile": return <ProfileScreen onNavigate={navigate} role={role} />;
      case "rides-history": return <RidesHistoryScreen onNavigate={navigate} />;
      case "payment": return <PaymentScreen onNavigate={navigate} />;
      case "receipt": return <TripReceiptScreen onNavigate={navigate} />;
      case "emergency-contacts": return <EmergencyContactsScreen onNavigate={navigate} />;
      case "driver-earnings": return <DriverEarningsScreen onNavigate={navigate} />;
      case "vehicle-registration": return <VehicleRegistrationScreen onNavigate={navigate} />;
      case "ride-searching": return <RideSearchingScreen onNavigate={navigate} />;
      case "ride-matched": return <RideMatchedScreen onNavigate={navigate} />;
      case "passenger-tracking": return <PassengerTrackingScreen onNavigate={navigate} />;
      case "notifications": return <NotificationsScreen onNavigate={navigate} />;
      default: return <SplashScreen onNavigate={navigate} />;
    }
  };

  return (
    <TripProvider>
      <div className="relative h-full">
        <div className={showBottomNav ? "pb-16" : ""}>
          {renderScreen()}
        </div>
        {showBottomNav && (
          <BottomNav
            active={bottomTab}
            onNavigate={handleBottomNav}
          />
        )}
      </div>
    </TripProvider>
  );
};

export default MobileApp;
