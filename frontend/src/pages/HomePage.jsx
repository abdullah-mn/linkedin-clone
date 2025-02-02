import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import Sidebar from "../components/Sidebar";

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

  console.log(suggestedConnections);

  return <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">HomePage</div>;
};

export default HomePage;
