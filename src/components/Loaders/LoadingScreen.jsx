
import Spinner from "./Spinner"; // Component
import Loader from "./Loader"; // Component

const LoadingScreen = () => {
  return (
    <Loader>
      <Spinner />
    </Loader>
  );
};

export default LoadingScreen;
