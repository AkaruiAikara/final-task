import { useContext, useRef, useState } from "react";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import Lottie from "lottie-react";
import spinnerData from "../../assets/json/spinner.json";
import { API } from "../../utils/api";
import { UserContext } from "../../context/UserContext";
import sanitizeHtml from "sanitize-html";
import Layout from "../../components/Layout";

export default function NewJourney() {
  const { state } = useContext(UserContext);
  const editorRef = useRef(null);
  const imgRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
  });
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
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      if (
        editorRef.current.getContent().length < 1 ||
        form.title.length < 1 ||
        form.image.length < 1
      ) {
        alert("Please fill all the fields");
        return;
      }
      setLoading(true);
      const data = new FormData();
      data.set("userId", state.user.id);
      data.set("title", form.title);
      data.set("slug", form.title.replace(/\s+/g, "-").toLowerCase());
      data.set("image", imgRef.current.files[0], imgRef.current.files[0].name);
      data.set("description", sanitizeHtml(editorRef.current.getContent()));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      API.post("/journeys", data, config)
        .then((res) => {
          editorRef.current.setContent("");
          setForm({
            title: "",
            image: "",
          });
          setPreview(null);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <Layout title="New Journey">
      <h1 className="text-5xl dark:text-white font-avenir font-black my-8">
        New Journey
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-6">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="px-6 py-2 text-4xl font-product outline-none"
        />
        <Editor
          id="editor"
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey={process.env.TINYMCE_API_KEY}
          init={{
            height: 400,
            menubar: true,
            branding: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; cursor: text; }",
          }}
        />
        <label className="cursor-pointer inline-flex items-center bg-white hover:bg-gray-50 active:bg-gray-100 rounded">
          <Image
            src={preview ?? "/img/blank-thumbnail.jpg"}
            width={480}
            height={320}
            objectFit="cover"
            alt="thumbnail"
            className="rounded-md"
          />
          <input
            ref={imgRef}
            type="file"
            name="image"
            id="image"
            value={form.image}
            onChange={handleChange}
            className="md:pl-12 file:hidden"
          />
        </label>
        {loading ? (
          <button
            className="rounded-sm ml-auto bg-sky-800 px-16 py-2 mt-8 text-white font-product ml-auto"
            disabled
          >
            <Lottie animationData={spinnerData} autoplay loop className="h-6" />
          </button>
        ) : (
          <button
            type="submit"
            className="px-12 py-2 bg-bleude hover:bg-sky-700 active:bg-sky-900 text-white rounded-sm ml-auto"
          >
            Submit
          </button>
        )}
      </form>
    </Layout>
  );
}
