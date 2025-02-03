import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation.jsx";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post");
      return res.data;
    },
    enabled: !!authUser,
  });

  const { data: suggestedConnections } = useQuery({
    queryKey: ["suggestedConnections"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/suggested-connections");
      return res.data;
    },
    enabled: !!authUser,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />
      </div>
    </div>
  );
};

export default HomePage;
