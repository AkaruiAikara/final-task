import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Layout from "../../components/Layout";
import { API, setAuthToken } from "../../utils/api";
import { UserContext } from "./../../context/UserContext";
import { GridJourney, PostSkeleton } from "../../components/ui";
import { HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";

export default function Profile() {
  const imgRef = useRef(null);
  const { state, dispatch } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [preview, setPreview] = useState(null);
  const [journeys, setJourneys] = useState([]);
  const [initialForm, setInitialForm] = useState({
    fullName: "",
    email: "",
    image: "",
    phone: "",
    address: "",
  });
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    image: "",
    phone: "",
    address: "",
  });
  const getUser = async () => {
    if (state.user.id) {
      const { data } = await API.get(`/users/${state.user.id}`);
      return data;
    }
  };
  const getJourneys = async () => {
    if (state.user.id) {
      const { data } = await API.get(`/journeys/user/${state.user.id}`);
      return data;
    }
  };
  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
        setInitialForm({
          fullName: data.fullName,
          email: data.email,
          image: data.image ? process.env.SERVER_URL + data.image : null,
          phone: data.phone,
          address: data.address,
        });
        setForm({
          fullName: data.fullName,
          email: data.email,
          image: data.image ? process.env.SERVER_URL + data.image : null,
          phone: data.phone,
          address: data.address,
        });
        setPreview(data.image ? process.env.SERVER_URL + data.image : null);
      })
      .catch((err) => {
        console.log(err);
      });
    getJourneys()
      .then((data) => {
        setJourneys(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // handle input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (initialForm[e.target.name] !== e.target.value) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.set("fullName", form.fullName);
    formData.set("email", form.email);
    formData.set("phone", form.phone);
    formData.set("address", form.address);
    if (!(preview === form.image)) {
      formData.set(
        "image",
        imgRef.current.files[0],
        imgRef.current.files[0].name
      );
    }
    API.patch(`/users/${state.user.id}`, formData, config)
      .then((res) => {
        // update state user context after update
        dispatch({
          type: "UPDATE_USER",
          payload: res.data.data,
        });
        // update token
        localStorage.setItem("token", res.data.data.token);
        setAuthToken(res.data.data.token);
        setUser({ ...form });
        setInitialForm({ ...form });
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(form);
  return (
    <Layout title="Profile">
      <h1 className="text-5xl dark:text-white font-avenir font-black my-8">
        Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-12">
          <div className="relative space-y-4 text-center">
            <input
              ref={imgRef}
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              hidden
            />
            <label htmlFor={isEdit ? "image" : ""} className="relative group">
              <Image
                src={preview ?? "/img/avatar.jpg"}
                width={200}
                height={200}
                objectFit="cover"
                alt="avatar"
                className={`${
                  isEdit &&
                  "cursor-pointer brightness-50 group-hover:opacity-75"
                } rounded-full`}
              />
              {isEdit && (
                <div className="cursor-pointer absolute text-gray-200 bottom-20 left-20">
                  <HiOutlinePencilAlt size={40} />
                </div>
              )}
            </label>
            {!isEdit && (
              <>
                <h4 className="text-xl dark:text-white font-black font-avenir">
                  {user?.fullName ?? (
                    <Skeleton
                      width={200}
                      baseColor="#f1f1f1"
                      highlightColor="#e5e5e5"
                    />
                  )}
                </h4>
                <span className="text-xl text-gray-400 font-avenir">
                  {user?.email ?? (
                    <Skeleton
                      width={200}
                      baseColor="#f1f1f1"
                      highlightColor="#e5e5e5"
                    />
                  )}
                </span>
              </>
            )}
            <button
              type="button"
              onClick={() => setIsEdit(!isEdit)}
              className="absolute top-0 right-0 z-[2] p-2 rounded-full bg-bleude text-white"
            >
              <HiOutlinePencilAlt size={20} />
            </button>
            {isEdit && showSubmit && (
              <button
                type="submit"
                className="absolute bottom-8 right-0 z-[2] p-2 rounded-full bg-emerald-600 text-white"
              >
                <HiOutlinePlus size={20} />
              </button>
            )}
          </div>
          {isEdit && (
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-sky-500 dark:bg-sky-200 rounded-sm">
                <label
                  htmlFor="fullName"
                  className="text-white dark:text-sky-700 font-product px-4"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="px-4 py-2 bg-white dark:bg-black outline-none dark:text-white"
                />
              </div>
              <div className="flex justify-between items-center bg-sky-500 dark:bg-sky-200 pl-4 rounded-sm">
                <label
                  htmlFor="email"
                  className="text-white dark:text-sky-700 font-product"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="px-4 py-2 bg-white dark:bg-black outline-none dark:text-white"
                />
              </div>
              <div className="flex justify-between items-center bg-sky-500 dark:bg-sky-200 pl-4 rounded-sm">
                <label
                  htmlFor="phone"
                  className="text-white dark:text-sky-700 font-product"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="px-4 py-2 bg-white dark:bg-black outline-none dark:text-white"
                />
              </div>
              <div className="flex justify-between items-center bg-sky-500 dark:bg-sky-200 pl-4 rounded-sm">
                <label
                  htmlFor="address"
                  className="text-white dark:text-sky-700 font-product"
                >
                  Address
                </label>
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  value={form.address ?? ""}
                  onChange={handleChange}
                  className="px-6 py-2 bg-white dark:bg-black outline-none dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
        {journeys.length > 0 ? (
          journeys.map((journey) => (
            <GridJourney journey={journey} key={journey.id} />
          ))
        ) : (
          <>
            <PostSkeleton />
          </>
        )}
      </div>
    </Layout>
  );
}
