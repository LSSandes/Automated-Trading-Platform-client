import React, { useEffect, useState, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { userAtom, profileAtom } from "@/store/atoms";
import { Switch } from "@headlessui/react";
import { Profile } from "@/types";
import axios from "axios";
import { env } from "@/config/env";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { toast } from "react-toastify";

export default function ProfileSettingView() {
  const [userInfo] = useAtom(userAtom);
  // const [profileInfo] = useAtom(profileAtom);
  // --------------upload avatar ------------------//
  const [picture, setPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleDivClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click(); // Trigger the hidden file input click
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPicture(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl); // Generate preview
    }
  };
  // -------------------------------------------------------//
  const setProfileGlobal = useSetAtom(profileAtom);
  const setUserInfoGlobal = useSetAtom(userAtom);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Profile>({
    email: "",
    name: "",
    bio: "",
    tradingViewAccount: "",
    twitterAccount: "",
    youtubeChannel: "",
    youtubeUserName: "",
    websiteURL: "",
    publicUserName: "",
    publicRole: false, // Initialize with default value
  });
  useEffect(() => {
    if (userInfo != null) {
      setFormData({ ...formData, email: userInfo?.email });
    }
  }, [userInfo?.email]);
  useEffect(() => {
    axios
      .post(`${env.BASE_URL}/profile/get`, { email: userInfo?.email })
      .then((res) => {
        setProfileGlobal((prev) => ({
          ...prev,
          ...res.data.data.profile,
          publicRole: formData.publicRole,
        }));
        setFormData({
          ...formData,
          ...res.data.data.profile,
          email: userInfo?.email,
        });
      });
  }, [userInfo, setProfileGlobal]);
  const getFirstLetterUppercase = (str: string) => {
    if (str.length === 0) return "";
    return str.charAt(0).toUpperCase();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePublicRole = () => {
    setFormData({ ...formData, publicRole: !formData.publicRole });
  };
  const handleProfile = async () => {
    await axios.post(`${env.BASE_URL}/profile/update`, formData).then((res) => {
      setProfileGlobal((prev) => ({
        ...prev,
        ...res.data.data.updatedProfile,
      }));
      toast.success("Updated Successfully!");
    });
    if (picture) {
      const uploadedData = new FormData();
      uploadedData.append("image", picture);
      if (userInfo?.email) {
        uploadedData.append("email", userInfo.email);
        try {
          const response = await axios.post(
            `${env.BASE_URL}/profile/upload-image`,
            uploadedData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Image uploaded:", response.data.data.user);
          setUserInfoGlobal((prev) => ({
            ...prev,
            ...response.data.data.user,
          }));
        } catch (err) {
          console.error("Error uploading image:", err);
          alert("Failed to upload image.");
        }
      }
    }
  };
  // console.log("---------userInfo----------->", userInfo);
  return (
    <div className="flex flex-col justify-center items-center w-full gap-5">
      <div className="flex justify-start items-center w-[90%]">
        <h1 className="text-gray-400 text-4xl font-bold">Settings</h1>
      </div>
      <div className="flex flex-col justify-center items-center lg:w-[70%] w-[90%] gap-10">
        {/* Profile Form */}
        <div className="bg-[#070707] p-6 rounded shadow-md lg:w-[80%] w-full border gap-4 border-[#333333] border-dashed flex flex-col items-center justify-center">
          <div className="flex justify-start items-center w-full">
            <h1 className="text-gray-400 font-sans font-bold text-2xl">
              Profile
            </h1>
          </div>
          <div className="w-full flex justify-center items-center">
            {!preview ? (
              userInfo && !userInfo.picture ? (
                <div className="w-14 h-14 rounded-full text-5xl border border-accent/20 text-center">
                  {getFirstLetterUppercase(userInfo.email)}
                </div>
              ) : (
                <img
                  src={`${
                    userInfo?.picture?.includes("uploads")
                      ? env.AVATAR_URL + userInfo?.picture
                      : userInfo?.picture
                  }`}
                  alt="Profile"
                  className="w-14 h-14 rounded-full border border-accent/20"
                />
              )
            ) : (
              preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-14 h-14 rounded-full"
                />
              )
            )}
            <input
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the input
            />
          </div>
          <div
            className="w-full flex justify-center items-center cursor-pointer"
            onClick={handleDivClick}
          >
            <h1 className="text-gray-400 text-sm hover:text-blue-700">
              Upload the image
            </h1>
          </div>

          {/* Form Fields */}
          {[
            {
              label: "Your Name",
              name: "name",
              type: "text",
              value: formData.name,
              placeholder: "name",
            },
            {
              label: "Your Bio",
              name: "bio",
              type: "textarea",
              value: formData.bio,
              placeholder: "bio",
            },
            {
              label: "TradingView Account",
              name: "tradingViewAccount",
              type: "text",
              value: formData.tradingViewAccount,
              placeholder: "tradingview",
            },
            {
              label: "Twitter Account",
              name: "twitterAccount",
              type: "text",
              value: formData.twitterAccount,
              placeholder: "twitter account",
            },
            {
              label: "Youtube Channel Link",
              name: "youtubeChannel",
              type: "text",
              value: formData.youtubeChannel,
              placeholder: "youtube channel",
            },
            {
              label: "Youtube Username",
              name: "youtubeUserName",
              type: "text",
              value: formData.youtubeUserName,
              placeholder: "youtube username",
            },
            {
              label: "Your Website",
              name: "websiteURL",
              type: "text",
              value: formData.websiteURL,
              placeholder: "website",
            },
          ].map(({ label, name, type, value, placeholder }, idx) => (
            <div
              className="mb-4 w-full flex flex-col justify-center items-center"
              key={idx}
            >
              <div className="flex flex-col justify-start lg:w-1/3 w-full">
                <label className="block text-gray-700 text-sm" htmlFor={name}>
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="text-gray-300 placeholder-gray-500 text-sm mt-1 block w-full p-2 border border-gray-700 bg-[#070707] rounded-[10px] border-dashed focus:outline focus:outline-gray-500 focus:border-none"
                  />
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="text-gray-300 placeholder-gray-500 text-sm mt-1 block w-full p-2 border border-gray-700 bg-[#070707] rounded-[10px] border-dashed focus:outline focus:outline-gray-500 focus:border-none"
                  />
                )}
              </div>
            </div>
          ))}

          <div className="flex lg:w-[35%] w-[90%] p-[2px] border border-blue-500 border-dashed rounded-[20px]">
            <button
              type="submit"
              className="w-full text-sm bg-blue-500 text-white p-2 rounded-[20px] hover:bg-blue-600 h-9"
              onClick={() => setOpen(true)}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Public Profile Section */}
        <div className="bg-[#070707] p-6 rounded shadow-md lg:w-[80%] w-full border gap-4 border-[#333333] border-dashed flex flex-col items-center justify-center">
          <div className="flex justify-start items-center w-full">
            <h1 className="text-gray-400 font-sans font-bold text-2xl">
              Public Profile
            </h1>
          </div>
          <div className="mb-4 w-full flex flex-col justify-center items-center">
            <div className="flex lg:w-1/3 w-full flex-col justify-start items-start">
              <label
                className="block text-gray-700 text-sm"
                htmlFor="publicUserName"
              >
                Username
              </label>
              <input
                type="text"
                id="publicUserName"
                name="publicUserName"
                placeholder="username"
                value={formData.publicUserName}
                onChange={handleChange}
                className="text-gray-300 placeholder-gray-500 text-sm mt-1 block lg:w-full w-full p-2 border border-gray-700 bg-[#070707] rounded-[10px] border-dashed focus:outline focus:outline-gray-500 focus:border-none"
              />
            </div>
          </div>
          <div className="w-[300px] flex justify-between items-center">
            <h1 className="text-gray-500">Public</h1>
            <Switch
              checked={formData.publicRole}
              onChange={handleTogglePublicRole}
              className={`${
                formData.publicRole ? "bg-blue-600" : "bg-gray-500"
              } relative inline-flex h-5 w-10 items-center rounded-full transition`}
            >
              <span
                className={`${
                  formData.publicRole ? "translate-x-5" : "translate-x-0"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>
          <div className="flex lg:w-[35%] w-[90%] p-[2px] border border-blue-500 border-dashed rounded-[20px]">
            <button
              type="submit"
              className="w-full text-sm bg-blue-500 text-white p-2 rounded-[20px] hover:bg-blue-600 h-9"
              onClick={() => setOpen(true)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal open={open} setOpen={setOpen} handleOk={handleProfile} />
    </div>
  );
}
