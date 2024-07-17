import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-bold text-blue-500">Loading...</p>
      </div>
    </Html>
  );
};

export default Loader;
