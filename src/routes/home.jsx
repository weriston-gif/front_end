import Header from '../componets/header';
import HomeIndice from '../componets/home';

export default function Home() {
  const isRouteActive = (path) => {
    return location.pathname === path;
  };
  return (
    <>
      <Header />
      <div className="content-container w-100">
        <HomeIndice />
      </div>

    </>
  );
}