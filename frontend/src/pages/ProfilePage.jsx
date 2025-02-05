import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/user/${username}`),
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) =>
      await axiosInstance.put("/user/profile", updatedData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  if (isLoading || isUserProfileLoading) return null;

  const isOwnProfile = authUser.username === userProfile.data.username;
  const userData = isOwnProfile ? authUser : userProfile.data;

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return <div>ProfilePage</div>;
};

export default ProfilePage;
