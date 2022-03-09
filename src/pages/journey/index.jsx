import { useRef } from "react";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "../../components/Layout";

export default function NewJourney() {
  const editorRef = useRef(null);
  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <Layout title="New Journey">
      <h1 className="text-5xl dark:text-white font-avenir font-black my-8">
        New Journey
      </h1>
      <form onSubmit={log} className="space-y-4 my-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
          <button
            type="submit"
            className="p-2 bg-bleude hover:bg-sky-700 active:bg-sky-900 text-white"
          >
            Log editor content
          </button>
          <label className="cursor-pointer inline-flex items-center bg-white hover:bg-gray-50 active:bg-gray-100 rounded">
            <Image
              src="/img/blank-thumbnail.jpg"
              width={240}
              height={160}
              alt="thumbnail"
              className="rounded-md"
            />
            <input
              type="file"
              name="image"
              id="image"
              className="md:pl-12 file:hidden"
            />
          </label>
        </div>
        <Editor
          id="editor"
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey={process.env.TINYMCE_API_KEY}
          init={{
            height: 400,
            menubar: true,
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
      </form>
    </Layout>
  );
}
